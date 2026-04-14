import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Compass, Book, Activity, MessageCircle, Moon, Sun } from 'lucide-react';
import { useCalmify } from '../context/CalmifyContext';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const { currentUser } = useCalmify();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'Exercises', path: '/exercises', icon: Compass },
    { name: 'Journal', path: '/journal', icon: Book },
    { name: 'Companion', path: '/companion', icon: MessageCircle },
  ];

  return (
    <aside className="w-72 h-screen bg-serene-bg dark:bg-[#121e1c] hidden md:flex flex-col transition-colors duration-500 py-8 px-6 border-r border-outline-variant/10 dark:border-white/5 shrink-0">
      <div className="mb-12 pl-2 flex items-center justify-between">
        <h1 className="text-3xl font-light tracking-tight text-on-surface dark:text-[#e0e8e6] flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white shadow-[0_10px_40px_-5px_rgba(42,52,53,0.15)]">
            C
          </span>
          Calmify
        </h1>
        <button 
          onClick={toggleDarkMode}
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface/50 hover:text-primary dark:text-[#9caaa7] dark:hover:text-[#e0e8e6] hover:bg-serene-lower dark:hover:bg-[#1b2b28] transition-colors"
          title="Toggle Night Mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `flex items-center gap-4 px-5 py-4 rounded-full transition-all duration-500 ease-out group
                ${isActive 
                  ? 'bg-serene-low dark:bg-[#1b2b28] text-primary dark:text-[#e0e8e6] font-medium shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]' 
                  : 'text-on-surface/60 dark:text-[#9caaa7] hover:bg-serene-low/50 dark:hover:bg-[#1b2b28]/50 hover:text-on-surface dark:hover:text-[#e0e8e6]'}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon 
                    size={22} 
                    className={`transition-transform duration-500 group-hover:scale-105 
                      ${isActive ? 'stroke-primary dark:stroke-[#bcecdf]' : 'stroke-current'}`} 
                    strokeWidth={1.5}
                  />
                  <span className="text-lg tracking-wide">{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 flex flex-col gap-4">
        <Link 
          to="/breathe"
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-[#e0e8e6] rounded-[2rem] font-bold tracking-wide hover:bg-primary hover:text-white transition-all duration-500 shadow-sm"
        >
          <Activity size={20} strokeWidth={2.5} />
          <span>Start Breathing</span>
        </Link>

        <NavLink to="/profile" className="p-5 bg-serene-lower dark:bg-[#1b2b28] rounded-[2rem] flex items-center gap-4 transition-colors group cursor-pointer block">
          <div className="w-12 h-12 rounded-full border border-outline-variant/20 dark:border-white/10 bg-serene-lowest dark:bg-[#121e1c] flex justify-center items-center p-1 shadow-sm transition-colors">
            <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white uppercase group-hover:bg-primary-dim transition-colors">
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
          </div>
          <div>
            <p className="text-base font-medium text-on-surface dark:text-[#e0e8e6] tracking-wide transition-colors">
              {currentUser?.name || 'User'}
            </p>
            <p className="text-xs text-primary dark:text-[#bcecdf] font-bold tracking-[0.1em] uppercase mt-0.5">
              {currentUser?.currentStreak} Day Streak
            </p>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
