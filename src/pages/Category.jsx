import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SectionLabel } from '../components/SectionLabel';
import { ProductCard } from '../components/ProductCard';
import { useCategories } from '../hooks/useCategories';
import { useProducts } from '../hooks/useProducts';
import { ArrowLeft } from 'lucide-react';

export function Category() {
  const { category: categorySlug } = useParams();
  const { categories } = useCategories();
  const { getProductsByCategory, products } = useProducts();

  const isAll = !categorySlug || categorySlug === 'all';
  const categoryData = categories.find(c => c.slug.toLowerCase() === categorySlug?.toLowerCase());

  const categoryProducts = isAll ? products : getProductsByCategory(categorySlug);

  return (
    <div className="bg-white min-h-screen py-12 md:py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#667085] hover:text-[#0B1F3A] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Categories</span>
        </Link>

        {/* Category Header */}
        <div className="bg-[#F8F8F6] border border-[#E6E8EB] p-8 md:p-12 mb-12">
          <SectionLabel number="CAT" label={isAll ? "Complete Lineup" : "Category Focus"} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] tracking-tight mt-2">
            {isAll ? "All Collections" : categoryData?.name || categorySlug}
          </h1>
          <p className="text-sm sm:text-base text-[#667085] mt-3 max-w-xl">
            {categoryData?.description || "Explore curated tools crafted for clarity, focus, and precision."}
          </p>
        </div>

        {/* Product Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categoryProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-[#F8F8F6] border border-[#E6E8EB] p-12 text-center max-w-md mx-auto">
            <h3 className="text-base font-bold text-[#0B1F3A] mb-2">No items in this category yet</h3>
            <p className="text-xs text-[#667085] mb-6">
              This line is currently under preparation for future study releases.
            </p>
            <Link
              to="/products"
              className="inline-block text-xs font-bold text-[#0B1F3A] border border-[#0B1F3A] px-4 py-2 hover:bg-[#0B1F3A] hover:text-white transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
