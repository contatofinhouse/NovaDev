import React, { useState, useEffect } from 'react';
import { Menu, X, Code } from 'lucide-react';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Serviços', id: 'services' },
    { label: 'Portfólio', id: 'portfolio' },
    { label: 'Preços', id: 'pricing' },
    { label: 'Consultor IA', id: 'consultant' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('hero')}
        >
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
            <Code className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            NovaDev
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="text-slate-300 hover:text-cyan-400 transition-colors font-medium text-sm uppercase tracking-wide"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => onNavigate('consultant')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full font-semibold transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] text-sm"
          >
            Iniciar Projeto
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-slate-300 hover:text-cyan-400 py-2 border-b border-slate-800"
            >
              {item.label}
            </button>
          ))}
          <button
             onClick={() => {
                onNavigate('consultant');
                setIsMobileMenuOpen(false);
             }}
             className="bg-cyan-500 text-white py-3 rounded-lg mt-2 font-semibold"
          >
            Iniciar Projeto
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;