import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, Moon, Sun } from 'lucide-react';

const OnboardingWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const goals = [
    { id: 'anxiety', icon: Target, label: 'Reduce Anxiety' },
    { id: 'sleep', icon: Moon, label: 'Sleep Better' },
    { id: 'focus', icon: Sun, label: 'Improve Focus' },
    { id: 'general', icon: Sparkles, label: 'General Wellbeing' },
  ];

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-serene-bg py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Decorative gradient elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary-container/20 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <div className="w-full max-w-[48rem] bg-serene-lowest rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(42,52,53,0.06)] p-16 relative z-10">
        
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold tracking-widest uppercase text-primary">Step {step} of 2</span>
            <span className="text-sm font-medium text-on-surface/50">Personalizing your journey</span>
          </div>
          <div className="w-full bg-serene-lower rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary h-full rounded-full transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]" style={{ width: `${(step / 2) * 100}%` }}></div>
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            <div>
              <h2 className="text-[2.5rem] font-light text-on-surface leading-tight mb-2">What's your main focus?</h2>
              <p className="text-on-surface/60 text-lg">Select a primary goal to help us tailor your experience.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              {goals.map((goal) => {
                const Icon = goal.icon;
                return (
                  <button key={goal.id} className="flex items-center p-6 rounded-[2rem] bg-serene-low hover:bg-primary-container/20 transition-all duration-500 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-serene-lowest flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <Icon className="w-6 h-6 text-on-surface/50 group-hover:text-primary transition-colors duration-500 stroke-[1.5]" />
                    </div>
                    <div className="ml-5 text-left">
                      <span className="block text-lg font-medium text-on-surface group-hover:text-primary transition-colors duration-500">{goal.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out text-center py-12">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary-container to-primary-fixed-dim border-8 border-serene-lowest shadow-[0_20px_40px_-10px_rgba(42,52,53,0.1)] flex items-center justify-center mb-10">
               <Sparkles className="w-12 h-12 text-primary" strokeWidth={1.5} />
            </div>
            <h2 className="text-[3rem] font-light text-on-surface">You're all set.</h2>
            <p className="text-on-surface/60 text-lg max-w-lg mx-auto leading-relaxed">
              We've customized your recommended exercises and crafted your dashboard. It's time to begin.
            </p>
          </div>
        )}

        <div className="mt-16 flex justify-end">
          <button
            onClick={handleNext}
            className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-primary-dim text-white rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(58,102,92,0.3)] hover:-translate-y-1"
          >
            {step === 1 ? 'Continue' : 'Enter Sanctuary'}
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
