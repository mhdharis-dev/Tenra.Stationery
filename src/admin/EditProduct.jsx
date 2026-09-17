import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, UploadCloud, Info, FileUp, X, Check } from 'lucide-react';
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
  const [uploadMode, setUploadMode] = useState('file'); // 'file' | 'url'
  const [imagePreview, setImagePreview] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

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
      const initialImg = product.images?.[0] || '';
      setFormData({
        name: product.name || '',
        category: product.category || 'Pens',
        description: product.description || '',
        price: product.price !== null ? product.price.toString() : '',
        sku: product.sku || product.id,
        status: product.status || 'active',
        featured: !!product.featured,
        imageUrl: initialImg
      });
      setImagePreview(initialImg);
    }
  }, [product]);

  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP, GIF)');
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const clearDeviceImage = () => {
    setImagePreview('');
    setFileName('');
    setFormData((prev) => ({ ...prev, imageUrl: '' }));
  };

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

    // Phase 2: Connect Cloudinary / Storage API here.
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

          {/* Product Image Section (Device File Upload + URL) */}
          <div className="bg-[#F8F8F6] border border-gray-200 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200">
              <span className="font-bold text-[#0B1F3A] uppercase tracking-wider flex items-center gap-1.5">
                <UploadCloud className="w-4 h-4 text-[#D4AF37]" />
                <span>Product Image</span>
              </span>
              <div className="flex items-center gap-2 bg-white p-1 border border-gray-200 rounded-none text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setUploadMode('file')}
                  className={`px-3 py-1 transition-colors ${
                    uploadMode === 'file'
                      ? 'bg-[#0B1F3A] text-white'
                      : 'text-gray-600 hover:text-[#0B1F3A]'
                  }`}
                >
                  Upload from Device
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('url')}
                  className={`px-3 py-1 transition-colors ${
                    uploadMode === 'url'
                      ? 'bg-[#0B1F3A] text-white'
                      : 'text-gray-600 hover:text-[#0B1F3A]'
                  }`}
                >
                  Image URL
                </button>
              </div>
            </div>

            {/* Architectural Comment / Storage Notice */}
            <div className="text-[11px] text-gray-600 bg-white p-2.5 border border-gray-200 flex items-start gap-2">
              <Info className="w-4 h-4 text-[#0B1F3A] shrink-0 mt-0.5" />
              <span>
                // Phase 2 Architecture: File uploads convert to base64 Data URLs for local browser storage. Ready for Cloudinary / Firebase Storage API integration.
              </span>
            </div>

            {uploadMode === 'file' ? (
              <div className="space-y-3">
                {imagePreview ? (
                  <div className="relative group border border-gray-300 bg-white p-3 flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={imagePreview}
                      alt="Device Preview"
                      className="w-24 h-24 object-cover border border-gray-200 bg-gray-50"
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-bold text-[#0B1F3A] truncate">{fileName || 'Product Image'}</p>
                      <p className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Image preview active
                      </p>
                      <button
                        type="button"
                        onClick={clearDeviceImage}
                        className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                      >
                        <X className="w-3 h-3" /> Remove / Change Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors bg-white ${
                      isDragging ? 'border-[#0B1F3A] bg-blue-50/50' : 'border-gray-300 hover:border-[#0B1F3A]'
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      id="edit-device-image-input"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="edit-device-image-input" className="cursor-pointer flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-[#F8F8F6] flex items-center justify-center border border-gray-200">
                        <FileUp className="w-6 h-6 text-[#0B1F3A]" />
                      </div>
                      <div>
                        <span className="font-bold text-[#0B1F3A] hover:underline">Click to upload from device</span>
                        <span className="text-gray-500 font-normal"> or drag and drop</span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-mono">PNG, JPG, WEBP, GIF up to 10MB</p>
                    </label>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, imageUrl: e.target.value });
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full p-2.5 bg-white border border-gray-200 focus:outline-none focus:border-[#0B1F3A]"
                />
                {formData.imageUrl && (
                  <div className="flex items-center gap-3 p-2 bg-white border border-gray-200">
                    <img
                      src={formData.imageUrl}
                      alt="URL Preview"
                      className="w-12 h-12 object-cover border border-gray-200"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span className="text-[11px] text-gray-500 font-mono truncate">{formData.imageUrl}</span>
                  </div>
                )}
              </div>
            )}
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
