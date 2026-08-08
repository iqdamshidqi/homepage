import React from 'react';

export default function SpecializationGridBlock({ content, isEditing, onChange }) {
  const { cards = [] } = content || {};

  const handleCardChange = (index, field, value) => {
    if (!onChange) return;
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], [field]: value };
    onChange({ ...content, cards: newCards });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      {cards.map((card, index) => (
        <div key={index} className="p-4 rounded-md bg-white border border-[#E9E9E1] shadow-xs hover:border-[#2383E2]/40 transition-all duration-200 flex flex-col">
          <div className="text-2xl mb-2">
            {isEditing ? (
              <input
                type="text"
                value={card.emoji || ''}
                onChange={(e) => handleCardChange(index, 'emoji', e.target.value)}
                className="w-10 text-center bg-transparent focus:outline-none focus:bg-[#F2F1EE] rounded"
              />
            ) : (
              card.emoji
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={card.title || ''}
                  onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                  placeholder="Title"
                  className="w-full font-semibold text-[#2C2C2B] bg-transparent focus:outline-none focus:bg-[#F2F1EE] rounded px-1 -mx-1 mb-1 block"
                />
                <textarea
                  value={card.description || ''}
                  onChange={(e) => handleCardChange(index, 'description', e.target.value)}
                  placeholder="Description"
                  className="w-full text-sm text-[#8E8B86] bg-transparent focus:outline-none focus:bg-[#F2F1EE] rounded px-1 -mx-1 block resize-none min-h-[60px]"
                />
              </>
            ) : (
              <>
                <h3 className="font-semibold text-[#2C2C2B] mb-1">{card.title}</h3>
                <p className="text-sm text-[#8E8B86]">{card.description}</p>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
