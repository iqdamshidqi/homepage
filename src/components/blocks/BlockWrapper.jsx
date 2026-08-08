import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, GripVertical, MoreHorizontal } from 'lucide-react';
import SlashMenuPopover from './SlashMenuPopover';
import BlockActionMenu from './BlockActionMenu';

/**
 * Inner component that uses dnd-kit sortable hooks.
 * Only rendered when isEditing is true (inside a DndContext).
 */
function SortableEditorWrapper({
  block,
  children,
  onAddBlockBelow,
  onDuplicateBlock,
  onDeleteBlock,
  onMoveUp,
  onMoveDown
}) {
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const handleSelectSlashMenu = (type) => {
    onAddBlockBelow(block.id, type);
    setShowSlashMenu(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group flex items-start space-x-1 py-1 w-full rounded hover:bg-[#F9F8F7]/70 transition-colors"
    >
      {/* Notion-style Left Margin Controls */}
      <div className="flex items-center space-x-0.5 opacity-0 group-hover:opacity-100 transition-opacity pt-1 text-[#8E8B86] flex-shrink-0 relative">
        {/* Plus (+) — Add Block */}
        <button
          type="button"
          onClick={() => setShowSlashMenu(!showSlashMenu)}
          className="p-1 rounded hover:bg-[#2C2C2B]/10 hover:text-[#2C2C2B] transition-colors"
          title="Add block below"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>

        {showSlashMenu && (
          <div className="absolute left-0 top-full z-50">
            <SlashMenuPopover
              onSelectBlock={handleSelectSlashMenu}
              onClose={() => setShowSlashMenu(false)}
            />
          </div>
        )}

        {/* 6-dot Drag Handle */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="p-1 rounded hover:bg-[#2C2C2B]/10 hover:text-[#2C2C2B] cursor-grab active:cursor-grabbing transition-colors"
          title="Drag to reorder"
        >
          <GripVertical className="w-3.5 h-3.5" />
        </button>

        {/* ⋯ Action Menu */}
        <button
          type="button"
          onClick={() => setShowActionMenu(!showActionMenu)}
          className="p-1 rounded hover:bg-[#2C2C2B]/10 hover:text-[#2C2C2B] transition-colors"
          title="Block options"
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>

        {showActionMenu && (
          <BlockActionMenu
            onDuplicate={() => { onDuplicateBlock(block.id); setShowActionMenu(false); }}
            onDelete={() => { onDeleteBlock(block.id); setShowActionMenu(false); }}
            onMoveUp={() => { onMoveUp(block.id); setShowActionMenu(false); }}
            onMoveDown={() => { onMoveDown(block.id); setShowActionMenu(false); }}
            onClose={() => setShowActionMenu(false)}
          />
        )}
      </div>

      {/* Block Content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}

/**
 * BlockWrapper — wraps each block.
 * In viewer mode: clean div, no controls.
 * In editor mode: sortable wrapper with drag handles and menus.
 */
export default function BlockWrapper({
  block,
  isEditing,
  children,
  onAddBlockBelow,
  onDuplicateBlock,
  onDeleteBlock,
  onMoveUp,
  onMoveDown
}) {
  if (!isEditing) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <SortableEditorWrapper
      block={block}
      onAddBlockBelow={onAddBlockBelow}
      onDuplicateBlock={onDuplicateBlock}
      onDeleteBlock={onDeleteBlock}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
    >
      {children}
    </SortableEditorWrapper>
  );
}
