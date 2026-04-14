'use client';

import { useState } from 'react';
import { format, addDays, differenceInDays, addBusinessDays, isWeekend } from 'date-fns';
import { Calculator, ArrowRight, Briefcase, Calendar, Clock, ChevronRight } from 'lucide-react';
import CalculatorCard from '@/components/CalculatorCard';
import ResultDisplay from '@/components/ResultDisplay';

export default function CalculatorPage() {
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [days, setDays] = useState(30);
  const [calculationType, setCalculationType] = useState<'calendar' | 'business'>('calendar');
  const [result, setResult] = useState<Date | null>(null);

  const calculate = () => {
    const date = new Date(startDate);
    if (calculationType === 'calendar') {
      setResult(addDays(date, days));
    } else {
      setResult(addBusinessDays(date, days));
    }
  };

  const getDaysBreakdown = () => {
    if (!result) return null;
    const start = new Date(startDate);
    const totalDays = differenceInDays(result, start);
    let weekends = 0;
    let businessDays = 0;
    
    for (let i = 0; i <= totalDays; i++) {
      const current = addDays(start, i);
      if (isWeekend(current)) {
        weekends++;
      } else {
        businessDays++;
      }
    }
    
    return { totalDays, weekends, businessDays };
  };

  const breakdown = getDaysBreakdown();

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-2xl mb-6">
            <Calculator className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Date Calculator Pro
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Advanced date calculations for professionals. Calculate business days, timezones, and track deadlines.
          </p>
        </div>

        {/* Calculator Card */}
        <CalculatorCard className="mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Number of Days</label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value) || 0)}
                className="w-full bg-gray-800 rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Calculation Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCalculationType('calendar')}
                  className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all border ${
                    calculationType === 'calendar'
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Calendar
                </button>
                <button
                  onClick={() => setCalculationType('business')}
                  className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all border ${
                    calculationType === 'business'
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  Business
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
          >
            Calculate
            <ArrowRight className="w-5 h-5" />
          </button>
        </CalculatorCard>

        {/* Results */}
        {result && (
          <CalculatorCard className="mb-8 border-blue-500/30">
            <div className="text-center mb-6">
              <div className="text-gray-400 mb-2 text-sm uppercase tracking-wider">Result Date</div>
              <div className="text-4xl md:text-5xl font-bold text-blue-400">
                {format(result, 'MMMM d, yyyy')}
              </div>
              <div className="text-gray-400 mt-2 text-lg">
                {format(result, 'EEEE')}
              </div>
            </div>

            {breakdown && (
              <div className="grid grid-cols-3 gap-4">
                <ResultDisplay 
                  label="Total Days" 
                  value={breakdown.totalDays.toString()}
                  variant="default"
                />
                <ResultDisplay 
                  label="Business Days" 
                  value={breakdown.businessDays.toString()}
                  variant="success"
                />
                <ResultDisplay 
                  label="Weekend Days" 
                  value={breakdown.weekends.toString()}
                  variant="warning"
                />
              </div>
            )}
          </CalculatorCard>
        )}

        {/* Quick Tools */}
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/timezones" className="group bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              Timezone Converter
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-gray-400 text-sm">Convert times across multiple zones</p>
          </a>
          
          <a href="/deadlines" className="group bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-green-500/50 transition-all hover:shadow-lg hover:shadow-green-500/10">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
              <Calendar className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              Deadline Tracker
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-gray-400 text-sm">Track and manage project deadlines</p>
          </a>
          
          <a href="/business" className="group bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
              <Briefcase className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              Business Days
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-gray-400 text-sm">Calculate working days only</p>
          </a>
        </div>
      </div>
    </main>
  );
}
