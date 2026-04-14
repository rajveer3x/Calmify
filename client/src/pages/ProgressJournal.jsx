import React, { useState, useEffect } from 'react';
import { PenTool, CheckCircle2, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import api from '../lib/api';
import { useCalmify } from '../context/CalmifyContext';

const ProgressJournal = () => {
  const { currentUser } = useCalmify();
  
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [entry, setEntry] = useState('');
  const [score, setScore] = useState(5); // Default to a score of 5 (maybe out of 10? We'll use 1-5 and scale or just send 1-5)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const moods = [
    { value: 1, emoji: '😔', label: 'Struggling' },
    { value: 2, emoji: '😕', label: 'Off' },
    { value: 3, emoji: '😐', label: 'Okay' },
    { value: 4, emoji: '🙂', label: 'Good' },
    { value: 5, emoji: '🌟', label: 'Great' }
  ];

  const fetchHistory = async () => {
    try {
      const { data } = await api.get('/logs/history');
      // Format data for chart
      const formatted = data.map(log => ({
        ...log,
        formattedDate: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }));
      setHistory(formatted);
    } catch (error) {
      console.error("Failed to load history", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSubmit = async () => {
    if (!entry.trim()) {
      setErrorMsg('Please write a reflection before saving.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await api.post('/logs/daily', {
        score: score, // Sending 1-5
        entry: entry,
        prompt: 'What is one thing that brought you peace today, no matter how small?'
      });
      
      setEntry('');
      setScore(5);
      setSuccessMsg('Your reflection has been safely stored in your sanctuary.');
      
      // Refresh chart
      fetchHistory();
      
      // Clear message after 4s
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Failed to save entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full p-8 md:p-12 overflow-y-auto">
      <h1 className="text-[3rem] font-light text-on-surface dark:text-[#e0e8e6] mb-12 pl-4 transition-colors">Progress & Reflection</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Stats & Chart */}
        <div className="lg:col-span-1 space-y-8 flex flex-col">
          
          {/* Current Streak */}
          <div className="bg-[#3a665c] text-white p-10 rounded-[2.5rem] shadow-sm relative overflow-hidden shrink-0">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full blur-[20px]" />
             
             <div className="flex items-center justify-between mb-2 relative z-10">
               <h3 className="text-xl font-medium text-white/90">Current Streak</h3>
               <Sparkles className="text-white/80 w-6 h-6 stroke-[1.5]" />
             </div>
             
             <div className="flex items-end gap-3 mt-4 relative z-10">
               <span className="text-[5rem] font-light text-white leading-none tracking-tighter">
                 {currentUser?.currentStreak || 0}
               </span>
               <span className="text-xl text-white/80 font-bold mb-3 uppercase tracking-widest">
                 Days
               </span>
             </div>
             <p className="text-sm font-medium text-white/70 mt-4 leading-relaxed max-w-[200px]">
               Consistency is planting the seeds of your future peace.
             </p>
          </div>

          {/* Mood History Chart */}
          <div className="bg-white dark:bg-[#1b2b28] p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-white/5 flex flex-col h-[350px] transition-colors">
            <h3 className="text-xl font-medium text-gray-800 dark:text-[#e0e8e6] mb-8 px-2 transition-colors">Mood Journey</h3>
            
            <div className="w-full min-h-[250px] relative -ml-4">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center text-on-surface/40">
                  Loading journey...
                </div>
              ) : history.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={history}>
                    <XAxis 
                      dataKey="formattedDate" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#8f9a98', fontSize: 12 }} 
                      dy={10}
                    />
                    <YAxis 
                      domain={[1, 5]} 
                      axisLine={false} 
                      tickLine={false} 
                      tick={false} 
                      width={20}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}
                      itemStyle={{ color: '#3a665c', fontWeight: 600 }}
                      labelStyle={{ color: '#8f9a98', fontSize: '0.875rem', marginBottom: '0.25rem' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3a665c" 
                      strokeWidth={4} 
                      dot={{ fill: '#3a665c', r: 4, strokeWidth: 0 }} 
                      activeDot={{ r: 6, fill: '#3a665c', stroke: '#fff', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-on-surface/40 text-center px-6">
                  Log your first entry today to start seeing your journey.
                </div>
              )}
            </div>
          </div>
          
        </div>

        {/* Right Column: Journal Form */}
        <div className="lg:col-span-2">
           <div className="bg-white dark:bg-[#1b2b28] p-10 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-white/5 flex flex-col relative overflow-hidden transition-colors">
             
             {/* Soft gradient corner */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#3a665c]/5 rounded-bl-full blur-[80px] pointer-events-none" />
             
             <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 relative z-10 gap-4">
               <h3 className="text-[2.5rem] font-light text-gray-800 dark:text-[#e0e8e6] transition-colors">Daily Reflection</h3>
               <span className="text-sm font-medium tracking-widest uppercase text-gray-500 dark:text-[#9caaa7] bg-gray-50 dark:bg-[#121e1c] px-4 py-2 rounded-full w-fit transition-colors">
                 {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
               </span>
             </div>
             
             <div className="bg-[#f8fafa] dark:bg-[#121e1c] p-8 rounded-[2.5rem] mb-8 relative z-10 transition-colors">
               <h4 className="font-bold text-sm tracking-widest uppercase text-gray-500 dark:text-[#9caaa7] mb-3 flex items-center gap-3 transition-colors">
                 <PenTool className="w-5 h-5 stroke-[2] text-[#3a665c] dark:text-[#bcecdf]" /> PROMPT OF THE DAY
               </h4>
               <p className="text-xl text-on-surface dark:text-[#e0e8e6] font-light leading-relaxed transition-colors">
                 What is one thing that brought you peace today, no matter how small?
               </p>
             </div>

             {/* Mood Selector */}
             <div className="mb-8 relative z-10 px-2 flex flex-wrap gap-4 items-center justify-between bg-white dark:bg-[#1b2b28] p-4 rounded-full border border-gray-100 dark:border-white/5 transition-colors">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-[#9caaa7] ml-4 hidden sm:block">
                  CURRENT MOOD
                </span>
                <div className="flex gap-2">
                  {moods.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setScore(m.value)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
                        score === m.value 
                          ? 'bg-[#3a665c] text-white scale-110 shadow-md dark:shadow-black/20' 
                          : 'hover:bg-gray-50 dark:hover:bg-white/5 bg-transparent opacity-60 hover:opacity-100 hover:scale-105'
                      }`}
                      title={m.label}
                    >
                      {m.emoji}
                    </button>
                  ))}
                </div>
             </div>

             <textarea 
               value={entry}
               onChange={(e) => setEntry(e.target.value)}
               className="w-full h-[250px] bg-white dark:bg-[#121e1c] rounded-2xl border border-gray-200 dark:border-white/5 p-8 resize-none outline-none focus:ring-2 focus:ring-[#3a665c]/20 text-gray-800 dark:text-[#e0e8e6] placeholder-gray-400 dark:placeholder-white/20 text-lg leading-loose transition-all duration-300 relative z-10"
               placeholder="Start writing your thoughts here..."
             />

             {/* Alerts & Action */}
             <div className="mt-8 flex flex-col sm:flex-row justify-between items-center relative z-10 gap-6">
                <div className="flex-1">
                  {errorMsg && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-100 animate-in fade-in slide-in-from-bottom-2">
                      <AlertCircle className="w-5 h-5 stroke-[2]" />
                      <span className="text-sm font-medium">{errorMsg}</span>
                    </div>
                  )}
                  {successMsg && (
                    <div className="flex items-center gap-2 text-primary bg-primary/5 px-4 py-3 rounded-xl border border-primary/20 animate-in fade-in slide-in-from-bottom-2">
                      <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                      <span className="text-sm font-medium">{successMsg}</span>
                    </div>
                  )}
                </div>

                <button 
                 onClick={handleSubmit}
                 disabled={isSubmitting}
                 className="w-full sm:w-auto shrink-0 px-10 py-5 bg-[#3a665c] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all duration-300 shadow-sm disabled:opacity-70"
               >
                 {isSubmitting ? 'Saving...' : 'Save Entry'}
               </button>
             </div>
             
           </div>

           {/* Previous Reflections Section */}
           <div className="mt-12">
             <h3 className="text-xl font-medium text-gray-800 dark:text-[#e0e8e6] mb-6 px-2 transition-colors">Previous Reflections</h3>
             <div className="space-y-4">
               {history.length > 0 ? (
                 history.filter(log => log.entry).map((log) => {
                   const moodEmoji = moods.find(m => m.value === log.score)?.emoji || '😐';
                   return (
                     <div key={log._id} className="bg-white dark:bg-[#1b2b28] p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm transition-colors">
                       <div className="flex items-center gap-4 mb-3">
                         <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-[#121e1c] flex items-center justify-center text-xl shadow-inner dark:shadow-black/20 border border-transparent dark:border-white/5">
                           {moodEmoji}
                         </div>
                         <span className="text-sm font-bold uppercase tracking-widest text-[#3a665c] dark:text-[#bcecdf] opacity-90">{log.formattedDate}</span>
                       </div>
                       <p className="text-gray-700 dark:text-[#e0e8e6] leading-relaxed font-light pl-1">{log.entry}</p>
                     </div>
                   );
                 })
               ) : (
                 <div className="text-gray-500 dark:text-[#9caaa7] text-sm px-2">No past reflections yet. Start by writing one above!</div>
               )}
             </div>
           </div>
        </div>
      </div>
    </main>
  );
};

export default ProgressJournal;
