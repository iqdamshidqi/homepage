import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import NotionCard from './NotionCard';
import FilterBar from './FilterBar';
import { FolderKanban, SearchX } from 'lucide-react';

export default function ProjectView({ 
  projects, 
  availableTags, 
  currentCategoryTitle 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  // Filter projects based on Category, Search Query, and Selected Tag
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category Filter (Handled upstream or here if category is set)
      const matchesCategory = 
        !currentCategoryTitle || 
        currentCategoryTitle === 'All Projects' || 
        project.category.toLowerCase() === currentCategoryTitle.toLowerCase();

      // Tag Filter
      const matchesTag = 
        !selectedTag || 
        project.tags.some(t => t.name.toLowerCase() === selectedTag.toLowerCase());

      // Search Query Filter
      const matchesSearch = 
        !searchQuery || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [projects, currentCategoryTitle, selectedTag, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="pb-12"
    >
      {/* Category Header Title */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EBECED]">
        <h2 className="text-xl font-bold text-[#37352F] flex items-center">
          <FolderKanban className="w-5 h-5 mr-2 text-[#787774]" />
          <span>{currentCategoryTitle || 'All Projects'}</span>
        </h2>
        <span className="text-xs text-[#787774] font-medium bg-[#F1F1EF] px-2.5 py-0.5 rounded border border-[#E9E9E7]">
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
      />

      {/* Gallery View Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <NotionCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white rounded-lg border border-[#E9E9E7] shadow-notion space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#F1F1EF] flex items-center justify-center mx-auto text-[#787774]">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-[#37352F]">Tidak ada project yang cocok</h3>
          <p className="text-xs text-[#787774] max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau reset filter tag untuk melihat project lainnya.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag(null);
            }}
            className="inline-flex items-center px-3 py-1.5 rounded text-xs bg-[#37352F] text-white hover:bg-black transition-colors"
          >
            Reset Filter
          </button>
        </div>
      )}
    </motion.div>
  );
}
