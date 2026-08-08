import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  FolderKanban, 
  ChevronDown, 
  X, 
  TrendingUp, 
  Target, 
  Dna, 
  Database, 
  PieChart, 
  Layers,
  ExternalLink
} from 'lucide-react';

const categoryIconMap = {
  "All Projects": Layers,
  "Finance & Quant": TrendingUp,
  "Marketing Analytics": Target,
  "Bioinformatics": Dna,
  "Data Warehouse & ETL": Database,
  "Dashboards & Viz": PieChart,
};

export default function Sidebar({
  profile,
  categories,
  activeTab,
  activeCategory,
  onSelectHome,
  onSelectCategory,
  isMobileOpen,
  onCloseMobile
}) {
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#F7F7F5] border-r border-[#E9E9E7] text-[#37352F] text-xs font-sans select-none">
      {/* Workspace Profile Header */}
      <div className="p-3 border-b border-[#E9E9E7] flex items-center justify-between">
        <div className="flex items-center space-x-2 min-w-0">
          <div className="w-6 h-6 rounded bg-white border border-[#E9E9E7] flex items-center justify-center text-sm shadow-sm flex-shrink-0">
            {profile.avatarEmoji}
          </div>
          <div className="min-w-0 flex-1 transition-all duration-300 ease-out overflow-hidden max-w-full md:max-w-0 md:opacity-0 md:group-hover:max-w-full md:group-hover:opacity-100">
            <h2 className="font-semibold text-[#37352F] truncate leading-tight">
              {profile.workspaceName}
            </h2>
            <p className="text-[10px] text-[#787774] truncate">
              {profile.name}
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="md:hidden p-1 rounded hover:bg-[#EFEFEF] text-[#787774]"
          aria-label="Close sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {/* Section 1: Main Menu */}
        <div>
          <div className="px-2 pb-1 text-[10px] font-semibold text-[#9B9A97] tracking-wider uppercase transition-all duration-300 ease-out overflow-hidden max-h-full md:max-h-0 md:opacity-0 md:group-hover:max-h-full md:group-hover:opacity-100">
            Navigation
          </div>
          <button
            onClick={() => {
              onSelectHome();
              onCloseMobile();
            }}
            className={`w-full flex items-center justify-start md:justify-center md:group-hover:justify-start space-x-2 px-2.5 py-1.5 rounded-md transition-colors text-left font-medium ${
              activeTab === 'home'
                ? 'bg-[#EFEFEF] text-[#37352F] font-semibold'
                : 'text-[#37352F]/80 hover:bg-[#EFEFEF]/60'
            }`}
          >
            <Home className="w-4 h-4 text-[#787774]" />
            <span className="inline-block transition-all duration-300 ease-out overflow-hidden max-w-full md:max-w-0 md:opacity-0 md:group-hover:max-w-full md:group-hover:opacity-100 whitespace-nowrap">
              🏠 Home / About Me
            </span>
          </button>
        </div>

        {/* Section 2: Projects & Portfolio */}
        <div>
          <div className="flex items-center justify-between px-2 pb-1 text-[10px] font-semibold text-[#9B9A97] tracking-wider uppercase transition-all duration-300 ease-out overflow-hidden max-h-full md:max-h-0 md:opacity-0 md:group-hover:max-h-full md:group-hover:opacity-100">
            <span>PROJECTS & PORTFOLIO</span>
            <ChevronDown className="w-3 h-3 text-[#9B9A97]" />
          </div>

          <div className="space-y-0.5 mt-1">
            {categories.map((cat, idx) => {
              const IconComponent = categoryIconMap[cat] || FolderKanban;
              const isSelected = activeTab === 'projects' && activeCategory === cat;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectCategory(cat);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-start md:justify-center md:group-hover:justify-start px-2.5 py-1.5 rounded-md transition-colors text-left ${
                    isSelected
                      ? 'bg-[#EFEFEF] text-[#37352F] font-semibold'
                      : 'text-[#37352F]/80 hover:bg-[#EFEFEF]/60'
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <IconComponent className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-[#37352F]' : 'text-[#787774]'}`} />
                    <span className="inline-block transition-all duration-300 ease-out overflow-hidden max-w-full md:max-w-0 md:opacity-0 md:group-hover:max-w-full md:group-hover:opacity-100 whitespace-nowrap">
                      {cat}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Social & Resume Quick Links */}
        <div>
          <div className="px-2 pb-1 text-[10px] font-semibold text-[#9B9A97] tracking-wider uppercase transition-all duration-300 ease-out overflow-hidden max-h-full md:max-h-0 md:opacity-0 md:group-hover:max-h-full md:group-hover:opacity-100">
            Quick Links
          </div>
          <div className="space-y-0.5 mt-1">
            {profile.socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-start md:justify-center md:group-hover:justify-between px-2.5 py-1.5 rounded-md text-[#787774] hover:text-[#37352F] hover:bg-[#EFEFEF]/60 transition-colors"
              >
                <span className="inline-block transition-all duration-300 ease-out overflow-hidden max-w-full md:max-w-0 md:opacity-0 md:group-hover:max-w-full md:group-hover:opacity-100 whitespace-nowrap">
                  {social.platform}
                </span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            ))}
          </div>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden md:block w-16 hover:w-60 group h-screen sticky top-0 flex-shrink-0 transition-[width] duration-300 ease-out overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Sidebar with Framer Motion */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 md:hidden"
            />

            {/* Slide-out Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 bottom-0 w-72 z-50 md:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
