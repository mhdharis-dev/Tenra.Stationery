import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export function ProductCard({ product }) {
  if (!product) return null;

  const { id, name, category, description, price, images, status } = product;
  const mainImage = images?.[0] || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800";
  const isComingSoon = status === 'coming-soon' || price === null;

  return (
    <div className="group bg-white border border-[#E6E8EB] flex flex-col justify-between transition-all duration-300 hover:border-[#D4AF37]/60 hover:shadow-sm">
      <Link to={`/products/${id}`} className="block relative overflow-hidden bg-[#F8F8F6] aspect-4/3">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
        {isComingSoon && (
          <div className="absolute top-3 right-3 bg-[#0B1F3A] text-white text-[10px] font-bold uppercase px-2.5 py-1 tracking-wider">
            Coming Soon
          </div>
        )}
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-widest">
              {category}
            </span>
          </div>

          <Link to={`/products/${id}`} className="block group-hover:text-[#0B1F3A]">
            <h3 className="text-base font-bold text-[#0B1F3A] tracking-tight leading-snug hover-gold-line inline-block mb-2">
              {name}
            </h3>
          </Link>

          <p className="text-xs text-[#667085] line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>
        </div>

        <div className="pt-4 border-t border-[#E6E8EB] flex items-center justify-between">
          <span className="text-sm font-bold text-[#111827]">
            {formatPrice(price)}
          </span>

          <Link
            to={`/products/${id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0B1F3A] hover:text-[#D4AF37] transition-colors group/link"
          >
            <span>View Product</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
