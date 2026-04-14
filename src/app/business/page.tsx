'use client';

import { addBusinessDays, format, isWeekend } from 'date-fns';
import { Briefcase, Calendar, Info, ChevronRight } from 'lucide-react';
import CalculatorCard from '@/components/CalculatorCard';

export default function BusinessPage() {
  const today = new Date();
  const isTodayWeekend = isWeekend(today);
  
  const examples = [
    { days: 5, label: '5 Business Days', description: 'Standard work week' },
    { days: 10, label: '10 Business Days', description: 'Two work weeks' },
    { days: 30, label: '30 Business Days', description: 'Common payment term' },
    { days: 45, label: '45 Business Days', description: 'Extended deadline' },
    { days: 60, label: '60 Business Days', description: 'Quarter period' },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-2xl mb-6">
            <Briefcase className="w-8 h-8 text-purple-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Business Days Calculator
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Calculate dates excluding weekends and holidays
          </p>
        </div>

        {/* Today Card */}
        <CalculatorCard className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <Calendar className="w-7 h-7 text-purple-400" />
            </div>
            <div>
              <div className="text-gray-400 text-sm">Today</div>
              <div className="text-2xl font-bold">{format(today, 'MMMM d, yyyy')}</div>
              <div className="text-gray-500 flex items-center gap-2">
                {format(today, 'EEEE')}
                {isTodayWeekend && (
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">Weekend</span>
                )}
              </div>
            </div>
          </div>
        </CalculatorCard>

        {/* Quick Reference Grid */}
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-purple-400" />
          Quick Reference
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {examples.map((example) => {
            const result = addBusinessDays(today, example.days);
            const calendarDays = Math.ceil((result.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={example.days} className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-purple-500/30 transition-all">
                <div className="text-gray-400 text-sm mb-1">{example.label}</div>
                <div className="text-xs text-gray-500 mb-3">{example.description}</div>
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {format(result, 'MMM d, yyyy')}
                </div>
                <div className="text-gray-500 text-sm">{format(result, 'EEEE')}</div>
                <div className="mt-3 pt-3 border-t border-gray-800 text-sm">
                  <span className="text-white font-semibold">{calendarDays}</span>
                  <span className="text-gray-400"> calendar days</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Card */}
        <CalculatorCard>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-400" />
            What are Business Days?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 text-sm">1</span>
                <span>Monday through Friday (excluding weekends)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 text-sm">2</span>
                <span>Federal holidays are typically excluded</span>
              </li>
            </ul>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 text-sm">3</span>
                <span>Used for legal deadlines and shipping estimates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 text-sm">4</span>
                <span>Common in contracts: Payment due within 30 business days</span>
              </li>
            </ul>
          </div>
        </CalculatorCard>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Calculator
          </a>
        </div>
      </div>
    </main>
  );
}
