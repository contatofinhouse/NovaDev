import React from 'react';
import { Layout, Database, Cloud, CheckCircle, Zap, Lock, Code2, Workflow } from 'lucide-react';
import { ServiceType } from '../types';

const ServiceSection: React.FC = () => {
  const services = [
    {
      type: ServiceType.LANDING,
      icon: <Layout className="w-8 h-8 text-cyan-400" />,
      title: "Landing Pages por Assinatura",
      description: "Sites focados em conversão. Nós desenhamos, codificamos e hospedamos. Você foca em vender.",
      features: [
        "Design Premium (Não é Template)", 
        "Botão Whatsapp Flutuante", 
        "Hospedagem Inclusa", 
        "Manutenção Mensal Grátis"
      ]
    },
    {
      type: ServiceType.CMS,
      icon: <Database className="w-8 h-8 text-purple-400" />,
      title: "Sites Dinâmicos & Blogs",
      description: "Painel administrativo intuitivo para sua equipe gerenciar conteúdo sem depender de desenvolvedores.",
      features: [
        "Painel Admin Personalizado", 
        "Otimizado para Google (SEO)", 
        "Carregamento Instantâneo", 
        "Backup Diário"
      ]
    },
    {
      type: ServiceType.SAAS,
      icon: <Workflow className="w-8 h-8 text-blue-400" />,
      title: "Automação n8n & SaaS",
      description: "Conectamos seus sistemas e criamos ferramentas internas. Reduza custos operacionais automatizando processos.",
      features: [
        "Workflows no n8n / Make", 
        "Dashboards Customizados", 
        "Integração de APIs", 
        "Custo de Setup Reduzido"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-950 relative border-b border-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Por que NovaDev?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            O modelo tradicional de agência morreu. Oferecemos <strong>Website as a Service</strong>. 
            Tecnologia de ponta, zero dor de cabeça técnica e preços previsíveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="group bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/20 hover:-translate-y-1"
            >
              <div className="mb-6 bg-slate-800/50 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-slate-800 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-slate-400 mb-8 leading-relaxed h-20">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center text-slate-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-cyan-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-800/50">
                <Lock className="w-8 h-8 text-cyan-500 mx-auto mb-3" />
                <h4 className="text-white font-bold mb-1">Sem Dor de Cabeça</h4>
                <p className="text-sm text-slate-500">Nós lidamos com servidores, SSL e domínios.</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-800/50">
                <Zap className="w-8 h-8 text-cyan-500 mx-auto mb-3" />
                <h4 className="text-white font-bold mb-1">Performance Extrema</h4>
                <p className="text-sm text-slate-500">Google PageSpeed 95+. Muito mais rápido que Wix.</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-800/50">
                <Code2 className="w-8 h-8 text-cyan-500 mx-auto mb-3" />
                <h4 className="text-white font-bold mb-1">Equipe Expert</h4>
                <p className="text-sm text-slate-500">Desenvolvedores Senior cuidando do seu projeto.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;