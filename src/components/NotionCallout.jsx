import React from 'react';

export default function NotionCallout({ emoji = '💡', title, description, children, className = '' }) {
  return (
    <div className={`flex items-start p-4 rounded-md bg-[#F1F1EF] border border-[#E9E9E7] text-[#37352F] ${className}`}>
      <div className="text-xl mr-3 select-none leading-none pt-0.5">{emoji}</div>
      <div className="flex-1 min-w-0 text-sm leading-relaxed">
        {title && <h4 className="font-semibold text-[#37352F] mb-1">{title}</h4>}
        {description && <p className="text-[#37352F]/90">{description}</p>}
        {children}
      </div>
    </div>
  );
}
