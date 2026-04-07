import React from 'react';
import Sidebar from '../components/Sidebar';
import { PenTool, CheckCircle2, TrendingUp } from 'lucide-react';

const ProgressJournal = () => {
  return (
    <div className="flex bg-serene-bg min-h-screen">
      <Sidebar />
      <main className="flex-1 p-[4rem] overflow-y-auto">
        <h1 className="text-[3rem] font-light text-on-surface mb-12 pl-4">Progress & Reflection</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-serene-lowest p-10 rounded-[3rem] shadow-[0_20px_40px_-10px_rgba(42,52,53,0.03)] border border-outline-variant/10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-medium text-on-surface">This Week</h3>
                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center">
                  <TrendingUp className="text-primary w-6 h-6 stroke-[1.5]" />
                </div>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-[4rem] font-light text-primary leading-none">4.5</span>
                <span className="text-xl text-primary font-bold mb-2">hrs</span>
              </div>
              <p className="text-sm font-bold tracking-widest uppercase text-on-surface/40">+1.2 hours compared to last week</p>
            </div>

            <div className="bg-serene-lowest p-10 rounded-[3rem] shadow-[0_20px_40px_-10px_rgba(42,52,53,0.03)] border border-outline-variant/10">
              <h3 className="text-xl font-medium text-on-surface mb-8">Recent Milestones</h3>
              <ul className="space-y-6">
                {[1, 2, 3].map((_, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5 stroke-[1.5] group-hover:fill-primary-container/30 transition-colors" />
                    <div>
                      <p className="font-medium text-on-surface text-lg">Completed 5 day streak</p>
                      <p className="text-sm font-bold tracking-widest uppercase text-on-surface/40 mt-1">2 days ago</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Journal */}
          <div className="lg:col-span-2">
             <div className="bg-serene-lowest p-12 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(42,52,53,0.05)] border border-outline-variant/5 h-full flex flex-col relative overflow-hidden">
               {/* Soft gradient corner */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 rounded-bl-full blur-[80px] pointer-events-none" />
               
               <div className="flex justify-between items-center mb-10 relative z-10">
                 <h3 className="text-[2.5rem] font-light text-on-surface">Daily Reflection</h3>
                 <span className="text-sm font-bold tracking-widest uppercase text-primary border border-primary/20 px-4 py-2 rounded-full bg-primary/5">
                   April 8, 2026
                 </span>
               </div>
               
               <div className="bg-serene-low p-8 rounded-[2rem] mb-10 relative z-10">
                 <h4 className="font-bold text-sm tracking-widest uppercase text-primary mb-3 flex items-center gap-3">
                   <PenTool className="w-5 h-5 stroke-[2]" /> Prompt of the Day
                 </h4>
                 <p className="text-xl text-on-surface font-light leading-relaxed">What is one thing that brought you peace today, no matter how small?</p>
               </div>

               <textarea 
                 className="flex-1 w-full bg-serene-bg rounded-[2rem] p-8 resize-none outline-none focus:ring-2 focus:ring-primary/20 focus:bg-serene-lowest text-on-surface placeholder-on-surface/30 text-lg leading-loose transition-all duration-300 relative z-10 shadow-inner shadow-on-surface/5"
                 placeholder="Start writing your thoughts here..."
               ></textarea>

               <div className="mt-10 flex justify-end relative z-10">
                 <button className="px-10 py-5 bg-gradient-to-r from-primary to-primary-dim text-white rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all duration-300 shadow-[0_20px_40px_-10px_rgba(58,102,92,0.3)] hover:-translate-y-1">
                   Save Entry
                 </button>
               </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressJournal;
