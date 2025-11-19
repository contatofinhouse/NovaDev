import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  category: 'SaaS' | 'Landing Page' | 'CMS';
  description: string;
  imageGradient: string;
  techStack: string[];
  previewImage?: string; // New field for AI generated preview image
  generatedHtml?: string; // New field for AI generated code
}

export const projectsData: ProjectData[] = [
  {
    id: 'saas-analytics',
    title: 'Nexus Analytics',
    category: 'SaaS',
    description: 'Uma plataforma de análise de dados em tempo real para e-commerce com dashboards customizáveis.',
    imageGradient: 'from-blue-600 to-indigo-900',
    techStack: ['React', 'Node.js', 'PostgreSQL']
  },
  {
    id: 'landing-fitness',
    title: 'Pulse Gym',
    category: 'Landing Page',
    description: 'Site de alta conversão para uma rede de academias boutique, focado em captação de leads.',
    imageGradient: 'from-emerald-500 to-cyan-900',
    techStack: ['Next.js', 'Tailwind', 'Framer Motion']
  },
  {
    id: 'cms-blog',
    title: 'TechDaily',
    category: 'CMS',
    description: 'Portal de notícias de tecnologia com gestão de conteúdo headless e renderização estática.',
    imageGradient: 'from-orange-500 to-red-900',
    techStack: ['Sanity', 'Gatsby', 'Vercel']
  }
];

interface PortfolioSectionProps {
  onProjectClick: (project: ProjectData) => void;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onProjectClick }) => {
  return (
    <section id="portfolio" className="py-24 bg-slate-900 relative overflow-hidden">
       {/* Background decorative */}
       <div className="absolute right-0 top-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Aplicações Criadas</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Explore nossa galeria de projetos entregues. Do conceito à implementação, 
            criamos experiências digitais que definem o mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div 
              key={project.id}
              className="group relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/10 cursor-pointer"
              onClick={() => onProjectClick(project)}
            >
              {/* Project Preview "Thumbnail" */}
              <div className={`h-48 w-full bg-gradient-to-br ${project.imageGradient} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 group-hover:scale-110 transition-transform">
                   <ExternalLink className="text-white w-6 h-6" />
                </div>
              </div>
              
              <div className="p-8">
                <div className="text-xs font-bold text-cyan-500 uppercase tracking-wider mb-2">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-6 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                   {project.techStack.map((tech, i) => (
                     <span key={i} className="text-xs px-2 py-1 bg-slate-900 rounded text-slate-500 border border-slate-800">
                       {tech}
                     </span>
                   ))}
                </div>

                <div className="flex items-center text-sm font-semibold text-white gap-2 group-hover:gap-3 transition-all">
                  Ver Projeto <ArrowRight className="w-4 h-4 text-cyan-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;