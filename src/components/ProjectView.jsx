import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { FolderKanban, SearchX, ExternalLink, Github, FileText } from 'lucide-react';

import NotionCard from './NotionCard';
import NotionTag from './NotionTag';
import FilterBar from './FilterBar';
import BlockWrapper from './blocks/BlockWrapper';
import BlockRenderer from './blocks/BlockRenderer';

export default function ProjectView({ 
  blocks,
  availableTags, 
  currentCategoryTitle,
  isEditing,
  onUpdateBlockContent,
  onAddBlockBelow,
  onDuplicateBlock,
  onDeleteBlock,
  onMoveUp,
  onMoveDown,
  onEditProjectProperties,
  onOpenDetail,
  onDragEnd
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' | 'table'

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Extract project data from blocks for filtering
  const allProjects = useMemo(() => {
    return blocks
      .filter(b => b.type === 'projectCard')
      .map(b => ({ ...b.content.projectData, _blockId: b.id }));
  }, [blocks]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesCategory = 
        !currentCategoryTitle || 
        currentCategoryTitle === 'All Projects' || 
        project.category.toLowerCase() === currentCategoryTitle.toLowerCase();

      const matchesTag = 
        !selectedTag || 
        project.tags.some(t => t.name.toLowerCase() === selectedTag.toLowerCase());

      const matchesSearch = 
        !searchQuery || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [allProjects, currentCategoryTitle, selectedTag, searchQuery]);

  // Filter blocks to only show matching project cards (and non-project blocks)
  const filteredBlocks = useMemo(() => {
    const filteredIds = new Set(filteredProjects.map(p => p._blockId));
    return blocks.filter(b => {
      if (b.type === 'projectCard') return filteredIds.has(b.id);
      return true; // Non-project blocks always show
    });
  }, [blocks, filteredProjects]);

  // In editor mode, render as sortable blocks
  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25 }}
        className="pb-12"
      >
        {/* Category Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E9E9E1]">
          <h2 className="text-xl font-bold text-[#2C2C2B] flex items-center">
            <FolderKanban className="w-5 h-5 mr-2 text-[#2383E2]" />
            <span>{currentCategoryTitle || 'All Projects'}</span>
          </h2>
          <span className="text-xs text-[#8E8B86] font-medium bg-[#F2F1EE] px-2.5 py-0.5 rounded border border-[#E9E9E1]">
            {allProjects.length} {allProjects.length === 1 ? 'Project' : 'Projects'}
          </span>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={blocks.map(b => b.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-1">
              {blocks.map((block) => (
                <BlockWrapper
                  key={block.id}
                  block={block}
                  isEditing={isEditing}
                  onAddBlockBelow={onAddBlockBelow}
                  onDuplicateBlock={onDuplicateBlock}
                  onDeleteBlock={onDeleteBlock}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                >
                  <BlockRenderer
                    block={block}
                    isEditing={isEditing}
                    onChange={onUpdateBlockContent}
                    onEditProjectProperties={onEditProjectProperties}
                    onOpenDetail={onOpenDetail}
                  />
                </BlockWrapper>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </motion.div>
    );
  }

  // Viewer mode — standard gallery/table layout
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="pb-12"
    >
      {/* Category Header Title */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E9E9E1]">
        <h2 className="text-xl font-bold text-[#2C2C2B] flex items-center">
          <FolderKanban className="w-5 h-5 mr-2 text-[#2383E2]" />
          <span>{currentCategoryTitle || 'All Projects'}</span>
        </h2>
        <span className="text-xs text-[#8E8B86] font-medium bg-[#F2F1EE] px-2.5 py-0.5 rounded border border-[#E9E9E1]">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
        </span>
      </div>

      {/* Filter and Search Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
        availableTags={availableTags}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* View Rendering */}
      {filteredProjects.length > 0 ? (
        viewMode === 'gallery' ? (
          /* Gallery Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <NotionCard key={project.id} project={project} onClick={onOpenDetail} />
            ))}
          </div>
        ) : (
          /* Notion Database Table View */
          <div className="bg-white border border-[#E9E9E1] rounded-md overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9F8F7] border-b border-[#E9E9E1] text-[11px] font-semibold text-[#8E8B86]">
                    <th className="p-3 w-8 text-center">#</th>
                    <th className="p-3">Project Title</th>
                    <th className="p-3">Domain Category</th>
                    <th className="p-3">Tech Stack Tags</th>
                    <th className="p-3 w-20">Year</th>
                    <th className="p-3 w-32 text-right">Links</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E9E1] text-xs text-[#2C2C2B]">
                  {filteredProjects.map((project, idx) => (
                    <tr 
                      key={project.id} 
                      onClick={() => onOpenDetail && onOpenDetail(project)}
                      className={`hover:bg-[#F9F8F7]/80 transition-colors ${onOpenDetail ? 'cursor-pointer' : ''}`}
                    >
                      <td className="p-3 text-center text-[#8E8B86] font-mono text-[11px]">
                        {idx + 1}
                      </td>
                      <td className="p-3 font-semibold text-[#2C2C2B]">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-[#8E8B86] flex-shrink-0" />
                          <div>
                            <div className="hover:text-[#2383E2] transition-colors">{project.title}</div>
                            <div className="text-[11px] text-[#8E8B86] font-normal line-clamp-1">{project.subtitle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-medium text-[#8E8B86]">
                        {project.category}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((t, i) => (
                            <NotionTag key={i} name={t.name} color={t.color} />
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-[#8E8B86] font-mono text-[11px]">
                        {project.date || '2024'}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#8E8B86] hover:text-[#2C2C2B] p-1 rounded hover:bg-[#2C2C2B]/5"
                              title="GitHub Repository"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#2383E2] hover:text-[#0077D4] p-1 rounded hover:bg-[#2383E2]/10"
                              title="Live Demo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white rounded-md border border-[#E9E9E1] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#F2F1EE] flex items-center justify-center mx-auto text-[#8E8B86]">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-[#2C2C2B]">No matching projects found</h3>
          <p className="text-xs text-[#8E8B86] max-w-sm mx-auto">
            Try adjusting your search terms or reset the tag filter to see all projects.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag(null);
            }}
            className="inline-flex items-center px-3 py-1.5 rounded text-xs bg-[#2C2C2B] text-white hover:bg-black transition-colors font-medium"
          >
            Reset Filters
          </button>
        </div>
      )}
    </motion.div>
  );
}
