import { useState, useRef, useEffect } from 'react'
import { Send, MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react'
import type { ChatMessage } from '../services/chatbotService'
import chatbotService from '../services/chatbotService'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Security Assistant. I can help you filter and summarize incidents involving objects or people. Try asking me things like:\n\n• "Show me all critical incidents"\n• "What person incidents are active?"\n• "Summarize incidents in Sector 7"\n• "Show objects with high severity"',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate API delay and generate response
    setTimeout(() => {
      const response = chatbotService.generateResponse(input)
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button (Floating) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 dark:from-teal-500 light:from-teal-600 to-teal-600 dark:to-teal-600 light:to-teal-700 text-white shadow-lg hover:shadow-xl hover:from-teal-400 dark:hover:from-teal-400 light:hover:from-teal-500 hover:to-teal-500 dark:hover:to-teal-500 light:hover:to-teal-600 transition-all flex items-center justify-center group"
          title="Open AI Assistant"
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-slate-950/95 dark:bg-slate-950/95 light:bg-white/95 backdrop-blur-2xl rounded-2xl border border-teal-500/30 dark:border-teal-500/30 light:border-teal-600/30 shadow-2xl dark:shadow-2xl light:shadow-lg flex flex-col h-96 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 dark:from-slate-900 light:from-slate-50 to-slate-800 dark:to-slate-800 light:to-slate-100 border-b border-teal-500/20 dark:border-teal-500/20 light:border-teal-600/20 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-400 dark:bg-teal-400 light:bg-teal-600 animate-pulse"></div>
              <h3 className="font-bold text-on-background dark:text-on-background light:text-slate-900">AI Security Assistant</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1.5 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-900/10 rounded-lg transition-colors text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-teal-400 dark:hover:text-teal-400 light:hover:text-teal-600"
                title="Minimize"
              >
                <Minimize2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-900/10 rounded-lg transition-colors text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-red-400 dark:hover:text-red-400 light:hover:text-red-600"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950 dark:bg-slate-950 light:bg-white">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-teal-600/70 dark:bg-teal-600/70 light:bg-teal-600 text-white dark:text-white rounded-br-none'
                      : 'bg-slate-800/70 dark:bg-slate-800/70 light:bg-slate-100 text-slate-100 dark:text-slate-100 light:text-slate-900 rounded-bl-none border border-teal-500/20 dark:border-teal-500/20 light:border-teal-600/30'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                  <span className="text-xs opacity-60 dark:opacity-60 light:opacity-40 mt-1 block">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/70 dark:bg-slate-800/70 light:bg-slate-100 text-slate-100 dark:text-slate-100 light:text-slate-900 px-4 py-2 rounded-lg border border-teal-500/20 dark:border-teal-500/20 light:border-teal-600/30 rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-teal-400 dark:bg-teal-400 light:bg-teal-600 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-teal-400 dark:bg-teal-400 light:bg-teal-600 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-teal-400 dark:bg-teal-400 light:bg-teal-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-teal-500/20 dark:border-teal-500/20 light:border-teal-600/30 bg-slate-900/50 dark:bg-slate-900/50 light:bg-slate-50 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about incidents..."
                className="flex-1 bg-slate-800/50 dark:bg-slate-800/50 light:bg-white border border-teal-500/30 dark:border-teal-500/30 light:border-teal-600/30 rounded-lg px-3 py-2 text-sm text-white dark:text-white light:text-slate-900 placeholder-slate-500 dark:placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 light:focus:border-teal-600 focus:ring-1 focus:ring-teal-500/50 dark:focus:ring-teal-500/50 light:focus:ring-teal-600/50 transition-all"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-teal-600 dark:bg-teal-600 light:bg-teal-600 hover:bg-teal-500 dark:hover:bg-teal-500 light:hover:bg-teal-700 disabled:bg-slate-700 dark:disabled:bg-slate-700 light:disabled:bg-slate-300 disabled:cursor-not-allowed text-white dark:text-white light:text-white p-2 rounded-lg transition-colors"
                title="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimized State */}
      {isOpen && isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-40 w-auto px-4 py-2 rounded-full bg-gradient-to-r from-teal-500 dark:from-teal-500 light:from-teal-600 to-teal-600 dark:to-teal-600 light:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm font-medium"
        >
          <MessageCircle size={16} />
          AI Assistant
          <Maximize2 size={14} />
        </button>
      )}
    </>
  )
}
