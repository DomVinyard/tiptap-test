'use client'

import { Trash2, ThumbsUp, ThumbsDown, PowerIcon } from 'lucide-react'
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  LeadingActions,
  Type as ListType,
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { Spinner } from '@/components/ui/Spinner'

export type ChatMessage = {
  id: string
  type: 'user' | 'agent' | 'system'
  content: string
  timestamp: string
}

export interface Agent {
  id: string
  name: string
  status: 'waiting' | 'scheduled' | 'disabled' | 'complete' | 'denied' | 'running'
  unreadCount: number
  nextRun?: string
  createdAt: string
  lastMessage: string
  lastMessageTime: string
  avatar: string
  chatHistory: ChatMessage[]
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
    chatHistory: [
      {
        id: 'msg1',
        type: 'system',
        content: 'Agent activated. Scanning for emails older than 7 days without a reply.',
        timestamp: 'Mon 9:15 AM',
      },
      { id: 'msg2', type: 'agent', content: 'Identified 12 emails matching criteria.', timestamp: 'Mon 9:16 AM' },
      { id: 'msg3', type: 'user', content: 'Approve', timestamp: 'Mon 9:18 AM' },
      { id: 'msg4', type: 'agent', content: 'Done. Archived 12 threads.', timestamp: 'Mon 9:18 AM' },
      { id: 'msg5', type: 'agent', content: 'Found 8 more emails.', timestamp: 'Tue 10:02 AM' },
      { id: 'msg6', type: 'user', content: 'Approve', timestamp: 'Tue 10:05 AM' },
      {
        id: 'msg7',
        type: 'agent',
        content: 'Archived. The next scan is scheduled for tomorrow.',
        timestamp: 'Tue 10:05 AM',
      },
      { id: 'msg8', type: 'agent', content: 'Found 47 emails that can be archived.', timestamp: '9:54 AM' },
      { id: 'msg9', type: 'agent', content: 'Confirm that you want to archive these 47 emails.', timestamp: '9:55 AM' },
    ],
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
    chatHistory: [
      { id: 'smm1', type: 'system', content: 'Agent scheduled to run every 12 hours.', timestamp: '5 days ago' },
      { id: 'smm2', type: 'agent', content: 'Scan complete. No new mentions found.', timestamp: '5 days ago' },
      { id: 'smm3', type: 'agent', content: 'Scan complete. No new mentions found.', timestamp: '4 days ago' },
      { id: 'smm4', type: 'agent', content: 'Scan complete. No new mentions found.', timestamp: '4 days ago' },
      {
        id: 'smm5',
        type: 'agent',
        content: 'Found 2 new mentions for your keywords. Would you like to automatically reply?',
        timestamp: '3 days ago',
      },
      { id: 'smm6', type: 'user', content: 'Approve', timestamp: '3 days ago' },
      { id: 'smm7', type: 'agent', content: 'Both messages sent.', timestamp: '3 days ago' },
      { id: 'smm8', type: 'agent', content: 'Scan complete. No new mentions found.', timestamp: '2 days ago' },
      { id: 'smm9', type: 'agent', content: 'Scan complete. No new mentions found.', timestamp: '2 days ago' },
      { id: 'smm10', type: 'agent', content: 'Scan complete. No new mentions found.', timestamp: 'Yesterday' },
      { id: 'smm11', type: 'agent', content: 'Scan complete. No new mentions found.', timestamp: 'Yesterday' },
      { id: 'smm12', type: 'agent', content: 'Scan complete. No new mentions found.', timestamp: '8:59 AM' },
    ],
  },
  {
    id: '3',
    name: 'Invoice Processor',
    status: 'waiting',
    unreadCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    lastMessage: 'Approve $2,450 invoice from Acme Corp',
    lastMessageTime: '8:54 AM',
    avatar: '💰',
    chatHistory: [
      {
        id: 'msg1',
        type: 'system',
        content: 'Agent activated to monitor invoices from approved vendors.',
        timestamp: '8:50 AM',
      },
      {
        id: 'msg2',
        type: 'agent',
        content: 'Detected new invoice #INV-2024-001 from "Acme Corp"',
        timestamp: '8:53 AM',
      },
      { id: 'msg3', type: 'agent', content: 'Do you want to approve the invoice for $2,450?', timestamp: '8:54 AM' },
    ],
  },
  {
    id: '4',
    name: 'Lead Qualifier',
    status: 'disabled',
    unreadCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    lastMessage: 'Agent disabled by user',
    lastMessageTime: 'Yesterday',
    avatar: '💸',
    chatHistory: [{ id: 'msg1', type: 'system', content: 'Agent has been disabled.', timestamp: 'Yesterday' }],
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
    chatHistory: [{ id: 'msg1', type: 'system', content: 'Agent has been disabled.', timestamp: '2 days ago' }],
  },
]

