/**
 * @jest-environment jsdom
 */

import { getMockResponse } from '../eastereggs'

// Mock DOM APIs
Object.defineProperty(window, 'Audio', {
  value: jest.fn().mockImplementation(() => ({
    play: jest.fn(),
    volume: 0.3,
  })),
})

// Mock URLSearchParams
Object.defineProperty(global, 'URLSearchParams', {
  value: jest.fn().mockImplementation((search) => ({
    get: jest.fn((key) => {
      if (search === '?unlock=0xC0FFEE' && key === 'unlock') {
        return '0xC0FFEE'
      }
      return null
    })
  }))
})

describe('Mock Response System', () => {
  test('should return greeting for hello messages', () => {
    const response = getMockResponse('hello there')
    expect(response).toContain('Khalid')
  })

  test('should return project info for project queries', () => {
    const response = getMockResponse('tell me about your projects')
    expect(response.toLowerCase()).toMatch(/(project|portfolio|etl|pipeline|game)/)
  })

  test('should return skills info for technology queries', () => {
    const response = getMockResponse('what technologies do you use?')
    expect(response.toLowerCase()).toMatch(/skill|technology|tech/)
  })

  test('should return personality info for hobby queries', () => {
    const response = getMockResponse('what are your hobbies?')
    expect(response.toLowerCase()).toMatch(/music|game|hobby|interest/)
  })

  test('should return CTF info for security queries', () => {
    const response = getMockResponse('any CTF experience?')
    expect(response.toLowerCase()).toMatch(/ctf|security|hack/)
  })

  test('should return default response for unknown queries', () => {
    const response = getMockResponse('random unknown question')
    expect(response).toBeDefined()
    expect(response.length).toBeGreaterThan(0)
  })
})