import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Folder, ArrowUpRight } from 'lucide-react';
import NotionTag from './NotionTag';

export default function NotionCard({ project, onClick }) {
  return (
    <motion.div
      onClick={() => onClick && onClick(project)}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`group flex flex-col bg-white rounded-md border border-[#E9E9E1] shadow-xs overflow-hidden hover:shadow-notion-card-hover hover:border-[#2383E2]/40 transition-all duration-200 ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Card Thumbnail Image */}
      {project.coverImage && (
        <div className="relative h-40 w-full bg-[#F9F8F7] overflow-hidden border-b border-[#E9E9E1]">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-medium bg-white/90 backdrop-blur-sm text-[#8E8B86] border border-[#E9E9E1] shadow-xs">
            {project.category}
          </div>
        </div>
      )}

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Category & Date */}
          <div className="flex items-center justify-between text-xs text-[#8E8B86] mb-1.5 font-medium">
            <span className="flex items-center space-x-1">
              <Folder className="w-3 h-3 text-[#2383E2]" />
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
          <h3 className="text-base font-semibold text-[#2C2C2B] group-hover:text-[#2383E2] transition-colors leading-snug">
            {project.title}
          </h3>

          {/* Subtitle / Short summary */}
          {project.subtitle && (
            <p className="text-xs font-medium text-[#8E8B86] mt-0.5 line-clamp-1">
              {project.subtitle}
            </p>
          )}

          {/* Description */}
          <p className="text-xs text-[#2C2C2B]/80 mt-2 line-clamp-3 leading-relaxed font-normal">
            {project.description}
          </p>

          {/* Notion Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.map((tag, idx) => (
              <NotionTag key={idx} name={tag.name} color={tag.color} />
            ))}
          </div>
        </div>

        {/* Footer Action Links (Notion Kit Buttons) */}
        <div className="flex items-center justify-between pt-3 mt-4 border-t border-[#E9E9E1] text-xs">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-[#8E8B86] hover:text-[#2C2C2B] transition-colors py-1 px-2 rounded hover:bg-[#2C2C2B]/5 font-medium"
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
              className="inline-flex items-center space-x-1 text-[#2383E2] hover:text-[#0077D4] font-medium transition-colors py-1 px-2.5 rounded bg-[#2383E2]/10 hover:bg-[#2383E2]/20"
            >
              <span>Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
