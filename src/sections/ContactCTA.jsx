import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { SectionLabel } from '../components/SectionLabel';
import { Button } from '../components/Button';
import { useMessages } from '../hooks/useMessages';

export function ContactCTA() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { addMessage } = useMessages();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    addMessage(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="bg-[#F8F8F6] border-b border-[#E6E8EB] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-10">
            <div className="flex justify-center">
              <SectionLabel number="08" label="INQUIRIES" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mt-2">
              Let's Start Something.
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] mt-2">
              Have questions about TENRA stationery, institutional orders, or store distribution? Send us a message.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white border border-[#D4AF37] p-8 text-center animate-fade-in shadow-sm">
              <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">Message Received</h3>
              <p className="text-sm text-[#111827] max-w-md mx-auto mb-4 font-medium">
                "Thanks. This demo form is ready to connect to the TENRA contact service in Phase 2."
              </p>
              <Button size="sm" variant="secondary" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-[#E6E8EB] p-6 sm:p-10 shadow-xs space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1F3A] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-4 py-3 text-sm bg-[#F8F8F6] border border-[#E6E8EB] focus:outline-none focus:border-[#0B1F3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1F3A] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@university.edu"
                    className="w-full px-4 py-3 text-sm bg-[#F8F8F6] border border-[#E6E8EB] focus:outline-none focus:border-[#0B1F3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1F3A] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Institutional Inquiry"
                  className="w-full px-4 py-3 text-sm bg-[#F8F8F6] border border-[#E6E8EB] focus:outline-none focus:border-[#0B1F3A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1F3A] mb-2">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your stationery requirements..."
                  className="w-full px-4 py-3 text-sm bg-[#F8F8F6] border border-[#E6E8EB] focus:outline-none focus:border-[#0B1F3A] resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-gray-400">
                  Phase 1 Demo • Local storage submission
                </span>
                <Button type="submit" variant="primary" icon={Send}>
                  Send Message
                </Button>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
