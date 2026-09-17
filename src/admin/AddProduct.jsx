import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, UploadCloud, Info, FileUp, X, Check } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Toast } from '../components/Toast';

export function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const { categories } = useCategories();

  const [toastMessage, setToastMessage] = useState('');
  const [uploadMode, setUploadMode] = useState('file'); // 'file' | 'url'
  const [imagePreview, setImagePreview] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

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

            {/* Architectural Comment / Cloudinary Notice */}
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
                      <p className="font-bold text-[#0B1F3A] truncate">{fileName || 'Device Image'}</p>
                      <p className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Image loaded from device
                      </p>
                      <button
                        type="button"
                        onClick={clearDeviceImage}
                        className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                      >
                        <X className="w-3 h-3" /> Remove Image
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
                      id="device-image-input"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="device-image-input" className="cursor-pointer flex flex-col items-center gap-2">
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
