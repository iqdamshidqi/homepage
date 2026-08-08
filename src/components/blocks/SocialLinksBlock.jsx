import React from 'react';
import { Github, Linkedin, Mail, Award, ArrowRight } from 'lucide-react';

const socialIconMap = { Github, Linkedin, Mail, Award };

export default function SocialLinksBlock({ content, isEditing, onChange, onExploreProjects, socials = [] }) {
  const { title = '', description = '', ctaLabel = 'Explore Projects' } = content || {};

  const handleTitleChange = (e) => onChange?.({ ...content, title: e.target.value });
  const handleDescChange = (e) => onChange?.({ ...content, description: e.target.value });
  const handleCtaChange = (e) => onChange?.({ ...content, ctaLabel: e.target.value });

  return (
    <div className="p-6 rounded-md bg-white border border-[#E9E9E1] shadow-xs my-4 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex-1 w-full">
        {isEditing ? (
          <>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Title"
              className="w-full text-lg font-bold text-[#2C2C2B] bg-transparent focus:outline-none focus:bg-[#F2F1EE] rounded px-1 -mx-1 mb-1 block"
            />
            <input
              type="text"
              value={description}
              onChange={handleDescChange}
              placeholder="Description"
              className="w-full text-sm text-[#8E8B86] bg-transparent focus:outline-none focus:bg-[#F2F1EE] rounded px-1 -mx-1 block"
            />
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold text-[#2C2C2B] mb-1">{title}</h3>
            <p className="text-sm text-[#8E8B86]">{description}</p>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
        {isEditing ? (
          <div className="flex items-center bg-[#2C2C2B] text-white px-4 py-2 rounded-md">
            <input
              type="text"
              value={ctaLabel}
              onChange={handleCtaChange}
              className="bg-transparent text-white focus:outline-none w-32 text-sm font-medium"
            />
            <ArrowRight size={16} className="ml-2 flex-shrink-0" />
          </div>
        ) : (
          <button
            onClick={onExploreProjects}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2C2C2B] hover:bg-[#37352F] text-white rounded-md text-sm font-medium transition-colors w-full sm:w-auto"
          >
            {ctaLabel}
            <ArrowRight size={16} />
          </button>
        )}

        <div className="flex items-center gap-2">
          {socials.map((social, index) => {
            const Icon = socialIconMap[social.icon];
            if (!Icon) return null;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-[#8E8B86] hover:text-[#2C2C2B] hover:bg-[#F2F1EE] rounded-md transition-colors"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
