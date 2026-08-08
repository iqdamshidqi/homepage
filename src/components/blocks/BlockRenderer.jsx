import React from 'react';
import TextBlock from './TextBlock';
import CalloutBlock from './CalloutBlock';
import ProjectCardBlock from './ProjectCardBlock';
import SkillGroupBlock from './SkillGroupBlock';
import DividerBlock from './DividerBlock';
import SpecializationGridBlock from './SpecializationGridBlock';
import SocialLinksBlock from './SocialLinksBlock';

export default function BlockRenderer({ block, isEditing, onChange, onEditProjectProperties, onOpenDetail, onExploreProjects, socials, onTriggerSlash }) {
  const handleContentChange = (newContent) => {
    onChange && onChange(block.id, newContent);
  };

  switch (block.type) {
    case 'heading1':
    case 'heading2':
    case 'heading3':
    case 'paragraph':
      return <TextBlock type={block.type} content={block.content} isEditing={isEditing} onChange={handleContentChange} onTriggerSlash={onTriggerSlash} />;
    case 'callout':
      return <CalloutBlock content={block.content} isEditing={isEditing} onChange={handleContentChange} />;
    case 'projectCard':
      return <ProjectCardBlock content={block.content} isEditing={isEditing} onEditProperties={(proj) => onEditProjectProperties && onEditProjectProperties(block.id, proj)} onOpenDetail={onOpenDetail} />;
    case 'skillGroup':
      return <SkillGroupBlock content={block.content} isEditing={isEditing} onChange={handleContentChange} />;
    case 'divider':
      return <DividerBlock isEditing={isEditing} />;
    case 'specializationGrid':
      return <SpecializationGridBlock content={block.content} isEditing={isEditing} onChange={handleContentChange} />;
    case 'socialLinks':
      return <SocialLinksBlock content={block.content} isEditing={isEditing} onChange={handleContentChange} onExploreProjects={onExploreProjects} socials={socials} />;
    default:
      return <div className="text-xs text-[#8E8B86] py-2">Unknown block type: {block.type}</div>;
  }
}
