'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Clock, Calendar, Briefcase } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Calculator', icon: Calculator },
  { href: '/timezones', label: 'Timezones', icon: Clock },
  { href: '/deadlines', label: 'Deadlines', icon: Calendar },
  { href: '/business', label: 'Business', icon: Briefcase },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg hidden sm:block">DateCalc Pro</span>
          </Link>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
