import React from 'react';
import { ArrowLeft, Globe, Github, BarChart3, Users, DollarSign, Layout, Type, Image as ImageIcon, Code } from 'lucide-react';
import { ProjectData } from './PortfolioSection';

interface ProjectPageProps {
  project: ProjectData;
  onBack: () => void;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project, onBack }) => {
  
  // Helper to render different mock UIs based on category
  const renderMockUI = () => {
    // PRIORITY: If this is an AI Generated project with Code
    if (project.generatedHtml) {
      return (
        <iframe 
          srcDoc={project.generatedHtml}
          className="w-full h-full border-0 bg-white"
          title="Preview do Projeto Gerado"
          sandbox="allow-scripts" // Allow scripts for Tailwind CDN
        />
      );
    }

    // AI Generated Image or Legacy Preview
    if (project.previewImage) {
      return (
        <div className="w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden">
          <img 
            src={project.previewImage} 
            alt={`Visual do projeto ${project.title}`} 
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      );
    }

    if (project.category === 'SaaS') {
      return (
        <div className="w-full h-full bg-slate-50 flex flex-col text-slate-800 overflow-hidden rounded-b-lg">
          <div className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
            <div className="font-bold text-indigo-600 text-xl flex items-center gap-2">
               <div className="w-6 h-6 bg-indigo-600 rounded-lg"></div> Nexus
            </div>
            <div className="flex gap-4 text-sm text-slate-500">
               <span>Dashboard</span>
               <span>Relatórios</span>
               <span>Configurações</span>
            </div>
            <div className="w-8 h-8 bg-indigo-100 rounded-full"></div>
          </div>
          <div className="p-6 flex-1 bg-slate-50 overflow-y-auto">
             <div className="grid grid-cols-3 gap-4 mb-6">
               {[
                 { l: 'Receita Total', v: 'R$ 124.500', i: DollarSign, c: 'text-green-600' },
                 { l: 'Novos Usuários', v: '+1,240', i: Users, c: 'text-blue-600' },
                 { l: 'Taxa de Conversão', v: '3.2%', i: BarChart3, c: 'text-purple-600' }
               ].map((stat, idx) => (
                 <div key={idx} className="bg-white p-4 rounded-xl shadow-sm">
                   <div className="flex justify-between items-start mb-2">
                     <span className="text-xs text-slate-500 font-bold uppercase">{stat.l}</span>
                     <stat.i className={`w-4 h-4 ${stat.c}`} />
                   </div>
                   <div className="text-2xl font-bold">{stat.v}</div>
                 </div>
               ))}
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm h-64 flex items-center justify-center border-2 border-dashed border-slate-200 text-slate-400">
                Gráfico de Vendas em Tempo Real
             </div>
          </div>
        </div>
      );
    } 
    
    if (project.category === 'CMS') {
      return (
        <div className="w-full h-full bg-white flex flex-col text-slate-800 overflow-hidden rounded-b-lg">
          <div className="border-b border-black py-6 px-8 flex justify-between items-center">
             <h1 className="text-3xl font-serif font-black tracking-tighter">TechDaily.</h1>
             <div className="text-xs font-mono border border-black px-2 py-1 rounded-full">SUBSCRIBE</div>
          </div>
          <div className="p-8 overflow-y-auto">
             <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8">
                   <div className="aspect-video bg-slate-200 mb-4 rounded-sm"></div>
                   <h2 className="text-2xl font-bold mb-2 leading-tight">O Futuro da Web: Porque Headless CMS é a Nova Norma</h2>
                   <p className="text-slate-600 font-serif leading-relaxed">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...
                   </p>
                </div>
                <div className="col-span-4 space-y-6">
                   <div className="border-t-2 border-black pt-2">
                      <span className="text-xs font-bold uppercase text-slate-400">Trending</span>
                      <h3 className="font-bold mt-1">React vs Vue em 2025</h3>
                   </div>
                   <div className="border-t-2 border-black pt-2">
                      <span className="text-xs font-bold uppercase text-slate-400">Review</span>
                      <h3 className="font-bold mt-1">O Novo iPhone 16</h3>
                   </div>
                </div>
             </div>
          </div>
        </div>
      );
    }

    // Default Landing Page
    return (
      <div className="w-full h-full bg-zinc-900 flex flex-col text-white overflow-hidden rounded-b-lg relative">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
         <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
            <h1 className="text-5xl font-extrabold italic mb-4 tracking-tighter">PULSE GYM</h1>
            <p className="text-xl mb-8 font-light max-w-md">Redefina seus limites. A experiência fitness definitiva começa aqui.</p>
            <button className="bg-emerald-500 text-black font-bold px-8 py-3 rounded-full hover:bg-emerald-400 transition-colors">
              COMEÇAR AGORA
            </button>
         </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 animate-fade-in pt-20">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 z-50 h-20 flex items-center">
         <div className="container mx-auto px-6 flex justify-between items-center">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
            <h2 className="font-bold text-lg hidden md:block">{project.title}</h2>
            <div className="flex gap-4">
              <button className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-cyan-400 transition-colors">
                <Globe className="w-5 h-5" />
              </button>
              <button className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </button>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left: Project Details */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${project.imageGradient} text-white mb-4`}>
                {project.category}
              </div>
              <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
              <p className="text-slate-400 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Layout className="w-4 h-4 text-cyan-500" /> Stack Tecnológico
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-950 text-slate-300 rounded-lg text-sm border border-slate-800">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">Features Principais</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-300">
                   <div className="w-2 h-2 bg-cyan-500 rounded-full"></div> Design Responsivo
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                   <div className="w-2 h-2 bg-cyan-500 rounded-full"></div> Alta Performance (Lighthouse 95+)
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                   <div className="w-2 h-2 bg-cyan-500 rounded-full"></div> SEO Otimizado
                </li>
              </ul>
            </div>
            
            {project.previewImage && (
              <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-xl">
                <div className="flex items-center gap-2 mb-2 text-blue-400 font-bold text-sm">
                  <ImageIcon className="w-4 h-4" /> Conceito Visual Gerado
                </div>
                <p className="text-xs text-slate-400">
                  Esta é uma imagem conceitual de alta fidelidade gerada pela IA baseada no seu briefing.
                </p>
              </div>
            )}
          </div>

          {/* Right: Live Preview Simulation */}
          <div className="lg:col-span-2 h-[800px] flex flex-col">
             <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 p-2 shadow-2xl flex flex-col">
                {/* Browser Header Mock */}
                <div className="bg-slate-800 rounded-t-lg p-3 flex items-center gap-4 mb-[1px] flex-shrink-0">
                   <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                   </div>
                   <div className="flex-1 bg-slate-950/50 rounded-md px-4 py-1 text-xs text-slate-500 text-center font-mono truncate">
                      {project.generatedHtml ? 'https://preview.novadevx-ai.gen/live' : `https://novadevx-clients.com/${project.id}`}
                   </div>
                </div>
                
                {/* Viewport */}
                <div className="flex-1 bg-white w-full rounded-b-lg overflow-hidden relative">
                   {renderMockUI()}
                </div>
             </div>
             
             <p className="text-center text-slate-500 text-sm mt-4">
               * Simulação interativa da aplicação entregue
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectPage;