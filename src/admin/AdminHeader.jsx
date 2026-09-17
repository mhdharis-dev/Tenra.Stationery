import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, Home, ExternalLink } from 'lucide-react';

export function AdminHeader({ onToggleSidebar, userEmail }) {
  return (
    <header className="bg-white border-b border-gray-200 h-16 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
            TENRA Control Center
          </span>
          <span className="hidden sm:inline text-xs text-gray-400">|</span>
          <span className="hidden sm:inline text-xs text-gray-500 font-mono">Device Authenticated</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Shortcut to Customer Home Page */}
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs font-bold text-[#0B1F3A] bg-[#F8F8F6] border border-gray-200 px-3 py-1.5 hover:bg-[#0B1F3A] hover:text-white transition-colors"
          title="Return to Customer Homepage"
        >
          <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="hidden sm:inline">User Home Page</span>
          <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-white" />
        </Link>

        {/* User Badge */}
        <div className="flex items-center gap-2 bg-[#F8F8F6] border border-gray-200 px-3 py-1.5 text-xs text-gray-700">
          <User className="w-3.5 h-3.5 text-[#0B1F3A]" />
          <span className="font-bold truncate max-w-[140px] sm:max-w-[180px]">{userEmail || 'Store Admin'}</span>
        </div>
      </div>
    </header>
  );
}
