import React from 'react';
import NotionTag from '../NotionTag';

export default function SkillGroupBlock({ content, isEditing, onChange }) {
  const { skillData = { groupTitle: '', skills: [] } } = content || {};

  const handleTitleChange = (e) => {
    onChange?.({
      ...content,
      skillData: { ...skillData, groupTitle: e.target.value }
    });
  };

  return (
    <div className="p-4 rounded-md bg-white border border-[#E9E9E1] shadow-xs my-2">
      <div className="mb-3">
        {isEditing ? (
          <input
            type="text"
            value={skillData.groupTitle}
            onChange={handleTitleChange}
            placeholder="GROUP TITLE"
            className="text-xs font-semibold text-[#8E8B86] uppercase tracking-wider bg-transparent focus:outline-none focus:bg-[#F2F1EE] rounded px-1 -mx-1"
          />
        ) : (
          <h4 className="text-xs font-semibold text-[#8E8B86] uppercase tracking-wider">
            {skillData.groupTitle}
          </h4>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {skillData.skills.map((skill, index) => (
          <NotionTag key={index} name={skill.name} color={skill.color} />
        ))}
        {isEditing && (
          <button className="text-xs text-[#8E8B86] hover:text-[#2C2C2B] border border-dashed border-[#E9E9E1] rounded px-2 py-0.5">
            + Add Skill
          </button>
        )}
      </div>
    </div>
  );
}
