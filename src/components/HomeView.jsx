import React from 'react';
import { motion } from 'framer-motion';
import NotionCallout from './NotionCallout';
import NotionTag from './NotionTag';
import { Github, Linkedin, Mail, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

const socialIconMap = {
  Github: Github,
  Linkedin: Linkedin,
  Mail: Mail,
  Award: Award
};

export default function HomeView({ profile, onExploreProjects }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-8 pb-12"
    >
      {/* Notion Welcome Callout Block */}
      <NotionCallout
        emoji={profile.welcomeCallout.emoji}
        title={profile.welcomeCallout.title}
        description={profile.welcomeCallout.description}
      />

      {/* About Me Section (Document Style) */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#37352F] flex items-center border-b border-[#EBECED] pb-2">
          <span className="mr-2">📄</span> About Me
        </h2>
        <div className="space-y-3 text-sm text-[#37352F]/90 leading-relaxed">
          {profile.aboutBio.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Domain Specializations Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#37352F] flex items-center border-b border-[#EBECED] pb-2">
          <span className="mr-2">🎯</span> Focus Domains & Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.specializations.map((spec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-white border border-[#E9E9E7] shadow-notion hover:border-[#D3D3D0] transition-colors"
            >
              <div className="flex items-center space-x-2 mb-1.5">
                <span className="text-xl">{spec.emoji}</span>
                <h3 className="font-bold text-sm text-[#37352F]">{spec.title}</h3>
              </div>
              <p className="text-xs text-[#787774] leading-relaxed">
                {spec.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Tech Stack Section (Notion Badges) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#37352F] flex items-center border-b border-[#EBECED] pb-2">
          <span className="mr-2">🛠️</span> Core Tech Stack & Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(profile.skillsGrouped).map(([categoryName, skills], idx) => (
            <div key={idx} className="p-4 rounded-lg bg-white border border-[#E9E9E7] shadow-notion">
              <h3 className="text-xs font-semibold text-[#787774] uppercase tracking-wider mb-2.5 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                {categoryName}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, sIdx) => (
                  <NotionTag key={sIdx} name={skill.name} color={skill.color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Call-to-Action & Social Buttons */}
      <section className="p-6 rounded-lg bg-white border border-[#E9E9E7] shadow-notion space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#37352F]">Explore Portofolio Project</h3>
            <p className="text-xs text-[#787774] mt-0.5">
              Lihat proyek-proyek analitik kuantitatif, machine learning, bioinformatika, dan data warehouse.
            </p>
          </div>
          <button
            onClick={onExploreProjects}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-[#37352F] text-white text-xs font-medium hover:bg-black transition-colors shadow-sm flex-shrink-0"
          >
            <span>Lihat Semua Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-4 border-t border-[#EBECED] flex flex-wrap gap-3">
          {profile.socials.map((social, idx) => {
            const Icon = socialIconMap[social.icon] || Github;
            return (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#F1F1EF] text-[#37352F] text-xs font-medium hover:bg-[#EFEFEF] transition-colors border border-[#E9E9E7]"
              >
                <Icon className="w-3.5 h-3.5 text-[#787774]" />
                <span>{social.platform}</span>
              </a>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
