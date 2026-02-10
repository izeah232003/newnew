
import React, { useState } from 'react';
import { Map, Send, Sparkles, Navigation } from 'lucide-react';
import { getSpiritualGuidance } from '../services/geminiService';
import { CompassResponse } from '../types';

const PathfinderAI: React.FC = () => {
  const [mood, setMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [guidance, setGuidance] = useState<CompassResponse | null>(null);

  const handleSeekGuidance = async () => {
    if (!mood.trim()) return;
    setIsLoading(true);
    const result = await getSpiritualGuidance(mood);
    setGuidance(result);
    setIsLoading(false);
  };

  return (
    <section className="py-24 bg-[#F2EDE4]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-[#C5A059]/20 flex flex-col md:flex-row">
          
          <div className="bg-[#4A5D23] p-12 md:w-1/3 flex flex-col justify-center items-center text-center text-white">
            <Navigation className="w-16 h-16 mb-6 text-[#C5A059] animate-pulse" />
            <h3 className="text-3xl font-bold serif mb-4">Daily Compass</h3>
            <p className="text-white/80 font-light">Where are you on your path today? Tell the Pathfinder, and find your verse for the journey.</p>
          </div>

          <div className="p-12 md:w-2/3 flex flex-col">
            {!guidance ? (
              <div className="space-y-6">
                <h4 className="text-2xl font-bold serif text-[#3E2723]">Set your direction...</h4>
                <p className="text-[#8B6B5D]">How are you feeling today? (e.g., Tired, Joyful, Seeking Purpose, Anxious)</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="text"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="Enter your current step..."
                    className="flex-1 px-6 py-4 rounded-2xl border border-[#8B6B5D]/20 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 bg-[#FAF7F2] text-[#3E2723]"
                    onKeyDown={(e) => e.key === 'Enter' && handleSeekGuidance()}
                  />
                  <button 
                    onClick={handleSeekGuidance}
                    disabled={isLoading || !mood.trim()}
                    className="px-8 py-4 bg-[#C5A059] text-white rounded-2xl font-bold hover:bg-[#B48F49] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? 'Consulting...' : <><Send className="w-4 h-4" /> Seek Guide</>}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-4">
                  {['Joyful', 'Lost', 'Peaceful', 'Challenged'].map(m => (
                    <button 
                      key={m}
                      onClick={() => setMood(m)}
                      className="text-xs px-4 py-2 bg-[#8B6B5D]/10 rounded-full hover:bg-[#8B6B5D]/20 transition-colors text-[#3E2723]"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="px-4 py-1 bg-[#4A5D23]/10 text-[#4A5D23] rounded-full text-xs font-bold uppercase tracking-widest">Guidance Received</span>
                  <button 
                    onClick={() => {setGuidance(null); setMood('');}}
                    className="text-[#8B6B5D] hover:text-[#C5A059] text-sm underline underline-offset-4"
                  >
                    Reset Path
                  </button>
                </div>
                
                <p className="text-xl text-[#3E2723] font-light leading-relaxed italic">
                  "{guidance.message}"
                </p>

                <div className="p-8 bg-[#FAF7F2] rounded-3xl border-l-8 border-[#C5A059]">
                  <p className="text-2xl font-bold serif text-[#3E2723] mb-4">
                    {guidance.verse}
                  </p>
                  <p className="text-[#C5A059] font-bold uppercase tracking-widest text-sm">
                    — {guidance.reference}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[#8B6B5D] text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Personalized path generated for your heart today.</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PathfinderAI;
