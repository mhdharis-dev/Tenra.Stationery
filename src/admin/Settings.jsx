import React, { useState } from 'react';
import { Save, Settings as SettingsIcon, Globe, Share2, Mail } from 'lucide-react';
import { INITIAL_SETTINGS } from '../data/settings';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Toast } from '../components/Toast';

export function Settings() {
  const [settings, setSettings] = useLocalStorage('tenra_settings', INITIAL_SETTINGS);
  const [activeTab, setActiveTab] = useState('brand');
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings(formData);
    setToastMessage("Store settings saved to local storage.");
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <Toast
        isOpen={!!toastMessage}
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage('')}
      />

      <div className="bg-white border border-gray-200 p-6 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-[#0B1F3A] uppercase tracking-wide">
            Store Settings
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure brand metadata, contact info, and social channels.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveTab('brand')}
          className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === 'brand'
              ? 'border-[#0B1F3A] text-[#0B1F3A]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Brand & Tagline
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === 'contact'
              ? 'border-[#0B1F3A] text-[#0B1F3A]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Contact Info
        </button>
        <button
          onClick={() => setActiveTab('social')}
          className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === 'social'
              ? 'border-[#0B1F3A] text-[#0B1F3A]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Social Links
        </button>
      </div>

      {/* Form Content */}
      <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
          {activeTab === 'brand' && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Support Phone
                </label>
                <input
                  type="text"
                  value={formData.supportPhone}
                  onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })}
                  className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
                  HQ Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                  className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Facebook URL
                </label>
                <input
                  type="url"
                  value={formData.facebookUrl}
                  onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                  className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#0B1F3A] text-white text-xs font-bold px-6 py-2.5 hover:bg-[#071325]"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
