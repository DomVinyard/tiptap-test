'use client'

import { ArrowLeft, ThumbsUp, ThumbsDown, Send, ChevronDown } from 'lucide-react'
import { Agent, ChatMessage } from './TasksScreen'
import { useEffect, useRef, useState } from 'react'

interface ChatScreenProps {
  agent: Agent
  onBack: () => void
  onApprove: (id: string) => void
  onDeny: (id: string) => void
  onSendMessage: (agentId: string, content: string) => void
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

const ChatInput = ({ onSend, showBorder = true }: { onSend: (content: string) => void; showBorder?: boolean }) => {
  const [content, setContent] = useState('')

  const handleSend = () => {
    if (content.trim()) {
      onSend(content)
      setContent('')
    }
  }

  return (
    <div
      className={`p-4 bg-white dark:bg-neutral-900 ${
        showBorder && 'border-t border-neutral-200 dark:border-neutral-700'
      }`}
    >
      <div className="relative">
        <input
          type="text"
          value={content}
          onChange={e => setContent(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Send a message..."
          className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full px-4 py-2 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 disabled:bg-neutral-400"
          disabled={!content.trim()}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

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
        <div className="flex justify-between items-center mt-2">
          <p className={`text-xs ${isUser ? 'text-blue-200' : 'text-neutral-400 dark:text-neutral-500'}`}>
            {message.timestamp}
          </p>
          {message.details && (
            <button
              className={`flex items-center gap-1 font-medium text-xs ${
                isUser ? 'text-blue-200 hover:text-white' : 'text-blue-500 hover:text-blue-600'
              }`}
            >
              Show
              <ChevronDown className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const ChatScreen = ({ agent, onBack, onApprove, onDeny, onSendMessage }: ChatScreenProps) => {
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
          <div ref={scrollRef} />
        </div>
      </div>
      <div className="mt-auto">
        {needsAction && (
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
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
          </div>
        )}
        <ChatInput onSend={content => onSendMessage(agent.id, content)} showBorder={!needsAction} />
      </div>
    </div>
  )
}

export default ChatScreen
