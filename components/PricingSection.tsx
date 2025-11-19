import React from 'react';
import { Check, HelpCircle, Zap } from 'lucide-react';

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="text-green-400 text-xs font-bold uppercase tracking-wider">
              Modelo de Assinatura Inteligente
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Pare de pagar caro por desenvolvimento</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Esqueça orçamentos de R$ 5.000 ou R$ 10.000 de entrada. 
            Na <span className="text-cyan-400 font-semibold">NovaDevX</span>, você paga uma mensalidade acessível e nós cuidamos de toda a tecnologia, hospedagem e manutenção. Melhor que Wix, porque nós fazemos para você.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Plan 1: Landing Page Subscription */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col hover:border-cyan-500/30 transition-colors">
            <div className="mb-4">
              <span className="bg-slate-800 text-slate-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Landing Page
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Presença Digital</h3>
            <p className="text-slate-400 text-sm mb-6 h-10">Ideal para profissionais liberais e campanhas de tráfego pago.</p>
            
            <div className="mb-6">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold text-white">R$ 149,90</span>
                <span className="text-slate-500 text-sm mb-1">/ mês</span>
              </div>
              <span className="text-xs text-emerald-400 font-medium block mt-2">Zero custo de implantação*</span>
            </div>

            <button 
              onClick={() => document.getElementById('consultant')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors mb-8"
            >
              Assinar Agora
            </button>

            <ul className="space-y-4 flex-1">
              {[
                "Design Premium (Não é template pronto)",
                "Hospedagem Inclusa (AWS/Vercel)",
                "Domínio Grátis (no plano anual)",
                "Botão WhatsApp & Links Bio",
                "Atualizações de Texto Ilimitadas",
                "Suporte via WhatsApp",
                "Sem Fidelidade (Cancele quando quiser)"
              ].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan 2: CMS / Corporate Subscription */}
          <div className="bg-slate-900/80 border-2 border-cyan-500/50 rounded-2xl p-8 flex flex-col relative shadow-2xl shadow-cyan-900/20 transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Mais Vendido
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Site Dinâmico & Blog</h3>
            <p className="text-slate-400 text-sm mb-6 h-10">Para empresas que precisam postar notícias, artigos ou portfólio.</p>
            
            <div className="mb-6">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold text-white">R$ 299,90</span>
                <span className="text-slate-500 text-sm mb-1">/ mês</span>
              </div>
              <span className="text-xs text-emerald-400 font-medium block mt-2">Zero custo de implantação*</span>
            </div>

            <button 
              onClick={() => document.getElementById('consultant')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/30 mb-8"
            >
              Começar Projeto
            </button>

            <ul className="space-y-4 flex-1">
              {[
                "Tudo do plano Landing Page",
                "Painel Administrativo Fácil",
                "Blog Otimizado para Google (SEO)",
                "Páginas Ilimitadas",
                "Relatório Mensal de Acessos",
                "Formulários Integrados ao E-mail",
                "Backup Diário Automático",
                "Manutenção Técnica Inclusa"
              ].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan 3: SaaS / Automation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col hover:border-purple-500/30 transition-colors">
             <div className="mb-4">
              <span className="bg-purple-900/30 text-purple-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-purple-800/50">
                Customizado
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">SaaS & Automação</h3>
            <p className="text-slate-400 text-sm mb-6 h-10">Web Apps complexos, dashboards e automações n8n.</p>
            
            <div className="mb-6">
              <div className="flex flex-col">
                <span className="text-sm text-slate-400">Implantação (Setup) a partir de</span>
                <span className="text-3xl font-bold text-white">R$ 2.500,00</span>
                <span className="text-xs text-slate-500 mt-1">+ mensalidade de manutenção</span>
              </div>
            </div>

            <button 
              onClick={() => document.getElementById('consultant')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors mb-8"
            >
              Orçar Automação
            </button>

            <ul className="space-y-4 flex-1">
              {[
                "Automações n8n / Make",
                "Integração de APIs & CRMs",
                "Sistemas Internos / Dashboards",
                "Área de Membros (Login)",
                "Banco de Dados Dedicado",
                "Código Propriedade do Cliente",
                "Treinamento da Equipe",
                "Suporte Técnico Especializado"
              ].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ Snippet */}
        <div className="mt-20 max-w-3xl mx-auto bg-slate-900/50 rounded-2xl p-8 border border-slate-800">
           <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
             <HelpCircle className="w-5 h-5 text-cyan-500" />
             Por que o modelo de assinatura vale a pena?
           </h4>
           <div className="grid gap-6 md:grid-cols-2">
             <div>
               <h5 className="font-semibold text-white mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500"/> Sem Investimento Inicial Alto</h5>
               <p className="text-slate-400 text-sm">
                 Diferente de agências que cobram R$ 5mil só para começar, aqui você paga apenas a mensalidade. Dilua seu custo operacional.
               </p>
             </div>
             <div>
               <h5 className="font-semibold text-white mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500"/> Nunca fica desatualizado</h5>
               <p className="text-slate-400 text-sm">
                 Sites "comprados" ficam velhos em 2 anos. Na assinatura, nós mantemos a tecnologia sempre atualizada.
               </p>
             </div>
             <div>
               <h5 className="font-semibold text-white mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500"/> Melhor que Wix</h5>
               <p className="text-slate-400 text-sm">
                 No Wix você paga e tem que trabalhar. Aqui você paga e <strong>nós trabalhamos</strong>. Design profissional feito por humanos e IA.
               </p>
             </div>
             <div>
               <h5 className="font-semibold text-white mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500"/> Sobre a Implantação SaaS</h5>
               <p className="text-slate-400 text-sm">
                 Para sistemas complexos e n8n, cobramos uma taxa de setup justa (bem abaixo do mercado) para configurar a lógica inicial.
               </p>
             </div>
           </div>
           <p className="text-center text-xs text-slate-600 mt-6">
             * Contrato mínimo de 6 meses para isenção total da taxa de setup nos planos Landing e CMS.
           </p>
        </div>

      </div>
    </section>
  );
};

export default PricingSection;