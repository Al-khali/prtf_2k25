import '@testing-library/jest-dom'

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock WebGL context
const mockWebGLContext = {
  getExtension: jest.fn(),
  createShader: jest.fn(),
  shaderSource: jest.fn(),
  compileShader: jest.fn(),
  createProgram: jest.fn(),
  attachShader: jest.fn(),
  linkProgram: jest.fn(),
  useProgram: jest.fn(),
  createBuffer: jest.fn(),
  bindBuffer: jest.fn(),
  bufferData: jest.fn(),
  getAttribLocation: jest.fn(),
  enableVertexAttribArray: jest.fn(),
  vertexAttribPointer: jest.fn(),
  getUniformLocation: jest.fn(),
  uniformMatrix4fv: jest.fn(),
  drawElements: jest.fn(),
  drawArrays: jest.fn(),
  viewport: jest.fn(),
  clearColor: jest.fn(),
  clear: jest.fn(),
  enable: jest.fn(),
  disable: jest.fn(),
  getParameter: jest.fn(),
}

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: jest.fn().mockImplementation((type) => {
    if (type === 'webgl' || type === 'webgl2') {
      return mockWebGLContext
    }
    if (type === '2d') {
      return {
        fillRect: jest.fn(),
        clearRect: jest.fn(),
        getImageData: jest.fn(),
        putImageData: jest.fn(),
        createImageData: jest.fn(),
        setTransform: jest.fn(),
        drawImage: jest.fn(),
        save: jest.fn(),
        fillText: jest.fn(),
        restore: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        closePath: jest.fn(),
        stroke: jest.fn(),
        translate: jest.fn(),
        scale: jest.fn(),
        rotate: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
        measureText: jest.fn(() => ({ width: 0 })),
        transform: jest.fn(),
        rect: jest.fn(),
        clip: jest.fn(),
      }
    }
    return null
  }),
})

// Mock AudioContext
global.AudioContext = jest.fn().mockImplementation(() => ({
  createMediaElementSource: jest.fn(),
  createAnalyser: jest.fn(() => ({
    fftSize: 256,
    frequencyBinCount: 128,
    getByteFrequencyData: jest.fn(),
    connect: jest.fn(),
  })),
  destination: {},
  resume: jest.fn(),
  state: 'running',
}))

// Mock WebKitAudioContext
global.webkitAudioContext = global.AudioContext

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn().mockImplementation((cb) => {
  setTimeout(cb, 0)
  return 1
})

global.cancelAnimationFrame = jest.fn()

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn()