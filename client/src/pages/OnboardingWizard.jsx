import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Briefcase, BookOpen, Users, Moon } from 'lucide-react';
import { useCalmify } from '../context/CalmifyContext';

const OnboardingWizard = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useCalmify();
  const [step, setStep] = useState(1);
  const [selectedTriggers, setSelectedTriggers] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const triggers = [
    { 
      id: 'work', 
      icon: Briefcase, 
      label: 'Work',
      description: 'Deadlines, meetings, and office pressure.'
    },
    { 
      id: 'study', 
      icon: BookOpen, 
      label: 'Study',
      description: 'Exams, research, and learning exhaustion.'
    },
    { 
      id: 'social', 
      icon: Users, 
      label: 'Social',
      description: 'Crowds, networking, and digital noise.'
    },
    { 
      id: 'sleep', 
      icon: Moon, 
      label: 'Sleep',
      description: 'Difficulty winding down or staying asleep due to mental chatter.'
    },
  ];

  const handleToggle = (id) => {
    setSelectedTriggers(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleNext = async () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      setIsSaving(true);
      setError('');

      try {
        await completeOnboarding(selectedTriggers);
        navigate('/dashboard');
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to save your onboarding choices.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-serene-bg dark:bg-[#121e1c] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500">
      
      {/* Decorative gradient elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary-container/20 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <div className="w-full max-w-[48rem] bg-serene-lowest dark:bg-[#1b2b28] rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(42,52,53,0.06)] dark:shadow-black/50 p-16 relative z-10 transition-all duration-500">
        
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold tracking-widest uppercase text-primary dark:text-[#bcecdf]">Step {step} of 2</span>
            <span className="text-sm font-medium text-on-surface/50 dark:text-[#9caaa7]">Curating your experience</span>
          </div>
          <div className="w-full bg-serene-lower dark:bg-[#121e1c] rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary dark:bg-[#3a665c] h-full rounded-full transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]" style={{ width: `${(step / 2) * 100}%` }}></div>
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            <div>
              <h2 className="text-[2.5rem] font-light text-on-surface dark:text-[#e0e8e6] leading-tight mb-2 transition-colors">What are your main triggers?</h2>
              <p className="text-on-surface/60 dark:text-[#9caaa7] text-lg transition-colors">Select all that apply to help us curate your digital sanctuary experience.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              {triggers.map((trigger) => {
                const Icon = trigger.icon;
                const isSelected = selectedTriggers.includes(trigger.id);
                return (
                  <button 
                    key={trigger.id} 
                    onClick={() => handleToggle(trigger.id)}
                    className={`flex flex-col text-left p-8 rounded-[2rem] border transition-all duration-500 group
                      ${isSelected 
                        ? 'bg-serene-lowest dark:bg-[#121e1c] border-primary shadow-[0_10px_30px_-10px_rgba(58,102,92,0.15)] dark:shadow-black/20 scale-[1.02]' 
                        : 'bg-serene-low dark:bg-[#121e1c] border-transparent hover:bg-primary-container/10 dark:hover:bg-[#1b2b28]/50 hover:border-primary/20 dark:hover:border-white/10 dark:border-white/5'}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500
                        ${isSelected ? 'bg-primary-container dark:bg-primary text-primary dark:text-[#121e1c]' : 'bg-serene-lowest dark:bg-[#1b2b28] text-on-surface/50 dark:text-[#9caaa7] group-hover:text-primary dark:group-hover:text-[#e0e8e6] shadow-sm dark:shadow-none'}`}
                      >
                        <Icon className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <span className={`text-xl font-medium transition-colors duration-500
                        ${isSelected ? 'text-primary dark:text-[#bcecdf]' : 'text-on-surface dark:text-[#e0e8e6] group-hover:text-primary dark:group-hover:text-[#bcecdf]'}`}
                      >
                        {trigger.label}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed transition-colors duration-500
                      ${isSelected ? 'text-on-surface/80 dark:text-[#e0e8e6]' : 'text-on-surface/50 dark:text-[#9caaa7] group-hover:text-on-surface/70 dark:group-hover:text-[#e0e8e6]'}`}
                    >
                      {trigger.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out text-center py-12">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary-container dark:from-[#3a665c] to-primary-fixed-dim border-8 border-serene-lowest dark:border-[#1b2b28] shadow-[0_20px_40px_-10px_rgba(42,52,53,0.1)] dark:shadow-black/20 flex items-center justify-center mb-10 transition-colors">
               <Sparkles className="w-12 h-12 text-primary dark:text-[#bcecdf]" strokeWidth={1.5} />
            </div>
            <h2 className="text-[3rem] font-light text-on-surface dark:text-[#e0e8e6] transition-colors">You're all set.</h2>
            <p className="text-on-surface/60 dark:text-[#9caaa7] text-lg max-w-lg mx-auto leading-relaxed transition-colors">
              We've customized your recommended exercises and crafted your sanctuary dashboard.
            </p>
          </div>
        )}

        <div className="mt-16 flex justify-between items-center border-t border-outline-variant/10 dark:border-white/10 pt-8 transition-colors">
          {step === 1 ? (
             <span className="text-sm font-bold tracking-widest text-on-surface/40 dark:text-[#9caaa7] uppercase">
                {selectedTriggers.length} selected
             </span>
          ) : <div />}

          {error ? (
            <p className="text-sm text-red-600 font-medium">
              {error}
            </p>
          ) : null}

          <button
            onClick={handleNext}
            disabled={isSaving}
            className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-primary-dim text-white rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(58,102,92,0.3)] hover:-translate-y-1"
          >
            {step === 1 ? 'Continue' : isSaving ? 'Saving...' : 'Enter Sanctuary'}
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
