import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from '../components/SectionLabel';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { useProducts } from '../hooks/useProducts';

export function FeaturedProducts() {
  const { products } = useProducts();
  const navigate = useNavigate();

  // Get active featured products
  const featuredItems = products.filter(p => p.featured || p.status === 'active').slice(0, 6);

  return (
    <section className="bg-[#F8F8F6] border-b border-[#E6E8EB] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 space-y-4 sm:space-y-0">
          <div>
            <SectionLabel number="04" label="FLAGSHIP CATALOG" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mt-2">
              Selected Essentials
            </h2>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/products')}
            icon={ArrowRight}
          >
            View Entire Line
          </Button>
        </div>

        {/* Product Cards Grid */}
        {featuredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredItems.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E6E8EB] p-12 text-center max-w-lg mx-auto">
            <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">Collection Coming Soon</h3>
            <p className="text-xs text-[#667085] mb-6">
              Our flagship stationery items are currently being prepared for the upcoming study cycle.
            </p>
            <Button size="sm" onClick={() => navigate('/coming-soon')}>
              Explore Future Collections
            </Button>
          </div>
        )}

      </div>
    </section>
  );
}
