import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionLabel } from '../components/SectionLabel';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white border-b border-[#E6E8EB] py-12 md:py-20 lg:py-24">
      {/* Background paper lines subtle pattern */}
      <div className="absolute inset-0 bg-paper-lines opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <SectionLabel number="01" label="TENRA STATIONERY" />

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1F3A] tracking-tight leading-[1.1]">
                Write Your <br />
                <span className="text-[#0B1F3A] relative inline-block">
                  Future.
                  <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#D4AF37]" />
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#667085] max-w-lg leading-relaxed font-normal pt-2">
                Thoughtfully designed stationery for ideas, learning, creativity and everything you create next.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/products')}
                icon={ArrowRight}
              >
                Explore Collection
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/story')}
              >
                Discover TENRA
              </Button>
            </div>

            {/* Subtle Brand Micro Details */}
            <div className="pt-8 flex items-center gap-8 text-xs text-[#667085] border-t border-[#E6E8EB]/80 max-w-md">
              <div>
                <span className="font-bold text-[#0B1F3A] block text-sm">Archival Quality</span>
                <span>100gsm Acid-Free Paper</span>
              </div>
              <div className="w-[1px] h-8 bg-[#E6E8EB]" />
              <div>
                <span className="font-bold text-[#0B1F3A] block text-sm">Crafted Precision</span>
                <span>Solid Brass & Cedarwood</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Product Composition & Micro-interaction */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Vertical Micro-Label */}
              <div className="hidden sm:block absolute -left-10 top-1/2 -translate-y-1/2 z-20">
                <span className="writing-mode-vertical text-[10px] uppercase font-bold tracking-[0.3em] text-[#0B1F3A]/40 select-none">
                  IDEAS START HERE.
                </span>
              </div>

              {/* Main Editorial Hero Product Composition Card */}
              <div className="group relative bg-[#F8F8F6] border border-[#E6E8EB] p-4 sm:p-6 transition-all duration-500 ease-out hover:shadow-xl hover:border-[#D4AF37]/50 hover:scale-[1.01]">
                
                {/* Image Frame */}
                <div className="relative aspect-4/3 sm:aspect-16/11 overflow-hidden bg-white border border-[#E6E8EB]">
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1200"
                    alt="TENRA Stationery Archival Grid Notebook & Fountain Pen"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  
                  {/* Subtle Gold Accent Corner Marker */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37] transition-all group-hover:w-10 group-hover:h-10" />
                </div>

                {/* Hero Product Caption Tag */}
                <div className="mt-4 flex items-center justify-between text-xs text-[#0B1F3A]">
                  <div>
                    <span className="font-bold tracking-tight text-sm block text-[#0B1F3A]">
                      Archival Notebook & Brass Pen Set
                    </span>
                    <span className="text-[#667085] text-[11px]">Signature Flagship Series</span>
                  </div>
                  <span className="font-mono font-bold text-xs text-[#D4AF37] bg-[#0B1F3A] px-2.5 py-1">
                    SE-01
                  </span>
                </div>
              </div>

              {/* Secondary Overlapping Preview Micro-Card */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 bg-white border border-[#E6E8EB] p-4 shadow-lg max-w-[200px] z-20 transition-transform duration-300 group-hover:translate-y-[-2px]">
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>New Drop</span>
                </div>
                <p className="text-xs font-bold text-[#0B1F3A] leading-snug">
                  Solid Aluminum Ruler & Geometry Kit
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
