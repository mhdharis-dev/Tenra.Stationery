import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export function Toast({
  message,
  type = 'info',
  isOpen,
  onClose,
  duration = 4500
}) {
  useEffect(() => {
    if (isOpen && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[#D4AF37]" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-[#0B1F3A]" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in">
      <div className="bg-[#0B1F3A] text-white border-l-4 border-[#D4AF37] p-4 shadow-xl flex items-start gap-3 text-sm">
        <div className="shrink-0 mt-0.5">{icons[type] || icons.info}</div>
        <div className="flex-1 font-medium pr-2">{message}</div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
