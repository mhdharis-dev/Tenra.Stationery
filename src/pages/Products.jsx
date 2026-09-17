import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionLabel } from '../components/SectionLabel';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Search, Filter, RefreshCw } from 'lucide-react';

export function Products() {
  const { products } = useProducts();
  const { categories } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProducts = products.filter(product => {
    // Category filter
    const matchesCategory = selectedCategory === 'all' || 
      product.categorySlug?.toLowerCase() === selectedCategory.toLowerCase() ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase();

    // Query search
    const matchesQuery = searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;

    return matchesCategory && matchesQuery && matchesStatus;
  });

  const handleCategorySelect = (slug) => {
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-white min-h-screen py-12 md:py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 pb-8 border-b border-[#E6E8EB]">
          <SectionLabel number="01" label="COMPLETE LINEUP" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] tracking-tight mt-2">
            TENRA Catalog
          </h1>
          <p className="text-sm text-[#667085] mt-2 max-w-xl">
            Explore our complete suite of minimal, precision-crafted academic and creative stationery tools.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter products..."
              className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-[#F8F8F6] border border-[#E6E8EB] focus:outline-none focus:border-[#0B1F3A]"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs md:text-sm bg-[#F8F8F6] border border-[#E6E8EB] focus:outline-none font-medium text-[#0B1F3A]"
            >
              <option value="all">All Availability Statuses</option>
              <option value="active">Available Now</option>
              <option value="coming-soon">Coming Soon</option>
            </select>
          </div>

        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E6E8EB] scrollbar-none">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`text-xs px-4 py-2 font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#0B1F3A] text-white'
                : 'bg-[#F8F8F6] text-[#0B1F3A] hover:bg-[#E6E8EB]'
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.slug)}
              className={`text-xs px-4 py-2 font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedCategory.toLowerCase() === cat.slug.toLowerCase()
                  ? 'bg-[#0B1F3A] text-white'
                  : 'bg-[#F8F8F6] text-[#0B1F3A] hover:bg-[#E6E8EB]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-[#F8F8F6] border border-[#E6E8EB] p-12 text-center max-w-md mx-auto my-12">
            <h3 className="text-base font-bold text-[#0B1F3A] mb-2">No matching products found</h3>
            <p className="text-xs text-[#667085] mb-6">
              Try adjusting your category or search filter to discover items.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                handleCategorySelect('all');
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1F3A] border border-[#0B1F3A] px-4 py-2 hover:bg-[#0B1F3A] hover:text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
