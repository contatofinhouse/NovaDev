import { GoogleGenAI, Chat, Type } from "@google/genai";
import { ProjectBrief } from "../types";

// Initialize the client
// The API key is obtained from the environment variable process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const createConsultantChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `Você é "Nova", uma arquiteta de soluções técnicas sênior da Agência NovaDevX.
      Seu objetivo é consultar clientes em potencial que desejam criar aplicativos da web (Landing Pages, CMS ou SaaS).
      
      1. Converse APENAS em PORTUGUÊS.
      2. Faça perguntas esclarecedoras sobre a ideia do projeto para entender o escopo, escala e complexidade.
      3. Sugira tecnologias modernas (React, Node, Python, Tailwind, Supabase, etc.) quando apropriado.
      4. Seja profissional, concisa e encorajadora.
      5. Mantenha as respostas com menos de 100 palavras, a menos que explique um conceito técnico complexo.
      `,
    },
  });
};

export const generateProjectBrief = async (conversationHistory: string): Promise<ProjectBrief | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Com base no seguinte histórico de conversa entre um cliente e um arquiteto, gere um JSON de briefing de projeto estruturado em PORTUGUÊS.
      
      Histórico da Conversa:
      ${conversationHistory}
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "O título do projeto em Português" },
            summary: { type: Type.STRING, description: "Um resumo executivo do projeto em Português" },
            techStack: { 
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de tecnologias recomendadas"
            },
            estimatedTimeline: { type: Type.STRING, description: "Estimativa de tempo (ex: 4-6 semanas)" },
            estimatedBudgetRange: { type: Type.STRING, description: "Estimativa de orçamento (ex: R$ 10.000 - R$ 15.000)" }
          },
          required: ["title", "summary", "techStack", "estimatedTimeline", "estimatedBudgetRange"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ProjectBrief;
    }
    return null;
  } catch (error) {
    console.error("Failed to generate brief:", error);
    return null;
  }
};

export const generateConceptImage = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: `High fidelity website screenshot, professional UI/UX design, landing page for: ${prompt}. Modern, clean, dark mode, trending on Dribbble, 4k resolution.`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });

    const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    if (base64ImageBytes) {
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    return null;
  } catch (error) {
    console.error("Failed to generate image:", error);
    return null;
  }
};