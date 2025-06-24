'use client'

import { useState, useEffect } from 'react'
import { Surface } from '@/components/ui/Surface'
import { Button } from '@/components/ui/Button'
import { RotateCcw, MessageSquare, Plus, User } from 'lucide-react'
import TasksScreen from './components/TasksScreen'
import AddNewScreen from './components/AddNewScreen'
import ProfileScreen from './components/ProfileScreen'
import { Message } from './types'
import { Agent, defaultAgents } from './components/TasksScreen'

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
const TabBar = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tabId: string) => void }) => {
  const tabs = [
    { id: 'tasks', icon: MessageSquare, label: 'Tasks' },
    { id: 'add', icon: Plus, label: 'Add' },
    { id: 'profile', icon: User, label: 'Profile' },
  ]

  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 h-20">
      {tabs.map(tab => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        if (tab.id === 'add') {
          return (
            <div key={tab.id} className="flex-1 flex justify-center">
              <button
                onClick={() => onTabChange('add')}
                className="relative -top-1 w-16 h-16 bg-neutral-900 dark:bg-neutral-50 rounded-full flex items-center justify-center text-white dark:text-neutral-900 shadow-lg"
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>
          )
        }

        return (
          <div key={tab.id} className="flex-1">
            <button
              onClick={() => onTabChange(tab.id)}
              className={`w-full h-full flex flex-col items-center justify-center py-4 transition-colors ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              <Icon className="w-7 h-7" />
            </button>
          </div>
        )
      })}
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

interface MobileAppContentProps {
  agents: Agent[]
  deleteAgent: (id: string) => void
}

// Mobile App Content Component
const MobileAppContent = ({ agents, deleteAgent }: MobileAppContentProps) => {
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
        return <TasksScreen agents={agents} deleteAgent={deleteAgent} />
      case 'add':
        return <AddNewScreen messages={addScreenMessages} setMessages={setAddScreenMessages} />
      case 'profile':
        return <ProfileScreen />
      default:
        return <TasksScreen agents={agents} deleteAgent={deleteAgent} />
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
  const [agents, setAgents] = useState<Agent[]>([])

  // Load agents from localStorage on mount
  useEffect(() => {
    const savedAgents = localStorage.getItem('june24-agents')
    if (savedAgents) {
      try {
        const parsedAgents = JSON.parse(savedAgents)
        if (parsedAgents.length > 0 && typeof parsedAgents[0].lastMessage !== 'undefined') {
          setAgents(parsedAgents)
        } else {
          setAgents(defaultAgents)
          localStorage.setItem('june24-agents', JSON.stringify(defaultAgents))
        }
      } catch (e) {
        setAgents(defaultAgents)
        localStorage.setItem('june24-agents', JSON.stringify(defaultAgents))
      }
    } else {
      setAgents(defaultAgents)
      localStorage.setItem('june24-agents', JSON.stringify(defaultAgents))
    }
  }, [])

  // Save agents to localStorage whenever agents change
  useEffect(() => {
    if (agents.length > 0) {
      localStorage.setItem('june24-agents', JSON.stringify(agents))
    } else {
      // If all agents are deleted, clear localStorage
      localStorage.removeItem('june24-agents')
    }
  }, [agents])

  const deleteAgent = (agentId: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== agentId))
  }

  const resetAgents = () => {
    setAgents(defaultAgents)
    localStorage.setItem('june24-agents', JSON.stringify(defaultAgents))
  }

  const handleReset = () => {
    resetAgents()
    console.log('Assignments reset!')
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
              <MobileAppContent agents={agents} deleteAgent={deleteAgent} />
            </MobileFrame>
          </div>
        </div>
      </div>
    </div>
  )
}
