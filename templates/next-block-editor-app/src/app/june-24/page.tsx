'use client'

import { useState, useEffect, useRef } from 'react'
import { Surface } from '@/components/ui/Surface'
import { Button } from '@/components/ui/Button'
import { RotateCcw, MessageSquare, Plus, User } from 'lucide-react'

// Mobile Frame Component
const MobileFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-[395px]">
      {/* Mobile Frame Border */}
      <div className="bg-neutral-800 dark:bg-neutral-700 rounded-[2.5rem] p-2 shadow-2xl">
        {/* Screen */}
        <div className="bg-white dark:bg-neutral-950 rounded-[2rem] overflow-hidden h-[800px] relative">
          {/* Status Bar */}
          <div className="bg-white dark:bg-neutral-950 px-4 py-2 flex justify-between items-center text-xs font-medium">
            <span className="text-neutral-900 dark:text-neutral-100">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 bg-neutral-300 dark:bg-neutral-600 rounded-sm"></div>
              <div className="w-6 h-3 border border-neutral-300 dark:border-neutral-600 rounded-sm">
                <div className="w-4 h-full bg-green-500 rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="h-[calc(100%-2rem)] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  )
}

// Configuration Panel Component
const ConfigurationPanel = ({ onReset }: { onReset: () => void }) => {
  const [config, setConfig] = useState({
    title: 'Hello World App',
    subtitle: 'Welcome to the mobile experiment',
    backgroundColor: '#f3f4f6',
    textColor: '#1f2937',
  })

  const handleConfigChange = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  return (
    <Surface className="h-full p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Configuration Panel</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
            Configure your mobile app settings below. This is a hello world placeholder.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">App Title</label>
            <input
              type="text"
              value={config.title}
              onChange={e => handleConfigChange('title', e.target.value)}
              className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              placeholder="Enter app title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subtitle</label>
            <input
              type="text"
              value={config.subtitle}
              onChange={e => handleConfigChange('subtitle', e.target.value)}
              className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              placeholder="Enter subtitle"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Background Color</label>
            <input
              type="color"
              value={config.backgroundColor}
              onChange={e => handleConfigChange('backgroundColor', e.target.value)}
              className="w-full h-10 border border-neutral-300 dark:border-neutral-600 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Text Color</label>
            <input
              type="color"
              value={config.textColor}
              onChange={e => handleConfigChange('textColor', e.target.value)}
              className="w-full h-10 border border-neutral-300 dark:border-neutral-600 rounded"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-medium mb-2">Hello World Features</h3>
          <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            <p>• Mobile-first responsive design</p>
            <p>• Real-time configuration updates</p>
            <p>• Modern UI components</p>
            <p>• Dark/light mode support</p>
          </div>
        </div>

        <Button type="button" onClick={onReset} variant="secondary" buttonSize="medium" className="w-full">
          Reset Configuration
        </Button>
      </div>
    </Surface>
  )
}

