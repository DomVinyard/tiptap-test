import { useState, useEffect, useRef } from 'react'
import { Message } from '../types'

interface AddNewScreenProps {
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

const AddNewScreen = ({ messages, setMessages }: AddNewScreenProps) => {
  const [userMessage, setUserMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Initialize with default message if empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: 'ai',
          content: 'What can I do for you?',
          timestamp: new Date(),
        },
      ])
    }
  }, [messages.length, setMessages])

  // Auto-focus the input when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      textareaRef.current?.focus()
    }, 100) // Small delay to ensure the component is fully rendered

    return () => clearTimeout(timer)
  }, [])

  const sendMessage = () => {
    if (userMessage.trim()) {
      const newUserMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        content: userMessage,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, newUserMessage])
      setUserMessage('')

      // Simulate AI response after a short delay
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          type: 'ai',
          content: "I understand you'd like help with that. I'm here to assist you as your new AI agent!",
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, aiResponse])
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-900 pb-3">
      {/* Chat Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">AI</span>
          </div>
          <div>
            <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">New Assignment</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">0% complete</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'ai' ? 'bg-blue-600' : 'bg-neutral-500 dark:bg-neutral-400'
                }`}
              >
                <span className="text-white text-xs font-medium">{message.type === 'ai' ? 'AI' : 'U'}</span>
              </div>
              <div
                className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                  message.type === 'ai'
                    ? 'bg-neutral-100 dark:bg-neutral-800 rounded-tl-sm'
                    : 'bg-blue-600 text-white rounded-tr-sm'
                }`}
              >
                <p className={message.type === 'ai' ? 'text-neutral-900 dark:text-neutral-100' : 'text-white'}>
                  {message.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={userMessage}
              onChange={e => setUserMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-2xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={1}
              style={{ minHeight: '44px' }}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!userMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 disabled:dark:bg-neutral-600 text-white w-12 h-12 rounded-full transition-colors flex items-center justify-center flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddNewScreen
