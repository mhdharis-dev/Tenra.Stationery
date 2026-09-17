import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, Copy, Check, Info } from 'lucide-react';
import { Toast } from '../components/Toast';

export function Media() {
  const [copiedUrl, setCopiedUrl] = useState(null);

  const mediaAssets = [
    { id: 'm-01', title: 'TENRA Logo Primary', type: 'Brand Asset', url: '/tenra-logo.png' },
    { id: 'm-02', title: 'Archival Notebook Studio', type: 'Product Image', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800' },
    { id: 'm-03', title: 'Precision Fountain Pen', type: 'Product Image', url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=800' },
    { id: 'm-04', title: 'Cedarwood Pencils', type: 'Product Image', url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800' },
    { id: 'm-05', title: 'Aluminum Geometry Set', type: 'Product Image', url: 'https://images.unsplash.com/photo-1585336261026-8f57857820f2?auto=format&fit=crop&q=80&w=800' },
    { id: 'm-06', title: 'Dust-Free Eraser Trio', type: 'Product Image', url: 'https://images.unsplash.com/photo-1616628188467-8fb29f886bc5?auto=format&fit=crop&q=80&w=800' },
  ];

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Toast
        isOpen={!!copiedUrl}
        message="Media asset URL copied to clipboard."
        type="info"
        onClose={() => setCopiedUrl(null)}
      />

      {/* Header */}
      <div className="bg-white border border-gray-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0B1F3A] uppercase tracking-wide">
            Media Library
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Browse product photography assets, brand emblems, and category media.
          </p>
        </div>

        <button
          onClick={() => alert("Simulated file upload for Phase 1. Connect Cloudinary API in Phase 2.")}
          className="inline-flex items-center gap-2 bg-[#0B1F3A] text-white text-xs font-bold px-4 py-2 hover:bg-[#071325]"
        >
          <UploadCloud className="w-4 h-4 text-[#D4AF37]" />
          <span>Upload Asset (Demo)</span>
        </button>
      </div>

      {/* Cloudinary Integration Architectural Notice */}
      <div className="bg-[#0B1F3A] text-white p-4 text-xs flex items-start gap-3 border-l-4 border-[#D4AF37]">
        <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#D4AF37] block">PHASE 2 CLOUDINARY INTEGRATION</span>
          <p className="text-white/80 font-mono text-[11px] mt-0.5">
            // Phase 2: Connect Cloudinary here. Standard file dropzone will invoke cloudinary.v2.uploader.upload() and return secure_url.
          </p>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mediaAssets.map((asset) => (
          <div key={asset.id} className="bg-white border border-gray-200 shadow-xs overflow-hidden group">
            <div className="aspect-4/3 bg-[#F8F8F6] border-b border-gray-200 overflow-hidden relative">
              <img
                src={asset.url}
                alt={asset.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 right-2 text-[10px] font-bold uppercase bg-[#0B1F3A] text-white px-2 py-0.5">
                {asset.type}
              </span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#0B1F3A]">{asset.title}</h4>
                <span className="text-[10px] text-gray-400 font-mono">{asset.id}</span>
              </div>
              <button
                onClick={() => handleCopy(asset.url)}
                className="p-1.5 border border-gray-200 text-gray-600 hover:text-[#0B1F3A] hover:bg-gray-50"
                title="Copy URL"
              >
                {copiedUrl === asset.url ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
