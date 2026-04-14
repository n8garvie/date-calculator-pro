'use client';

import { ReactNode } from 'react';

interface CalculatorCardProps {
  children: ReactNode;
  className?: string;
}

export default function CalculatorCard({ children, className = '' }: CalculatorCardProps) {
  return (
    <div className={`bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg ${className}`}>
      {children}
    </div>
  );
}
