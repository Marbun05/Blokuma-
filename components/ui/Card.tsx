import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition ${className}`}>
      {children}
    </div>
  );
}
