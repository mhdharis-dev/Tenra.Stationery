import React from 'react';
import { Hero } from '../sections/Hero';
import { BrandIntro } from '../sections/BrandIntro';
import { Categories } from '../sections/Categories';
import { FeaturedProducts } from '../sections/FeaturedProducts';
import { BrandValues } from '../sections/BrandValues';
import { BrandStory } from '../sections/BrandStory';
import { FutureVision } from '../sections/FutureVision';
import { ContactCTA } from '../sections/ContactCTA';

export function Home() {
  return (
    <main className="animate-fade-in">
      <Hero />
      <BrandIntro />
      <Categories />
      <FeaturedProducts />
      <BrandValues />
      <BrandStory />
      <FutureVision />
      <ContactCTA />
    </main>
  );
}
