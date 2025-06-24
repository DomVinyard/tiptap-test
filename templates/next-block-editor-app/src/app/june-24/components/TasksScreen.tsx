'use client'

import { Trash2 } from 'lucide-react'
import { SwipeableList, SwipeableListItem, SwipeAction, TrailingActions, Type as ListType } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

export interface Agent {
  id: string
  name: string
  status: 'waiting' | 'scheduled' | 'disabled'
  unreadCount: number
  nextRun?: string
  createdAt: string
  lastMessage: string
  lastMessageTime: string
  avatar: string
}

export const defaultAgents: Agent[] = [
  {
    id: '1',
    name: 'Email Auto-Archiver',
    status: 'waiting',
    unreadCount: 1,
    createdAt: new Date().toISOString(),
    lastMessage: 'Confirm that you want to archive 47 emails',
    lastMessageTime: '9:55 AM',
    avatar: '📧',
  },
  {
    id: '2',
    name: 'Social Media Monitor',
    status: 'scheduled',
    unreadCount: 0,
    nextRun: '12 hours',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    lastMessage: 'Monitoring completed. Next scan in 12 hours.',
    lastMessageTime: '8:59 AM',
    avatar: '📱',
  },
  {
    id: '3',
    name: 'Invoice Processor',
    status: 'waiting',
    unreadCount: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    lastMessage: 'Approve $2,450 invoice from Acme Corp',
    lastMessageTime: '8:54 AM',
    avatar: '💰',
  },
  {
    id: '4',
    name: 'Lead Qualifier',
    status: 'disabled',
    unreadCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    lastMessage: 'Agent disabled by user',
    lastMessageTime: 'Yesterday',
    avatar: '🎯',
  },
  {
    id: '5',
    name: 'Report Generator',
    status: 'disabled',
    unreadCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    lastMessage: 'Agent disabled by user',
    lastMessageTime: '2 days ago',
    avatar: '📊',
  },
]

interface TasksScreenProps {
  agents: Agent[]
  deleteAgent: (id: string) => void
}

const TasksScreen = ({ agents, deleteAgent }: TasksScreenProps) => {
  // Sort agents: waiting (with unreads) first, then scheduled, then disabled
  const sortedAgents = [...agents].sort((a, b) => {
    if (a.status === 'waiting' && b.status !== 'waiting') return -1
    if (b.status === 'waiting' && a.status !== 'waiting') return 1
    if (a.status === 'disabled' && b.status !== 'disabled') return 1
    if (b.status === 'disabled' && a.status !== 'disabled') return -1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const getStatusText = (agent: Agent) => {
    switch (agent.status) {
      case 'waiting':
        return agent.lastMessage
      case 'scheduled':
        return `Next run in ${agent.nextRun}`
      case 'disabled':
        return 'Disabled'
      default:
        return ''
    }
  }

  const getStatusColor = (agent: Agent) => {
    switch (agent.status) {
      case 'waiting':
        return 'text-green-600 dark:text-green-400'
      case 'scheduled':
        return 'text-blue-500 dark:text-blue-400'
      case 'disabled':
        return 'text-neutral-400 dark:text-neutral-500'
      default:
        return 'text-neutral-500'
    }
  }

  const handleAgentClick = (agent: Agent) => {
    // TODO: Navigate to agent chat
    console.log('Navigate to agent:', agent.name)
  }

  const trailingActions = (agentId: string) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => deleteAgent(agentId)}>
        <div className="flex items-center justify-center h-full bg-red-500 text-white px-4">
          <Trash2 className="w-5 h-5" />
        </div>
      </SwipeAction>
    </TrailingActions>
  )

  if (agents.length === 0) {
    return (
      <div className="h-full bg-white dark:bg-neutral-900">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-neutral-200 dark:border-neutral-700">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Assignments</h1>
        </div>

        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400">No agents yet</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
              Create your first agent to get started
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-white dark:bg-neutral-900">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-neutral-200 dark:border-neutral-700">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Assignments</h1>
      </div>

      {/* Chat List */}
      <SwipeableList type={ListType.IOS} className="w-full">
        {sortedAgents.map((agent, index) => (
          <SwipeableListItem key={agent.id} trailingActions={trailingActions(agent.id)}>
            <div
              className={`relative bg-white dark:bg-neutral-900 transition-all w-full ${
                agent.status !== 'disabled'
                  ? 'hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer active:bg-neutral-100 dark:active:bg-neutral-750'
                  : 'opacity-60'
              } ${index !== sortedAgents.length - 1 ? 'border-b border-neutral-100 dark:border-neutral-800' : ''}`}
              onClick={() => agent.status !== 'disabled' && handleAgentClick(agent)}
            >
              <div className="flex items-start p-4 gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                      agent.status === 'disabled'
                        ? 'bg-neutral-200 dark:bg-neutral-700'
                        : 'bg-neutral-200 dark:bg-neutral-700'
                    }`}
                  >
                    {agent.avatar}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-medium text-base truncate ${
                          agent.status === 'disabled'
                            ? 'text-neutral-400 dark:text-neutral-500'
                            : agent.unreadCount > 0
                              ? 'text-neutral-900 dark:text-neutral-100'
                              : 'text-neutral-800 dark:text-neutral-200'
                        }`}
                      >
                        {agent.name}
                      </h3>
                      {/* Status text directly below title */}
                      <p className={`text-xs ${getStatusColor(agent)} line-clamp-2`}>{getStatusText(agent)}</p>
                    </div>

                    <div className="flex flex-col items-end flex-shrink-0 ml-2">
                      <span
                        className={`text-xs mb-1 ${
                          agent.unreadCount > 0
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-neutral-400 dark:text-neutral-500'
                        }`}
                      >
                        {agent.lastMessageTime}
                      </span>
                      {agent.unreadCount > 0 && (
                        <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                          {agent.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwipeableListItem>
        ))}
      </SwipeableList>
    </div>
  )
}

export default TasksScreen
