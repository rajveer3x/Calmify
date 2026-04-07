import React from 'react';
import Sidebar from '../components/Sidebar';
import ResourceCard from '../components/ResourceCard';
import { useCalmify } from '../context/MockData';
import { Calendar, Flame } from 'lucide-react';

const Dashboard = () => {
  const { currentUser, recommendedResources } = useCalmify();

  return (
    <div className="flex bg-serene-bg min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-[4rem] overflow-y-auto">
        <header className="mb-16">
          <div className="flex justify-between items-center bg-serene-lower p-10 rounded-[3rem]">
            <div>
              <h2 className="text-[2.5rem] font-light text-on-surface mb-3 tracking-wide">
                Welcome back, {currentUser?.name}.
              </h2>
              <p className="text-on-surface/70 text-lg">
                Take a deep breath. How are you feeling today?
              </p>
            </div>
            
            <div className="hidden md:flex gap-6">
              <div className="flex flex-col items-center justify-center bg-serene-lowest w-24 h-24 rounded-[2rem] text-primary shadow-[0_10px_30px_-10px_rgba(42,52,53,0.1)]">
                <Flame className="w-8 h-8 mb-2 stroke-[1.5]" />
                <span className="font-bold text-lg">{currentUser?.currentStreak}</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-primary-container/20 w-24 h-24 rounded-[2rem] text-primary shadow-[0_10px_30px_-10px_rgba(42,52,53,0.05)]">
                <Calendar className="w-8 h-8 mb-2 stroke-[1.5]" />
                <span className="font-bold text-lg">24</span>
              </div>
            </div>
          </div>
        </header>

        <section>
          <div className="flex justify-between items-end mb-10 pl-4">
            <h3 className="text-2xl font-medium text-on-surface tracking-wide">
              Recommended for Today
            </h3>
            <button className="text-primary font-bold tracking-widest uppercase text-xs hover:text-primary-dim transition-colors">
              Explore All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>

        <section className="mt-20 relative bg-gradient-to-r from-primary to-primary-dim rounded-[3rem] p-12 text-white overflow-hidden shadow-2xl shadow-primary/20">
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-[2rem] font-light mb-4 tracking-wide leading-tight">You're tracking better than 85% of users!</h3>
            <p className="opacity-90 text-lg font-light leading-relaxed">Keep the momentum going. Consistency is the key to building lasting mental resilience.</p>
          </div>
          {/* Decorative glowing sphere */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-container rounded-full blur-[100px] opacity-30" />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
