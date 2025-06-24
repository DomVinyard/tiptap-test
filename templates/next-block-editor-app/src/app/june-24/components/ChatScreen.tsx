'use client'

import { ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Agent, ChatMessage } from './TasksScreen'
import { useEffect, useRef } from 'react'

interface ChatScreenProps {
  agent: Agent
  onBack: () => void
  onApprove: (id: string) => void
  onDeny: (id: string) => void
}

const ChatHeader = ({ agent, onBack }: { agent: Agent; onBack: () => void }) => (
  <div className="flex items-center p-4 border-b border-neutral-200 dark:border-neutral-700">
    <button
      onClick={onBack}
      className="p-2 -m-2 mr-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-xl bg-neutral-200 dark:bg-neutral-700`}
      >
        {agent.avatar}
      </div>
      <div>
        <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{agent.name}</h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">{agent.status}</p>
      </div>
    </div>
  </div>
)

const ActionPrompt = ({ onApprove, onDeny }: { onApprove: () => void; onDeny: () => void }) => (
  <div className="flex gap-3 mt-2">
    <button
      onClick={onApprove}
      className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
    >
      <ThumbsUp className="w-4 h-4" />
      Approve
    </button>
    <button
      onClick={onDeny}
      className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
    >
      <ThumbsDown className="w-4 h-4" />
      Deny
    </button>
  </div>
)

const ChatMessageItem = ({ message, agent }: { message: ChatMessage; agent: Agent }) => {
  if (message.type === 'system') {
    return (
      <div className="text-center text-xs italic text-neutral-500 dark:text-neutral-400 py-3">
        <p>{message.content}</p>
      </div>
    )
  }

  const isUser = message.type === 'user'
  const bubbleAlignment = isUser ? 'justify-end' : 'justify-start'
  const bubbleStyle = isUser
    ? 'bg-blue-500 text-white'
    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'

  return (
    <div className={`flex ${bubbleAlignment} my-2`}>
      <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${bubbleStyle}`}>
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-neutral-400 dark:text-neutral-500'}`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  )
}

const ChatScreen = ({ agent, onBack, onApprove, onDeny }: ChatScreenProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [agent.chatHistory])

  const lastMessage = agent.chatHistory[agent.chatHistory.length - 1]
  const needsAction = lastMessage.type === 'agent' && agent.unreadCount > 0

  return (
    <div className="h-full bg-white dark:bg-neutral-900 flex flex-col">
      <ChatHeader agent={agent} onBack={onBack} />
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {agent.chatHistory.map(message => (
            <ChatMessageItem key={message.id} message={message} agent={agent} />
          ))}
          {needsAction && (
            <ActionPrompt
              onApprove={() => {
                onApprove(agent.id)
                onBack()
              }}
              onDeny={() => {
                onDeny(agent.id)
                onBack()
              }}
            />
          )}
          <div ref={scrollRef} />
        </div>
      </div>
    </div>
  )
}

export default ChatScreen
