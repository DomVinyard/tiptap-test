'use client'

import { useState, useEffect } from 'react'
import { Surface } from '@/components/ui/Surface'
import { Button } from '@/components/ui/Button'
import { RotateCcw, MessageSquare, Plus, User, ThumbsUp, ThumbsDown, PowerIcon } from 'lucide-react'
import TasksScreen, { Agent, defaultAgents, ChatMessage } from './components/TasksScreen'
import AddNewScreen from './components/AddNewScreen'
import ProfileScreen from './components/ProfileScreen'
import ChatScreen from './components/ChatScreen'
import { Message } from './types'

// Mobile Frame Component
const MobileFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[395px]">
    <div className="bg-neutral-800 dark:bg-neutral-700 rounded-[2.5rem] p-2 shadow-2xl">
      <div className="bg-white dark:bg-neutral-950 rounded-[2rem] overflow-hidden h-[800px] relative">
        <div className="bg-white dark:bg-neutral-950 px-4 py-2 flex justify-between items-center text-xs font-medium">
          <span className="text-neutral-900 dark:text-neutral-100">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 bg-neutral-300 dark:bg-neutral-600 rounded-sm"></div>
            <div className="w-6 h-3 border border-neutral-300 dark:border-neutral-600 rounded-sm">
              <div className="w-4 h-full bg-green-500 rounded-sm"></div>
            </div>
          </div>
        </div>
        <div className="h-[calc(100%_-_2rem)]">{children}</div>
      </div>
    </div>
  </div>
)

// Configuration Panel Component
const ConfigurationPanel = () => (
  <Surface className="h-full p-6">
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Sauna Messenger Concept</h2>
        <p className="text-base text-neutral-600 dark:text-neutral-400 mb-6">
          This prototype explores a mobile experience for managing automated agents by fully embracing a messenger
          interface paradigm.
        </p>
        <div className="text-base text-neutral-600 dark:text-neutral-400 space-y-4">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">The Unified Chat Interface</h3>
          <p>
            The main difference in this approach is that we bundle the agent's activity log and the human-in-the-loop
            tasks into the <span className="font-semibold">same chat interface</span>.
          </p>
          <p>
            Rather than presenting actions as separate UI elements, every notification, status update, and approval
            request becomes an object in the conversation stream. This creates a single, seamless thread for each agent,
            making a complex workflow feel as natural as a text conversation.
          </p>
        </div>
      </div>
    </div>
  </Surface>
)

// Generic Confirmation Modal
const ActionConfirmationModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText = 'Cancel',
  confirmClass,
}: {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  confirmText: string
  cancelText?: string
  confirmClass?: string
}) => {
  if (!isOpen) return null
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-800 rounded-2xl mx-6 overflow-hidden shadow-2xl max-w-xs w-full">
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{title}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{message}</p>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-700">
          <button
            onClick={onConfirm}
            className={`w-full py-3 font-medium border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors ${confirmClass}`}
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="w-full py-3 font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  )
}

