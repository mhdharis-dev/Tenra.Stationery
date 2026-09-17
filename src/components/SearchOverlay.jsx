import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';

export function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const { products } = useProducts();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(query.toLowerCase())) ||
        (p.sku && p.sku.toLowerCase().includes(query.toLowerCase()))
      );

  const handleSelectProduct = (productId) => {
    onClose();
    navigate(`/products/${productId}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B1F3A]/70 backdrop-blur-xs flex flex-col justify-start pt-16 md:pt-24 px-4 sm:px-6">
      <div 
        className="bg-white w-full max-w-3xl mx-auto shadow-2xl border border-[#E6E8EB] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E6E8EB] bg-[#F8F8F6]">
          <Search className="w-5 h-5 text-[#0B1F3A]/70 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stationery by name, category, or keyword..."
            className="w-full bg-transparent text-[#111827] text-base md:text-lg focus:outline-none placeholder:text-gray-400 font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-[#0B1F3A] transition-colors rounded-none"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {query.trim() === '' ? (
            <div className="text-center py-8">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 mb-4">
                Popular Searches
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Notebooks', 'Fountain Pen', 'Graphite Pencils', 'Geometry', 'Erasers'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-3 py-1.5 bg-[#F8F8F6] border border-[#E6E8EB] text-[#0B1F3A] hover:border-[#D4AF37] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#0B1F3A]/70">
                Found {filteredProducts.length} matching items
              </p>
              <div className="divide-y divide-[#E6E8EB]">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    className="py-3 flex items-center justify-between group cursor-pointer hover:bg-[#F8F8F6] px-3 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {product.images?.[0] && (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover border border-[#E6E8EB]"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                            {product.category}
                          </span>
                          {product.status === 'coming-soon' && (
                            <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 font-medium">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-[#0B1F3A] group-hover:text-[#D4AF37] transition-colors">
                          {product.name}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-[#111827]">
                        {formatPrice(product.price)}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0B1F3A] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-[#0B1F3A] font-semibold mb-1">No stationery items found</p>
              <p className="text-xs text-gray-500">
                Try searching for 'Pen', 'Notebook', 'Pencil', or 'Geometry'
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-[#F8F8F6] px-6 py-2.5 border-t border-[#E6E8EB] flex items-center justify-between text-xs text-gray-400">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border text-gray-600 font-mono text-[10px]">ESC</kbd> to exit search</span>
          <span>TENRA Local Search</span>
        </div>
      </div>
    </div>
  );
}
