import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CategoryCard({ category, size = 'normal', className = '' }) {
  if (!category) return null;

  const { name, slug, description, itemCount, image, badge } = category;

  const isLarge = size === 'large';

  return (
    <Link
      to={`/categories/${slug}`}
      className={`group relative block overflow-hidden border border-[#E6E8EB] bg-[#F8F8F6] transition-all duration-300 hover:border-[#D4AF37] ${
        isLarge ? 'h-full min-h-[380px] md:min-h-[440px]' : 'min-h-[220px] md:min-h-[260px]'
      } ${className}`}
    >
      {/* Background Photography with dark overlay gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/40 to-transparent transition-opacity group-hover:opacity-95" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between text-white">
        <div className="flex items-start justify-between">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] bg-white/10 backdrop-blur-xs px-2.5 py-1 border border-white/20">
            {itemCount || 'Collection'}
          </span>
          {badge && (
            <span className="text-[10px] font-bold uppercase bg-[#D4AF37] text-[#0B1F3A] px-2 py-0.5 tracking-widest">
              {badge}
            </span>
          )}
        </div>

        <div>
          {/* Title with hover shift 4-6px */}
          <h3 className={`font-extrabold tracking-tight transition-transform duration-300 group-hover:translate-x-1.5 ${
            isLarge ? 'text-2xl md:text-3xl lg:text-4xl mb-3' : 'text-xl md:text-2xl mb-2'
          }`}>
            {name}
          </h3>

          <p className="text-xs text-white/80 line-clamp-2 max-w-sm mb-4 leading-relaxed font-normal">
            {description}
          </p>

          {/* Hover Gold Line & Link indicator */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
            <span className="uppercase tracking-widest text-[11px]">Explore Line</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
            <div className="w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-8 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
