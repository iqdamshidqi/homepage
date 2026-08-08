import React from 'react';

export default function CalloutBlock({ content, isEditing, onChange }) {
  const { emoji = '💡', title = '', description = '' } = content || {};

  const handleEmojiChange = (e) => onChange?.({ ...content, emoji: e.target.value });
  const handleTitleChange = (e) => onChange?.({ ...content, title: e.target.value });
  const handleDescChange = (e) => onChange?.({ ...content, description: e.target.value });

  return (
    <div className="flex items-start p-4 rounded-md bg-[#F1F1EF] border border-[#E9E9E7] text-[#37352F] my-2">
      <div className="mr-3 mt-0.5 text-xl flex-shrink-0">
        {isEditing ? (
          <input
            type="text"
            value={emoji}
            onChange={handleEmojiChange}
            className="w-8 text-center bg-transparent focus:outline-none focus:bg-[#E9E9E1] rounded"
          />
        ) : (
          <span>{emoji}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Callout title"
              className="w-full font-semibold bg-transparent focus:outline-none focus:bg-[#E9E9E1] rounded px-1 -mx-1 mb-1 block"
            />
            <textarea
              value={description}
              onChange={handleDescChange}
              placeholder="Callout description"
              className="w-full text-sm bg-transparent focus:outline-none focus:bg-[#E9E9E1] rounded px-1 -mx-1 block resize-none min-h-[60px]"
            />
          </>
        ) : (
          <>
            {title && <div className="font-semibold">{title}</div>}
            {description && <div className="text-sm mt-1">{description}</div>}
          </>
        )}
      </div>
    </div>
  );
}
