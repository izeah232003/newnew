
import React, { useState, useEffect } from 'react';
import { Compass, Menu, X } from 'lucide-react';
import { NAV_ITEMS, COLORS } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF7F2]/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Compass className="w-8 h-8 text-[#C5A059]" />
            <span className="text-xl font-bold serif tracking-wide text-[#3E2723]">
              Grace Fellowship
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#3E2723] hover:text-[#C5A059] transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#3E2723] hover:text-[#C5A059] p-2"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] absolute top-full left-0 w-full shadow-lg animate-fade-in border-t border-[#8B6B5D]/10">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-4 text-base font-medium text-[#3E2723] hover:bg-[#8B6B5D]/5 rounded-lg"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