// Tab Bar Component
const TabBar = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tabId: string) => void }) => {
  const tabs = [
    { id: 'tasks', icon: MessageSquare },
    { id: 'add', icon: Plus },
    { id: 'profile', icon: User },
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

export default function June24Page() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [activeTab, setActiveTab] = useState('tasks')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [addScreenMessages, setAddScreenMessages] = useState<Message[]>([])
  const [actionToConfirm, setActionToConfirm] = useState<
    | {
        action: 'approve' | 'deny' | 'delete' | 'toggleDisable'
        agentId: string
        title: string
        message: string
        confirmText: string
        confirmClass?: string
        cancelText?: string
      }
    | {
        action: 'discard'
        targetTab: string
        title: string
        message: string
        confirmText: string
        confirmClass?: string
        cancelText?: string
      }
    | null
  >(null)

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

  useEffect(() => {
    if (agents.length > 0) {
      localStorage.setItem('june24-agents', JSON.stringify(agents))
    } else {
      localStorage.removeItem('june24-agents')
    }
  }, [agents])

  const updateAgent = (agentId: string, updates: Partial<Agent>) => {
    setAgents(prev => prev.map(agent => (agent.id === agentId ? { ...agent, ...updates } : agent)))
  }

  const deleteAgent = (agentId: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== agentId))
  }

  const handleApprove = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId)
    if (!agent) return

    const runningMessage =
      agent.name === 'Invoice Processor'
        ? 'Processing invoice...'
        : agent.name === 'Email Auto-Archiver'
          ? 'Archiving emails...'
          : 'Running...'

    const userMessage: ChatMessage = {
      id: `msg${agent.chatHistory.length + 1}`,
      type: 'user',
      content: 'User Approved',
      timestamp: 'Just now',
    }

    const agentRunningMessage: ChatMessage = {
      id: `msg${agent.chatHistory.length + 2}`,
      type: 'agent',
      content: runningMessage,
      timestamp: 'Just now',
    }

    // Set to "running" state immediately
    updateAgent(agentId, {
      status: 'running',
      unreadCount: 0,
      lastMessage: runningMessage,
      createdAt: new Date().toISOString(),
      lastMessageTime: 'Just now',
      chatHistory: [...agent.chatHistory, userMessage, agentRunningMessage],
    })

    // After a delay, transition to "scheduled"
    setTimeout(() => {
      const finalMessage = agent.name === 'Invoice Processor' ? 'Next run in 1 hour' : 'Listening for emails'
      const agentFinalMessage: ChatMessage = {
        id: `msg${agent.chatHistory.length + 3}`,
        type: 'agent',
        content: finalMessage,
        timestamp: 'Just now',
      }
      updateAgent(agentId, {
        status: 'scheduled',
        lastMessage: finalMessage,
        chatHistory: [...agent.chatHistory, userMessage, agentRunningMessage, agentFinalMessage],
      })
    }, 2500)
  }

  const handleDeny = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId)
    if (!agent) return

    const userMessage: ChatMessage = {
      id: `msg${agent.chatHistory.length + 1}`,
      type: 'user',
      content: 'User Denied',
      timestamp: 'Just now',
    }

    const agentMessage: ChatMessage = {
      id: `msg${agent.chatHistory.length + 2}`,
      type: 'agent',
      content: 'Task denied by user.',
      timestamp: 'Just now',
    }

    updateAgent(agentId, {
      status: 'denied',
      unreadCount: 0,
      lastMessage: 'Denied by user',
      createdAt: new Date().toISOString(),
      lastMessageTime: 'Just now',
      chatHistory: [...agent.chatHistory, userMessage, agentMessage],
    })
  }

  const handleToggleDisable = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId)
    if (!agent) return
    const isDisabling = agent.status !== 'disabled'
    setActionToConfirm({
      action: 'toggleDisable',
      agentId,
      title: `${isDisabling ? 'Disable' : 'Enable'} Agent?`,
      message: `Are you sure you want to ${isDisabling ? 'disable' : 'enable'} this agent?`,
      confirmText: isDisabling ? 'Disable' : 'Enable',
      confirmClass: isDisabling ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400',
    })
  }

  const handleDeleteRequest = (agentId: string) => {
    setActionToConfirm({
      action: 'delete',
      agentId,
      title: 'Delete Agent?',
      message: 'This will permanently delete the agent and its history.',
      confirmText: 'Delete',
      confirmClass: 'text-red-600 dark:text-red-400',
    })
  }

  const handleTabChange = (newTab: string) => {
    const hasUnsavedChanges = activeTab === 'add' && addScreenMessages.length > 0
    if (hasUnsavedChanges && newTab !== activeTab) {
      setActionToConfirm({
        action: 'discard',
        targetTab: newTab,
        title: 'Discard Changes?',
        message: 'You have unsaved changes. Are you sure you want to discard them?',
        confirmText: 'Discard Changes',
        confirmClass: 'text-red-600 dark:text-red-400',
        cancelText: 'Keep Editing',
      })
    } else {
      setActiveTab(newTab)
    }
  }

  const confirmAction = () => {
    if (!actionToConfirm) return

    if (actionToConfirm.action === 'delete') {
      deleteAgent(actionToConfirm.agentId)
    } else if (actionToConfirm.action === 'toggleDisable') {
      const agent = agents.find(a => a.id === actionToConfirm.agentId)
      if (agent) {
        updateAgent(actionToConfirm.agentId, { status: agent.status === 'disabled' ? 'scheduled' : 'disabled' })
      }
    } else if (actionToConfirm.action === 'discard') {
      if (actionToConfirm.targetTab) setActiveTab(actionToConfirm.targetTab)
      setAddScreenMessages([])
    }
    setActionToConfirm(null)
  }

  const cancelAction = () => setActionToConfirm(null)

  const resetAgents = () => {
    setAgents(defaultAgents)
    localStorage.setItem('june24-agents', JSON.stringify(defaultAgents))
  }

  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent)
  }

  const handleBackToTasks = () => {
    setSelectedAgent(null)
  }

  const renderScreen = () => {
    if (selectedAgent) {
      return (
        <ChatScreen agent={selectedAgent} onBack={handleBackToTasks} onApprove={handleApprove} onDeny={handleDeny} />
      )
    }

    switch (activeTab) {
      case 'tasks':
        return (
          <TasksScreen
            agents={agents}
            deleteAgent={handleDeleteRequest}
            onApprove={handleApprove}
            onDeny={handleDeny}
            onToggleDisable={handleToggleDisable}
            onAgentSelect={handleSelectAgent}
          />
        )
      case 'add':
        return <AddNewScreen messages={addScreenMessages} setMessages={setAddScreenMessages} />
      case 'profile':
        return <ProfileScreen />
      default:
        return <div />
    }
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 p-6 relative">
      <div className="absolute top-6 right-6 z-10">
        <Button
          type="button"
          onClick={resetAgents}
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
          <div className="flex-1 h-full min-w-0">
            <ConfigurationPanel />
          </div>

          <div className="grow-[2] shrink basis-0 flex justify-center items-center">
            <MobileFrame>
              <div className="h-full relative">
                <div className="h-full pb-16 overflow-y-auto">{renderScreen()}</div>
                <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
                <ActionConfirmationModal
                  isOpen={!!actionToConfirm}
                  title={actionToConfirm?.title || ''}
                  message={actionToConfirm?.message || ''}
                  onConfirm={confirmAction}
                  onCancel={cancelAction}
                  confirmText={actionToConfirm?.confirmText || 'Confirm'}
                  cancelText={actionToConfirm?.cancelText}
                  confirmClass={actionToConfirm?.confirmClass}
                />
              </div>
            </MobileFrame>
          </div>
        </div>
      </div>
    </div>
  )
}
