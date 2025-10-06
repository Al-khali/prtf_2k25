'use client';

export const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

export class KonamiCodeDetector {
  private sequence: string[] = [];
  private callbacks: (() => void)[] = [];
  private timeoutId: NodeJS.Timeout | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent) {
    // Clear timeout if it exists
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Add the key to sequence
    this.sequence.push(event.code);

    // Keep only the last 10 keys (length of Konami code)
    if (this.sequence.length > KONAMI_SEQUENCE.length) {
      this.sequence = this.sequence.slice(-KONAMI_SEQUENCE.length);
    }

    // Check if sequence matches
    if (this.sequence.length === KONAMI_SEQUENCE.length) {
      const matches = this.sequence.every((key, index) => key === KONAMI_SEQUENCE[index]);
      
      if (matches) {
        this.triggerCallbacks();
        this.sequence = []; // Reset sequence
        return;
      }
    }

    // Reset sequence after 2 seconds of inactivity
    this.timeoutId = setTimeout(() => {
      this.sequence = [];
    }, 2000);
  }

  public onKonami(callback: () => void) {
    this.callbacks.push(callback);
  }

  private triggerCallbacks() {
    this.callbacks.forEach(callback => callback());
  }

  public destroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}

// Easter egg functions
export const easterEggs = {
  matrix: () => {
    // Create matrix rain effect
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '10000';
    canvas.style.pointerEvents = 'none';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    document.body.appendChild(canvas);

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 13, 16, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff00';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    // Remove after 5 seconds
    setTimeout(() => {
      clearInterval(interval);
      document.body.removeChild(canvas);
    }, 5000);
  },

  glitch: () => {
    // Add glitch effect to body
    const body = document.body;
    body.style.animation = 'glitch 0.3s infinite';
    
    // Add glitch keyframes if not already added
    if (!document.querySelector('#glitch-styles')) {
      const style = document.createElement('style');
      style.id = 'glitch-styles';
      style.textContent = `
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `;
      document.head.appendChild(style);
    }

    setTimeout(() => {
      body.style.animation = '';
    }, 2000);
  },

  coffee: () => {
    // Show coffee animation
    const coffeeDiv = document.createElement('div');
    coffeeDiv.innerHTML = '☕';
    coffeeDiv.style.position = 'fixed';
    coffeeDiv.style.top = '50%';
    coffeeDiv.style.left = '50%';
    coffeeDiv.style.transform = 'translate(-50%, -50%)';
    coffeeDiv.style.fontSize = '10rem';
    coffeeDiv.style.zIndex = '10000';
    coffeeDiv.style.animation = 'coffee-bounce 2s ease-out';
    
    // Add bounce animation
    if (!document.querySelector('#coffee-styles')) {
      const style = document.createElement('style');
      style.id = 'coffee-styles';
      style.textContent = `
        @keyframes coffee-bounce {
          0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 0; }
          50% { transform: translate(-50%, -50%) scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1) rotate(360deg); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(coffeeDiv);

    setTimeout(() => {
      document.body.removeChild(coffeeDiv);
    }, 2000);
  },

  hacker: () => {
    // Terminal takeover effect
    const terminal = document.createElement('div');
    terminal.style.position = 'fixed';
    terminal.style.top = '0';
    terminal.style.left = '0';
    terminal.style.width = '100%';
    terminal.style.height = '100%';
    terminal.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    terminal.style.color = '#00ff00';
    terminal.style.fontFamily = 'monospace';
    terminal.style.fontSize = '14px';
    terminal.style.zIndex = '10000';
    terminal.style.padding = '20px';
    terminal.style.overflow = 'hidden';

    const messages = [
      'SYSTEM BREACH DETECTED...',
      'Initializing neo-cortex interface...',
      'Accessing mainframe...',
      'Bypassing firewall...',
      'Welcome to the Matrix, Khalid.',
      'You have chosen the red pill.',
      'Reality is now optional.',
      'Access granted to level 1337.',
      'Remember: There is no spoon.',
      'Wake up, Neo...',
      '...the Matrix has you...',
      'Follow the white rabbit.',
      'Knock knock, Neo.'
    ];

    let currentIndex = 0;
    const content = document.createElement('div');
    terminal.appendChild(content);
    document.body.appendChild(terminal);

    const typeMessage = () => {
      if (currentIndex < messages.length) {
        const message = messages[currentIndex];
        let charIndex = 0;
        const line = document.createElement('div');
        line.style.marginBottom = '10px';
        content.appendChild(line);

        const typeChar = () => {
          if (charIndex < message.length) {
            line.textContent += message[charIndex];
            charIndex++;
            setTimeout(typeChar, 50);
          } else {
            currentIndex++;
            setTimeout(typeMessage, 500);
          }
        };

        typeChar();
      } else {
        setTimeout(() => {
          document.body.removeChild(terminal);
        }, 2000);
      }
    };

    typeMessage();
  }
};

// Create global instance
export const konamiDetector = typeof window !== 'undefined' ? new KonamiCodeDetector() : null;