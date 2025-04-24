'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, FileText, Send, Bot } from 'lucide-react'

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
  { name: 'Categorize invoices by vendor', path: '/agents-studio' },
  { name: 'Summarize customer reviews', path: '/agents-studio/reviews' }
]

const recentAgents = [
  { name: 'Payment reminder emails', path: '/agents-studio/payments' },
  { name: 'Simplify legal text', path: '/agents-studio/legal' },
  { name: 'Create onboarding checklist', path: '/agents-studio/onboarding' }
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

export function Sidebar() {
  return (
    <div className="w-72 h-screen flex flex-col border-r border-slate-300 dark:border-slate-800 bg-[#FAF8F6] dark:bg-slate-900">
      {/* Logo */}
      <div className="px-3 py-3 flex items-center">
        <Link href="/">
          <img 
            src="https://cdn.prod.website-files.com/66e00503e1e57f5fafdfa7d5/66e005da47c0c33bca665c3a_wordware-logotype.svg" 
            alt="Wordware"
            className="h-5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          />
        </Link>
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
        {/* Favorites Section */}
        <div className="px-3 pt-4">
          <h3 className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
            FAVORITES
          </h3>
          <div className="space-y-1">
            {favorites.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center gap-2 py-2 text-sm text-slate-700 dark:text-slate-300 
                         hover:text-slate-900 dark:hover:text-slate-100 group"
              >
                <Star className="w-4 h-4 text-slate-400 group-hover:text-slate-500" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Agents Section */}
        <div className="px-3 pt-6">
          <h3 className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
            RECENT AGENTS
          </h3>
          <div className="space-y-1">
            {recentAgents.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center gap-2 py-2 text-sm text-slate-700 dark:text-slate-300 
                         hover:text-slate-900 dark:hover:text-slate-100 group"
              >
                <FileText className="w-4 h-4 text-slate-400 group-hover:text-slate-500" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Connections */}
      <div className="px-3 py-4 border-t border-slate-300 dark:border-slate-700">
        <h3 className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
          YOUR CONNECTIONS
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