import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import NotionCard from './NotionCard';
import { FolderKanban, SearchX } from 'lucide-react';

export default function ProjectView({ 
  projects, 
  currentCategoryTitle 
}) {

  // Filter projects based on category only
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = 
        !currentCategoryTitle || 
        currentCategoryTitle === 'All Projects' || 
        project.category.toLowerCase() === currentCategoryTitle.toLowerCase();

      return matchesCategory;
    });
  }, [projects, currentCategoryTitle]);

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
            Coba pilih kategori lain untuk melihat project lainnya.
          </p>
        </div>
      )}
    </motion.div>
  );
}
