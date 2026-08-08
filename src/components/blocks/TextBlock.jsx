import React from 'react';
import { FileText, Target, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';

const iconMap = { FileText, Target, Wrench, Sparkles, CheckCircle2 };

export default function TextBlock({ type, content, isEditing, onChange, onTriggerSlash }) {
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.endsWith('/') && onTriggerSlash) {
      onTriggerSlash();
    }
    onChange?.({ ...content, text: value });
  };

  const Icon = content?.icon && iconMap[content.icon] ? iconMap[content.icon] : null;
  const text = content?.text || '';

  const styles = {
    heading1: 'text-2xl sm:text-3xl font-bold text-[#2C2C2B] tracking-tight py-1',
    heading2: 'text-lg font-semibold text-[#2C2C2B] py-1 border-b border-[#E9E9E1] mb-1 flex items-center',
    heading3: 'text-sm font-semibold text-[#2C2C2B] py-0.5',
    paragraph: 'text-sm text-[#2C2C2B] leading-relaxed py-0.5 font-normal'
  };

  const currentStyle = styles[type] || styles.paragraph;

  if (isEditing) {
    return (
      <div className={type === 'heading2' ? 'border-b border-[#E9E9E1] mb-1 flex items-center' : ''}>
        {type === 'heading2' && Icon && <Icon className="w-5 h-5 mr-2 text-[#2383E2]" />}
        <input
          type="text"
          value={text}
          onChange={handleChange}
          className={`w-full bg-transparent focus:outline-none focus:bg-[#F2F1EE] rounded px-1 -mx-1 ${
            type === 'heading2' ? styles.heading2.replace('border-b border-[#E9E9E1] mb-1 flex items-center', '') : currentStyle
          }`}
          placeholder={`Type a ${type}...`}
        />
      </div>
    );
  }

  if (type === 'heading1') return <h1 className={styles.heading1}>{text}</h1>;
  if (type === 'heading2') {
    return (
      <h2 className={styles.heading2}>
        {Icon && <Icon className="w-5 h-5 mr-2 text-[#2383E2]" />}
        {text}
      </h2>
    );
  }
  if (type === 'heading3') return <h3 className={styles.heading3}>{text}</h3>;
  return <p className={styles.paragraph}>{text}</p>;
}
