import React from 'react';
import { Search, X, Tag, LayoutGrid, ListFilter, SlidersHorizontal } from 'lucide-react';
import NotionTag from './NotionTag';

export default function FilterBar({ 
  searchQuery, 
  onSearchChange, 
  selectedTag, 
  onTagSelect, 
  availableTags,
  viewMode = 'gallery',
  onViewModeChange
}) {
  return (
    <div className="mb-6 space-y-3">
      {/* Top Search & Notion Database View Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8B86]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects by title, description, or technology tag..."
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-[rgba(242,241,238,0.6)] border border-[#E9E9E1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2383E2] text-[#2C2C2B] placeholder-[#8E8B86] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E8B86] hover:text-[#2C2C2B]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Mode & Filter Controls */}
        <div className="flex items-center space-x-2">
          {/* Gallery View vs List View Toggle */}
          <div className="flex items-center bg-[#F9F8F7] border border-[#E9E9E1] rounded-md p-0.5 text-xs">
            <button
              onClick={() => onViewModeChange && onViewModeChange('gallery')}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors font-medium ${
                viewMode === 'gallery'
                  ? 'bg-white text-[#2C2C2B] shadow-xs'
                  : 'text-[#8E8B86] hover:text-[#2C2C2B]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gallery</span>
            </button>
            <button
              onClick={() => onViewModeChange && onViewModeChange('table')}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors font-medium ${
                viewMode === 'table'
                  ? 'bg-white text-[#2C2C2B] shadow-xs'
                  : 'text-[#8E8B86] hover:text-[#2C2C2B]'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table View</span>
            </button>
          </div>

          {/* Reset Filters */}
          {(selectedTag || searchQuery) && (
            <button
              onClick={() => {
                onSearchChange('');
                onTagSelect(null);
              }}
              className="inline-flex items-center justify-center space-x-1 px-2.5 py-1 rounded text-xs bg-[#F2F1EE] text-[#8E8B86] hover:text-[#2C2C2B] hover:bg-[#E9E9E1] transition-colors border border-[#E9E9E1]"
            >
              <X className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>


    </div>
  );
}
