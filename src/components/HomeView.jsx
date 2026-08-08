import React from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import BlockRenderer from './blocks/BlockRenderer';
import BlockWrapper from './blocks/BlockWrapper';

export default function HomeView({
  blocks,
  isEditing,
  socials,
  onExploreProjects,
  onUpdateBlockContent,
  onAddBlockBelow,
  onDuplicateBlock,
  onDeleteBlock,
  onMoveUp,
  onMoveDown,
  onEditProjectProperties,
  onOpenDetail,
  onDragEnd
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const renderBlocks = () => (
    <div className="space-y-1">
      {blocks.map((block) => (
        <BlockWrapper
          key={block.id}
          block={block}
          isEditing={isEditing}
          onAddBlockBelow={onAddBlockBelow}
          onDuplicateBlock={onDuplicateBlock}
          onDeleteBlock={onDeleteBlock}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
        >
          <BlockRenderer
            block={block}
            isEditing={isEditing}
            onChange={onUpdateBlockContent}
            onEditProjectProperties={onEditProjectProperties}
            onOpenDetail={onOpenDetail}
            onExploreProjects={onExploreProjects}
            socials={socials}
          />
        </BlockWrapper>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-2 pb-12 text-[#2C2C2B]"
    >
      {isEditing ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={blocks.map(b => b.id)}
            strategy={verticalListSortingStrategy}
          >
            {renderBlocks()}
          </SortableContext>
        </DndContext>
      ) : (
        renderBlocks()
      )}
    </motion.div>
  );
}
