import React from 'react';
import { X, ShoppingBag, ArrowRight, Info, Trash2 } from 'lucide-react';
import { Button } from './Button';
import { formatPrice } from '../utils/formatPrice';

export function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = typeof item.price === 'number' ? item.price : 0;
    return acc + (itemPrice * item.quantity);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-[#0B1F3A]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E6E8EB] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#E6E8EB] flex items-center justify-between bg-[#F8F8F6]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0B1F3A]" />
              <h2 className="text-base font-bold text-[#0B1F3A] tracking-tight uppercase">
                Your Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-[#0B1F3A] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Phase 2 Informational Banner */}
          <div className="bg-[#0B1F3A] text-white text-xs px-6 py-3 flex items-start gap-2 border-b border-[#D4AF37]/30">
            <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong className="text-[#D4AF37]">Phase 1 Demonstration:</strong> Bag functionality uses local state. Checkout & payment gateways will connect in Phase 2.
            </p>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3 stroke-[1.5]" />
                <h3 className="text-sm font-bold text-[#0B1F3A] mb-1">Your bag is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto mb-6">
                  Explore our stationery collections to select your study essentials.
                </p>
                <Button size="sm" onClick={onClose}>
                  Explore Collections
                </Button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-[#E6E8EB]">
                  {item.images?.[0] && (
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 object-cover border border-[#E6E8EB]"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-[#0B1F3A] truncate">{item.name}</h4>
                    <p className="text-xs font-semibold text-gray-900 mt-1">
                      {formatPrice(item.price)}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#E6E8EB]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-[#F8F8F6]"
                        >
                          -
                        </button>
                        <span className="px-3 py-0.5 text-xs font-semibold text-[#0B1F3A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-[#F8F8F6]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#E6E8EB] bg-[#F8F8F6]">
              <div className="flex items-center justify-between mb-4 text-sm font-bold text-[#0B1F3A]">
                <span>Estimated Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="text-[11px] text-gray-500 mb-4">
                Taxes and shipping calculated in Phase 2 checkout portal.
              </p>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => alert("Shopping & checkout functionality will be available in Phase 2.")}
              >
                Proceed to Checkout (Demo)
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
