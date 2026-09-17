import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Mail, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionLabel } from '../components/SectionLabel';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';

export function ProductDetails({ onAddToCart }) {
  const { productId } = useParams();
  const { getProductById } = useProducts();
  const navigate = useNavigate();

  const product = getProductById(productId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [demoNotice, setDemoNotice] = useState(null);

  if (!product) {
    return (
      <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-[#0B1F3A] mb-2">Product Not Found</h2>
        <p className="text-xs text-gray-500 mb-6">The requested stationery item is unavailable in our catalog.</p>
        <Button onClick={() => navigate('/products')}>Return to Catalog</Button>
      </div>
    );
  }

  const { name, category, description, price, images, specifications, status, sku } = product;
  const isComingSoon = status === 'coming-soon' || price === null;

  const handleAddBagClick = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    setDemoNotice("Item added to demo bag. Shopping & checkout functionality will be available in Phase 2.");
  };

  return (
    <div className="bg-white min-h-screen py-12 md:py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#667085] hover:text-[#0B1F3A] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#F8F8F6] border border-[#E6E8EB] aspect-4/3 overflow-hidden relative">
              <img
                src={images?.[selectedImageIndex] || images?.[0]}
                alt={name}
                className="w-full h-full object-cover"
              />
              {isComingSoon && (
                <div className="absolute top-4 right-4 bg-[#0B1F3A] text-white text-xs font-bold uppercase px-3 py-1.5 tracking-widest">
                  Coming Soon
                </div>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {images && images.length > 1 && (
              <div className="flex items-center gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 border overflow-hidden transition-all ${
                      selectedImageIndex === idx ? 'border-[#0B1F3A] ring-1 ring-[#0B1F3A]' : 'border-[#E6E8EB] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Information */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <SectionLabel number={sku || "SE-01"} label={category} />
                <span className="text-[10px] font-mono text-gray-400">SKU: {sku || product.id}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight mb-4">
                {name}
              </h1>

              <div className="text-2xl font-bold text-[#111827] mb-6">
                {formatPrice(price)}
              </div>

              <p className="text-sm text-[#667085] leading-relaxed font-normal border-y border-[#E6E8EB] py-4">
                {description}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              {demoNotice && (
                <div className="bg-[#0B1F3A] text-white text-xs p-3.5 border-l-4 border-[#D4AF37] flex items-start gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{demoNotice}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  className="flex-1"
                  size="lg"
                  onClick={handleAddBagClick}
                  icon={ShoppingBag}
                  disabled={isComingSoon}
                >
                  {isComingSoon ? "Release Pending" : "Add to Bag (Demo)"}
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/contact')}
                  icon={Mail}
                >
                  Enquire
                </Button>
              </div>

              <p className="text-[11px] text-gray-400 text-center pt-1">
                Phase 1 Prototype • E-commerce & checkout workflow will activate in Phase 2
              </p>
            </div>

            {/* Product Specifications Table */}
            {specifications && Object.keys(specifications).length > 0 && (
              <div className="pt-6 border-t border-[#E6E8EB]">
                <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-[#0B1F3A] mb-4">
                  Technical Specifications
                </h3>
                <div className="bg-[#F8F8F6] border border-[#E6E8EB] divide-y divide-[#E6E8EB] text-xs">
                  {Object.entries(specifications).map(([key, val]) => (
                    <div key={key} className="p-3 flex justify-between">
                      <span className="font-semibold text-[#0B1F3A]">{key}</span>
                      <span className="text-[#667085]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quality Commitment Notice */}
            <div className="bg-[#F8F8F6] border border-[#E6E8EB] p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-[#0B1F3A] block">TENRA Quality Guarantee</span>
                <span className="text-[#667085]">
                  Designed for longevity, durability, and ergonomic precision in study and creative work.
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
