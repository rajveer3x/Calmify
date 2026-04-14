import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalmify } from '../context/CalmifyContext';
import { LogOut, User as UserIcon, Activity, Clock } from 'lucide-react';

const ProfileSettings = () => {
  const { currentUser, logout } = useCalmify();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const confirmLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-full bg-[#f8fafa] dark:bg-[#121e1c] flex flex-col items-center py-16 px-6 transition-colors duration-500">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-light text-gray-800 dark:text-[#e0e8e6] mb-12 text-center transition-colors">Settings & Profile</h1>

        {/* User Info Section */}
        <div className="bg-white dark:bg-[#1b2b28] rounded-[2.5rem] p-10 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col items-center mb-10 relative overflow-hidden transition-colors">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#bcecdf]/20 rounded-bl-full blur-[40px] pointer-events-none" />
          
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-[#121e1c] shadow-xl bg-gradient-to-br from-[#3a665c] to-[#26453e] flex items-center justify-center mb-6 relative z-10 transition-colors">
            <span className="text-5xl text-white font-light uppercase">
              {currentUser?.name ? currentUser.name.charAt(0) : <UserIcon size={48} />}
            </span>
          </div>
          
          <h2 className="text-3xl font-medium text-gray-800 dark:text-[#e0e8e6] relative z-10 transition-colors">{currentUser?.name || 'Sanctuary Guest'}</h2>
          <p className="text-gray-500 dark:text-[#9caaa7] mt-2 text-lg relative z-10 transition-colors">{currentUser?.email || 'N/A'}</p>
        </div>

        {/* Stats Section */}
        <h3 className="text-xl font-bold tracking-widest uppercase text-gray-400 dark:text-[#9caaa7] mb-6 px-4 transition-colors">Your Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          <div className="bg-[#3a665c] rounded-[2rem] p-8 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full blur-[20px]" />
            <Activity className="w-8 h-8 text-white/80 mx-auto mb-4" />
            <span className="block text-5xl font-light text-white mb-2">{currentUser?.currentStreak || 0}</span>
            <span className="text-white/80 font-bold uppercase tracking-widest text-sm">Current Streak</span>
          </div>

          <div className="bg-[#bcecdf] dark:bg-[#1b2b28] border dark:border-white/5 rounded-[2rem] p-8 shadow-sm text-center relative overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/30 dark:bg-primary-container/10 rounded-bl-full blur-[20px]" />
            <Clock className="w-8 h-8 text-[#3a665c] dark:text-[#bcecdf] mx-auto mb-4 transition-colors" />
            <span className="block text-5xl font-light text-[#3a665c] dark:text-[#e0e8e6] mb-2 transition-colors">124</span> {/* Placeholder for total minutes */}
            <span className="text-[#3a665c]/80 dark:text-[#9caaa7] font-bold uppercase tracking-widest text-sm transition-colors">Mindful Minutes</span>
          </div>

        </div>

        {/* Action Section */}
        <div className="bg-white dark:bg-[#1b2b28] rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-white/5 flex justify-center transition-colors">
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 px-10 py-5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors shadow-sm"
          >
            <LogOut size={20} strokeWidth={2.5} />
            <span>Log Out of Sanctuary</span>
          </button>
        </div>

      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 dark:bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-[#121e1c] rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl border border-gray-100 dark:border-white/10 animate-in fade-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-light text-gray-800 dark:text-[#e0e8e6] mb-4 text-center">Leaving so soon?</h3>
            <p className="text-gray-500 dark:text-[#9caaa7] text-center mb-8">Are you sure you want to log out of your sanctuary?</p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={confirmLogout}
                className="w-full py-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors border border-transparent dark:border-red-900/30"
              >
                Yes, Log Out
              </button>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-4 bg-gray-50 dark:bg-[#1b2b28] text-gray-800 dark:text-[#e0e8e6] rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border border-transparent dark:border-white/5"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
