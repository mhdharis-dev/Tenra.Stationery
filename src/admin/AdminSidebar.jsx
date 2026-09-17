import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Grid, 
  Image as ImageIcon, 
  Mail, 
  Settings, 
  ExternalLink, 
  LogOut, 
  X
} from 'lucide-react';
import { Modal } from '../components/Modal';

export function AdminSidebar({ isOpen, onClose, onLogout }) {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Collections', path: '/admin/collections', icon: Grid },
    { name: 'Media Library', path: '/admin/media', icon: ImageIcon },
    { name: 'Messages', path: '/admin/messages', icon: Mail },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleConfirmLogout = () => {
    setLogoutModalOpen(false);
    if (onLogout) onLogout();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0B1F3A]/60 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-60 bg-[#0B1F3A] text-white flex flex-col justify-between transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Brand Header */}
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-widest text-sm text-white">
                TENRA
              </span>
              <span className="text-[10px] font-mono bg-[#D4AF37] text-[#0B1F3A] px-1.5 py-0.5 font-bold uppercase">
                ADMIN
              </span>
            </div>
            <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.exact}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 text-xs font-semibold rounded-none transition-colors ${
                      isActive
                        ? 'bg-[#D4AF37] text-[#0B1F3A] font-bold shadow-xs'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View Customer Site
            </span>
          </Link>

          <button
            onClick={() => setLogoutModalOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-300 hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Logout Dialog Modal */}
      <Modal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        title="Sign Out of TENRA Control Center"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to sign out? This will clear the device session and require login on your next admin visit.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setLogoutModalOpen(false)}
              className="px-4 py-2 text-xs font-bold border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmLogout}
              className="px-4 py-2 text-xs font-bold bg-red-600 text-white hover:bg-red-700"
            >
              Confirm Sign Out
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
