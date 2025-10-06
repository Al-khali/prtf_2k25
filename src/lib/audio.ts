export class AudioVisualizer {
  private audioContext: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private dataArray: Uint8Array | null = null
  private animationId: number | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  async setupAudio(audioElement: HTMLAudioElement) {
    if (!this.audioContext) return

    const source = this.audioContext.createMediaElementSource(audioElement)
    this.analyser = this.audioContext.createAnalyser()
    
    this.analyser.fftSize = 256
    const bufferLength = this.analyser.frequencyBinCount
    this.dataArray = new Uint8Array(bufferLength)

    source.connect(this.analyser)
    this.analyser.connect(this.audioContext.destination)
  }

  getFrequencyData(): Uint8Array | null {
    if (!this.analyser || !this.dataArray) return null
    this.analyser.getByteFrequencyData(this.dataArray)
    return this.dataArray
  }

  startVisualization(callback: (data: Uint8Array) => void) {
    const animate = () => {
      const data = this.getFrequencyData()
      if (data) {
        callback(data)
      }
      this.animationId = requestAnimationFrame(animate)
    }
    animate()
  }

  stopVisualization() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  resume() {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume()
    }
  }
}

export const audioVisualizer = new AudioVisualizer()

export interface Track {
  id: string
  title: string
  artist: string
  file: string
  duration: number
}

export const defaultTracks: Track[] = [
  {
    id: 'synthwave-1',
    title: 'Neon Dreams',
    artist: 'Placeholder Artist',
    file: '/assets/music/synthwave-loop.mp3',
    duration: 30
  },
  {
    id: 'jazz-fusion-1',
    title: 'Tokyo Nights',
    artist: 'Placeholder Artist',
    file: '/assets/music/jazz-fusion-loop.mp3',
    duration: 25
  },
  {
    id: 'hip-hop-1',
    title: '90s Vibes',
    artist: 'Placeholder Artist',
    file: '/assets/music/hip-hop-loop.mp3',
    duration: 20
  }
]