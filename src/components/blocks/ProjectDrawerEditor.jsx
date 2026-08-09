import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Tag, Folder, Github, ExternalLink, Image, Calendar, Sparkles, FileText, Upload, Loader2 } from 'lucide-react';
import NotionTag from '../NotionTag';

const defaultCategories = [
  "Finance & Quant",
  "Marketing Analytics",
  "Bioinformatics",
  "AI Product"
];

const availableBadgeColors = ['blue', 'purple', 'green', 'orange', 'yellow', 'red', 'pink', 'brown', 'gray'];

export default function ProjectDrawerEditor({ project, onSave, onClose }) {
  const [formData, setFormData] = useState({
    id: project?.id || `project-${Date.now()}`,
    title: project?.title || '',
    subtitle: project?.subtitle || '',
    category: project?.category || 'Finance & Quant',
    coverImage: project?.coverImage || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    description: project?.description || '',
    tags: project?.tags ? [...project.tags] : [{ name: 'Python', color: 'blue' }],
    githubUrl: project?.githubUrl || '',
    demoUrl: project?.demoUrl || '',
    paperUrl: project?.paperUrl || '',
    date: project?.date || '2024',
    pdfUrl: project?.pdfUrl || ''
  });

  const [isUploading, setIsUploading] = useState(false);

  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('blue');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (!newTagName.trim()) return;
    if (formData.tags.some(t => t.name.toLowerCase() === newTagName.trim().toLowerCase())) return;
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, { name: newTagName.trim(), color: newTagColor }]
    }));
    setNewTagName('');
  };

  const handleRemoveTag = (tagName) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t.name !== tagName)
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed');
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result;
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        
        const res = await fetch('/api/upload-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename, base64 })
        });
        
        const data = await res.json();
        if (data.success) {
          handleChange('pdfUrl', data.pdfUrl);
        } else {
          alert('Upload failed: ' + data.error);
        }
        setIsUploading(false);
      };
      reader.onerror = () => {
        alert('Failed to read file');
        setIsUploading(false);
      };
    } catch (err) {
      alert('Upload error: ' + err.message);
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50"
      />

      {/* Side Drawer Panel */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        className="fixed top-0 right-0 bottom-0 w-full sm:w-[500px] bg-white border-l border-[#E9E9E1] z-50 shadow-2xl flex flex-col font-sans text-xs text-[#2C2C2B] overflow-hidden"
      >
        {/* Top Action Bar */}
        <div className="p-3 bg-[#F9F8F7] border-b border-[#E9E9E1] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#2383E2]" />
            <span className="font-semibold text-xs text-[#2C2C2B]">Project Property Drawer</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSubmit}
              className="px-3 py-1 rounded bg-[#37352F] text-white hover:bg-black font-semibold flex items-center space-x-1 shadow-xs transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Done</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-[#2C2C2B]/10 text-[#8E8B86]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cover Image Preview Header */}
        <div className="relative h-36 w-full bg-[#F9F8F7] overflow-hidden border-b border-[#E9E9E1]">
          <img
            src={formData.coverImage}
            alt="Cover Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-4 text-2xl p-1.5 rounded-lg bg-white shadow-md border border-[#E9E9E1]">
            📊
          </div>
        </div>

        {/* Property Fields Scroll Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-[11px] font-semibold uppercase text-[#8E8B86] mb-1">Project Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full text-base font-bold text-[#2C2C2B] bg-transparent border-b border-[#E9E9E1] pb-1 focus:outline-none focus:border-[#2383E2]"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-[11px] font-semibold uppercase text-[#8E8B86] mb-1">Subtitle / Summary</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-[#E9E9E1] rounded bg-[rgba(242,241,238,0.6)] focus:outline-none focus:ring-1 focus:ring-[#2383E2]"
            />
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#8E8B86] mb-1 flex items-center">
                <Folder className="w-3 h-3 mr-1 text-[#2383E2]" /> Domain Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-[#E9E9E1] rounded bg-white font-medium"
              >
                {defaultCategories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#8E8B86] mb-1 flex items-center">
                <Calendar className="w-3 h-3 mr-1" /> Year / Date
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-[#E9E9E1] rounded bg-white"
              />
            </div>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-[11px] font-semibold uppercase text-[#8E8B86] mb-1 flex items-center">
              <Image className="w-3 h-3 mr-1" /> Cover Image URL
            </label>
            <input
              type="url"
              value={formData.coverImage}
              onChange={(e) => handleChange('coverImage', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-[#E9E9E1] rounded bg-white"
            />
          </div>



          {/* PDF Upload */}
          <div>
            <label className="block text-[11px] font-semibold uppercase text-[#8E8B86] mb-1 flex items-center">
              <FileText className="w-3 h-3 mr-1 text-[#2383E2]" /> Document (PDF)
            </label>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Or paste a PDF URL here..."
                value={formData.pdfUrl}
                onChange={(e) => handleChange('pdfUrl', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-[#E9E9E1] rounded bg-white text-xs"
              />
              <div className="relative">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
                <div className={`w-full flex items-center justify-center space-x-2 px-3 py-2 border border-dashed rounded-md text-xs font-medium transition-colors ${isUploading ? 'bg-[#F2F1EE] border-[#E9E9E1] text-[#8E8B86]' : 'bg-[#F9F8F7] border-[#E9E9E1] text-[#2C2C2B] hover:bg-[#F2F1EE] hover:border-[#8E8B86]'}`}>
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading PDF...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Select PDF to Upload</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tech Tags Manager */}
          <div>
            <label className="block text-[11px] font-semibold uppercase text-[#8E8B86] mb-1 flex items-center">
              <Tag className="w-3 h-3 mr-1 text-[#2383E2]" /> Notion Tech Tags
            </label>
            <div className="flex flex-wrap gap-1.5 p-2 bg-[#F9F8F7] border border-[#E9E9E1] rounded mb-2">
              {formData.tags.map((tag, idx) => (
                <div key={idx} className="inline-flex items-center space-x-1">
                  <NotionTag name={tag.name} color={tag.color} />
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag.name)}
                    className="text-[#8E8B86] hover:text-red-600 ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="New tag..."
                className="flex-1 px-2.5 py-1 border border-[#E9E9E1] rounded bg-white"
              />
              <select
                value={newTagColor}
                onChange={(e) => setNewTagColor(e.target.value)}
                className="px-2 py-1 border border-[#E9E9E1] rounded bg-white"
              >
                {availableBadgeColors.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1 rounded bg-[#2C2C2B] text-white font-medium hover:bg-black"
              >
                Add
              </button>
            </div>
          </div>

          {/* External Links */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#E9E9E1]">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#8E8B86] mb-1 flex items-center">
                <Github className="w-3 h-3 mr-1" /> GitHub
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => handleChange('githubUrl', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-[#E9E9E1] rounded bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#8E8B86] mb-1 flex items-center">
                <ExternalLink className="w-3 h-3 mr-1 text-[#2383E2]" /> Demo
              </label>
              <input
                type="url"
                value={formData.demoUrl}
                onChange={(e) => handleChange('demoUrl', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-[#E9E9E1] rounded bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#8E8B86] mb-1 flex items-center">
                <FileText className="w-3 h-3 mr-1 text-[#2383E2]" /> Paper
              </label>
              <input
                type="url"
                value={formData.paperUrl}
                onChange={(e) => handleChange('paperUrl', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-[#E9E9E1] rounded bg-white"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-3 bg-[#F9F8F7] border-t border-[#E9E9E1] flex justify-end">
          <button
            onClick={handleSubmit}
            className="w-full py-2 rounded bg-[#37352F] text-white hover:bg-black font-semibold flex items-center justify-center space-x-1.5 shadow-xs"
          >
            <Check className="w-4 h-4" />
            <span>Save Property Changes</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}
