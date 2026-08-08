import React from 'react';

const tagColorMap = {
  gray: 'bg-[#F1F1EF] text-[#37352F] border-[#E1E1DE]',
  brown: 'bg-[#F4EEEE] text-[#603B2C] border-[#E8DCD8]',
  orange: 'bg-[#FBECDD] text-[#854C1D] border-[#F5D8BA]',
  yellow: 'bg-[#FBF3DB] text-[#89632A] border-[#F5E5B8]',
  green: 'bg-[#EDF3EC] text-[#2B593F] border-[#D4E3D2]',
  blue: 'bg-[#E7F3F8] text-[#28456C] border-[#CBE3F0]',
  purple: 'bg-[#F4F0F7] text-[#492970] border-[#E3D9EC]',
  pink: 'bg-[#F9F0F5] text-[#69314C] border-[#F2D7E6]',
  red: 'bg-[#FDEBEC] text-[#6E2929] border-[#F7C5C7]',
};

export default function NotionTag({ name, color = 'gray', className = '', onClick = null, active = false }) {
  const colorStyle = tagColorMap[color.toLowerCase()] || tagColorMap.gray;
  
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium transition-all border ${colorStyle} ${
        onClick ? 'cursor-pointer hover:opacity-80' : ''
      } ${active ? 'ring-2 ring-[#37352F]/20 font-semibold' : ''} ${className}`}
    >
      <span className="opacity-60 mr-1">#</span>
      {name}
    </span>
  );
}
