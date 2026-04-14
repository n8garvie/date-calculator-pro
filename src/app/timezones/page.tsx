'use client';

import { useState } from 'react';
import { format, addHours } from 'date-fns';
import { Clock, Globe, ChevronRight } from 'lucide-react';
import CalculatorCard from '@/components/CalculatorCard';

const timezones = [
  { name: 'UTC', offset: 0, city: 'London' },
  { name: 'EST', offset: -5, city: 'New York' },
  { name: 'CST', offset: -6, city: 'Chicago' },
  { name: 'MST', offset: -7, city: 'Denver' },
  { name: 'PST', offset: -8, city: 'Los Angeles' },
  { name: 'GMT', offset: 0, city: 'London' },
  { name: 'CET', offset: 1, city: 'Paris' },
  { name: 'JST', offset: 9, city: 'Tokyo' },
  { name: 'AEST', offset: 10, city: 'Sydney' },
];

export default function TimezonesPage() {
  const [selectedTime, setSelectedTime] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
  const [baseTimezone, setBaseTimezone] = useState('EST');

  const getTimeInZone = (targetOffset: number) => {
    const baseZone = timezones.find((z) => z.name === baseTimezone);
    if (!baseZone) return new Date(selectedTime);
    
    const diff = targetOffset - baseZone.offset;
    return addHours(new Date(selectedTime), diff);
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-2xl mb-6">
            <Globe className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Timezone Converter
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Convert times across multiple time zones instantly
          </p>
        </div>

        {/* Input Card */}
        <CalculatorCard className="mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Date & Time</label>
              <input
                type="datetime-local"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Base Timezone</label>
              <select
                value={baseTimezone}
                onChange={(e) => setBaseTimezone(e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                {timezones.map((tz) => (
                  <option key={tz.name} value={tz.name}>
                    {tz.name} ({tz.city})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CalculatorCard>

        {/* Timezone Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {timezones.map((tz) => {
            const time = getTimeInZone(tz.offset);
            const isBase = tz.name === baseTimezone;
            
            return (
              <div
                key={tz.name}
                className={`rounded-xl p-5 border transition-all ${
                  isBase
                    ? 'bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-500/10'
                    : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold">{tz.name}</span>
                  <span className="text-sm text-gray-400">{tz.city}</span>
                </div>
                <div className="text-3xl font-bold mb-1">
                  {format(time, 'h:mm a')}
                </div>
                <div className="text-gray-400 text-sm">
                  {format(time, 'EEEE, MMM d')}
                </div>
                {isBase && (
                  <div className="mt-3 inline-flex items-center gap-1 text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                    <Clock className="w-3 h-3" />
                    Base timezone
                  </div>
                )}
              </div>
            );
          })}
        </div>

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
