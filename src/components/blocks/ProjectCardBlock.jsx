import React from 'react';
import NotionCard from '../NotionCard';

export default function ProjectCardBlock({ content, isEditing, onEditProperties, onOpenDetail }) {
  const { projectData } = content || {};

  return (
    <div className="relative my-2 group">
      <NotionCard project={projectData || {}} onClick={onOpenDetail} />
      {isEditing && (
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
          <button
            onClick={() => onEditProperties?.(projectData)}
            className="bg-white border border-[#E9E9E1] text-[#2C2C2B] shadow-sm px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#F9F8F7] transition-colors"
          >
            Edit Properties
          </button>
        </div>
      )}
    </div>
  );
}
