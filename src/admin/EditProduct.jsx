import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, UploadCloud, Info } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Toast } from '../components/Toast';

export function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, updateProduct } = useProducts();
  const { categories } = useCategories();

  const product = getProductById(id);
  const [toastMessage, setToastMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    sku: '',
    status: 'active',
    featured: false,
    imageUrl: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'Pens',
        description: product.description || '',
        price: product.price !== null ? product.price.toString() : '',
        sku: product.sku || product.id,
        status: product.status || 'active',
        featured: !!product.featured,
        imageUrl: product.images?.[0] || ''
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="bg-white p-8 text-center space-y-4">
        <h2 className="text-lg font-bold text-[#0B1F3A]">Product Not Found</h2>
        <button
          onClick={() => navigate('/admin/products')}
          className="px-4 py-2 bg-[#0B1F3A] text-white text-xs font-bold"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Phase 2: Connect Cloudinary here.
    const imagesArray = formData.imageUrl ? [formData.imageUrl] : product.images;

    updateProduct(id, {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      price: formData.price ? parseFloat(formData.price) : null,
      sku: formData.sku,
      status: formData.status,
      featured: formData.featured,
      images: imagesArray
    });

    setToastMessage("Product updated.");
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
        <span className="text-xs font-mono text-gray-400">ID: {product.id}</span>
      </div>

      <div className="bg-white border border-gray-200 p-6 md:p-8 shadow-xs">
        <h1 className="text-xl font-extrabold text-[#0B1F3A] mb-6 pb-4 border-b border-gray-200 uppercase tracking-wide">
          Edit Product Details
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
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
                placeholder="28.00"
                className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none focus:border-[#0B1F3A]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
                SKU
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
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
                className="w-full p-3 bg-[#F8F8F6] border border-gray-200 font-semibold"
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
              className="w-full p-3 bg-[#F8F8F6] border border-gray-200 focus:outline-none focus:border-[#0B1F3A] resize-none"
            />
          </div>

          {/* Cloudinary Notice */}
          <div className="bg-[#F8F8F6] border border-gray-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0B1F3A] uppercase tracking-wider flex items-center gap-1.5">
                <UploadCloud className="w-4 h-4 text-[#D4AF37]" />
                <span>Image URL</span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono">Cloudinary Ready</span>
            </div>

            <div className="text-[11px] text-gray-600 bg-white p-2 border border-gray-200">
              // Phase 2: Connect Cloudinary here.
            </div>

            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full p-2.5 bg-white border border-gray-200"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="editFeatured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 accent-[#0B1F3A]"
            />
            <label htmlFor="editFeatured" className="font-bold text-gray-700">
              Featured Flagship Item
            </label>
          </div>

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
              <span>Update Product</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
