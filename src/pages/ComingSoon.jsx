import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionLabel } from '../components/SectionLabel';
import { Button } from '../components/Button';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export function ComingSoon() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const upcomingLines = [
    { title: "Future Brass Compass Set", category: "Geometry", release: "Late Q4 2026", desc: "Solid milled brass compass with micro-adjustment dial for architectural drafting." },
    { title: "Archival Binder & Folio", category: "Office Stationery", release: "Q1 2027", desc: "Tactile linen hardcover binder designed for modular dot-grid refill inserts." },
    { title: "Precision Mechanical Pencil 0.5mm", category: "Pencils", release: "Q1 2027", desc: "Weighted aluminum body with cushioned lead mechanism to prevent breakage." }
  ];

  return (
    <div className="bg-white min-h-screen py-16 md:py-24 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <div className="flex justify-center">
            <SectionLabel number="ROADMAP" label="FUTURE COLLECTIONS" />
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B1F3A] tracking-tight">
            The Future of TENRA.
          </h1>

          <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
            We are actively engineering new instruments for the upcoming study cycle. Explore our preview roadmap below.
          </p>
        </div>

        {/* Upcoming Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {upcomingLines.map((item) => (
            <div key={item.title} className="bg-[#F8F8F6] border border-[#E6E8EB] p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-bold text-[#D4AF37] uppercase tracking-wider">{item.category}</span>
                  <span className="bg-[#0B1F3A] text-white text-[10px] font-bold px-2 py-0.5">{item.release}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">{item.title}</h3>
                <p className="text-xs text-[#667085] leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-6 border-t border-[#E6E8EB] mt-6 flex items-center text-xs text-[#0B1F3A] font-bold gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>In Prototype Phase</span>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Teaser Box */}
        <div className="bg-[#0B1F3A] text-white p-8 md:p-12 max-w-2xl mx-auto border border-[#0B1F3A] text-center space-y-4">
          <h3 className="text-xl font-bold tracking-tight">Be First to Know</h3>
          <p className="text-xs text-white/70 max-w-md mx-auto">
            Subscribe to receive priority notifications when new TENRA stationery drops become available.
          </p>

          {subscribed ? (
            <div className="bg-white/10 p-4 border border-[#D4AF37] flex items-center justify-center gap-2 text-xs font-semibold text-[#D4AF37]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you. You are on the TENRA priority release list.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-2.5 text-xs text-[#111827] bg-white focus:outline-none"
              />
              <Button type="submit" variant="accent" size="sm">
                Notify Me
              </Button>
            </form>
          )}
        </div>

        <div className="text-center pt-12">
          <Button variant="secondary" onClick={() => navigate('/products')} icon={ArrowRight}>
            Explore Current Lineup
          </Button>
        </div>

      </div>
    </div>
  );
}
