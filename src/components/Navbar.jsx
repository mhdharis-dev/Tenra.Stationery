import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ArrowRight, Home } from 'lucide-react';
import { Button } from './Button';

export function Navbar({ onOpenSearch, onOpenCart, cartCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories/all' },
    { name: 'Our Story', path: '/story' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/categories/all') return location.pathname.startsWith('/categories');
    return location.pathname === path;
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-[#E6E8EB] shadow-xs py-3' : 'bg-white border-b border-[#E6E8EB]/70 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group" title="TENRA Stationery Home">
            <img
              src="/tenra-logo.png"
              alt="TENRA STATIONERY"
              className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-semibold uppercase tracking-[0.14em] transition-colors relative py-1 hover-gold-line ${
                  isActive(link.path)
                    ? 'text-[#0B1F3A] font-extrabold border-b-2 border-[#D4AF37]'
                    : 'text-[#667085] hover:text-[#0B1F3A]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#0B1F3A] hover:text-[#D4AF37] transition-colors focus:outline-none"
              aria-label="Search stationery"
              title="Search (Cmd/Ctrl + K)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={onOpenCart}
              className="p-2 text-[#0B1F3A] hover:text-[#D4AF37] transition-colors relative focus:outline-none"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4AF37] text-[#0B1F3A] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Explore Button (Desktop) */}
            <div className="hidden lg:block pl-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/products')}
              >
                Explore
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#0B1F3A] hover:text-[#D4AF37] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Side / Drawer Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] z-50 bg-[#0B1F3A]/95 backdrop-blur-md text-white flex flex-col justify-between p-6 animate-fade-in">
          <div className="space-y-6 pt-4">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37] mb-2">
              Navigation Menu
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl font-bold tracking-tight py-2 border-b border-white/10 flex items-center justify-between ${
                    isActive(link.path) ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.name === 'Home' && <Home className="w-5 h-5 text-[#D4AF37]" />}
                    {link.name}
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/15 space-y-4">
            <Button
              variant="accent"
              className="w-full justify-center"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/products');
              }}
            >
              Explore Collection
            </Button>
            <div className="text-center text-[11px] text-white/60">
              TENRA STATIONERY • Write Your Future.
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
