import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertCircle, User as UserIcon } from 'lucide-react';
import api from '../lib/api';

const ChatCompanion = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: "Hello. I'm your Calm Companion. Whatever you're feeling right now is okay. How can I support you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const newMessage = { id: Date.now(), role: 'user', text: userText };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await api.post('/chat', { message: userText });
      
      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, role: 'bot', text: response.data.reply }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, role: 'bot', text: "I'm sorry, I'm having trouble connecting right now. Take a deep breath and try again in a moment." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <main className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-serene-bg dark:from-[#121e1c] to-primary/5 dark:to-[#1b2b28] p-4 md:p-8 transition-colors duration-500">
      
      <div className="w-full max-w-4xl h-full max-h-[85vh] flex flex-col bg-white/90 dark:bg-[#1b2b28]/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(42,52,53,0.1)] dark:shadow-black/50 border border-white dark:border-white/5 overflow-hidden relative transition-colors duration-500">
        
        {/* Header Ribbon */}
        <div className="bg-white/60 dark:bg-[#121e1c]/60 backdrop-blur-md p-6 md:px-10 border-b border-gray-100/50 dark:border-white/5 shrink-0 relative z-20 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between transition-colors">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3a665c] to-[#26453e] flex items-center justify-center shadow-lg shadow-[#3a665c]/20">
               <Sparkles className="w-6 h-6 text-white stroke-[1.5]" />
             </div>
             <div>
               <h2 className="text-2xl font-light text-gray-800 dark:text-[#e0e8e6] transition-colors">Calm Companion</h2>
               <p className="text-sm font-medium text-gray-500 dark:text-[#9caaa7] uppercase tracking-widest mt-0.5 transition-colors">Always here to listen</p>
             </div>
           </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-red-50/80 backdrop-blur-sm mx-6 mt-6 p-4 rounded-2xl shrink-0 flex items-center gap-3 border border-red-100 shadow-sm relative z-10">
           <AlertCircle className="w-5 h-5 text-red-600 shrink-0 stroke-[2]" />
           <p className="text-xs md:text-sm font-medium text-red-700">
             I am an AI companion, not a medical professional. If you are in crisis, please call emergency services immediately.
           </p>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-transparent flex flex-col relative z-0">
          <div className="flex flex-col gap-6">
            {messages.map((msg) => {
              const isBot = msg.role === 'bot';
              return (
                <div key={msg.id} className={`flex gap-4 max-w-[85%] ${isBot ? 'self-start' : 'self-end flex-row-reverse'}`}>
                  
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center mt-auto shadow-md border border-white dark:border-white/5 ${isBot ? 'bg-gradient-to-br from-[#3a665c] to-[#26453e] text-white' : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#2a3a38] dark:to-[#1f2a28] text-gray-500 dark:text-[#9caaa7] transition-colors'}`}>
                    {isBot ? <Sparkles className="w-5 h-5 stroke-[1.5]" /> : <UserIcon className="w-5 h-5 stroke-[1.5]" />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`p-5 rounded-[2rem] text-[1.05rem] leading-relaxed shadow-[0_10px_20px_-10px_rgba(0,0,0,0.05)] transition-colors ${
                    isBot 
                      ? 'bg-white/90 dark:bg-[#121e1c]/90 backdrop-blur-sm text-gray-800 dark:text-[#e0e8e6] border border-gray-100 dark:border-white/5 rounded-bl-md' 
                      : 'bg-gradient-to-br from-[#3a665c] to-[#26453e] text-white rounded-br-md shadow-[#3a665c]/20 border border-[#488073]/30 dark:border-[#3a665c]/50'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}

             {isTyping && (
               <div className="flex gap-4 max-w-[85%] self-start fade-in animate-in">
                 <div className="w-10 h-10 rounded-full flex shrink-0 items-center justify-center mt-auto shadow-md border border-white dark:border-transparent bg-gradient-to-br from-[#3a665c] to-[#26453e] text-white">
                   <Sparkles className="w-5 h-5 stroke-[1.5]" />
                 </div>
                 <div className="p-5 rounded-[2rem] bg-white/90 dark:bg-[#121e1c]/90 backdrop-blur-sm border border-gray-100 dark:border-white/5 rounded-bl-md shadow-[0_10px_20px_-10px_rgba(0,0,0,0.05)] flex items-center gap-2 h-[60px] transition-colors">
                   <span className="w-2 h-2 bg-[#3a665c]/40 dark:bg-[#bcecdf]/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                   <span className="w-2 h-2 bg-[#3a665c]/40 dark:bg-[#bcecdf]/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                   <span className="w-2 h-2 bg-[#3a665c]/40 dark:bg-[#bcecdf]/40 rounded-full animate-bounce"></span>
                 </div>
               </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white/70 dark:bg-[#1b2b28]/70 backdrop-blur-lg p-6 shrink-0 border-t border-white dark:border-white/5 shadow-[0_-10px_40px_-20px_rgba(42,52,53,0.05)] relative z-20 transition-colors">
          <form onSubmit={handleSend} className="relative flex items-center shadow-[0_5px_20px_-5px_rgba(0,0,0,0.05)] rounded-full">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message here..."
              disabled={isTyping}
              className="w-full bg-white dark:bg-[#121e1c] border border-gray-100/80 dark:border-white/5 rounded-full px-8 py-5 pr-16 outline-none focus:ring-2 focus:ring-[#3a665c]/30 text-gray-800 dark:text-[#e0e8e6] placeholder-gray-400 dark:placeholder-white/40 disabled:opacity-50 transition-all font-medium"
            />
            <button 
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              className="absolute right-3 w-12 h-12 bg-gradient-to-br from-[#3a665c] to-[#26453e] text-white rounded-full flex items-center justify-center hover:opacity-90 disabled:from-gray-300 disabled:to-gray-300 dark:disabled:from-[#2a3a38] dark:disabled:to-[#1f2a28] disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
            >
              <Send className="w-5 h-5 -ml-0.5" strokeWidth={2} />
            </button>
          </form>
        </div>

      </div>
    </main>
  );
};

export default ChatCompanion;
