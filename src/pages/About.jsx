import React from 'react';
import { SectionLabel } from '../components/SectionLabel';
import { BrandValues } from '../sections/BrandValues';
import { ShieldCheck, Compass, Feather } from 'lucide-react';

export function About() {
  return (
    <div className="bg-white min-h-screen py-12 md:py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="flex justify-center">
            <SectionLabel number="01" label="ABOUT TENRA" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] tracking-tight">
            Crafting Tools for Intellectual Momentum.
          </h1>
          <p className="text-base text-[#667085] leading-relaxed pt-2">
            TENRA Stationery was created to provide scholars, designers, and thinkers with tools that prioritize substance, proportion, and quiet quality.
          </p>
        </div>

        {/* 3 Pillars Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-[#F8F8F6] border border-[#E6E8EB] p-8 space-y-4">
            <Compass className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="text-lg font-bold text-[#0B1F3A]">Thoughtful Ergonomics</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Every weight distribution, barrel thickness, and paper ruling is calibrated to reduce fatigue during extended study and design sessions.
            </p>
          </div>

          <div className="bg-[#F8F8F6] border border-[#E6E8EB] p-8 space-y-4">
            <Feather className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="text-lg font-bold text-[#0B1F3A]">Archival Materials</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              We source 100gsm acid-free paper, solid brass alloy, Californian cedarwood, and anodized aluminum to ensure lasting endurance.
            </p>
          </div>

          <div className="bg-[#F8F8F6] border border-[#E6E8EB] p-8 space-y-4">
            <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="text-lg font-bold text-[#0B1F3A]">Minimal Aesthetic</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Stripped of trend-driven gimmicks, TENRA products embody quiet luxury and essential utility.
            </p>
          </div>
        </div>

      </div>

      {/* Embedded Brand Values Section */}
      <BrandValues />
    </div>
  );
}
