import React from 'react';
import { SectionLabel } from '../components/SectionLabel';
import { CategoryCard } from '../components/CategoryCard';
import { useCategories } from '../hooks/useCategories';

export function Categories() {
  const { categories } = useCategories();

  // Find key categories
  const pensCat = categories.find(c => c.slug === 'pens') || categories[0];
  const notebooksCat = categories.find(c => c.slug === 'notebooks') || categories[1];
  const pencilsCat = categories.find(c => c.slug === 'pencils') || categories[2];
  const geometryCat = categories.find(c => c.slug === 'geometry') || categories[4];
  const schoolCat = categories.find(c => c.slug === 'school-essentials') || categories[5];
  const artCat = categories.find(c => c.slug === 'art-creative') || categories[7];

  return (
    <section className="bg-white border-b border-[#E6E8EB] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
          <div>
            <SectionLabel number="03" label="CURATED LINE" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mt-2">
              Explore Stationery
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#667085] max-w-md">
            Purpose-built instruments designed to elevate writing, sketching, and mathematical precision.
          </p>
        </div>

        {/* Asymmetric Category Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Large Hero Category: Pens */}
          <div className="md:col-span-7 lg:col-span-8">
            <CategoryCard category={pensCat} size="large" />
          </div>

          {/* Stacked Small Categories: Notebooks & Pencils */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
            <CategoryCard category={notebooksCat} size="normal" className="flex-1" />
            <CategoryCard category={pencilsCat} size="normal" className="flex-1" />
          </div>

          {/* Row 2: 3 Equal Asymmetric Columns: Geometry, School Essentials, Art & Creative */}
          <div className="md:col-span-4">
            <CategoryCard category={geometryCat} size="normal" />
          </div>
          <div className="md:col-span-4">
            <CategoryCard category={schoolCat} size="normal" />
          </div>
          <div className="md:col-span-4">
            <CategoryCard category={artCat} size="normal" />
          </div>

        </div>
      </div>
    </section>
  );
}
