'use client';

import { ReactNode } from 'react';

interface ResultDisplayProps {
  label: string;
  value: string;
  subtext?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export default function ResultDisplay({ 
  label, 
  value, 
  subtext,
  variant = 'default' 
}: ResultDisplayProps) {
  const variantStyles = {
    default: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    success: 'bg-green-500/10 border-green-500/30 text-green-400',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
  };

  return (
    <div className={`rounded-xl p-5 border ${variantStyles[variant]} text-center`}>
      <div className="text-sm text-gray-400 mb-2">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
      {subtext && <div className="text-sm mt-1 opacity-80">{subtext}</div>}
    </div>
  );
}
