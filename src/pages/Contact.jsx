import React from 'react';
import { SectionLabel } from '../components/SectionLabel';
import { ContactCTA } from '../sections/ContactCTA';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export function Contact() {
  return (
    <div className="bg-white min-h-screen py-12 md:py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="flex justify-center">
            <SectionLabel number="01" label="GET IN TOUCH" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] tracking-tight">
            Contact TENRA
          </h1>
          <p className="text-base text-[#667085] leading-relaxed">
            We welcome inquiries regarding institutional partnerships, store distribution, and customer support.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-[#F8F8F6] border border-[#E6E8EB] p-6 text-center space-y-2">
            <Mail className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] block">Email</span>
            <span className="text-xs text-[#667085]">hello@tenrastationery.com</span>
          </div>

          <div className="bg-[#F8F8F6] border border-[#E6E8EB] p-6 text-center space-y-2">
            <Phone className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] block">Phone</span>
            <span className="text-xs text-[#667085]">+1 (800) 836-7281</span>
          </div>

          <div className="bg-[#F8F8F6] border border-[#E6E8EB] p-6 text-center space-y-2">
            <MapPin className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] block">Location</span>
            <span className="text-xs text-[#667085]">100 Academy Square, Suite 400</span>
          </div>

          <div className="bg-[#F8F8F6] border border-[#E6E8EB] p-6 text-center space-y-2">
            <Clock className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] block">Hours</span>
            <span className="text-xs text-[#667085]">Mon – Fri, 9am – 5pm EST</span>
          </div>
        </div>

      </div>

      <ContactCTA />
    </div>
  );
}
