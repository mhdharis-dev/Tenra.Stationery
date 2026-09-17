import React from 'react';
import { SectionLabel } from '../components/SectionLabel';
import { BrandStory } from '../sections/BrandStory';
import { FutureVision } from '../sections/FutureVision';

export function Story() {
  return (
    <div className="bg-white min-h-screen py-12 md:py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex justify-center">
            <SectionLabel number="01" label="OUR PHILOSOPHY" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] tracking-tight">
            The TENRA Story
          </h1>
          <p className="text-base text-[#667085] leading-relaxed">
            Discover the design thinking and foundational principles behind our premium stationery line.
          </p>
        </div>
      </div>

      <BrandStory />
      <FutureVision />
    </div>
  );
}