interface TasksScreenProps {
  agents: Agent[]
  onApprove: (id: string) => void
  onDeny: (id: string) => void
  onToggleDisable: (id: string) => void
  deleteAgent: (id: string) => void
  onAgentSelect: (agent: Agent) => void
}

const TasksScreen = ({ agents, onApprove, onDeny, onToggleDisable, deleteAgent, onAgentSelect }: TasksScreenProps) => {
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
      case 'running':
        return agent.lastMessage
      case 'scheduled':
        return agent.lastMessage
      case 'disabled':
        return 'Disabled'
      case 'complete':
        return 'Completed'
      case 'denied':
        return 'Denied'
      default:
        return ''
    }
  }

  const getStatusColor = (agent: Agent) => {
    switch (agent.status) {
      case 'waiting':
        return 'text-green-600 dark:text-green-400'
      case 'running':
        return 'text-neutral-500 dark:text-neutral-400'
      case 'scheduled':
        return 'text-blue-500 dark:text-blue-400'
      case 'disabled':
        return 'text-neutral-400 dark:text-neutral-500'
      case 'complete':
        return 'text-neutral-500 dark:text-neutral-400'
      case 'denied':
        return 'text-red-500 dark:text-red-400'
      default:
        return 'text-neutral-500'
    }
  }

  const handleAgentClick = (agent: Agent) => {
    onAgentSelect(agent)
  }

  // Define swipe actions based on agent status
  const leadingActions = (agent: Agent) => {
    if (agent.status === 'waiting') {
      return (
        <LeadingActions>
          <SwipeAction onClick={() => onApprove(agent.id)}>
            <div className="flex items-center justify-center h-full bg-green-500 text-white px-6">
              <ThumbsUp className="w-6 h-6" />
            </div>
          </SwipeAction>
        </LeadingActions>
      )
    }
    return null
  }

  const trailingActions = (agent: Agent) => {
    if (agent.status === 'waiting') {
      return (
        <TrailingActions>
          <SwipeAction onClick={() => onDeny(agent.id)}>
            <div className="flex items-center justify-center h-full bg-red-500 text-white px-6">
              <ThumbsDown className="w-6 h-6" />
            </div>
          </SwipeAction>
        </TrailingActions>
      )
    }
    return null
  }

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
      <SwipeableList type={ListType.IOS} className="w-full" fullSwipe={true}>
        {sortedAgents.map((agent, index) => (
          <SwipeableListItem
            key={agent.id}
            leadingActions={leadingActions(agent)}
            trailingActions={trailingActions(agent)}
            blockSwipe={agent.status !== 'waiting'}
          >
            <div
              className={`relative bg-white dark:bg-neutral-900 transition-all w-full select-none ${
                agent.status !== 'disabled'
                  ? 'hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer active:bg-neutral-100 dark:active:bg-neutral-750'
                  : ''
              } ${index !== sortedAgents.length - 1 ? 'border-b border-neutral-100 dark:border-neutral-800' : ''}`}
              onClick={() => handleAgentClick(agent)}
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
                          agent.unreadCount > 0
                            ? 'text-neutral-900 dark:text-neutral-100'
                            : 'text-neutral-800 dark:text-neutral-200'
                        }`}
                      >
                        {agent.name}
                      </h3>
                      {/* Status text directly below title */}
                      <p className={`text-xs flex items-center gap-1.5 ${getStatusColor(agent)} line-clamp-2`}>
                        {agent.status === 'running' && <Spinner className="h-3 w-3" />}
                        {getStatusText(agent)}
                      </p>
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
