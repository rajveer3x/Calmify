import React from 'react';

import ResourceCard from '../components/ResourceCard';
import { useCalmify } from '../context/CalmifyContext';
import { Calendar, Flame } from 'lucide-react';

const Dashboard = () => {
  const { currentUser, recommendedResources, isLoadingResources } = useCalmify();

  return (
    <main className="w-full p-[4rem]">
        <header className="mb-16">
          <div className="flex justify-between items-center bg-serene-lower dark:bg-[#1b2b28] transition-colors p-10 rounded-[3rem]">
            <div>
              <h2 className="text-[2.5rem] font-light text-on-surface dark:text-[#e0e8e6] mb-3 tracking-wide">
                Welcome back, {currentUser?.name}.
              </h2>
              <p className="text-on-surface/70 dark:text-[#9caaa7] text-lg">
                Take a deep breath. How are you feeling today?
              </p>
            </div>
            
            <div className="hidden md:flex gap-6">
              <div className="flex flex-col items-center justify-center bg-serene-lowest dark:bg-[#121e1c] w-24 h-24 rounded-[2rem] text-primary dark:text-[#bcecdf] border border-transparent dark:border-white/5 shadow-[0_10px_30px_-10px_rgba(42,52,53,0.1)] transition-colors">
                <Flame className="w-8 h-8 mb-2 stroke-[1.5]" />
                <span className="font-bold text-lg">{currentUser?.currentStreak}</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-primary-container/20 dark:bg-[#121e1c] w-24 h-24 rounded-[2rem] text-primary dark:text-[#bcecdf] border border-transparent dark:border-white/5 shadow-[0_10px_30px_-10px_rgba(42,52,53,0.05)] transition-colors">
                <Calendar className="w-8 h-8 mb-2 stroke-[1.5]" />
                <span className="font-bold text-lg">24</span>
              </div>
            </div>
          </div>
        </header>

        <section>
          <div className="flex justify-between items-end mb-10 pl-4">
            <h3 className="text-2xl font-medium text-on-surface dark:text-[#e0e8e6] tracking-wide">
              Recommended for Today
            </h3>
            <button className="text-primary dark:text-[#bcecdf] font-bold tracking-widest uppercase text-xs hover:text-primary-dim transition-colors">
              Explore All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingResources ? (
              <div className="col-span-full rounded-[2rem] bg-serene-lowest dark:bg-[#1b2b28] p-8 text-on-surface/60 dark:text-[#9caaa7] transition-colors">
                Loading your recommended exercises...
              </div>
            ) : recommendedResources.length > 0 ? recommendedResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            )) : (
              <div className="col-span-full rounded-[2rem] bg-serene-lowest dark:bg-[#1b2b28] p-8 text-on-surface/60 dark:text-[#9caaa7] transition-colors">
                No recommendations yet. Finish onboarding to personalize your library.
              </div>
            )}
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
  );
};

export default Dashboard;
