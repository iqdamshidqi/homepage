import React from 'react';
import { 
  Heading1, 
  Heading2, 
  AlignLeft, 
  MessageSquare, 
  FolderPlus, 
  CheckSquare, 
  Minus, 
  X,
  LayoutGrid,
  Share2
} from 'lucide-react';

const blockOptions = [
  {
    type: 'heading1',
    label: 'Heading 1',
    description: 'Big section title',
    icon: Heading1
  },
  {
    type: 'heading2',
    label: 'Heading 2',
    description: 'Medium section header',
    icon: Heading2
  },
  {
    type: 'paragraph',
    label: 'Paragraph',
    description: 'Plain text paragraph block',
    icon: AlignLeft
  },
  {
    type: 'callout',
    label: 'Callout Box',
    description: 'Highlighted callout message with emoji',
    icon: MessageSquare
  },
  {
    type: 'projectCard',
    label: 'Project Card',
    description: 'Portfolio project card with cover & links',
    icon: FolderPlus
  },
  {
    type: 'skillGroup',
    label: 'Skill Group',
    description: 'Group of technical skill badges',
    icon: CheckSquare
  },
  {
    type: 'divider',
    label: 'Divider Line',
    description: 'Visually divide sections',
    icon: Minus
  },
  {
    type: 'specializationGrid',
    label: 'Specialization Grid',
    description: 'Grid of expertise/domain cards',
    icon: LayoutGrid
  },
  {
    type: 'socialLinks',
    label: 'Social Links Banner',
    description: 'CTA banner with social media links',
    icon: Share2
  }
];

export default function SlashMenuPopover({ onSelectBlock, onClose }) {
  return (
    <div className="absolute z-50 w-72 bg-white border border-[#E9E9E1] rounded-md shadow-2xl overflow-hidden text-xs animate-in fade-in zoom-in-95 duration-150 my-1">
      <div className="px-3 py-2 bg-[#F9F8F7] border-b border-[#E9E9E1] flex items-center justify-between text-[#8E8B86] font-semibold text-[11px]">
        <span>NOTION BASIC BLOCKS</span>
        <button onClick={onClose} className="hover:text-[#2C2C2B]">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-1 space-y-0.5 max-h-64 overflow-y-auto">
        {blockOptions.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.type}
              onClick={() => onSelectBlock(opt.type)}
              className="w-full flex items-start space-x-2.5 p-2 rounded hover:bg-[#2C2C2B]/5 text-left transition-colors group"
            >
              <div className="p-1.5 rounded bg-[#F9F8F7] border border-[#E9E9E1] text-[#2C2C2B] group-hover:bg-white group-hover:border-[#2383E2] transition-colors">
                <Icon className="w-4 h-4 text-[#2383E2]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#2C2C2B]">{opt.label}</div>
                <div className="text-[10px] text-[#8E8B86] truncate">{opt.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
