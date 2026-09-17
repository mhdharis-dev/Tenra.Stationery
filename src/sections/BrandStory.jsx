import React from 'react';
import { SectionLabel } from '../components/SectionLabel';

export function BrandStory() {
  return (
    <section className="bg-[#F8F8F6] border-b border-[#E6E8EB] py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Story Text Left */}
          <div className="lg:col-span-7 space-y-6">
            <SectionLabel number="06" label="THE TENRA NARRATIVE" />

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight">
              Every idea starts somewhere.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#111827]/80 leading-relaxed font-normal pt-2">
              <p>
                <strong>Writing</strong> is more than recording words — it is the physical act of giving form to thought. When pencil touches paper, abstract concepts transform into concrete direction.
              </p>
              <p>
                <strong>Learning</strong> requires instruments that respect the mind's focus. We design stationery stripped of unnecessary distraction, allowing clarity and deep work to take precedence.
              </p>
              <p>
                Whether you are <strong>creating</strong> architectural plans, <strong>planning</strong> your academic term, or <strong>dreaming</strong> of what comes next, TENRA provides the tactile foundation for your future achievements.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <span className="w-10 h-[2px] bg-[#D4AF37]" />
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#0B1F3A]">
                Write Your Future.
              </span>
            </div>
          </div>

          {/* Visual Presentation Right */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white border border-[#E6E8EB] p-6 sm:p-8 shadow-sm relative">
              <div className="aspect-3/4 overflow-hidden bg-[#F8F8F6] border border-[#E6E8EB] relative">
                <img
                  src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=900"
                  alt="TENRA Archival Notebook and Cedarwood Pencil"
                  className="w-full h-full object-cover"
                />
                
                {/* Paper line overlay label */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0B1F3A]/90 text-white p-4 backdrop-blur-xs">
                  <span className="text-[10px] font-mono text-[#D4AF37] block mb-1">
                    CRAFTED FOR FOCUS
                  </span>
                  <p className="text-xs font-semibold leading-snug">
                    Tactile linen bindings paired with 100gsm acid-free cream paper.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
