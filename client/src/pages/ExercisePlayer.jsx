import React, { useState } from 'react';

import { Play, Pause, SkipBack, SkipForward, Maximize2, Settings, Volume2 } from 'lucide-react';

const ExercisePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <main className="w-full p-[4rem] flex flex-col">
        <h1 className="text-[3rem] font-light text-on-surface mb-12 pl-4">Focus & Breathe</h1>
        
        <div className="flex-1 flex flex-col items-center justify-center max-w-[60rem] mx-auto w-full">
          {/* Main Visualizer - Using the specified "Breath Pulse" aesthetic */}
          <div className="relative w-full aspect-video bg-serene-lowest rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(42,52,53,0.06)] overflow-hidden mb-16 flex items-center justify-center border border-outline-variant/10">
             <div className={`absolute w-96 h-96 bg-primary-container rounded-full blur-[100px] transition-transform opacity-60 duration-[4000ms] ease-in-out ${isPlaying ? 'scale-[2] opacity-80' : 'scale-100'}`} />
             <div className={`absolute w-80 h-80 bg-primary rounded-full blur-[100px] transition-transform opacity-30 duration-[6000ms] ease-in-out delay-1000 ${isPlaying ? 'scale-150 translate-y-10' : 'scale-100'}`} />
             
             {/* Center Circle (Breathing guide) */}
             <div className={`relative z-10 w-64 h-64 rounded-full border border-primary-container/50 bg-serene-lowest/50 backdrop-blur-xl flex flex-col items-center justify-center shadow-2xl shadow-primary-container/30 transition-transform duration-[4000ms] ease-in-out ${isPlaying ? 'scale-110' : 'scale-100'}`}>
                <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">Breathe In</span>
                <span className="text-primary text-[5rem] font-light leading-none">4</span>
             </div>
          </div>

          {/* Controls */}
          <div className="w-full bg-serene-lowest rounded-[3rem] p-10 shadow-[0_20px_40px_-10px_rgba(42,52,53,0.04)]">
             <div className="flex justify-between items-center mb-10">
                <div>
                   <h2 className="text-[2rem] font-light text-on-surface leading-tight mb-2">Deep Breath Mastery</h2>
                   <p className="text-on-surface/60 font-medium tracking-wide">Dr. Sarah Jenkins • Guided Reset</p>
                </div>
                <div className="flex gap-6 text-on-surface/40">
                   <button className="hover:text-primary transition-colors"><Volume2 className="w-6 h-6 stroke-[1.5]" /></button>
                   <button className="hover:text-primary transition-colors"><Settings className="w-6 h-6 stroke-[1.5]" /></button>
                   <button className="hover:text-primary transition-colors"><Maximize2 className="w-6 h-6 stroke-[1.5]" /></button>
                </div>
             </div>
             
             {/* Progress Bar */}
             <div className="flex items-center gap-6 mb-10">
                <span className="text-sm font-bold tracking-widest text-primary">02:14</span>
                <div className="flex-1 h-3 bg-serene-lower rounded-full overflow-hidden cursor-pointer relative">
                   <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-container rounded-full w-1/3"></div>
                </div>
                <span className="text-sm font-bold tracking-widest text-on-surface/40">10:00</span>
             </div>
             
             {/* Transport Controls */}
             <div className="flex items-center justify-center gap-12">
                <button className="p-4 text-on-surface/40 hover:text-primary transition-colors hover:-translate-x-1 duration-300">
                   <SkipBack className="w-8 h-8 stroke-[1.5]" />
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dim rounded-full flex items-center justify-center text-white shadow-[0_20px_40px_-10px_rgba(58,102,92,0.4)] hover:-translate-y-1 transition-all duration-300"
                >
                   {isPlaying ? <Pause className="w-10 h-10 stroke-[2]" /> : <Play className="w-10 h-10 ml-2 stroke-[2]" />}
                </button>
                <button className="p-4 text-on-surface/40 hover:text-primary transition-colors hover:translate-x-1 duration-300">
                   <SkipForward className="w-8 h-8 stroke-[1.5]" />
                </button>
             </div>
          </div>
        </div>
      </main>
  );
};

export default ExercisePlayer;
