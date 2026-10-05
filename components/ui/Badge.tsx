import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'teal' | 'amber' | 'mint' | 'blue' | 'purple';
}

export function Badge({ children, color = 'teal' }: BadgeProps) {
  const colorClasses = {
    teal: 'bg-teal-100 text-teal-800 border-teal-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    mint: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    blue: 'bg-sky-100 text-sky-800 border-sky-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${colorClasses[color]}`}>
      {children}
    </span>
  );
}
