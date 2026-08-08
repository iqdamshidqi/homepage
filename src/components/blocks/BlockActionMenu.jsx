import React from 'react';
import { Copy, Trash2, ArrowUp, ArrowDown, RefreshCw, X } from 'lucide-react';

export default function BlockActionMenu({ 
  onDuplicate, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  onChangeType,
  onClose 
}) {
  return (
    <div className="absolute right-0 top-6 z-50 w-44 bg-white border border-[#E9E9E1] rounded-md shadow-xl overflow-hidden text-xs animate-in fade-in duration-150 p-1">
      <button
        onClick={onDuplicate}
        className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded hover:bg-[#2C2C2B]/5 text-[#2C2C2B] text-left"
      >
        <Copy className="w-3.5 h-3.5 text-[#8E8B86]" />
        <span>Duplicate</span>
      </button>

      <button
        onClick={onMoveUp}
        className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded hover:bg-[#2C2C2B]/5 text-[#2C2C2B] text-left"
      >
        <ArrowUp className="w-3.5 h-3.5 text-[#8E8B86]" />
        <span>Move Up</span>
      </button>

      <button
        onClick={onMoveDown}
        className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded hover:bg-[#2C2C2B]/5 text-[#2C2C2B] text-left"
      >
        <ArrowDown className="w-3.5 h-3.5 text-[#8E8B86]" />
        <span>Move Down</span>
      </button>

      <div className="my-1 border-t border-[#E9E9E1]" />

      <button
        onClick={onDelete}
        className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded hover:bg-red-50 text-red-600 text-left font-medium"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Delete Block</span>
      </button>
    </div>
  );
}
