
import React from 'react';
import { Compass, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3E2723] text-white/90 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Compass className="w-8 h-8 text-[#C5A059]" />
              <span className="text-2xl font-bold serif tracking-wide text-white">Grace Fellowship</span>
            </div>
            <p className="text-white/60 leading-relaxed mb-6">
              Exploring faith together on a journey that transforms hearts and strengthens communities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 hover:bg-[#C5A059] transition-colors rounded-full"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-white/5 hover:bg-[#C5A059] transition-colors rounded-full"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-white/5 hover:bg-[#C5A059] transition-colors rounded-full"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold serif mb-6 text-white underline decoration-[#C5A059] underline-offset-8">Quick Links</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Our Beliefs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Worship Times</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Small Groups</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Donate</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold serif mb-6 text-white underline decoration-[#C5A059] underline-offset-8">Connect</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#C5A059]" /> 123 Faith Lane, Forest Glen, OR</li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#C5A059]" /> (555) 123-4567</li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#C5A059]" /> hello@gracefellowship.org</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold serif mb-6 text-white underline decoration-[#C5A059] underline-offset-8">Newsletter</h4>
            <p className="text-white/60 mb-4 text-sm">Get journey updates and weekly devotionals.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              />
              <button className="bg-[#C5A059] hover:bg-[#B48F49] text-white px-4 py-2 rounded-lg font-bold transition-all">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-white/5 text-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Grace Fellowship Church. Built for the journey ahead.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
