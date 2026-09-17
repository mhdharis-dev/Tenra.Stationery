import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0B1F3A] text-white border-t border-[#0B1F3A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/tenra-logo.png"
                alt="TENRA STATIONERY"
                className="h-10 w-auto bg-white/95 p-1.5 rounded-none"
              />
            </Link>
            <p className="text-xs text-[#D4AF37] font-semibold uppercase tracking-[0.2em]">
              Write Your Future.
            </p>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              Thoughtfully designed stationery for ideas, learning, creativity and everything you create next.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4AF37] mb-4">
              Explore Line
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80 font-medium">
              <li>
                <Link to="/products" className="hover:text-[#D4AF37] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories/all" className="hover:text-[#D4AF37] transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/story" className="hover:text-[#D4AF37] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D4AF37] transition-colors">
                  About TENRA
                </Link>
              </li>
              <li>
                <Link to="/coming-soon" className="hover:text-[#D4AF37] transition-colors">
                  Future Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Category Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4AF37] mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80 font-medium">
              <li>
                <Link to="/categories/notebooks" className="hover:text-[#D4AF37] transition-colors">
                  Notebooks & Archival Pads
                </Link>
              </li>
              <li>
                <Link to="/categories/pens" className="hover:text-[#D4AF37] transition-colors">
                  Fountain & Precision Pens
                </Link>
              </li>
              <li>
                <Link to="/categories/geometry" className="hover:text-[#D4AF37] transition-colors">
                  Solid Aluminum Geometry
                </Link>
              </li>
              <li>
                <Link to="/categories/school-essentials" className="hover:text-[#D4AF37] transition-colors">
                  School Essentials
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4AF37] mb-4">
              Connect
            </h4>
            <p className="text-xs text-white/70 mb-4 leading-relaxed">
              Have questions or institutional inquiries? Reach out to our team.
            </p>
            <div className="flex items-center space-x-3 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-none border border-white/20 flex items-center justify-center text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-none border border-white/20 flex items-center justify-center text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-none border border-white/20 flex items-center justify-center text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 space-y-4 md:space-y-0">
          <div>
            © 2026 TENRA Stationery. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Phase 1 Frontend Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
