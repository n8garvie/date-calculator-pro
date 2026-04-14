'use client';

import { useState, useEffect } from 'react';
import { format, differenceInDays, isPast, isToday, parseISO } from 'date-fns';
import { Calendar, Plus, Trash2, CheckCircle2, Circle, AlertCircle, ChevronRight } from 'lucide-react';
import CalculatorCard from '@/components/CalculatorCard';

interface Deadline {
  id: string;
  title: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

const sampleDeadlines: Deadline[] = [
  { id: '1', title: 'Project Proposal Due', date: format(addDays(new Date(), 5), 'yyyy-MM-dd'), priority: 'high', completed: false },
  { id: '2', title: 'Client Meeting', date: format(addDays(new Date(), 2), 'yyyy-MM-dd'), priority: 'medium', completed: false },
  { id: '3', title: 'Contract Review', date: format(addDays(new Date(), 14), 'yyyy-MM-dd'), priority: 'high', completed: false },
  { id: '4', title: 'Team Standup', date: format(new Date(), 'yyyy-MM-dd'), priority: 'low', completed: true },
  { id: '5', title: 'Quarterly Report', date: format(addDays(new Date(), 30), 'yyyy-MM-dd'), priority: 'medium', completed: false },
];

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default function DeadlinesPage() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('datecalc-deadlines');
    if (saved) {
      try {
        setDeadlines(JSON.parse(saved));
      } catch {
        setDeadlines(sampleDeadlines);
      }
    } else {
      setDeadlines(sampleDeadlines);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('datecalc-deadlines', JSON.stringify(deadlines));
    }
  }, [deadlines, isLoaded]);

  const addDeadline = () => {
    if (!newTitle || !newDate) return;
    setDeadlines([
      ...deadlines,
      {
        id: Date.now().toString(),
        title: newTitle,
        date: newDate,
        priority: newPriority,
        completed: false,
      },
    ]);
    setNewTitle('');
    setNewDate('');
  };

  const toggleComplete = (id: string) => {
    setDeadlines(
      deadlines.map((d) => (d.id === id ? { ...d, completed: !d.completed } : d))
    );
  };

  const deleteDeadline = (id: string) => {
    setDeadlines(deadlines.filter((d) => d.id !== id));
  };

  const getDaysRemaining = (date: string) => {
    const days = differenceInDays(parseISO(date), new Date());
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days`;
  };

  const getDeadlineStatus = (deadline: Deadline) => {
    if (deadline.completed) return 'completed';
    const days = differenceInDays(parseISO(deadline.date), new Date());
    if (days < 0) return 'overdue';
    if (days <= 14) return 'urgent';
    if (days <= 30) return 'soon';
    return 'future';
  };

  const sortedDeadlines = [...deadlines].sort((a, b) => {
    // Sort by completion first, then by date
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-black text-white p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600/20 rounded-2xl mb-6">
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Deadline Tracker
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Track and manage your important project deadlines
          </p>
        </div>

        {/* Add New */}
        <CalculatorCard className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-green-400" />
            Add New Deadline
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Deadline title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-gray-800 rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            />
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="bg-gray-800 rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as any)}
              className="bg-gray-800 rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button
              onClick={addDeadline}
              disabled={!newTitle || !newDate}
              className="bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg px-4 py-3 font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add
            </button>
          </div>
        </CalculatorCard>

        {/* Deadlines List */}
        <div className="space-y-3">
          {sortedDeadlines.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No deadlines yet. Add one above!</p>
            </div>
          ) : (
            sortedDeadlines.map((deadline) => {
              const daysText = getDaysRemaining(deadline.date);
              const status = getDeadlineStatus(deadline);
              
              const statusStyles = {
                completed: 'border-gray-800 opacity-60',
                overdue: 'border-red-500/50 bg-red-500/5',
                urgent: 'border-amber-500/50 bg-amber-500/5',
                soon: 'border-blue-500/30',
                future: 'border-gray-800',
              };

              const priorityColors = {
                high: 'bg-red-500/20 text-red-400',
                medium: 'bg-amber-500/20 text-amber-400',
                low: 'bg-blue-500/20 text-blue-400',
              };

              const statusColors = {
                completed: 'text-green-400',
                overdue: 'text-red-400',
                urgent: 'text-amber-400',
                soon: 'text-blue-400',
                future: 'text-gray-400',
              };

              return (
                <div
                  key={deadline.id}
                  className={`bg-gray-900 rounded-xl p-5 border ${statusStyles[status]} transition-all`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <button
                        onClick={() => toggleComplete(deadline.id)}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          deadline.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-600 hover:border-green-500'
                        }`}
                      >
                        {deadline.completed && <CheckCircle2 className="w-4 h-4 text-black" />}
                      </button>
                      <div className="min-w-0">
                        <h3 className={`font-semibold truncate ${deadline.completed ? 'line-through text-gray-500' : ''}`}>
                          {deadline.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm flex-wrap">
                          <span className="text-gray-400">{format(parseISO(deadline.date), 'MMM d, yyyy')}</span>
                          <span className={`px-2 py-0.5 rounded text-xs ${priorityColors[deadline.priority]}`}>
                            {deadline.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className={`text-right ${statusColors[status]}`}>
                        <div className="font-semibold">{daysText}</div>
                        <div className="text-xs opacity-70">remaining</div>
                      </div>
                      <button
                        onClick={() => deleteDeadline(deadline.id)}
                        className="p-2 bg-gray-800 hover:bg-red-900/50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
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
