import React from 'react';

export default function Header({ 
  profile, 
  activeTab, 
  currentCategoryTitle
}) {
  return (
    <header className="relative w-full">
      {/* Notion Cover Image Banner */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-200">
        <img
          src={profile.coverImage}
          alt="Page Cover"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Page Title Header Block */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 relative pb-6">
        {/* Large Emoji Icon */}
        <div className="relative -mt-10 sm:-mt-12 mb-4 inline-block">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-2 shadow-notion flex items-center justify-center text-4xl sm:text-5xl border border-[#E9E9E7] hover:scale-105 transition-transform duration-200 cursor-pointer">
            {activeTab === 'home' ? profile.avatarEmoji : '📊'}
          </div>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#37352F] tracking-tight">
            {activeTab === 'home' ? profile.name : currentCategoryTitle || 'Data Science Projects'}
          </h1>
          <p className="text-sm sm:text-base text-[#787774] mt-1 font-normal">
            {activeTab === 'home' 
              ? profile.role
              : `Portofolio & Eksperimen Data Science — ${currentCategoryTitle || 'All Domains'}`}
          </p>
        </div>
      </div>
    </header>
  );
}
