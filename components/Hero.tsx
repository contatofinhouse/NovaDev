import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              Assinatura de Sites Premium & Automação
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 animate-slide-up">
            Construímos <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              Impérios Digitais
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Landing Pages, Blogs e Sistemas SaaS sem o custo de grandes agências.
            Assine seu site como um serviço ou automatize sua empresa com n8n.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button 
              onClick={onCtaClick}
              className="group relative px-8 py-4 bg-cyan-500 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Falar com Arquiteto IA <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 rounded-full font-medium transition-all"
            >
              Ver Planos Mensais
            </button>
          </div>
        </div>

        {/* Stats / Trusted By */}
        <div className="mt-24 pt-8 border-t border-slate-800/50 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Projetos Ativos', value: '150+' },
              { label: 'Economia Gerada', value: 'R$ 1M+' },
              { label: 'Disponibilidade', value: '99.9%' },
              { label: 'Suporte', value: 'Humanizado' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;