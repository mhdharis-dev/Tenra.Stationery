import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, Layers, FileText, Mail, Plus, ArrowRight, Activity } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useMessages } from '../hooks/useMessages';
import { formatPrice } from '../utils/formatPrice';

export function Dashboard() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { categories } = useCategories();
  const { messages } = useMessages();

  const stats = [
    { label: 'Products', value: `${products.length} Items`, note: 'Demo Inventory', icon: Package, color: 'text-blue-600', link: '/admin/products' },
    { label: 'Categories', value: `${categories.length}`, note: 'Active Lines', icon: Layers, color: 'text-[#D4AF37]', link: '/admin/categories' },
    { label: 'Drafts', value: '3 Items', note: 'Future Releases', icon: FileText, color: 'text-purple-600', link: '/admin/products' },
    { label: 'Messages', value: `${messages.length}`, note: 'Demo Submissions', icon: Mail, color: 'text-emerald-600', link: '/admin/messages' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="bg-white border border-gray-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block mb-1">
            CONTROL CENTER
          </span>
          <h1 className="text-2xl font-extrabold text-[#0B1F3A]">
            Good morning, TENRA Admin
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Overview of store catalog, category structures, and local frontend mock state.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/products/new')}
            className="inline-flex items-center gap-1.5 bg-[#0B1F3A] text-white text-xs font-bold px-4 py-2 hover:bg-[#071325] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Stat Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              to={s.link}
              className="bg-white border border-gray-200 p-5 shadow-xs hover:border-[#D4AF37] transition-all block group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{s.label}</span>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="text-2xl font-extrabold text-[#0B1F3A] mb-1">{s.value}</div>
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>{s.note}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#0B1F3A] group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Catalog Items Table */}
        <div className="lg:col-span-8 bg-white border border-gray-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-[#0B1F3A] uppercase tracking-wider flex items-center gap-2">
              <Package className="w-4 h-4 text-[#D4AF37]" />
              <span>Recent Catalog Items</span>
            </h3>
            <Link to="/admin/products" className="text-xs font-bold text-[#0B1F3A] hover:text-[#D4AF37]">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F8F6] text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {products.slice(0, 5).map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-[#0B1F3A]">{p.name}</td>
                    <td className="p-3 text-gray-600">{p.category}</td>
                    <td className="p-3 text-gray-900 font-semibold">{formatPrice(p.price)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                        p.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick System Info Right */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-gray-200 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-[#0B1F3A] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#D4AF37]" />
              <span>Phase 2 Backend Integration</span>
            </h3>
            <div className="space-y-3 text-xs text-gray-600">
              <div className="p-3 bg-[#F8F8F6] border border-gray-200">
                <span className="font-bold text-[#0B1F3A] block">REST API Endpoints</span>
                <span className="text-[11px]">Structured hooks ready to plug into Express/Node backend.</span>
              </div>
              <div className="p-3 bg-[#F8F8F6] border border-gray-200">
                <span className="font-bold text-[#0B1F3A] block">Cloudinary Media</span>
                <span className="text-[11px]">Image inputs annotated for Cloudinary SDK integration.</span>
              </div>
              <div className="p-3 bg-[#F8F8F6] border border-gray-200">
                <span className="font-bold text-[#0B1F3A] block">Database Models</span>
                <span className="text-[11px]">Schemas align with PostgreSQL / MongoDB structures.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