// Tab Bar Component
const TabBar = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => {
  const tabs = [
    { id: 'tasks', label: 'Tasks', icon: MessageSquare },
    { id: 'add', label: 'Add New', icon: Plus },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
      <div className="flex relative">
        {tabs.map((tab, index) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          const isAddButton = tab.id === 'add'

          if (isAddButton) {
            return (
              <div key={tab.id} className="flex-1 flex justify-center relative">
                {/* Elevated Add Button - larger circle cropped at bottom */}
                <button
                  onClick={() => onTabChange(tab.id)}
                  className="absolute bottom-0 w-20 h-20 bg-neutral-900 dark:bg-neutral-100 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
                  style={{ transform: 'translateY(4px)' }}
                >
                  <Icon className="w-8 h-8 text-white dark:text-neutral-900" />
                </button>
                {/* Invisible spacer to maintain layout */}
                <div className="py-3 px-2"></div>
              </div>
            )
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 py-3 px-2 flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Screen Components
const TasksScreen = () => {
  return (
    <div className="p-4 h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Tasks</h1>
      </div>
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
          <p className="text-neutral-500 dark:text-neutral-400">No running agents</p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">Create your first agent to get started</p>
        </div>
      </div>
    </div>
  )
}

interface Message {
  id: number
  type: 'ai' | 'user'
  content: string
  timestamp: Date
}

const AddNewScreen = ({
  messages,
  setMessages,
}: {
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}) => {
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
    <div className="h-full flex flex-col">
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
              style={{ minHeight: '48px' }}
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

const ProfileScreen = () => {
  return (
    <div className="p-4 h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Profile</h1>
      </div>
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <User className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
          <p className="text-neutral-500 dark:text-neutral-400">User profile</p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">Profile settings coming soon</p>
        </div>
      </div>
    </div>
  )
}

// Confirmation Modal Component
const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}) => {
  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-800 rounded-2xl mx-6 overflow-hidden shadow-2xl max-w-xs w-full">
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Discard Changes?</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            You have unsaved changes to this assignment. Are you sure you want to discard them?
          </p>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-700">
          <button
            onClick={onConfirm}
            className="w-full py-3 text-red-600 dark:text-red-400 font-medium border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          >
            Discard Changes
          </button>
          <button
            onClick={onCancel}
            className="w-full py-3 text-blue-600 dark:text-blue-400 font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          >
            Keep Editing
          </button>
        </div>
      </div>
    </div>
  )
}

// Mobile App Content Component
const MobileAppContent = () => {
  const [activeTab, setActiveTab] = useState('tasks')
  const [pendingTab, setPendingTab] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [addScreenMessages, setAddScreenMessages] = useState<Message[]>([])

  const hasUnsavedChanges = activeTab === 'add' && addScreenMessages.length > 1

  const handleTabChange = (newTab: string) => {
    if (hasUnsavedChanges && newTab !== activeTab) {
      setPendingTab(newTab)
      setShowConfirmation(true)
    } else {
      setActiveTab(newTab)
    }
  }

  const handleConfirmDiscard = () => {
    if (pendingTab) {
      setActiveTab(pendingTab)
      setAddScreenMessages([]) // Reset messages
    }
    setShowConfirmation(false)
    setPendingTab(null)
  }

  const handleCancelDiscard = () => {
    setShowConfirmation(false)
    setPendingTab(null)
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'tasks':
        return <TasksScreen />
      case 'add':
        return <AddNewScreen messages={addScreenMessages} setMessages={setAddScreenMessages} />
      case 'profile':
        return <ProfileScreen />
      default:
        return <TasksScreen />
    }
  }

  return (
    <div className="h-full relative">
      {/* Main Content Area */}
      <div className="h-full pb-16 overflow-y-auto">{renderScreen()}</div>

      {/* Tab Bar */}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Confirmation Modal */}
      <ConfirmationModal isOpen={showConfirmation} onConfirm={handleConfirmDiscard} onCancel={handleCancelDiscard} />
    </div>
  )
}

export default function June24Page() {
  const [lastReset, setLastReset] = useState(Date.now())

  const handleReset = () => {
    setLastReset(Date.now())
    console.log('Configuration reset!')
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 p-6 relative">
      {/* Reset Button - Top Right Corner */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          type="button"
          onClick={handleReset}
          variant="ghost"
          buttonSize="small"
          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-2 bg-white dark:bg-neutral-800 shadow-md hover:shadow-lg transition-shadow border border-neutral-200 dark:border-neutral-700"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      <div className="h-[calc(100vh-3rem)]">
        <div className="flex flex-row h-full gap-8">
          {/* Configuration Panel - Left Side */}
          <div className="flex-1 h-full min-w-0">
            <ConfigurationPanel onReset={handleReset} />
          </div>

          {/* Mobile Frame - Right Side (2/3 width) */}
          <div className="grow-[2] shrink basis-0 flex justify-center items-center">
            <MobileFrame>
              <MobileAppContent key={lastReset} />
            </MobileFrame>
          </div>
        </div>
      </div>
    </div>
  )
}
