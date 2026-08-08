import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomeView from './components/HomeView';
import ProjectView from './components/ProjectView';

import { profileData } from './data/profileData';
import { projectCategories, allTags, projectsData } from './data/projectsData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'projects'
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleSelectHome = () => {
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryName) => {
    setActiveTab('projects');
    setActiveCategory(categoryName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#37352F] flex font-sans antialiased">
      {/* Notion Navigation Sidebar */}
      <Sidebar
        profile={profileData}
        categories={projectCategories}
        activeTab={activeTab}
        activeCategory={activeCategory}
        onSelectHome={handleSelectHome}
        onSelectCategory={handleSelectCategory}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Header with Cover & Breadcrumbs */}
        <Header
          profile={profileData}
          activeTab={activeTab}
          currentCategoryTitle={activeCategory}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Dynamic Tab View Container */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-6 sm:px-10 mt-6">
          <AnimatePresence mode="wait">
            {activeTab === 'home' ? (
              <HomeView
                key="home-tab"
                profile={profileData}
                onExploreProjects={() => handleSelectCategory('All Projects')}
              />
            ) : (
              <ProjectView
                key={`project-${activeCategory}`}
                projects={projectsData}
                availableTags={allTags}
                currentCategoryTitle={activeCategory}
              />
            )}
          </AnimatePresence>
        </main>

        {/* Notion Footer */}
        <footer className="border-t border-[#E9E9E7] bg-[#F7F7F5] py-6 px-6 sm:px-10 text-center text-xs text-[#787774] mt-auto">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              © {new Date().getFullYear()} <span className="font-semibold text-[#37352F]">{profileData.name}</span>. Built with React.js, Vite & Tailwind CSS.
            </p>
            <p className="flex items-center space-x-1">
              <span>Hosted on</span>
              <a
                href="https://pages.github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#37352F] underline underline-offset-2 hover:text-black"
              >
                GitHub Pages
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
