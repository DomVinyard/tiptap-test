'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, FileText, Send, Bot, FolderOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  selectedAgent: string
  onSelectAgent: (agent: string) => void
  isEditorOpen?: boolean
}

const connections = [
  {
    name: 'Gmail',
    icon: '/icons/gmail.png'
  },
  {
    name: 'Google Calendar',
    icon: '/icons/gcal.png'
  },
  {
    name: 'Hubspot',
    icon: '/icons/hubspot.png'
  },
  {
    name: 'Notion',
    icon: '/icons/notion.png'
  },
  {
    name: 'Slack',
    icon: '/icons/slack.png'
  }
]

const favorites = [
  { id: 'invoices', name: 'Categorize invoices by vendor', path: '/agents-studio' },
  { id: 'emails', name: 'Unsubscribe from all spam emails', path: '/agents-studio/emails' }
]

const recentAgents = [
  { name: 'Payment reminder emails' },
  { name: 'Simplify legal text' },
  { name: 'Create onboarding checklist' }
]

function ExploreGrid() {
  return (
    <div className="grid grid-cols-2 gap-0.5 p-1">
      {[...Array(4)].map((_, i) => (
        <div 
          key={i} 
          className="w-1.5 h-1.5 rounded-[1px] bg-slate-400 group-hover:bg-slate-500 transition-colors"
        />
      ))}
    </div>
  )
}

export function Sidebar({ selectedAgent, onSelectAgent, isEditorOpen = false }: SidebarProps) {
  return (
    <div className="w-80 h-screen flex flex-col border-r border-slate-300 dark:border-slate-800 bg-[#FAF8F6] dark:bg-slate-900">
      {/* Logo */}
      <div className="px-3 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img 
            src="https://cdn.prod.website-files.com/66e00503e1e57f5fafdfa7d5/66e005da47c0c33bca665c3a_wordware-logotype.svg" 
            alt="Wordware"
            className="h-5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          />
        </Link>
        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">DV</span>
        </div>
      </div>

      {/* Agent Input */}
      <div className="px-3 pt-2 pb-3">
        <div className="relative">
          <Bot className="absolute left-2 top-2 w-4 h-4 text-slate-700 dark:text-slate-300" />
          <textarea
            placeholder="I need an agent to..."
            rows={3}
            className="w-full pl-8 pr-8 py-1.5 text-sm bg-white dark:bg-slate-800 
                     rounded-lg border border-slate-200 dark:border-slate-700
                     text-slate-700 dark:text-slate-300 placeholder-slate-400 
                     dark:placeholder-slate-500 outline-none focus:ring-1 
                     focus:ring-blue-500 transition-shadow resize-none"
          />
          <button 
            className="absolute right-2 bottom-2 p-0.5 
                     text-slate-400 hover:text-blue-500 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto">
        {/* Agent Files Section */}
        <div className={cn(
          "transition-all duration-500 ease-in-out overflow-hidden",
          isEditorOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="px-3 pt-4">
            <h3 className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Agent Files
            </h3>
            <div className="space-y-1">
              <div className={cn(
                "flex items-center gap-2 py-2 px-2 text-sm rounded-md",
                isEditorOpen 
                  ? "bg-slate-200/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100" 
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/30 dark:hover:bg-slate-800/30"
              )}>
                <FileText className={cn(
                  "flex-shrink-0 w-4 h-4",
                  isEditorOpen ? "text-slate-600 dark:text-slate-400" : "text-slate-400"
                )} />
                <span className="truncate">Main</span>
              </div>
              <div className="flex items-center gap-2 py-2 px-2 text-sm text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-200/30 dark:hover:bg-slate-800/30">
                <FileText className="flex-shrink-0 w-4 h-4 text-slate-400" />
                <span className="truncate">Invoice Scanner</span>
              </div>
              <div className="flex items-center gap-2 py-2 px-2 text-sm text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-200/30 dark:hover:bg-slate-800/30">
                <FileText className="flex-shrink-0 w-4 h-4 text-slate-400" />
                <span className="truncate">CSV Parser</span>
              </div>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="px-3 pt-4">
          <h3 className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
            Favorites
          </h3>
          <div className="space-y-1">
            {favorites.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectAgent(item.id)}
                className={`flex w-full items-center gap-2 py-2 px-2 text-sm group rounded-md text-left
                         ${!isEditorOpen && selectedAgent === item.id 
                           ? 'bg-slate-200/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100' 
                           : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/30 dark:hover:bg-slate-800/30'
                         }`}
              >
                <Star className={`flex-shrink-0 w-4 h-4 ${
                  !isEditorOpen && selectedAgent === item.id 
                    ? 'text-slate-600 dark:text-slate-400' 
                    : 'text-slate-400 group-hover:text-slate-500'
                }`} />
                <span className="truncate">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Agents Section */}
        <div className="px-3 pt-6">
          <h3 className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
            Recent Agents
          </h3>
          <div className="space-y-1">
            {recentAgents.map((item) => (
              <div
                key={item.name}
                className="flex w-full items-center gap-2 py-2 px-2 text-sm text-slate-700 dark:text-slate-300"
              >
                <FileText className="flex-shrink-0 w-4 h-4 text-slate-400" />
                <span className="truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Connections */}
      <div className="px-3 py-4 border-t border-slate-300 dark:border-slate-700">
        <h3 className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
          Your Connections
        </h3>
        <div className="space-y-1">
          {connections.map((connection) => (
            <div
              key={connection.name}
              className="flex items-center gap-2 py-1.5 text-sm text-slate-700 
                       dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
            >
              <Image
                src={connection.icon}
                alt={connection.name}
                width={16}
                height={16}
                className="flex-shrink-0"
              />
              <span>{connection.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 