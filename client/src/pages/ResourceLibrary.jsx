import React from 'react';

import ResourceCard from '../components/ResourceCard';
import { useCalmify } from '../context/CalmifyContext';
import { Search, Filter } from 'lucide-react';

const ResourceLibrary = () => {
  const { recommendedResources, isLoadingResources } = useCalmify();
  const allResources = recommendedResources;

  return (
    <main className="w-full p-[4rem]">
        <div className="mb-12 flex justify-between items-center pl-4">
          <h1 className="text-[3rem] font-light text-on-surface dark:text-[#e0e8e6] tracking-tight transition-colors">Resource Library</h1>
        </div>

        <div className="flex gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface/40 dark:text-[#9caaa7] w-6 h-6 stroke-[1.5]" />
            <input 
              type="text" 
              placeholder="Search meditations, exercises, sounds..." 
              className="w-full bg-serene-lowest dark:bg-[#1b2b28] rounded-[2rem] py-6 pl-16 pr-6 shadow-[0_20px_40px_-5px_rgba(42,52,53,0.03)] outline-none focus:ring-2 focus:ring-primary/20 text-on-surface dark:text-[#e0e8e6] placeholder-on-surface/40 dark:placeholder-[#9caaa7] text-lg transition-all"
            />
          </div>
          <button className="bg-serene-lowest dark:bg-[#1b2b28] px-8 rounded-[2rem] shadow-[0_20px_40px_-5px_rgba(42,52,53,0.03)] text-on-surface/60 dark:text-[#e0e8e6] hover:text-primary transition-colors flex items-center justify-center">
            <Filter className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        <div className="flex gap-4 mb-16 overflow-x-auto pb-4 pl-2">
          {['All Categories', 'Mindfulness', 'Sleep', 'Focus', 'Breathing'].map((cat, i) => (
            <button key={cat} className={`px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs whitespace-nowrap transition-all duration-300 ${i === 0 ? 'bg-primary dark:bg-[#3a665c] text-white shadow-lg shadow-primary/20 dark:shadow-black/20 hover:-translate-y-0.5' : 'bg-serene-lowest dark:bg-[#1b2b28] text-on-surface/60 dark:text-[#9caaa7] hover:bg-serene-low dark:hover:bg-[#121e1c] hover:text-on-surface dark:hover:text-[#e0e8e6]'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoadingResources ? (
            <div className="col-span-full rounded-[2rem] bg-serene-lowest dark:bg-[#1b2b28] p-8 text-on-surface/60 dark:text-[#9caaa7] transition-colors">
              Loading resource library...
            </div>
          ) : allResources.length > 0 ? allResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          )) : (
            <div className="col-span-full rounded-[2rem] bg-serene-lowest dark:bg-[#1b2b28] p-8 text-on-surface/60 dark:text-[#9caaa7] transition-colors">
              No resources are available right now.
            </div>
          )}
        </div>
      </main>
  );
};

export default ResourceLibrary;
