import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, UploadCloud, Info } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Toast } from '../components/Toast';

export function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const { categories } = useCategories();

  const [toastMessage, setToastMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0]?.name || 'Pens',
    description: '',
    price: '',
    sku: '',
    status: 'active',
    featured: false,
    imageUrl: '',
    specDimensions: '',
    specMaterial: '',
    specPages: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    // Phase 2: Connect Cloudinary here.
    // Upload image to Cloudinary API and return secure_url before saving product payload.
    const imagesArray = formData.imageUrl ? [formData.imageUrl] : [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000"
    ];

    const specs = {};
    if (formData.specDimensions) specs["Dimensions"] = formData.specDimensions;
    if (formData.specMaterial) specs["Material"] = formData.specMaterial;
    if (formData.specPages) specs["Details"] = formData.specPages;

    addProduct({
      name: formData.name,
      category: formData.category,
      description: formData.description,
      price: formData.price ? parseFloat(formData.price) : null,
      sku: formData.sku || `TNR-${Math.floor(100 + Math.random() * 900)}`,
      status: formData.status,
      featured: formData.featured,
      images: imagesArray,
      specifications: specs
    });

    setToastMessage("Product created and saved to local state.");
    setTimeout(() => {
      navigate('/admin/products');
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <Toast
        isOpen={!!toastMessage}
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage('')}
      />

      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/products')}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#0B1F3A]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>
        <span className="text-xs font-mono text-gray-400">Phase 1 Product Form</span>
      </div>

      <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-xs">
        <h1 className="text-xl font-extrabold text-[#0B1F3A] mb-6 pb-4 border-b border-gray-200 uppercase tracking-wide">
          Add New Stationery Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. TENRA Precision Fountain Pen"
                className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none focus:border-[#0B1F3A]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none focus:border-[#0B1F3A] font-semibold"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="28.00 (leave blank for Coming Soon)"
                className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none focus:border-[#0B1F3A]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
                SKU Number
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="e.g. TNR-PN-002"
                className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none focus:border-[#0B1F3A]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none focus:border-[#0B1F3A] font-semibold"
              >
                <option value="active">Active (Available)</option>
                <option value="coming-soon">Coming Soon</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description, paper gsm, material details..."
              className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none focus:border-[#0B1F3A] resize-none"
            />
          </div>

          {/* Cloudinary Image Section */}
          <div className="bg-[#F8F8F6] border border-gray-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0B1F3A] uppercase tracking-wider flex items-center gap-1.5">
                <UploadCloud className="w-4 h-4 text-[#D4AF37]" />
                <span>Product Image URL</span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono">Cloudinary Ready</span>
            </div>

            {/* Architectural Code Comment Notification */}
            <div className="text-[11px] text-gray-600 bg-white p-2.5 border border-gray-200 flex items-start gap-2">
              <Info className="w-4 h-4 text-[#0B1F3A] shrink-0 mt-0.5" />
              <span>
                // Phase 2: Connect Cloudinary here. Simulate preview using direct image URL or uncheck for default Unsplash preview asset.
              </span>
            </div>

            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full p-2.5 bg-white border border-gray-200 focus:outline-none focus:border-[#0B1F3A]"
            />
          </div>

          {/* Specifications */}
          <div className="space-y-4 pt-2">
            <h3 className="font-bold uppercase tracking-wider text-[#0B1F3A]">
              Specifications (Optional)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                value={formData.specDimensions}
                onChange={(e) => setFormData({ ...formData, specDimensions: e.target.value })}
                placeholder="Dimensions (e.g. A5 148x210mm)"
                className="p-2.5 bg-[#F8F8F6] border border-gray-200"
              />
              <input
                type="text"
                value={formData.specMaterial}
                onChange={(e) => setFormData({ ...formData, specMaterial: e.target.value })}
                placeholder="Material (e.g. Milled Brass)"
                className="p-2.5 bg-[#F8F8F6] border border-gray-200"
              />
              <input
                type="text"
                value={formData.specPages}
                onChange={(e) => setFormData({ ...formData, specPages: e.target.value })}
                placeholder="Details (e.g. 192 numbered pages)"
                className="p-2.5 bg-[#F8F8F6] border border-gray-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 accent-[#0B1F3A]"
            />
            <label htmlFor="featured" className="font-bold text-gray-700">
              Mark as Featured Flagship Item on Homepage
            </label>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-5 py-2.5 text-xs font-bold border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold bg-[#0B1F3A] text-white hover:bg-[#071325]"
            >
              <Save className="w-4 h-4" />
              <span>Save Product</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
