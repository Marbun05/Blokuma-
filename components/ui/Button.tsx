import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'font-bold rounded-2xl transition transform active:scale-95 flex items-center justify-center gap-2 shadow-sm';

  const variantClasses = {
    primary: 'bg-teal-500 hover:bg-teal-600 text-white shadow-teal-200',
    secondary: 'bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-amber-200',
    outline: 'border-2 border-slate-300 hover:border-teal-500 text-slate-700 hover:text-teal-600 bg-white',
    danger: 'bg-rose-500 hover:bg-rose-600 text-white',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
