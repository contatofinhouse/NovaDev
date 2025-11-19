import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, FileText, Image as ImageIcon, Zap } from 'lucide-react';
import { Chat } from "@google/genai";
import { createConsultantChat, generateProjectBrief, generateConceptImage } from '../services/geminiService';
import { Message, ProjectBrief } from '../types';
import { ProjectData } from './PortfolioSection';

interface ConsultantProps {
  onViewProject?: (project: ProjectData) => void;
}

const Consultant: React.FC<ConsultantProps> = ({ onViewProject }) => {
  const [chatInstance, setChatInstance] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [projectBrief, setProjectBrief] = useState<ProjectBrief | null>(null);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat on mount
  useEffect(() => {
    const chat = createConsultantChat();
    setChatInstance(chat);
    setMessages([
      {
        role: 'model',
        text: "Olá! Sou a Nova, sua Arquiteta Técnica de IA. Fale-me sobre a aplicação web que deseja construir. Seria uma Landing Page, um site CMS ou uma plataforma SaaS?",
        timestamp: Date.now()
      }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !chatInstance) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText, timestamp: Date.now() }]);
    setIsTyping(true);

    try {
      const result = await chatInstance.sendMessage({ message: userText });
      const responseText = result.text;
      setMessages(prev => [...prev, { role: 'model', text: responseText || "Estou pensando...", timestamp: Date.now() }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Encontrei um erro de conexão. Por favor, tente novamente.", timestamp: Date.now(), isError: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleGenerateBrief = async () => {
    if (messages.length < 3) return; // Need some context
    setIsGeneratingBrief(true);
    const historyText = messages.map(m => `${m.role}: ${m.text}`).join('\n');
    const brief = await generateProjectBrief(historyText);
    setProjectBrief(brief);
    setIsGeneratingBrief(false);
  };

  const handleGenerateAndNavigate = async () => {
     if (!projectBrief) return;
     setIsGeneratingImage(true);
     
     try {
       // Generate concept image (screenshot)
       const prompt = `${projectBrief.title} - ${projectBrief.summary}`;
       const imageUrl = await generateConceptImage(prompt);
       
       if (imageUrl && onViewProject) {
         // Determine category based on title or default
         let category: 'SaaS' | 'Landing Page' | 'CMS' = 'Landing Page';
         const lowerTitle = projectBrief.title.toLowerCase();
         const lowerSummary = projectBrief.summary.toLowerCase();
         
         if (lowerTitle.includes('saas') || lowerSummary.includes('plataforma') || lowerSummary.includes('sistema')) {
            category = 'SaaS';
         } else if (lowerTitle.includes('blog') || lowerTitle.includes('cms') || lowerSummary.includes('notícias')) {
            category = 'CMS';
         }

         const generatedProject: ProjectData = {
            id: `ai-generated-${Date.now()}`,
            title: projectBrief.title,
            category: category,
            description: projectBrief.summary,
            imageGradient: 'from-slate-700 to-slate-900',
            techStack: projectBrief.techStack,
            previewImage: imageUrl
         };
         
         onViewProject(generatedProject);
       }
     } catch (err) {
       console.error("Error generating project view", err);
     } finally {
       setIsGeneratingImage(false);
     }
  };

  return (
    <section id="consultant" className="py-24 bg-slate-900 border-y border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 h-[800px]">
          
          {/* Left: Chat Interface */}
          <div className="w-full lg:w-1/2 flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Arquiteta IA</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs text-slate-400">Online | Gemini 2.5 Flash</span>
                  </div>
                </div>
              </div>
              {messages.length > 3 && (
                 <button 
                  onClick={handleGenerateBrief}
                  disabled={isGeneratingBrief}
                  className="flex items-center gap-2 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-400 px-3 py-1.5 rounded-md transition-colors"
                 >
                   {isGeneratingBrief ? <Loader2 className="w-3 h-3 animate-spin" /> : <FileText className="w-3 h-3" />}
                   Gerar Briefing
                 </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-700' : 'bg-cyan-900/50'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-slate-300" /> : <Bot className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-slate-800 text-slate-200 rounded-tr-none' 
                      : 'bg-slate-900/80 border border-slate-800 text-slate-300 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-cyan-900/50 flex items-center justify-center">
                     <Bot className="w-4 h-4 text-cyan-400" />
                   </div>
                   <div className="bg-slate-900/80 border border-slate-800 px-4 py-3 rounded-2xl rounded-tl-none">
                     <div className="flex gap-1">
                       <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                       <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                       <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                     </div>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Descreva sua ideia de projeto..."
                  className="flex-1 bg-slate-950 border border-slate-700 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Project Output Area */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            
            {/* Introduction / Empty State */}
            {!projectBrief && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
                <Sparkles className="w-16 h-16 text-slate-700 mb-6" />
                <h3 className="text-2xl font-bold text-slate-300 mb-2">Pronto para construir?</h3>
                <p className="text-slate-500 max-w-md">
                  Converse com a Nova para gerar um briefing de projeto completo.
                  Definiremos sua stack de tecnologia, cronograma e orçamento instantaneamente.
                </p>
              </div>
            )}

            {/* Generated Brief */}
            {projectBrief && (
              <div className="flex-1 flex flex-col gap-6 overflow-y-auto animate-fade-in">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h4 className="text-cyan-400 text-sm font-bold uppercase tracking-wider mb-1">Proposta de Projeto</h4>
                      <h2 className="text-3xl font-bold text-white">{projectBrief.title}</h2>
                    </div>
                    <button className="text-slate-400 hover:text-white transition-colors">
                      <FileText className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h5 className="text-slate-400 text-sm font-semibold mb-2 uppercase">Resumo Executivo</h5>
                      <p className="text-slate-300 leading-relaxed">{projectBrief.summary}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                         <h5 className="text-slate-400 text-sm font-semibold mb-3 uppercase">Tecnologias</h5>
                         <div className="flex flex-wrap gap-2">
                           {projectBrief.techStack.map((tech, i) => (
                             <span key={i} className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-md text-xs font-medium border border-blue-800/30">
                               {tech}
                             </span>
                           ))}
                         </div>
                       </div>
                       <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                          <h5 className="text-slate-400 text-sm font-semibold mb-3 uppercase">Estimativas</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Prazo:</span>
                              <span className="text-slate-200">{projectBrief.estimatedTimeline}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Orçamento:</span>
                              <span className="text-slate-200">{projectBrief.estimatedBudgetRange}</span>
                            </div>
                          </div>
                       </div>
                    </div>

                    <button 
                       onClick={handleGenerateAndNavigate}
                       disabled={isGeneratingImage}
                       className="w-full py-4 mt-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-indigo-900/30 relative overflow-hidden group"
                    >
                      {isGeneratingImage ? (
                         <> 
                           <Loader2 className="w-5 h-5 animate-spin" /> 
                           <span>Criando Visual do Site...</span>
                         </>
                      ) : (
                         <> 
                           <ImageIcon className="w-5 h-5" /> 
                           <span>Gerar Screenshot Conceitual</span>
                           <Zap className="w-4 h-4 text-yellow-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                         </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consultant;