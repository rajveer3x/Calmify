import React from 'react';
import Sidebar from '../components/Sidebar';
import ResourceCard from '../components/ResourceCard';
import { useCalmify } from '../context/MockData';
import { Search, Filter } from 'lucide-react';

const ResourceLibrary = () => {
  const { recommendedResources } = useCalmify();
  const allResources = [...recommendedResources, ...recommendedResources]; 

  return (
    <div className="flex bg-serene-bg min-h-screen">
      <Sidebar />
      <main className="flex-1 p-[4rem] overflow-y-auto">
        <div className="mb-12 flex justify-between items-center pl-4">
          <h1 className="text-[3rem] font-light text-on-surface tracking-tight">Resource Library</h1>
        </div>

        <div className="flex gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface/40 w-6 h-6 stroke-[1.5]" />
            <input 
              type="text" 
              placeholder="Search meditations, exercises, sounds..." 
              className="w-full bg-serene-lowest rounded-[2rem] py-6 pl-16 pr-6 shadow-[0_20px_40px_-5px_rgba(42,52,53,0.03)] outline-none focus:ring-2 focus:ring-primary/20 text-on-surface placeholder-on-surface/40 text-lg transition-all"
            />
          </div>
          <button className="bg-serene-lowest px-8 rounded-[2rem] shadow-[0_20px_40px_-5px_rgba(42,52,53,0.03)] text-on-surface/60 hover:text-primary transition-colors flex items-center justify-center">
            <Filter className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        <div className="flex gap-4 mb-16 overflow-x-auto pb-4 pl-2">
          {['All Categories', 'Mindfulness', 'Sleep', 'Focus', 'Breathing'].map((cat, i) => (
            <button key={cat} className={`px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs whitespace-nowrap transition-all duration-300 ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:-translate-y-0.5' : 'bg-serene-lowest text-on-surface/60 hover:bg-serene-low hover:text-on-surface'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allResources.map((resource, i) => (
            <ResourceCard key={i} resource={resource} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ResourceLibrary;
