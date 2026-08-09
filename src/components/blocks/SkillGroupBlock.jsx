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

  const handleAddSkill = () => {
    const colors = ['gray', 'brown', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    onChange?.({
      ...content,
      skillData: { 
        ...skillData, 
        skills: [...skillData.skills, { name: 'New Skill', color: randomColor }] 
      }
    });
  };

  const handleRemoveSkill = (indexToRemove) => {
    onChange?.({
      ...content,
      skillData: {
        ...skillData,
        skills: skillData.skills.filter((_, i) => i !== indexToRemove)
      }
    });
  };

  const handleSkillNameChange = (index, newName) => {
    const newSkills = [...skillData.skills];
    newSkills[index] = { ...newSkills[index], name: newName };
    onChange?.({
      ...content,
      skillData: { ...skillData, skills: newSkills }
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
      <div className="flex flex-wrap gap-2 items-center">
        {skillData.skills.map((skill, index) => (
          isEditing ? (
            <div key={index} className="flex items-center bg-[#F2F1EE] rounded px-2 py-0.5 border border-[#E1E1DE] text-xs">
              <span className="opacity-60 mr-1">#</span>
              <input 
                type="text" 
                value={skill.name} 
                onChange={(e) => handleSkillNameChange(index, e.target.value)}
                className="bg-transparent focus:outline-none text-[#37352F] w-20"
              />
              <button onClick={() => handleRemoveSkill(index)} className="ml-1 text-[#8E8B86] hover:text-red-500 font-bold">&times;</button>
            </div>
          ) : (
            <NotionTag key={index} name={skill.name} color={skill.color} />
          )
        ))}
        {isEditing && (
          <button onClick={handleAddSkill} className="text-xs text-[#8E8B86] hover:text-[#2C2C2B] border border-dashed border-[#E9E9E1] rounded px-2 py-0.5">
            + Add Skill
          </button>
        )}
      </div>
    </div>
  );
}
