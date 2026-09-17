import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminLogin } from './AdminLogin';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function AdminLayout() {
  const [auth, setAuth] = useLocalStorage('tenra_admin_auth', null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // If device is not authenticated, show Admin Login Page
  if (!auth || !auth.isAuthenticated) {
    return <AdminLogin onLoginSuccess={(authData) => setAuth(authData)} />;
  }

  const handleLogout = () => {
    setAuth(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col font-sans text-gray-900">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <AdminSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          onLogout={handleLogout}
        />

        {/* Main Content Workspace */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <AdminHeader 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            userEmail={auth.email} 
          />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
