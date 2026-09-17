import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchOverlay } from './components/SearchOverlay';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';

// Customer Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Category } from './pages/Category';
import { About } from './pages/About';
import { Story } from './pages/Story';
import { Contact } from './pages/Contact';
import { ComingSoon } from './pages/ComingSoon';
import { NotFound } from './pages/NotFound';

// Admin Panel Layout & Pages
import { AdminLayout } from './admin/AdminLayout';
import { Dashboard } from './admin/Dashboard';
import { Products as AdminProducts } from './admin/Products';
import { AddProduct } from './admin/AddProduct';
import { EditProduct } from './admin/EditProduct';
import { Categories as AdminCategories } from './admin/Categories';
import { Collections } from './admin/Collections';
import { Media } from './admin/Media';
import { Messages } from './admin/Messages';
import { Settings } from './admin/Settings';

export function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Search & Cart Overlay State
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setToastMessage(`"${product.name}" added to your bag.`);
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#0B1F3A] selection:text-white">
      {/* Toast Notification */}
      <Toast
        isOpen={!!toastMessage}
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage('')}
      />

      {/* Render Customer Navbar on Non-Admin Routes */}
      {!isAdminRoute && (
        <Navbar
          onOpenSearch={() => setSearchOpen(true)}
          onOpenCart={() => setCartOpen(true)}
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        />
      )}

      {/* Global Overlays */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Routing Switch */}
      <div className="flex-1">
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetails onAddToCart={handleAddToCart} />} />
          <Route path="/categories/:category" element={<Category />} />
          <Route path="/about" element={<About />} />
          <Route path="/story" element={<Story />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/coming-soon" element={<ComingSoon />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="collections" element={<Collections />} />
            <Route path="media" element={<Media />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Render Customer Footer on Non-Admin Routes */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}
export default App;
