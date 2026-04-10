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
    <div className="min-h-full bg-[#f8fafa] flex flex-col items-center py-16 px-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-light text-gray-800 mb-12 text-center">Settings & Profile</h1>

        {/* User Info Section */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 flex flex-col items-center mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#bcecdf]/20 rounded-bl-full blur-[40px] pointer-events-none" />
          
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-[#3a665c] to-[#26453e] flex items-center justify-center mb-6 relative z-10">
            <span className="text-5xl text-white font-light uppercase">
              {currentUser?.name ? currentUser.name.charAt(0) : <UserIcon size={48} />}
            </span>
          </div>
          
          <h2 className="text-3xl font-medium text-gray-800 relative z-10">{currentUser?.name || 'Sanctuary Guest'}</h2>
          <p className="text-gray-500 mt-2 text-lg relative z-10">{currentUser?.email || 'N/A'}</p>
        </div>

        {/* Stats Section */}
        <h3 className="text-xl font-bold tracking-widest uppercase text-gray-400 mb-6 px-4">Your Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          <div className="bg-[#3a665c] rounded-[2rem] p-8 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full blur-[20px]" />
            <Activity className="w-8 h-8 text-white/80 mx-auto mb-4" />
            <span className="block text-5xl font-light text-white mb-2">{currentUser?.currentStreak || 0}</span>
            <span className="text-white/80 font-bold uppercase tracking-widest text-sm">Current Streak</span>
          </div>

          <div className="bg-[#bcecdf] rounded-[2rem] p-8 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/30 rounded-bl-full blur-[20px]" />
            <Clock className="w-8 h-8 text-[#3a665c]/80 mx-auto mb-4" />
            <span className="block text-5xl font-light text-[#3a665c] mb-2">124</span> {/* Placeholder for total minutes */}
            <span className="text-[#3a665c]/80 font-bold uppercase tracking-widest text-sm">Mindful Minutes</span>
          </div>

        </div>

        {/* Action Section */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex justify-center">
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 px-10 py-5 bg-red-50 text-red-600 border border-red-100 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-red-100 transition-colors shadow-sm"
          >
            <LogOut size={20} strokeWidth={2.5} />
            <span>Log Out of Sanctuary</span>
          </button>
        </div>

      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-light text-gray-800 mb-4 text-center">Leaving so soon?</h3>
            <p className="text-gray-500 text-center mb-8">Are you sure you want to log out of your sanctuary?</p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={confirmLogout}
                className="w-full py-4 bg-red-50 text-red-600 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-red-100 transition-colors"
              >
                Yes, Log Out
              </button>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-4 bg-gray-50 text-gray-800 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors"
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
