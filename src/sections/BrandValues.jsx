import React from 'react';
import { SectionLabel } from '../components/SectionLabel';

export function BrandValues() {
  const principles = [
    {
      number: "01",
      title: "Purpose",
      description: "Every dimension, clip, and ruling is engineered to serve active learning and clear thought."
    },
    {
      number: "02",
      title: "Precision",
      description: "Machined metals and archival paper formulations built for exactness in every stroke."
    },
    {
      number: "03",
      title: "Simplicity",
      description: "Elimination of clutter and unnecessary ornament so your focus remains on what you create."
    },
    {
      number: "04",
      title: "Progress",
      description: "Tools that inspire scholars, artists, and creators to push their future work further."
    }
  ];

  return (
    <section className="bg-white border-b border-[#E6E8EB] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-14">
          <SectionLabel number="05" label="CORE PILLARS" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mt-2">
            Designed Around What Matters.
          </h2>
        </div>

        {/* Principles Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((p) => (
            <div
              key={p.number}
              className="group border-t-2 border-[#E6E8EB] pt-6 hover:border-[#D4AF37] transition-colors duration-300"
            >
              <span className="font-mono text-xs font-bold text-[#D4AF37] tracking-widest block mb-3">
                {p.number}
              </span>
              
              <h3 className="text-xl font-bold text-[#0B1F3A] tracking-tight mb-2 group-hover:text-[#D4AF37] transition-colors">
                {p.title}
              </h3>

              <p className="text-xs text-[#667085] leading-relaxed font-normal">
                {p.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
