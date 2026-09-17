import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('admin@tenrastationery.com');
  const [password, setPassword] = useState('tenra2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // Demo authentication logic
      if (email.trim() === '' || password.trim() === '') {
        setError('Please provide both email address and password.');
        setLoading(false);
        return;
      }

      // Simple validation for demo
      if (password.length < 4) {
        setError('Invalid password. Minimum 4 characters required.');
        setLoading(false);
        return;
      }

      // Save authenticated session in localStorage (cached per device)
      const authData = {
        isAuthenticated: true,
        email: email,
        loginTime: new Date().toISOString()
      };
      
      onLoginSuccess(authData);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0B1F3A] flex flex-col justify-center items-center p-4 font-sans text-white relative overflow-hidden">
      {/* Background Motifs */}
      <div className="absolute inset-0 bg-paper-lines opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white text-[#111827] shadow-2xl border border-[#D4AF37]/40 p-8 sm:p-10 relative z-10 animate-fade-in">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <img
            src="/tenra-logo.png"
            alt="TENRA STATIONERY"
            className="h-10 mx-auto mb-3 object-contain"
          />
          <span className="text-[10px] font-mono uppercase font-bold tracking-[0.25em] bg-[#0B1F3A] text-[#D4AF37] px-3 py-1 inline-block">
            ADMIN CONTROL CENTER
          </span>
          <p className="text-xs text-gray-500 mt-3">
            Enter your credentials to access store management tools.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div>
            <label className="block font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tenrastationery.com"
                className="w-full pl-9 pr-4 py-3 bg-[#F8F8F6] border border-[#E6E8EB] focus:outline-none focus:border-[#0B1F3A] font-medium text-sm text-[#0B1F3A]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-3 bg-[#F8F8F6] border border-[#E6E8EB] focus:outline-none focus:border-[#0B1F3A] font-medium text-sm text-[#0B1F3A]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B1F3A] text-white py-3.5 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-[#071325] transition-colors shadow-md disabled:opacity-50"
          >
            {loading ? (
              <span>Verifying Credentials...</span>
            ) : (
              <>
                <span>Sign In to Control Center</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </>
            )}
          </button>
        </form>

        {/* Demo Hint Footer */}
        <div className="mt-8 pt-6 border-t border-[#E6E8EB] text-center text-[11px] text-gray-400 space-y-1">
          <div className="flex items-center justify-center gap-1 text-[#0B1F3A] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Device Cached Authentication</span>
          </div>
          <p className="text-[10px] text-gray-400">
            Default credentials pre-filled for Phase 1 demo.
          </p>
        </div>

      </div>
    </div>
  );
}
