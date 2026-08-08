import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, ChevronRight, Share2, MoreHorizontal,
  Eye, Pencil, Save, Download, RotateCcw,
  ShieldCheck, CheckCircle2
} from 'lucide-react';

const categoryEmojiMap = {
  "All Projects": "📊",
  "Finance & Quant": "📈",
  "Marketing Analytics": "🎯",
  "Bioinformatics": "🧬",
  "Data Warehouse & ETL": "🏗️",
  "Dashboards & Viz": "📊",
};

export default function Header({ 
  profile, 
  activeTab, 
  onToggleMobileSidebar,
  currentCategoryTitle,
  isEditing,
  onToggleEditing,
  isSaving,
  onSaveToDisk,
  onExportJSON,
  onDiscardChanges,
  toastMessage,
  onDismissToast
}) {
  return (
    <header className="relative w-full">
      {/* Top Breadcrumb Nav Bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-2.5 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#E9E9E7] text-xs text-[#787774]">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {/* Mobile Menu Button */}
          <button
            onClick={onToggleMobileSidebar}
            className="p-1.5 rounded hover:bg-[#EFEFEF] text-[#37352F] md:hidden"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>

          <span className="flex items-center space-x-1 hover:text-[#37352F] cursor-pointer">
            <span>{profile.emoji}</span>
            <span className="font-medium text-[#37352F]">{profile.workspaceName}</span>
          </span>

          <ChevronRight className="w-3.5 h-3.5 text-[#9B9A97] flex-shrink-0" />

          <span className="hover:text-[#37352F] cursor-pointer truncate">
            {activeTab === 'home' ? 'Home' : 'Projects'}
          </span>

          {activeTab !== 'home' && currentCategoryTitle && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#9B9A97] flex-shrink-0" />
              <span className="font-semibold text-[#37352F] truncate">
                {currentCategoryTitle}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* DEV-only Editor Toggle & Toolbar */}
          {import.meta.env.DEV && (
            <>
              {/* Editor Mode Toolbar — shown when editing */}
              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center space-x-1.5"
                  >
                    {/* Discard */}
                    <button
                      onClick={onDiscardChanges}
                      className="inline-flex items-center space-x-1 px-2 py-1 rounded text-[11px] text-[#8E8B86] hover:text-[#2C2C2B] hover:bg-[#F2F1EE] border border-[#E9E9E1] font-medium transition-colors"
                      title="Discard unsaved changes"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span className="hidden sm:inline">Discard</span>
                    </button>

                    {/* Export JSON */}
                    <button
                      onClick={onExportJSON}
                      className="inline-flex items-center space-x-1 px-2 py-1 rounded text-[11px] text-[#8E8B86] hover:text-[#2C2C2B] hover:bg-[#F2F1EE] border border-[#E9E9E1] font-medium transition-colors"
                      title="Export blocks as JSON"
                    >
                      <Download className="w-3 h-3" />
                      <span className="hidden sm:inline">Export</span>
                    </button>

                    {/* Save to Disk */}
                    <button
                      onClick={onSaveToDisk}
                      disabled={isSaving}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-[11px] bg-[#2383E2] hover:bg-[#0077D4] text-white font-semibold transition-colors shadow-xs disabled:opacity-50"
                      title="Save changes to disk (pagesData.js)"
                    >
                      <Save className="w-3 h-3" />
                      <span>{isSaving ? 'Saving...' : 'Save'}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toggle Switch: Viewing ↔ Editing */}
              <button
                onClick={onToggleEditing}
                className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded text-[11px] font-semibold transition-all duration-200 shadow-xs border ${
                  isEditing
                    ? 'bg-[#2C2C2B] text-white border-[#2C2C2B] hover:bg-black'
                    : 'bg-white text-[#37352F] border-[#E9E9E1] hover:bg-[#F2F1EE]'
                }`}
                title={isEditing ? 'Switch to Viewer Mode' : 'Switch to Editor Mode'}
              >
                {isEditing ? (
                  <>
                    <Pencil className="w-3 h-3 text-amber-400" />
                    <span>Editing</span>
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3 text-[#8E8B86]" />
                    <span>Viewing</span>
                  </>
                )}
              </button>
            </>
          )}


        </div>
      </div>

      {/* Toast Notification — shown below the header bar */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="px-6 py-2 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-800 flex items-center justify-between"
          >
            <span className="font-medium flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{toastMessage}</span>
            </span>
            <button onClick={onDismissToast} className="font-bold hover:underline text-emerald-700">
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notion Cover Image Banner */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-200">
        <img
          src={profile.coverImage}
          alt="Page Cover"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Page Title Header Block */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 relative pb-6">
        {/* Large Profile/Category Icon */}
        <div className="relative -mt-10 sm:-mt-12 mb-4 inline-block">
          {activeTab === 'home' ? (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-notion hover:scale-105 transition-transform duration-200 cursor-pointer overflow-hidden">
              <img src="https://github.com/iqdamshidqi.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer drop-shadow-md">
              <span className="text-6xl sm:text-7xl">
                {categoryEmojiMap[currentCategoryTitle] || categoryEmojiMap["All Projects"]}
              </span>
            </div>
          )}
        </div>

        {/* Title & Subtitle */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#37352F] tracking-tight">
            {activeTab === 'home' ? profile.title : currentCategoryTitle || 'Data Science Projects'}
          </h1>
          <p className="text-sm sm:text-base text-[#787774] mt-1 font-normal">
            {activeTab === 'home' 
              ? profile.subtitle
              : `Portofolio & Eksperimen Data Science — ${currentCategoryTitle || 'All Domains'}`}
          </p>
        </div>
      </div>
    </header>
  );
}
