import React, { useState } from 'react';
import { Grid, Plus, Edit } from 'lucide-react';
import { INITIAL_COLLECTIONS } from '../data/collections';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Toast } from '../components/Toast';

export function Collections() {
  const [collections, setCollections] = useLocalStorage('tenra_collections', INITIAL_COLLECTIONS);
  const [toastMessage, setToastMessage] = useState('');

  return (
    <div className="space-y-6 animate-fade-in">
      <Toast
        isOpen={!!toastMessage}
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage('')}
      />

      <div className="bg-white border border-gray-200 p-6 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-[#0B1F3A] uppercase tracking-wide">
            Collection Groupings
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Organize stationery items into Featured, New Arrivals, School Essentials, Creative Line, or Coming Soon.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div key={col.id} className="bg-white border border-gray-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-gray-400">{col.id}</span>
                <span className={`px-2 py-0.5 font-bold uppercase text-[10px] ${
                  col.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {col.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0B1F3A] mb-1">{col.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{col.description}</p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-700">{col.productCount} Items Organized</span>
              <button
                onClick={() => setToastMessage(`Collection "${col.name}" updated.`)}
                className="text-[#0B1F3A] font-bold hover:text-[#D4AF37]"
              >
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
