import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Trash2, Eye, RefreshCw } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Modal } from '../components/Modal';
import { Toast } from '../components/Toast';
import { formatPrice } from '../utils/formatPrice';

export function Products() {
  const navigate = useNavigate();
  const { products, deleteProduct, resetToDefault } = useProducts();
  const { categories } = useCategories();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [deleteModalId, setDeleteModalId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesQuery = searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === 'all' ||
      p.categorySlug?.toLowerCase() === categoryFilter.toLowerCase() ||
      p.category?.toLowerCase() === categoryFilter.toLowerCase();

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

    return matchesQuery && matchesCategory && matchesStatus;
  });

  const handleDeleteConfirm = () => {
    if (deleteModalId) {
      deleteProduct(deleteModalId);
      setDeleteModalId(null);
      setToastMessage("Product successfully deleted from local storage.");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Toast
        isOpen={!!toastMessage}
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage('')}
      />

      {/* Header Toolbar */}
      <div className="bg-white border border-gray-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0B1F3A] uppercase tracking-wide">
            Product Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage catalog items, prices, specifications, and availability status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/products/new')}
            className="inline-flex items-center gap-1.5 bg-[#0B1F3A] text-white text-xs font-bold px-4 py-2 hover:bg-[#071325] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white border border-gray-200 p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name or SKU..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F8F8F6] border border-gray-200 focus:outline-none focus:border-[#0B1F3A]"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-[#F8F8F6] border border-gray-200 font-medium text-gray-800"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-[#F8F8F6] border border-gray-200 font-medium text-gray-800"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="coming-soon">Coming Soon</option>
          </select>

          <button
            onClick={resetToDefault}
            title="Reset to default mock products"
            className="p-2 border border-gray-200 text-gray-600 hover:text-[#0B1F3A] hover:bg-gray-100"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-200 shadow-xs overflow-hidden">
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F8F6] text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="p-3.5 w-16">Image</th>
                  <th className="p-3.5">Product Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">SKU</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-3.5">
                      <img
                        src={p.images?.[0] || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=200"}
                        alt=""
                        className="w-10 h-10 object-cover border border-gray-200 bg-gray-100"
                      />
                    </td>
                    <td className="p-3.5 font-bold text-[#0B1F3A]">
                      {p.name}
                      {p.featured && (
                        <span className="ml-2 text-[9px] bg-[#D4AF37] text-[#0B1F3A] font-extrabold px-1.5 py-0.5 uppercase">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-gray-600">{p.category}</td>
                    <td className="p-3.5 font-bold text-gray-900">{formatPrice(p.price)}</td>
                    <td className="p-3.5 font-mono text-gray-400">{p.sku || p.id}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                        p.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/products/${p.id}`)}
                          className="p-1 text-gray-500 hover:text-[#0B1F3A]"
                          title="View on site"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                          className="p-1 text-gray-500 hover:text-blue-600"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteModalId(p.id)}
                          className="p-1 text-gray-500 hover:text-red-600"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500 space-y-3">
            <p className="text-sm font-bold text-[#0B1F3A]">No products found.</p>
            <p className="text-xs text-gray-400">Your first TENRA collection can start here.</p>
            <button
              onClick={() => navigate('/admin/products/new')}
              className="inline-flex items-center gap-2 bg-[#0B1F3A] text-white text-xs font-bold px-4 py-2 hover:bg-[#071325]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteModalId}
        onClose={() => setDeleteModalId(null)}
        title="Confirm Delete Product"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to remove this product item from the local catalog state?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setDeleteModalId(null)}
              className="px-4 py-2 text-xs font-bold border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-4 py-2 text-xs font-bold bg-red-600 text-white hover:bg-red-700"
            >
              Delete Product
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
