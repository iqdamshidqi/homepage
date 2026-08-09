import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  FolderKanban, 
  X, 
  TrendingUp, 
  Target, 
  Dna, 
  Layers,
  ExternalLink,
  ChevronRight,
  Eye,
  Bot,
  Github,
  Linkedin,
  Mail,
  Award,
  AtSign
} from 'lucide-react';

const categoryIconMap = {
  "All Projects": Layers,
  "Finance & Quant": TrendingUp,
  "Marketing Analytics": Target,
  "Bioinformatics": Dna,
  "AI Product": Bot,
};

const socialIconMap = {
  Github: Github,
  Linkedin: Linkedin,
  Mail: Mail,
  Award: Award,
  AtSign: AtSign
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
    <div className="flex flex-col h-full bg-[#F9F8F7] border-r border-[#E9E9E1] text-[#2C2C2B] text-xs font-sans select-none">
      {/* Notion Kit Workspace Switcher Header */}
      <div className="p-3 border-b border-[#E9E9E1]">
        <div className="flex items-center justify-between p-1.5 rounded-md hover:bg-[#2C2C2B]/5 transition-colors cursor-pointer group">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-7 h-7 rounded-md bg-white border border-[#E9E9E1] flex items-center justify-center text-sm shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
              <img src="https://github.com/iqdamshidqi.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-xs text-[#2C2C2B] truncate leading-tight flex items-center space-x-1">
                <span>{profile.workspaceName}</span>
              </h2>
              <p className="text-[10px] text-[#8E8B86] truncate">
                {profile.title} · Data Science
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1 rounded hover:bg-[#2C2C2B]/10 text-[#8E8B86]"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {/* Section 1: Navigation */}
        <div>
          <div className="px-2 pb-1 text-[10px] font-semibold text-[#8E8B86] tracking-wider uppercase flex items-center justify-between">
            <span>Navigation</span>
          </div>
          <button
            onClick={() => {
              onSelectHome();
              onCloseMobile();
            }}
            className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-md transition-all text-left font-medium ${
              activeTab === 'home'
                ? 'bg-[#2C2C2B]/10 text-[#2C2C2B] font-semibold shadow-xs'
                : 'text-[#5F5E5B] hover:bg-[#2C2C2B]/5 hover:text-[#2C2C2B]'
            }`}
          >
            <Home className={`w-4 h-4 ${activeTab === 'home' ? 'text-[#2C2C2B]' : 'text-[#8E8B86]'}`} />
            <span>Bio & Overview</span>
          </button>
        </div>

        {/* Section 2: Projects & Portfolio */}
        <div>
          <div className="px-2 pb-1 text-[10px] font-semibold text-[#8E8B86] tracking-wider uppercase">
            <span>PROJECTS & PORTFOLIO</span>
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
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all text-left ${
                    isSelected
                      ? 'bg-[#2C2C2B]/10 text-[#2C2C2B] font-semibold shadow-xs'
                      : 'text-[#5F5E5B] hover:bg-[#2C2C2B]/5 hover:text-[#2C2C2B]'
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <IconComponent className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-[#2383E2]' : 'text-[#8E8B86]'}`} />
                    <span className="truncate">{cat}</span>
                  </div>
                  {isSelected && (
                    <ChevronRight className="w-3 h-3 text-[#2383E2]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: External Links */}
        <div>
          <div className="px-2 pb-1 text-[10px] font-semibold text-[#8E8B86] tracking-wider uppercase">
            Quick Links
          </div>
          <div className="space-y-0.5 mt-1">
            {profile.socials.map((social, idx) => {
              const Icon = socialIconMap[social.icon] || ExternalLink;
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center px-2.5 py-1.5 rounded-md text-[#8E8B86] hover:text-[#2C2C2B] hover:bg-[#2C2C2B]/5 transition-colors"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="flex-1 text-left">{social.platform}</span>
                  <ExternalLink className="w-3 h-3 opacity-60 ml-2 flex-shrink-0" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden md:block w-60 h-screen sticky top-0 flex-shrink-0">
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
