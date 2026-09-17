import React from 'react';

/**
 * Editorial section label component.
 * Displays number (e.g., '01'), gold micro line, and uppercase title tag.
 */
export function SectionLabel({ number, label, className = '' }) {
  return (
    <div className={`flex items-center gap-3 text-xs tracking-[0.22em] uppercase font-semibold text-[#0B1F3A]/70 ${className}`}>
      {number && (
        <span className="font-mono text-[#D4AF37] font-bold text-sm tracking-normal">
          {number}
        </span>
      )}
      <span className="w-5 h-[1.5px] bg-[#D4AF37] inline-block"></span>
      <span>{label}</span>
    </div>
  );
}
