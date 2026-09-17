import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionLabel } from '../components/SectionLabel';
import { Button } from '../components/Button';
import { ArrowRight, Clock } from 'lucide-react';

export function FutureVision() {
  const navigate = useNavigate();

  const progression = [
    { title: "Pens", status: "Available Now", tag: "Flagship", active: true },
    { title: "Notebooks", status: "Available Now", tag: "Flagship", active: true },
    { title: "School Essentials", status: "Available Now", tag: "Core", active: true },
    { title: "Office Stationery", status: "Future Collection", tag: "Q4 Release", active: false },
    { title: "Art & Creative", status: "Future Collection", tag: "Q4 Release", active: false }
  ];

  return (
    <section className="bg-white border-b border-[#E6E8EB] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <SectionLabel number="07" label="PRODUCT ROADMAP" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mt-2">
            Write What Comes Next.
          </h2>
          <p className="text-xs sm:text-sm text-[#667085] mt-2">
            Our design roadmap evolves continuously. Preview upcoming category releases as we expand the TENRA ecosystem.
          </p>
        </div>

        {/* Visual Progression Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {progression.map((item, idx) => (
            <div
              key={item.title}
              className={`border p-5 flex flex-col justify-between h-40 transition-all ${
                item.active
                  ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                  : 'bg-[#F8F8F6] text-[#111827] border-[#E6E8EB] opacity-90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-[10px] font-mono">
                  <span className={item.active ? 'text-[#D4AF37]' : 'text-gray-400'}>
                    0{idx + 1}
                  </span>
                  <span className={`px-2 py-0.5 font-bold uppercase tracking-wider ${
                    item.active ? 'bg-[#D4AF37] text-[#0B1F3A]' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold tracking-tight mb-1">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                {!item.active && <Clock className="w-3.5 h-3.5 text-gray-400" />}
                <span className={item.active ? 'text-white/80 font-medium' : 'text-gray-500 font-medium'}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate('/coming-soon')}
            icon={ArrowRight}
          >
            Explore Future Releases
          </Button>
        </div>

      </div>
    </section>
  );
}
