import React from 'react';
import { Search, X, Tag } from 'lucide-react';
import NotionTag from './NotionTag';

export default function FilterBar({ 
  searchQuery, 
  onSearchChange, 
  selectedTag, 
  onTagSelect, 
  availableTags 
}) {
  return (
    <div className="mb-6 space-y-3">
      {/* Top Search Bar & Active Filter indicators */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9B9A97]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari project berdasarkan nama, deskripsi, atau teknologi..."
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-white border border-[#E9E9E7] rounded-md focus:outline-none focus:ring-1 focus:ring-[#37352F] text-[#37352F] placeholder-[#9B9A97]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9B9A97] hover:text-[#37352F]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Clear Filters indicator */}
        {(selectedTag || searchQuery) && (
          <button
            onClick={() => {
              onSearchChange('');
              onTagSelect(null);
            }}
            className="inline-flex items-center justify-center space-x-1 px-2.5 py-1.5 rounded text-xs bg-[#F1F1EF] text-[#787774] hover:text-[#37352F] hover:bg-[#EFEFEF] transition-colors border border-[#E9E9E7]"
          >
            <X className="w-3 h-3" />
            <span>Reset Filter</span>
          </button>
        )}
      </div>

      {/* Technology Tag Pills list */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="flex items-center text-[#787774] font-medium flex-shrink-0 mr-1">
          <Tag className="w-3 h-3 mr-1" />
          Filter Tag:
        </span>
        <button
          onClick={() => onTagSelect(null)}
          className={`px-2.5 py-0.5 rounded transition-colors flex-shrink-0 font-medium ${
            selectedTag === null
              ? 'bg-[#37352F] text-white'
              : 'bg-[#F1F1EF] text-[#787774] hover:bg-[#EFEFEF]'
          }`}
        >
          Semua
        </button>
        {availableTags.map((tagName, idx) => (
          <NotionTag
            key={idx}
            name={tagName}
            color="gray"
            active={selectedTag === tagName}
            onClick={() => onTagSelect(selectedTag === tagName ? null : tagName)}
          />
        ))}
      </div>
    </div>
  );
}
