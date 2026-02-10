
import React from 'react';
import { ChevronDown, Compass } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#FAF7F2]"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-bounce-slow">
          <Compass className="w-5 h-5 text-[#C5A059]" />
          <span className="text-white text-xs uppercase tracking-widest font-semibold">Adventure in Faith</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl text-white font-bold serif mb-6 drop-shadow-lg leading-tight">
          The Pathfinder’s <br/><span className="italic text-[#C5A059]">Journey</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-white/90 font-light mb-12 max-w-2xl mx-auto drop-shadow-sm leading-relaxed">
          A Guide for Faith and Exploration. Join us as we traverse the landscape of spiritual growth and community.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#paths" 
            className="px-10 py-4 bg-[#C5A059] hover:bg-[#B48F49] text-white rounded-full font-semibold transition-all shadow-xl hover:shadow-[#C5A059]/30 transform hover:-translate-y-1"
          >
            Start Your Journey
          </a>
          <a 
            href="#about" 
            className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md rounded-full font-semibold transition-all transform hover:-translate-y-1"
          >
            Our Story
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-[#3E2723]" />
      </div>
    </section>
  );
};

export default Hero;
