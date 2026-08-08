import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Folder, ExternalLink, Github, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import NotionTag from './NotionTag';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';

export default function ProjectDetailView({ project, onBack, isEditing, onUpdateProject }) {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  if (!project) return null;

  const handleChange = (field, value) => {
    if (onUpdateProject) {
      onUpdateProject({ ...project, [field]: value });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingImage(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Data = reader.result;
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`,
            base64: base64Data,
          }),
        });

        const result = await response.json();
        if (result.success) {
          // insert image markdown at the end
          const imageMarkdown = `\n![${file.name}](${result.imageUrl})\n`;
          handleChange('description', (project.description || '') + imageMarkdown);
        } else {
          alert('Failed to upload image: ' + result.error);
        }
      } catch (err) {
        alert('Upload error: ' + err.message);
      } finally {
        setIsUploadingImage(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
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
          <div className="flex flex-col space-y-2">
            <textarea
              value={project.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Write your project overview here... (Markdown, LaTeX with $$...$$, code blocks supported)"
              className="w-full min-h-[150px] px-3 py-2 border border-[#E9E9E1] rounded bg-white leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#2383E2] transition-colors font-mono text-sm"
            />
            <div className="flex justify-end">
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload} 
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingImage}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-[#E9E9E1] text-[#5F5E5B] hover:text-[#2C2C2B] hover:bg-[#F9F8F7] font-medium transition-colors text-xs disabled:opacity-50"
              >
                {isUploadingImage ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImageIcon className="w-3.5 h-3.5" />}
                <span>Upload Image</span>
              </button>
            </div>
          </div>
        ) : (
          <ReactMarkdown 
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={`${className || ''} bg-[#F2F1EE] text-[#EB5757] px-1 py-0.5 rounded text-[0.9em] font-mono`} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
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
