import React, { useEffect, useState } from 'react';

import {
  Maximize2,
  Pause,
  Play,
  Settings,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';

const BREATHING_PHASES = [
  {
    key: 'inhale',
    label: 'Inhale...',
    duration: 4000,
    instruction: 'Draw the breath in slowly and let your shoulders soften.',
    scale: 1.16,
    glowScale: 1.9,
    haloScale: 1.45,
  },
  {
    key: 'hold',
    label: 'Hold...',
    duration: 7000,
    instruction: 'Rest in stillness and notice the space you have created.',
    scale: 1.16,
    glowScale: 2,
    haloScale: 1.5,
  },
  {
    key: 'exhale',
    label: 'Exhale...',
    duration: 8000,
    instruction: 'Release gently, lengthening the breath without forcing it.',
    scale: 0.92,
    glowScale: 1.15,
    haloScale: 1.05,
  },
];

const ExercisePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [remainingMs, setRemainingMs] = useState(BREATHING_PHASES[0].duration);

  const currentPhase = BREATHING_PHASES[phaseIndex];
  const secondsRemaining = Math.max(1, Math.ceil(remainingMs / 1000));
  const cycleProgress = ((phaseIndex + 1) / BREATHING_PHASES.length) * 100;

  useEffect(() => {
    if (!isPlaying) {
      setPhaseIndex(0);
      setRemainingMs(BREATHING_PHASES[0].duration);
      return undefined;
    }

    const phase = BREATHING_PHASES[phaseIndex];
    const startedAt = Date.now();

    setRemainingMs(phase.duration);

    const intervalId = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextRemaining = Math.max(0, phase.duration - elapsed);
      setRemainingMs(nextRemaining);
    }, 100);

    const timeoutId = window.setTimeout(() => {
      setPhaseIndex((current) => (current + 1) % BREATHING_PHASES.length);
    }, phase.duration);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [isPlaying, phaseIndex]);

  const handleToggle = () => {
    setIsPlaying((current) => !current);
  };

  return (
    <main className="w-full p-[4rem] flex flex-col">
      <h1 className="text-[3rem] font-light text-on-surface mb-12 pl-4">Focus & Breathe</h1>

      <div className="flex-1 flex flex-col items-center justify-center max-w-[60rem] mx-auto w-full">
        <div className="relative w-full aspect-video bg-serene-lowest rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(42,52,53,0.06)] overflow-hidden mb-16 flex items-center justify-center border border-outline-variant/10">
          <div
            className="absolute w-96 h-96 bg-primary-container rounded-full blur-[110px] opacity-60 transition-all ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `scale(${isPlaying ? currentPhase.glowScale : 1})`,
              opacity: isPlaying ? 0.72 : 0.35,
              transitionDuration: `${isPlaying ? currentPhase.duration : 1200}ms`,
            }}
          />
          <div
            className="absolute w-80 h-80 bg-primary rounded-full blur-[100px] opacity-25 transition-all ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `scale(${isPlaying ? currentPhase.haloScale : 1}) translateY(${isPlaying ? '24px' : '0px'})`,
              opacity: isPlaying ? 0.3 : 0.18,
              transitionDuration: `${isPlaying ? currentPhase.duration : 1200}ms`,
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <div
              className="w-72 h-72 rounded-full border border-primary-container/50 bg-serene-lowest/60 backdrop-blur-xl flex flex-col items-center justify-center shadow-2xl shadow-primary-container/30 transition-all ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `scale(${isPlaying ? currentPhase.scale : 1})`,
                transitionDuration: `${isPlaying ? currentPhase.duration : 1200}ms`,
              }}
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">
                {isPlaying ? currentPhase.label : 'Ready'}
              </span>
              <span className="text-primary text-[4.5rem] font-light leading-none">
                {isPlaying ? secondsRemaining : '0'}
              </span>
              <span className="mt-4 text-sm text-on-surface/55 tracking-wide">
                {isPlaying ? 'Stay with the rhythm' : 'Press start to begin'}
              </span>
            </div>

            <div className="text-center max-w-xl">
              <p className="text-[1.15rem] font-light text-on-surface/80 leading-relaxed">
                {isPlaying
                  ? currentPhase.instruction
                  : 'Begin when you are ready and let the circle guide your breath with a gentle, repeating pace.'}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-serene-lowest rounded-[3rem] p-10 shadow-[0_20px_40px_-10px_rgba(42,52,53,0.04)]">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-[2rem] font-light text-on-surface leading-tight mb-2">Deep Breath Mastery</h2>
              <p className="text-on-surface/60 font-medium tracking-wide">Calmify Guided Reset</p>
            </div>
            <div className="flex gap-6 text-on-surface/40">
              <button className="hover:text-primary transition-colors"><Volume2 className="w-6 h-6 stroke-[1.5]" /></button>
              <button className="hover:text-primary transition-colors"><Settings className="w-6 h-6 stroke-[1.5]" /></button>
              <button className="hover:text-primary transition-colors"><Maximize2 className="w-6 h-6 stroke-[1.5]" /></button>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-10">
            <span className="text-sm font-bold tracking-widest text-primary min-w-16">
              {currentPhase.label.replace('...', '')}
            </span>
            <div className="flex-1 h-3 bg-serene-lower rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-700 ease-out"
                style={{ width: `${isPlaying ? cycleProgress : 0}%` }}
              />
            </div>
            <span className="text-sm font-bold tracking-widest text-on-surface/40 min-w-14 text-right">
              {secondsRemaining}s
            </span>
          </div>

          <div className="flex items-center justify-center gap-12">
            <button className="p-4 text-on-surface/40 hover:text-primary transition-colors hover:-translate-x-1 duration-300">
              <SkipBack className="w-8 h-8 stroke-[1.5]" />
            </button>
            <button
              onClick={handleToggle}
              className="min-w-52 px-8 py-5 bg-gradient-to-r from-primary to-primary-dim rounded-full flex items-center justify-center gap-4 text-white shadow-[0_20px_40px_-10px_rgba(58,102,92,0.4)] hover:-translate-y-1 transition-all duration-500"
            >
              {isPlaying ? <Pause className="w-7 h-7 stroke-[2]" /> : <Play className="w-7 h-7 ml-1 stroke-[2]" />}
              <span className="font-bold tracking-[0.2em] uppercase text-sm">
                {isPlaying ? 'Stop' : 'Start'}
              </span>
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
