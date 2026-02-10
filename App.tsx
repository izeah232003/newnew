
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import PathfinderAI from './components/PathfinderAI';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-[#C5A059]/30">
      <Navbar />
      <main>
        <Hero />
        
        {/* About Section */}
        <section id="about" className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800" 
                  alt="Path through the woods" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-[#C5A059] p-8 rounded-[2rem] text-white shadow-xl hidden lg:block">
                <p className="text-3xl font-bold serif italic mb-1">Established</p>
                <p className="text-sm tracking-widest font-bold uppercase">Autumn 1984</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <span className="text-[#C5A059] font-bold uppercase tracking-widest text-sm">A Tradition of Exploration</span>
              <h2 className="text-4xl md:text-5xl font-bold serif text-[#3E2723] leading-tight">
                Every Mile is a <span className="italic">Lesson in Grace</span>
              </h2>
              <p className="text-lg text-[#8B6B5D] leading-relaxed">
                At Grace Fellowship, we believe faith isn't a destination—it's the trail we walk together. 
                Whether you're just starting to explore who God is, or you've been on this path for decades, 
                there's a place for your feet here.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold serif text-[#3E2723]">400+</h4>
                  <p className="text-[#8B6B5D] text-sm font-medium uppercase tracking-wide">Community Members</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold serif text-[#3E2723]">12</h4>
                  <p className="text-[#8B6B5D] text-sm font-medium uppercase tracking-wide">Local Outreach Projects</p>
                </div>
              </div>
              <button className="px-8 py-4 bg-[#4A5D23] hover:bg-[#3D4C1D] text-white rounded-full font-bold transition-all shadow-lg transform hover:-translate-y-1">
                Read Our Full Story
              </button>
            </div>
          </div>
        </section>

        <Features />
        
        <PathfinderAI />

        {/* Community Events Quick View */}
        <section id="events" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-4xl font-bold serif text-[#3E2723] mb-4">Upcoming Gatherings</h2>
                <p className="text-[#8B6B5D]">Where we meet on the trail this month.</p>
              </div>
              <button className="text-[#C5A059] font-bold hover:underline">View Calendar →</button>
            </div>

            <div className="space-y-4">
              {[
                { date: 'OCT 12', time: '10:00 AM', title: 'Mountain Top Worship', location: 'Summit View Park' },
                { date: 'OCT 15', time: '06:30 PM', title: 'The Path Study Group', location: 'Church Library' },
                { date: 'OCT 20', time: '09:00 AM', title: 'Hands & Feet Outreach', location: 'Local Shelter' },
              ].map((event, i) => (
                <div key={i} className="group flex items-center p-6 bg-[#FAF7F2] rounded-3xl hover:bg-[#F2EDE4] transition-colors cursor-pointer border border-transparent hover:border-[#C5A059]/20">
                  <div className="bg-white p-4 rounded-2xl shadow-sm text-center min-w-[80px]">
                    <p className="text-[#C5A059] font-bold text-xs">{event.date.split(' ')[0]}</p>
                    <p className="text-xl font-bold serif text-[#3E2723]">{event.date.split(' ')[1]}</p>
                  </div>
                  <div className="ml-8 flex-1">
                    <h5 className="text-lg font-bold text-[#3E2723] group-hover:text-[#C5A059] transition-colors">{event.title}</h5>
                    <p className="text-sm text-[#8B6B5D]">{event.time} • {event.location}</p>
                  </div>
                  <button className="hidden sm:block px-6 py-2 bg-white text-[#4A5D23] border border-[#4A5D23]/20 rounded-full text-sm font-bold group-hover:bg-[#4A5D23] group-hover:text-white transition-all">
                    RSVP
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
