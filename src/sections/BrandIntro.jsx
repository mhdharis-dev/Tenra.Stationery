import React from 'react';
import { SectionLabel } from '../components/SectionLabel';

export function BrandIntro() {
  return (
    <section className="bg-[#F8F8F6] border-b border-[#E6E8EB] py-16 md:py-24 relative overflow-hidden">
      {/* Background paper grid subtle motif */}
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          <div className="flex justify-center">
            <SectionLabel number="02" label="BRAND PHILOSOPHY" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight">
            More Than Stationery.
          </h2>

          <p className="text-base sm:text-xl text-[#111827]/80 leading-relaxed font-normal pt-2">
            "TENRA is built around a simple idea: the tools we use to write, learn and create should feel as considered as the ideas themselves."
          </p>

          {/* Stationery Fine Writing Lines & Micro-typography Graphic */}
          <div className="pt-8 max-w-md mx-auto">
            <div className="relative py-6 px-8 bg-white border border-[#E6E8EB] shadow-xs space-y-3">
              {/* Fine ruled horizontal writing lines */}
              <div className="w-full h-[1px] bg-[#0B1F3A]/10" />
              <div className="w-full h-[1px] bg-[#0B1F3A]/10" />
              
              <div className="flex items-center justify-between text-[11px] text-[#667085] font-mono tracking-widest pt-1">
                <span>TENRA SPEC-01</span>
                <span className="w-8 h-[2px] bg-[#D4AF37]" />
                <span>ARCHIVAL CLASS</span>
              </div>

              <div className="w-full h-[1px] bg-[#0B1F3A]/10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
