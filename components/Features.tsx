
import React from 'react';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section id="paths" className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold serif text-[#3E2723] mb-4">Charting the Course</h2>
          <div className="w-24 h-1 bg-[#C5A059] mx-auto rounded-full"></div>
          <p className="mt-6 text-[#8B6B5D] max-w-xl mx-auto text-lg italic">
            "Your word is a lamp for my feet, a light on my path." — Psalm 119:105
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <div 
              key={feature.title}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#8B6B5D]/10"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-2xl shadow-md text-[#4A5D23]">
                  {feature.icon}
                </div>
              </div>
              
              <div className="p-8">
                <span className="text-[#C5A059] text-xs font-bold uppercase tracking-wider mb-2 block">
                  {feature.subtitle}
                </span>
                <h3 className="text-2xl font-bold serif text-[#3E2723] mb-4">
                  {feature.title}
                </h3>
                <p className="text-[#8B6B5D] leading-relaxed">
                  {feature.description}
                </p>
                
                <button className="mt-8 flex items-center text-[#4A5D23] font-bold hover:text-[#C5A059] transition-colors group">
                  Learn More 
                  <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
