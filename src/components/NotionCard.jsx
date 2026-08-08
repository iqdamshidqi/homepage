import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Folder } from 'lucide-react';
import NotionTag from './NotionTag';

export default function NotionCard({ project }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col bg-white rounded-lg border border-[#E9E9E7] shadow-notion overflow-hidden hover:shadow-notion-card-hover hover:border-[#D3D3D0] transition-all duration-200"
    >
      {/* Card Thumbnail Image */}
      {project.coverImage && (
        <div className="relative h-40 w-full bg-[#F7F7F5] overflow-hidden border-b border-[#E9E9E7]">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-medium bg-white/90 backdrop-blur-sm text-[#787774] border border-[#E9E9E7]">
            {project.category}
          </div>
        </div>
      )}

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Date */}
          <div className="flex items-center justify-between text-xs text-[#9B9A97] mb-1.5">
            <span className="flex items-center space-x-1">
              <Folder className="w-3 h-3" />
              <span>{project.category}</span>
            </span>
            {project.date && (
              <span className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{project.date}</span>
              </span>
            )}
          </div>

          {/* Project Title */}
          <h3 className="text-base font-bold text-[#37352F] group-hover:text-blue-600 transition-colors leading-snug">
            {project.title}
          </h3>

          {/* Subtitle / Short summary */}
          {project.subtitle && (
            <p className="text-xs font-medium text-[#787774] mt-0.5 line-clamp-1">
              {project.subtitle}
            </p>
          )}

          {/* Description */}
          <p className="text-xs text-[#37352F]/80 mt-2 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Notion Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.map((tag, idx) => (
              <NotionTag key={idx} name={tag.name} color={tag.color} />
            ))}
          </div>
        </div>

        {/* Footer Action Links */}
        <div className="flex items-center justify-between pt-3 mt-4 border-t border-[#EBECED] text-xs">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-[#787774] hover:text-[#37352F] transition-colors py-1 px-2 rounded hover:bg-[#F1F1EF]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
          ) : (
            <span />
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-blue-600 hover:text-blue-700 font-medium transition-colors py-1 px-2.5 rounded bg-[#E7F3F8] hover:bg-[#D8EDF5]"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
