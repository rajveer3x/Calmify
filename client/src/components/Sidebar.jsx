import React from 'react';
import { Home, Compass, Book, Activity } from 'lucide-react';
import { useCalmify } from '../context/MockData';

const Sidebar = () => {
  const { currentUser } = useCalmify();

  const navItems = [
    { name: 'Home', icon: Home, active: true },
    { name: 'Exercises', icon: Compass, active: false },
    { name: 'Journal', icon: Book, active: false },
    { name: 'Progress', icon: Activity, active: false },
  ];

  return (
    <aside className="w-72 h-screen bg-serene-bg hidden md:flex flex-col transition-colors duration-300 py-8 px-6">
      <div className="mb-12 pl-2">
        <h1 className="text-3xl font-light tracking-tight text-on-surface flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white shadow-[0_10px_40px_-5px_rgba(42,52,53,0.15)]">
            C
          </span>
          Calmify
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={`#${item.name.toLowerCase()}`}
              className={`flex items-center gap-4 px-5 py-4 rounded-full transition-all duration-500 ease-out group
                ${item.active 
                  ? 'bg-serene-low text-primary font-medium shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]' 
                  : 'text-on-surface/60 hover:bg-serene-low/50 hover:text-on-surface'}`}
            >
              <Icon 
                size={22} 
                className={`transition-transform duration-500 group-hover:scale-105 
                  ${item.active ? 'stroke-primary' : 'stroke-current'}`} 
                strokeWidth={1.5}
              />
              <span className="text-lg tracking-wide">{item.name}</span>
            </a>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <div className="p-5 bg-serene-lower rounded-[2rem] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-outline-variant/20 bg-serene-lowest flex justify-center items-center p-1 shadow-sm">
            <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white uppercase">
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
          </div>
          <div>
            <p className="text-base font-medium text-on-surface tracking-wide">
              {currentUser?.name || 'User'}
            </p>
            <p className="text-xs text-primary font-bold tracking-[0.1em] uppercase mt-0.5">
              {currentUser?.currentStreak} Day Streak
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
