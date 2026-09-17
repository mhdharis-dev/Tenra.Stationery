import React from 'react';

/**
 * Reusable TENRA button component.
 * Variants: 'primary' (Navy), 'secondary' (Navy outline), 'accent' (Gold), 'ghost' (Text only)
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon = null,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-none transition-tenra relative focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]/20 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide';
  
  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-sm md:text-base px-7 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-[#0B1F3A] text-white hover:bg-[#071325] border border-[#0B1F3A] shadow-sm hover:shadow-md',
    secondary: 'bg-transparent text-[#0B1F3A] border border-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white',
    accent: 'bg-[#D4AF37] text-[#0B1F3A] hover:bg-[#c4a028] border border-[#D4AF37] font-bold',
    outlineGold: 'bg-transparent text-[#0B1F3A] border border-[#D4AF37] hover:bg-[#D4AF37]/10',
    ghost: 'bg-transparent text-[#0B1F3A] hover:text-[#D4AF37] p-0'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
      <span>{children}</span>
    </button>
  );
}
