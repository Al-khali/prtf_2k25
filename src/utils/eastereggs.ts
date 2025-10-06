type EasterEggCallback = () => void

export class EasterEggManager {
  private konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ]
  
  private currentSequence: string[] = []
  private konamiCallback?: EasterEggCallback

  constructor() {
    this.setupListeners()
  }

  private setupListeners() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', this.handleKeyDown.bind(this))
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    this.currentSequence.push(event.code)
    
    if (this.currentSequence.length > this.konamiSequence.length) {
      this.currentSequence.shift()
    }
    
    if (this.isKonamiComplete()) {
      this.konamiCallback?.()
      this.currentSequence = []
    }
  }

  private isKonamiComplete(): boolean {
    return this.currentSequence.length === this.konamiSequence.length &&
           this.currentSequence.every((key, index) => key === this.konamiSequence[index])
  }

  onKonami(callback: EasterEggCallback) {
    this.konamiCallback = callback
  }

  checkUnlockParam(): boolean {
    if (typeof window === 'undefined') return false
    const params = new URLSearchParams(window.location.search)
    return params.get('unlock') === '0xC0FFEE'
  }

  playDialUpSound() {
    if (typeof window !== 'undefined') {
      const audio = new Audio('/assets/music/dial-up.mp3')
      audio.volume = 0.3
      audio.play().catch(() => {
        console.log('Could not play dial-up sound')
      })
    }
  }

  showMatrixRain() {
    if (typeof window !== 'undefined') {
      const style = document.createElement('style')
      style.textContent = `
        .matrix-rain {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%);
        }
        
        .matrix-char {
          position: absolute;
          color: #00ff00;
          font-family: monospace;
          font-size: 14px;
          animation: matrix-fall 3s linear infinite;
        }
        
        @keyframes matrix-fall {
          0% { transform: translateY(-100vh); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `
      document.head.appendChild(style)
      
      const container = document.createElement('div')
      container.className = 'matrix-rain'
      document.body.appendChild(container)
      
      const chars = '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01'
      
      for (let i = 0; i < 50; i++) {
        const char = document.createElement('div')
        char.className = 'matrix-char'
        char.textContent = chars[Math.floor(Math.random() * chars.length)]
        char.style.left = Math.random() * 100 + '%'
        char.style.animationDelay = Math.random() * 3 + 's'
        container.appendChild(char)
      }
      
      setTimeout(() => {
        document.body.removeChild(container)
        document.head.removeChild(style)
      }, 5000)
    }
  }

  triggerSecretAccess() {
    this.playDialUpSound()
    setTimeout(() => {
      this.showMatrixRain()
    }, 1000)
  }
}

export const easterEggs = new EasterEggManager()

export const mockResponses = {
  greeting: [
    "Hey there! I'm Khalid's AI assistant. What would you like to know?",
    "Welcome, fellow human! Ask me anything about Khalid's work.",
    "Greetings! I'm here to help you learn more about Khalid's projects and skills."
  ],
  projects: [
    "Khalid has worked on various projects including real-time data pipelines, indie games, and ML visualizations. Check out the projects page for details!",
    "His portfolio spans from ETL pipelines processing millions of events to cyberpunk games with WebGL shaders. Pretty diverse, right?",
    "From data engineering to game development, Khalid loves building things that solve problems and look cool doing it."
  ],
  skills: [
    "Khalid's technical stack includes Python, Scala, React, Three.js, Apache Spark, and much more. He's comfortable with both data engineering and frontend development.",
    "He's proficient in data engineering tools like Kafka, Spark, and dbt, plus modern frontend technologies like React, TypeScript, and WebGL.",
    "His skills range from building ETL pipelines and ML models to creating interactive web experiences and games."
  ],
  personality: [
    "Khalid is passionate about the intersection of data and creativity. He believes technology should be both functional and beautiful.",
    "When not coding, you'll find him listening to Japanese jazz fusion, ricing his Arch Linux setup, or solving CTF challenges.",
    "He's the kind of person who builds data pipelines by day and cyberpunk games by night. Work hard, create harder!"
  ],
  ctf: [
    "Khalid enjoys cybersecurity challenges and CTF competitions. He's particularly interested in binary analysis and cryptography.",
    "CTF writeups and security research are among his interests. Check out his GitHub for some writeups!",
    "He believes in ethical hacking and defensive security. Building secure systems is as important as breaking insecure ones."
  ],
  default: [
    "That's an interesting question! While I don't have specific information about that, I'd recommend checking out Khalid's projects or reaching out to him directly.",
    "I'm still learning! For detailed technical questions, you might want to browse his GitHub or connect with him on LinkedIn.",
    "Good question! The best way to get detailed answers would be to contact Khalid directly through the contact form."
  ]
}

export function getMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return mockResponses.greeting[Math.floor(Math.random() * mockResponses.greeting.length)]
  }
  
  if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
    return mockResponses.projects[Math.floor(Math.random() * mockResponses.projects.length)]
  }
  
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('language')) {
    return mockResponses.skills[Math.floor(Math.random() * mockResponses.skills.length)]
  }
  
  if (lowerMessage.includes('music') || lowerMessage.includes('game') || lowerMessage.includes('hobby') || lowerMessage.includes('interest')) {
    return mockResponses.personality[Math.floor(Math.random() * mockResponses.personality.length)]
  }
  
  if (lowerMessage.includes('ctf') || lowerMessage.includes('security') || lowerMessage.includes('hack')) {
    return mockResponses.ctf[Math.floor(Math.random() * mockResponses.ctf.length)]
  }
  
  return mockResponses.default[Math.floor(Math.random() * mockResponses.default.length)]
}