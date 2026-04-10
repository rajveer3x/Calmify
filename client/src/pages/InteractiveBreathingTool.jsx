import React, { useState, useEffect } from 'react';
import { Play, Square } from 'lucide-react';

const InteractiveBreathingTool = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Idle');

  useEffect(() => {
    let isMounted = true;
    let timeoutId;

    const runCycle = () => {
      if (!isMounted) return;
      
      setPhase('Inhale...');
      timeoutId = setTimeout(() => {
        if (!isMounted) return;
        setPhase('Hold...');
        
        timeoutId = setTimeout(() => {
          if (!isMounted) return;
          setPhase('Exhale...');
          
          timeoutId = setTimeout(() => {
            if (!isMounted) return;
            // Loop back
            runCycle();
          }, 8000);
        }, 7000);
      }, 4000);
    };

    if (isActive) {
      runCycle();
    } else {
      setPhase('Idle');
      clearTimeout(timeoutId);
    }

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isActive]);

  const getScaleClass = () => {
    if (phase === 'Idle') return 'scale-100';
    if (phase === 'Inhale...') return 'scale-150';
    if (phase === 'Hold...') return 'scale-150';
    if (phase === 'Exhale...') return 'scale-100';
    return 'scale-100';
  };

  const getTransitionDuration = () => {
    if (phase === 'Inhale...') return '4000ms';
    if (phase === 'Exhale...') return '8000ms';
    return '1000ms'; // For idle / smooth fallback
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8">
      <div className="text-center mb-16 max-w-lg">
        <h1 className="text-4xl font-light text-on-surface mb-4">4-7-8 Breathing</h1>
        <p className="text-on-surface/60 text-lg leading-relaxed">
          A natural tranquilizer for the nervous system. Follow the circle to find your center.
        </p>
      </div>

      <div className="relative w-80 h-80 flex items-center justify-center mb-16">
        {/* Pulsing background rings */}
        <div className={`absolute inset-0 bg-primary/5 rounded-full transition-all ease-in-out ${getScaleClass()}`} style={{ transitionDuration: getTransitionDuration(), transformOrigin: 'center' }} />
        <div className={`absolute inset-4 bg-primary/10 rounded-full transition-all ease-in-out ${getScaleClass()} delay-75`} style={{ transitionDuration: getTransitionDuration(), transformOrigin: 'center' }} />
        
        {/* Main breathing circle */}
        <div className={`relative z-10 w-48 h-48 bg-gradient-to-br from-primary to-primary-dim rounded-full shadow-[0_20px_40px_-5px_rgba(58,102,92,0.3)] flex items-center justify-center transition-all ease-in-out ${getScaleClass()}`} style={{ transitionDuration: getTransitionDuration(), transformOrigin: 'center' }}>
          <span className="text-white text-2xl font-light tracking-wider">
            {phase}
          </span>
        </div>
      </div>

      <button
        onClick={() => setIsActive(!isActive)}
        className="flex items-center gap-3 px-8 py-4 bg-serene-lowest border border-primary/20 text-primary rounded-full font-bold uppercase tracking-widest hover:bg-primary/5 transition-all shadow-sm"
      >
        {isActive ? (
          <>
            <Square size={20} className="fill-current" />
            Stop Session
          </>
        ) : (
          <>
            <Play size={20} className="fill-current" />
            Start Breathing
          </>
        )}
      </button>
    </div>
  );
};

export default InteractiveBreathingTool;
