import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { arrayMove } from '@dnd-kit/sortable';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomeView from './components/HomeView';
import ProjectView from './components/ProjectView';
import ProjectDetailView from './components/ProjectDetailView';
import ProjectDrawerEditor from './components/blocks/ProjectDrawerEditor';
import { Plus } from 'lucide-react';
import SlashMenuPopover from './components/blocks/SlashMenuPopover';

import { pagesData } from './data/pagesData';

export default function App() {
  // === Core Page State (blocks-based, single source of truth) ===
  const [homeBlocks, setHomeBlocks] = useState(() => {
    const saved = localStorage.getItem('notion_home_blocks');
    return saved ? JSON.parse(saved) : pagesData.home.blocks;
  });

  const [projectBlocks, setProjectBlocks] = useState(() => {
    const saved = localStorage.getItem('notion_project_blocks');
    return saved ? JSON.parse(saved) : pagesData.projects.blocks;
  });

  // Page-level metadata
  const [pageMeta] = useState({
    home: {
      title: pagesData.home.title,
      subtitle: pagesData.home.subtitle,
      emoji: pagesData.home.emoji,
      coverImage: pagesData.home.coverImage,
      workspaceName: pagesData.home.workspaceName,
      status: pagesData.home.status,
      socials: pagesData.home.socials,
    },
    projects: {
      title: pagesData.projects.title,
      subtitle: pagesData.projects.subtitle,
      emoji: pagesData.projects.emoji,
      coverImage: pagesData.projects.coverImage,
      categories: pagesData.projects.categories,
      allTags: pagesData.projects.allTags,
    }
  });

  // === Navigation State ===
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'projects'
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [activeProjectDetail, setActiveProjectDetail] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // === Editor State (DEV only) ===
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [editingProjectBlockId, setEditingProjectBlockId] = useState(null);
  const [editingProjectData, setEditingProjectData] = useState(null);
  const [showBottomSlashMenu, setShowBottomSlashMenu] = useState(false);

  // === Auto-backup to localStorage ===
  useEffect(() => {
    localStorage.setItem('notion_home_blocks', JSON.stringify(homeBlocks));
  }, [homeBlocks]);

  useEffect(() => {
    localStorage.setItem('notion_project_blocks', JSON.stringify(projectBlocks));
  }, [projectBlocks]);

  // === Helpers ===
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  }, []);

  // Get active blocks for the current tab
  const getActiveBlocks = () => activeTab === 'home' ? homeBlocks : projectBlocks;
  const setActiveBlocks = (updater) => {
    if (activeTab === 'home') {
      setHomeBlocks(updater);
    } else {
      setProjectBlocks(updater);
    }
  };

  // === Block CRUD Operations ===
  const handleUpdateBlockContent = useCallback((blockId, newContent) => {
    const updater = (prev) => prev.map(b => b.id === blockId ? { ...b, content: newContent } : b);
    // Update both pages since we don't know which page the block belongs to
    setHomeBlocks(prev => prev.map(b => b.id === blockId ? { ...b, content: newContent } : b));
    setProjectBlocks(prev => prev.map(b => b.id === blockId ? { ...b, content: newContent } : b));
  }, []);

  const createNewBlock = (type) => {
    const id = `block-${Date.now()}`;
    switch (type) {
      case 'heading1':
        return { id, type: 'heading1', content: { text: 'Heading 1' } };
      case 'heading2':
        return { id, type: 'heading2', content: { text: 'Heading 2', icon: '' } };
      case 'heading3':
        return { id, type: 'heading3', content: { text: 'Heading 3' } };
      case 'paragraph':
        return { id, type: 'paragraph', content: { text: 'New paragraph...' } };
      case 'callout':
        return { id, type: 'callout', content: { emoji: '💡', title: 'Callout', description: 'Important note...' } };
      case 'projectCard':
        return {
          id, type: 'projectCard',
          content: {
            projectData: {
              id: `project-${Date.now()}`,
              title: 'New Project',
              subtitle: 'Short project summary',
              category: 'Finance & Quant',
              coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
              description: 'Project description...',
              tags: [{ name: 'Python', color: 'blue' }],
              githubUrl: '', demoUrl: null, date: '2024'
            }
          }
        };
      case 'skillGroup':
        return {
          id, type: 'skillGroup',
          content: {
            skillData: {
              groupTitle: 'New Skill Group',
              skills: [{ name: 'React', color: 'blue' }]
            }
          }
        };
      case 'specializationGrid':
        return {
          id, type: 'specializationGrid',
          content: {
            cards: [
              { title: 'New Domain', emoji: '🎯', description: 'Domain description...' }
            ]
          }
        };
      case 'socialLinks':
        return {
          id, type: 'socialLinks',
          content: { title: 'Connect', description: 'Find me online.', ctaLabel: 'Explore' }
        };
      case 'divider':
      default:
        return { id, type: 'divider', content: {} };
    }
  };

  const handleAddBlockBelow = useCallback((targetId, type) => {
    const newBlock = createNewBlock(type);
    setActiveBlocks(prev => {
      const idx = prev.findIndex(b => b.id === targetId);
      if (idx === -1) return [...prev, newBlock];
      const updated = [...prev];
      updated.splice(idx + 1, 0, newBlock);
      return updated;
    });
  }, [activeTab]);

  const handleAddBlockAtBottom = useCallback((type) => {
    const newBlock = createNewBlock(type);
    setActiveBlocks(prev => [...prev, newBlock]);
    setShowBottomSlashMenu(false);
  }, [activeTab]);

  const handleDuplicateBlock = useCallback((blockId) => {
    setActiveBlocks(prev => {
      const idx = prev.findIndex(b => b.id === blockId);
      if (idx === -1) return prev;
      const copy = JSON.parse(JSON.stringify(prev[idx]));
      copy.id = `block-${Date.now()}`;
      const updated = [...prev];
      updated.splice(idx + 1, 0, copy);
      return updated;
    });
  }, [activeTab]);

  const handleDeleteBlock = useCallback((blockId) => {
    setActiveBlocks(prev => prev.filter(b => b.id !== blockId));
  }, [activeTab]);

  const handleMoveUp = useCallback((blockId) => {
    setActiveBlocks(prev => {
      const idx = prev.findIndex(b => b.id === blockId);
      if (idx <= 0) return prev;
      return arrayMove(prev, idx, idx - 1);
    });
  }, [activeTab]);

  const handleMoveDown = useCallback((blockId) => {
    setActiveBlocks(prev => {
      const idx = prev.findIndex(b => b.id === blockId);
      if (idx === -1 || idx >= prev.length - 1) return prev;
      return arrayMove(prev, idx, idx + 1);
    });
  }, [activeTab]);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setActiveBlocks(prev => {
        const oldIndex = prev.findIndex(b => b.id === active.id);
        const newIndex = prev.findIndex(b => b.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }, [activeTab]);

  // === Project Drawer Editor ===
  const handleEditProjectProperties = useCallback((blockId, projectData) => {
    setEditingProjectBlockId(blockId);
    setEditingProjectData(projectData);
  }, []);

  const handleSaveProjectDrawer = useCallback((updatedProjectData) => {
    // Update in both block sets (the blockId will only match one)
    const updater = (prev) => prev.map(b =>
      b.id === editingProjectBlockId
        ? { ...b, content: { ...b.content, projectData: updatedProjectData } }
        : b
    );
    setHomeBlocks(updater);
    setProjectBlocks(updater);
    setEditingProjectBlockId(null);
    setEditingProjectData(null);
    showToast('✅ Project properties saved!');
  }, [editingProjectBlockId, showToast]);

  const handleUpdateProjectDetail = useCallback((updatedProject) => {
    setActiveProjectDetail(updatedProject);
    const updater = (prev) => prev.map(b => 
      b.type === 'projectCard' && b.content?.projectData?.id === updatedProject.id
        ? { ...b, content: { ...b.content, projectData: updatedProject } }
        : b
    );
    setHomeBlocks(updater);
    setProjectBlocks(updater);
  }, []);

  // === Save / Export / Discard ===
  const handleSaveToDisk = async () => {
    setIsSaving(true);
    try {
      const fullData = {
        ...pagesData,
        home: { ...pagesData.home, blocks: homeBlocks },
        projects: { ...pagesData.projects, blocks: projectBlocks }
      };

      const response = await fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'pages', data: fullData })
      });
      const result = await response.json();
      if (result.success) {
        showToast('🚀 All changes saved to pagesData.js!');
      } else {
        showToast('❌ Save failed: ' + result.error);
      }
    } catch (err) {
      console.error('Save error:', err);
      showToast('❌ Error: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportJSON = () => {
    const exportData = {
      home: { ...pagesData.home, blocks: homeBlocks },
      projects: { ...pagesData.projects, blocks: projectBlocks }
    };
    const jsonStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-pages-data.json';
    link.click();
    URL.revokeObjectURL(url);
    showToast('📥 JSON exported successfully!');
  };

  const handleDiscardChanges = () => {
    setHomeBlocks(pagesData.home.blocks);
    setProjectBlocks(pagesData.projects.blocks);
    localStorage.removeItem('notion_home_blocks');
    localStorage.removeItem('notion_project_blocks');
    showToast('🔄 Changes discarded — reverted to last saved state.');
  };

  // === Navigation ===
  const handleSelectHome = () => {
    setActiveTab('home');
    setActiveProjectDetail(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryName) => {
    setActiveTab('projects');
    setActiveCategory(categoryName);
    setActiveProjectDetail(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProjectDetail = (project) => {
    setActiveProjectDetail(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Build profile object for header/sidebar
  const profileForHeader = {
    ...pageMeta.home,
    name: pageMeta.home.title,
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#2C2C2B] flex font-sans antialiased">
      {/* Sidebar */}
      <Sidebar
        profile={profileForHeader}
        categories={pageMeta.projects.categories}
        activeTab={activeTab}
        activeCategory={activeCategory}
        onSelectHome={handleSelectHome}
        onSelectCategory={handleSelectCategory}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        isEditing={isEditing}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header with Editor Toggle */}
        <Header
          profile={profileForHeader}
          activeTab={activeTab}
          currentCategoryTitle={activeCategory}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          isEditing={isEditing}
          onToggleEditing={() => setIsEditing(!isEditing)}
          isSaving={isSaving}
          onSaveToDisk={handleSaveToDisk}
          onExportJSON={handleExportJSON}
          onDiscardChanges={handleDiscardChanges}
          toastMessage={toastMessage}
          onDismissToast={() => setToastMessage(null)}
        />

        {/* Page Content */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-6 sm:px-10 mt-6">
          <AnimatePresence mode="wait">
            {activeProjectDetail ? (
              <ProjectDetailView
                key={`detail-${activeProjectDetail.id}`}
                project={activeProjectDetail}
                onBack={() => setActiveProjectDetail(null)}
                isEditing={isEditing}
                onUpdateProject={handleUpdateProjectDetail}
              />
            ) : activeTab === 'home' ? (
              <HomeView
                key="home-tab"
                blocks={homeBlocks}
                isEditing={isEditing}
                socials={pageMeta.home.socials}
                onExploreProjects={() => handleSelectCategory('All Projects')}
                onUpdateBlockContent={handleUpdateBlockContent}
                onAddBlockBelow={handleAddBlockBelow}
                onDuplicateBlock={handleDuplicateBlock}
                onDeleteBlock={handleDeleteBlock}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                onEditProjectProperties={handleEditProjectProperties}
                onOpenDetail={handleOpenProjectDetail}
                onDragEnd={handleDragEnd}
              />
            ) : (
              <ProjectView
                key={`project-${activeCategory}`}
                blocks={projectBlocks}
                availableTags={pageMeta.projects.allTags}
                currentCategoryTitle={activeCategory}
                isEditing={isEditing}
                onUpdateBlockContent={handleUpdateBlockContent}
                onAddBlockBelow={handleAddBlockBelow}
                onDuplicateBlock={handleDuplicateBlock}
                onDeleteBlock={handleDeleteBlock}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                onEditProjectProperties={handleEditProjectProperties}
                onOpenDetail={handleOpenProjectDetail}
                onDragEnd={handleDragEnd}
              />
            )}
          </AnimatePresence>

          {/* Bottom "Add Block" — Editor mode only (hidden in detail view) */}
          {isEditing && !activeProjectDetail && (
            <div className="pt-6 pb-8 border-t border-[#E9E9E1] text-center relative">
              <button
                onClick={() => setShowBottomSlashMenu(!showBottomSlashMenu)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-md bg-[#F9F8F7] hover:bg-[#F2F1EE] border border-[#E9E9E1] text-xs font-medium text-[#8E8B86] hover:text-[#2C2C2B] transition-colors"
              >
                <Plus className="w-4 h-4 text-[#2383E2]" />
                <span>Click to add block or press '/' in any text</span>
              </button>
              {showBottomSlashMenu && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50">
                  <SlashMenuPopover
                    onSelectBlock={handleAddBlockAtBottom}
                    onClose={() => setShowBottomSlashMenu(false)}
                  />
                </div>
              )}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-[#E9E9E1] bg-[#F9F8F7] py-6 px-6 sm:px-10 text-center text-xs text-[#8E8B86] mt-auto">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              © {new Date().getFullYear()} <span className="font-semibold text-[#2C2C2B]">{pageMeta.home.title}</span>. Built with React.js & Vite.
            </p>
            <p className="flex items-center space-x-2">
              <span>Hosted on</span>
              <a
                href="https://pages.github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#2C2C2B] underline underline-offset-2 hover:text-black"
              >
                GitHub Pages
              </a>
            </p>
          </div>
        </footer>
      </div>

      {/* Project Property Side Drawer (editor mode) */}
      {editingProjectBlockId && editingProjectData && (
        <ProjectDrawerEditor
          project={editingProjectData}
          onSave={handleSaveProjectDrawer}
          onClose={() => {
            setEditingProjectBlockId(null);
            setEditingProjectData(null);
          }}
        />
      )}
    </div>
  );
}
