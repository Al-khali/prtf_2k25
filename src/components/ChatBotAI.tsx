'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { geminiService } from '@/lib/gemini'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

const initialMessage: Message = {
  id: '0',
  text: "🤖 Salut ! Je suis l'assistant IA du portfolio de Khalid. Je peux te parler de ses projets, compétences, et expériences. Attention : je suis spécialisé uniquement sur Khalid ! Pour d'autres sujets, direction Gemini ou ChatGPT 😉",
  isBot: true,
  timestamp: new Date()
}

export default function ChatBotAI() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await geminiService.ask(currentInput)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
  } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "🤔 Oups, petit bug ! Réessaie ou contacte Khalid directement si ça persiste.",
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  const quickQuestions = [
    "Parle-moi des projets de Khalid",
    "Quelles technologies il utilise ?",
    "Il fait du freelance ?",
    "Des expériences CTF ?",
    "Comment le contacter ?"
  ]

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: isOpen ? 'none' : ['0 0 20px rgba(6, 182, 212, 0.5)', '0 0 40px rgba(147, 51, 234, 0.5)', '0 0 20px rgba(6, 182, 212, 0.5)']
        }}
        transition={{ 
          boxShadow: { duration: 2, repeat: Infinity }
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-96 bg-gray-900 border-2 border-cyan-400 rounded-lg shadow-2xl shadow-cyan-400/20 flex flex-col"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-4 rounded-t-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-bold">Khalid AI • Portfolio Only</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-red-300 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-black">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 ${message.isBot ? 'text-left' : 'text-right'}`}
                >
                  <div
                    className={`inline-block max-w-xs p-3 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-gray-800 text-green-400 border border-green-600'
                        : 'bg-cyan-600 text-white ml-auto'
                    }`}
                  >
                    {message.text}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-left mb-4"
                >
                  <div className="inline-block bg-gray-800 text-green-400 border border-green-600 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="p-3 border-t border-gray-700">
                <div className="text-xs text-gray-400 mb-2">Quick questions:</div>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(question)}
                      className="text-xs bg-gray-800 hover:bg-gray-700 text-cyan-400 px-2 py-1 rounded border border-cyan-600 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-gray-800 border border-green-600 rounded px-3 py-2 text-green-400 placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded font-bold hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}