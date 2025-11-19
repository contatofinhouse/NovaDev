import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ServiceSection from './components/ServiceSection';
import PortfolioSection, { ProjectData } from './components/PortfolioSection';
import PricingSection from './components/PricingSection';
import ProjectPage from './components/ProjectPage';
import Consultant from './components/Consultant';
import { Mail, MapPin, Phone, Github, Twitter, Linkedin, MessageCircle } from 'lucide-react';

type ViewState = 'home' | 'project';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const scrollToSection = (id: string) => {
    if (view !== 'home') {
      setView('home');
      // Wait for render then scroll
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectClick = (project: ProjectData) => {
    setSelectedProject(project);
    setView('project');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setView('home');
    setSelectedProject(null);
    // Optional: preserve scroll position logic could be added here
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
      
      {view === 'home' && (
        <>
          <Navigation onNavigate={scrollToSection} />
          <main>
            <Hero onCtaClick={() => scrollToSection('consultant')} />
            <ServiceSection />
            <PortfolioSection onProjectClick={handleProjectClick} />
            <PricingSection />
            <Consultant onViewProject={handleProjectClick} />
          </main>
        </>
      )}

      {view === 'project' && selectedProject && (
        <ProjectPage project={selectedProject} onBack={handleBackToHome} />
      )}

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/5511912345678" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all hover:scale-110 group flex items-center justify-center"
        aria-label="Fale conosco no WhatsApp"
      >
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-3 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
          Orçamento Rápido
        </span>
        <MessageCircle className="w-8 h-8 fill-current" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
      </a>

      {/* Footer - Only show on home or customize for project view if needed */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">NovaDevX Agency</h2>
              <p className="text-slate-400 max-w-md leading-relaxed mb-6">
                Somos uma agência digital com visão de futuro, especializada na construção de aplicações web escaláveis e de alto desempenho para empresas modernas.
                Impulsionada por expertise humana e inteligência artificial.
              </p>
              <div className="flex gap-4">
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Serviços</h3>
              <ul className="space-y-4 text-slate-400">
                <li onClick={() => scrollToSection('services')} className="hover:text-cyan-400 cursor-pointer transition-colors">Desenvolvimento de Landing Pages</li>
                <li onClick={() => scrollToSection('services')} className="hover:text-cyan-400 cursor-pointer transition-colors">Arquitetura SaaS</li>
                <li onClick={() => scrollToSection('services')} className="hover:text-cyan-400 cursor-pointer transition-colors">Integração CMS Headless</li>
                <li onClick={() => scrollToSection('consultant')} className="hover:text-cyan-400 cursor-pointer transition-colors">Consultoria de IA</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Contato</h3>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-500" />
                  hello@novadevx.agency
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-cyan-500" />
                  +55 (11) 91234-5678
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-cyan-500" />
                  São Paulo, SP
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} NovaDevX Agency. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-slate-300 transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Termos de Serviço</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;