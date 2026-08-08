import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Folder, ExternalLink, Github, FileText } from 'lucide-react';
import NotionTag from './NotionTag';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ProjectDetailView({ project, onBack, isEditing, onUpdateProject }) {
  if (!project) return null;

  const handleChange = (field, value) => {
    if (onUpdateProject) {
      onUpdateProject({ ...project, [field]: value });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="pb-16 text-[#2C2C2B] font-sans"
    >
      {/* Header Breadcrumb & Back */}
      <div className="flex items-center space-x-2 text-sm text-[#8E8B86] mb-6 font-medium">
        <button 
          onClick={onBack}
          className="hover:text-[#2C2C2B] flex items-center transition-colors bg-[#F2F1EE] hover:bg-[#E9E9E1] px-2 py-1 rounded"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Projects
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-lg border border-[#E9E9E1] shadow-xs overflow-hidden mb-8">
        {project.coverImage && (
          <div className="w-full h-48 md:h-64 bg-[#F9F8F7] relative border-b border-[#E9E9E1]">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6 md:p-8">
          <div className="flex items-center text-xs text-[#8E8B86] font-medium mb-3 space-x-4">
            <span className="flex items-center space-x-1">
              <Folder className="w-3.5 h-3.5 text-[#2383E2]" />
              <span>{project.category}</span>
            </span>
            {project.date && (
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{project.date}</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#2C2C2B] tracking-tight mb-2 leading-tight">
            {project.title}
          </h1>
          
          {project.subtitle && (
            <p className="text-lg text-[#8E8B86] font-medium mb-6">
              {project.subtitle}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.map((tag, idx) => (
              <NotionTag key={idx} name={tag.name} color={tag.color} />
            ))}
          </div>

          <div className="flex items-center space-x-3 pt-4 border-t border-[#E9E9E1]">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-md border border-[#E9E9E1] text-[#5F5E5B] hover:text-[#2C2C2B] hover:bg-[#F9F8F7] font-medium transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#2C2C2B] text-white hover:bg-black font-medium transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Demo</span>
              </a>
            )}
            {project.paperUrl && (
              <a
                href={project.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#2383E2]/10 text-[#2383E2] hover:bg-[#2383E2]/20 font-medium transition-colors text-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Paper</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="prose prose-sm md:prose-base max-w-none text-[#37352F] mb-12">
        <h2 className="text-xl font-bold flex items-center border-b border-[#E9E9E1] pb-2 mb-4">
          <FileText className="w-5 h-5 mr-2 text-[#8E8B86]" />
          Project Overview
        </h2>
        {isEditing ? (
          <textarea
            value={project.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Write your project overview here... (Markdown supported)"
            className="w-full min-h-[150px] px-3 py-2 border border-[#E9E9E1] rounded bg-white leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#2383E2] transition-colors font-mono text-sm"
          />
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.description || 'No description provided.'}
          </ReactMarkdown>
        )}
      </div>

      {/* PDF Viewer Section */}
      {project.pdfUrl && (
        <div className="mt-12">
          <h2 className="text-xl font-bold flex items-center border-b border-[#E9E9E1] pb-2 mb-4">
            <FileText className="w-5 h-5 mr-2 text-[#2383E2]" />
            Detailed Document (PDF)
          </h2>
          <div className="w-full h-[600px] md:h-[800px] rounded-lg border border-[#E9E9E1] overflow-hidden shadow-xs bg-[#F9F8F7] flex flex-col">
            <div className="px-4 py-2 border-b border-[#E9E9E1] bg-[#F2F1EE] text-xs font-medium text-[#8E8B86] flex justify-between items-center">
              <span>{project.pdfUrl.split('/').pop()}</span>
              <a href={project.pdfUrl} download className="text-[#2383E2] hover:underline">
                Download PDF
              </a>
            </div>
            <iframe 
              src={`${project.pdfUrl}#toolbar=0&navpanes=0`} 
              className="w-full flex-1"
              title={`${project.title} PDF`}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
