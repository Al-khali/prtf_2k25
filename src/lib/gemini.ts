'use client';

import { GoogleGenerativeAI } from '@google/generative-ai';

const PORTFOLIO_CONTEXT = `
Tu es l'assistant IA du portfolio de Khalid, un Data Engineer & Creative Technologist. 

RÈGLES STRICTES :
1. Tu ne peux répondre QU'AUX QUESTIONS sur Khalid, son travail, ses projets ou ce portfolio
2. Refuse POLIMENT toute autre demande (code général, aide technique non-liée, etc.)
3. Redirige vers les vrais services pour les vraies tâches
4. Garde tes réponses COURTES (max 2-3 phrases)
5. Sois cool, geek et professionnel

INFOS SUR KHALID :
- Data Engineer chez Colonies + Freelance consulting
- Passionné de tech, IA, indie games, design, jazz fusion
- Expert Python, TypeScript, BigQuery, GCP, React
- Ricing Arch Linux, développe sous Neovim
- Aime les CTFs et la culture hacker élégante
- Localisation : France

PROJETS PRINCIPAUX :
- Pipelines de données temps réel (10M+ events/jour)
- Solutions GenAI pour création de contenu
- Jeu indie "Neon Runner" (synthwave endless runner)  
- Visualiseur audio jazz fusion avec Three.js
- Collection de rices Arch Linux minimalistes
- Portail CTF writeups interactif

EXEMPLE DE REFUS :
"Désolé, je suis spécialisé sur le portfolio de Khalid ! Pour ça, je te recommande d'utiliser Gemini directement. Tu veux plutôt savoir quelque chose sur le travail de Khalid ?"
`;

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: ReturnType<GoogleGenerativeAI['getGenerativeModel']> | null = null;
  private requestCount = 0;
  private readonly MAX_REQUESTS = 20; // Limite quotidienne
  private lastReset = Date.now();

  constructor() {
    // Utiliser une clé API gratuite (à remplacer par la tienne)
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyB..._YOUR_FREE_KEY';
    
    if (apiKey && apiKey !== 'AIzaSyB..._YOUR_FREE_KEY') {
      try {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      } catch (error) {
        console.warn('Gemini API not configured, using fallback responses', error);
      }
    }
  }

  private isWithinLimits(): boolean {
    // Reset quotidien
    const now = Date.now();
    if (now - this.lastReset > 24 * 60 * 60 * 1000) {
      this.requestCount = 0;
      this.lastReset = now;
    }

    return this.requestCount < this.MAX_REQUESTS;
  }

  private isPortfolioRelated(question: string): boolean {
    const portfolioKeywords = [
      'khalid', 'portfolio', 'projet', 'data engineer', 'colonies',
      'experience', 'competence', 'technologie', 'ai', 'freelance',
      'arch linux', 'neovim', 'jazz', 'ctf', 'indie game', 'neon runner',
      'contact', 'collaboration', 'python', 'typescript', 'bigquery'
    ];
    
    const questionLower = question.toLowerCase();
    return portfolioKeywords.some(keyword => questionLower.includes(keyword));
  }

  async ask(question: string): Promise<string> {
    // Vérifier si c'est lié au portfolio
    if (!this.isPortfolioRelated(question)) {
      const redirectResponses = [
        "🤖 Hmm, ça sort du scope du portfolio de Khalid ! Pour ce genre de question, je te recommande d'utiliser Gemini directement. Tu veux plutôt savoir quelque chose sur le travail de Khalid ?",
        "🎯 Je suis spécialisé sur Khalid et son portfolio uniquement ! Pour les autres sujets, direction Gemini ou ChatGPT. Sinon, que veux-tu savoir sur ses projets ?",
        "🚀 Mon expertise se limite au portfolio de Khalid ! Pour ça, les vrais assistants IA seront plus utiles. Par contre, je peux te parler de ses projets data/IA ?",
        "⚡ Désolé, je ne couvre que l'univers professionnel de Khalid ! Pour le reste, va voir les pros comme Gemini. Que dirais-tu d'en savoir plus sur ses compétences techniques ?"
      ];
      return redirectResponses[Math.floor(Math.random() * redirectResponses.length)];
    }

    // Vérifier les limites
    if (!this.isWithinLimits()) {
      return "🔋 Limite quotidienne atteinte ! Pour plus d'infos, contacte Khalid directement via LinkedIn ou email. Ou reviens demain ! ☕";
    }

    // Essayer l'API Gemini
    if (this.model) {
      try {
        this.requestCount++;
        const prompt = `${PORTFOLIO_CONTEXT}\n\nQUESTION: ${question}\n\nRÉPONSE (courte et dans le thème) :`;
        
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        return response.text();
        
      } catch (error) {
        console.warn('Gemini API error, using fallback', error);
        return this.getFallbackResponse(question);
      }
    }

    // Réponses de fallback si pas d'API
    return this.getFallbackResponse(question);
  }

  private getFallbackResponse(question: string): string {
    const questionLower = question.toLowerCase();
    
    if (questionLower.includes('experience') || questionLower.includes('parcours')) {
      return "🎯 Khalid est Data Engineer chez Colonies + freelance consulting. Passionné par l'intersection data/IA/design. 4+ ans d'expérience sur des pipelines scalables et solutions GenAI.";
    }
    
    if (questionLower.includes('technologie') || questionLower.includes('stack') || questionLower.includes('outil')) {
      return "🛠️ Stack principal : Python, TypeScript, BigQuery, GCP, React, Three.js. Développe sous Arch Linux + Neovim. Expert en pipelines temps réel et visualisations interactives.";
    }
    
    if (questionLower.includes('projet') || questionLower.includes('réalisation')) {
      return "🚀 Projets phares : pipeline 10M+ events/jour, plateforme GenAI, jeu indie 'Neon Runner', visualiseur audio jazz, CTF writeups. Check la section Digital Workbench !";
    }
    
    if (questionLower.includes('contact') || questionLower.includes('collaboration')) {
      return "📧 Khalid est dispo pour du consulting data/IA ! Contacte-le via LinkedIn ou le formulaire. Spécialisé en architecture data et solutions créatives.";
    }
    
    if (questionLower.includes('musique') || questionLower.includes('jazz')) {
      return "🎵 Khalid code sur du jazz fusion japonais, city pop et hip-hop 90s. Check le Sound Lab pour ses playlists ! La musique inspire ses algos créatifs.";
    }
    
    if (questionLower.includes('arch') || questionLower.includes('linux') || questionLower.includes('rice')) {
      return "🐧 Khalid rice Arch Linux comme un artiste ! Setup minimaliste : i3-gaps, polybar, Neovim + tmux. Le terminal parfait pour la productivité maximale.";
    }
    
    // Réponse générale
    return "🤖 Bonne question ! Khalid est un Data Engineer créatif qui mélange tech et art. Explore les sections About et Projects pour en savoir plus, ou pose une question plus spécifique !";
  }

  getUsageInfo(): { requestCount: number; maxRequests: number; timeUntilReset: number } {
    const timeUntilReset = 24 * 60 * 60 * 1000 - (Date.now() - this.lastReset);
    return {
      requestCount: this.requestCount,
      maxRequests: this.MAX_REQUESTS,
      timeUntilReset
    };
  }
}

export const geminiService = new GeminiService();