'use client'

import { useState } from 'react'
import { Surface } from '@/components/ui/Surface'
import { FileUpload } from './components/FileUpload'
import { Sidebar } from './components/Sidebar'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { AgentEditor } from './components/AgentEditor'

type Agent = {
  title: string
  description: string
  content: (isEditorOpen: boolean) => React.ReactNode
  stats: {
    downloads: string
    rating: string
    credits: number
  }
}

const agentContents: Record<string, Agent> = {
  'invoices': {
    title: 'Categorize invoices by vendor',
    description: 'Automatically categorizes invoices from a CSV file using AI. For each invoice row, it analyzes the vendor name, description, and total amount to assign a business-relevant category (e.g. "SaaS", "Travel", "Marketing")',
    content: (isEditorOpen: boolean) => (
      <>
        {/* CSV Upload */}
        <div>
          <label className={cn(
            "font-large transition-all",
            isEditorOpen ? "text-base" : "text-lg"
          )}>
            Analyze this CSV File <span className="text-red-500">*</span>
          </label>
          <div className="text-xs text-slate-500 mt-2">
          <FileUpload /></div>
          <div className="text-xs text-slate-500 mt-2">The raw invoice CSV</div>
        </div>

        {/* Category Style */}
        <div>
          <label className={cn(
            "font-large transition-all",
            isEditorOpen ? "text-base" : "text-lg"
          )}>
            And automatically apply this category style to each row
          </label>
          <input
            type="text"
            className="w-full mt-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 
                    bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Business function"
          />
          <div className="text-xs text-slate-500 mt-2">
            E.g. "business function", "accounting GL class", "plain-English purpose"
          </div>
        </div>
      </>
    ),
    stats: {
      downloads: '24k',
      rating: '4.9',
      credits: 1
    }
  },
  'emails': {
    title: 'Unsubscribe from all spam emails',
    description: 'Automatically identify and unsubscribe from unwanted promotional emails and newsletters. This agent analyzes your inbox to find spam and marketing emails, then safely handles the unsubscription process.',
    content: (isEditorOpen: boolean) => (
      <>
        {/* Gmail Connection */}
        <div>
          <label className={cn(
            "font-large transition-all",
            isEditorOpen ? "text-base" : "text-lg"
          )}>
            First, connect to my Gmail <span className="text-red-500">*</span>
          </label>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/icons/gmail.png" alt="Gmail" className="w-6 h-6 object-contain" />
                <div>
                  <div className="font-medium">G Suite/Gmail</div>
                  <div className="text-sm text-slate-500">Connect your G Suite account to read and write from your Gmail.</div>
                </div>
              </div>
              <button className="px-6 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white 
                               rounded-full transition-colors text-sm font-medium">
                Enable Integration
              </button>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2">Your Gmail account</div>
        </div>

        {/* Unsubscribe Settings */}
        <div>
          <label className={cn(
            "font-large transition-all",
            isEditorOpen ? "text-base" : "text-lg"
          )}>
            Then automatically unsubscribe from these email categories
          </label>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 mt-2">
            <div>
              <label className="flex items-center gap-2 py-2.5 px-3 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600" defaultChecked />
                <span className="text-sm">Promotional emails and marketing</span>
              </label>
              <label className="flex items-center gap-2 py-2.5 px-3 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600" defaultChecked />
                <span className="text-sm">Newsletters and updates</span>
              </label>
              <label className="flex items-center gap-2 py-2.5 px-3 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 dark:border-slate-600" defaultChecked />
                <span className="text-sm">Social media notifications</span>
              </label>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2">Select types of emails to unsubscribe from</div>
        </div>

        {/* Exceptions */}
        <div>
          <label className={cn(
            "font-large transition-all",
            isEditorOpen ? "text-base" : "text-lg"
          )}>
            But keep emails from these senders
          </label>
          <textarea
            className="w-full mt-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 
                    bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none
                    resize-none"
            rows={3}
            placeholder="e.g. company.com, newsletter@important.com"
          />
          <div className="text-xs text-slate-500 mt-2">Add senders or domains to exclude</div>
        </div>
      </>
    ),
    stats: {
      downloads: '18k',
      rating: '4.7',
      credits: 2
    }
  }
}

export default function AgentsStudioPage() {
  const [selectedAgent, setSelectedAgent] = useState('invoices')
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const currentAgent = agentContents[selectedAgent]

  return (
    <div className="flex min-h-screen relative">
      <Sidebar 
        onSelectAgent={setSelectedAgent} 
        selectedAgent={selectedAgent}
        isEditorOpen={isEditorOpen}
      />
      
      {/* Editor Panel - Always full width */}
      <div className="flex-1 border-r border-slate-300 dark:border-slate-800">
        <div className="h-full overflow-auto">
          <div className="pr-80">
            <AgentEditor 
              isPreviewMode={!isEditorOpen} 
              isExpanded={isExpanded}
              onExpandedChange={setIsExpanded}
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Slides over editor */}
      <div className={cn(
        "absolute inset-y-0 right-0 bg-white transition-all duration-500 ease-in-out border-l border-slate-200",
        isEditorOpen ? "w-80" : "w-[calc(100vw-20rem)]"
      )}>
        {/* Top Bar */}
        <div className="bg-black h-12 flex items-center px-4">
          {isEditorOpen ? (
            <div className="flex items-center w-full">
              <span 
                onClick={() => setIsEditorOpen(false)}
                className="text-sm text-white hover:opacity-80 cursor-pointer transition-opacity"
              >
                ← {isExpanded ? "Save changes" : "View Deployed Agent"}
              </span>
            </div>
          ) : (
            <div 
              className={cn(
                "w-full flex items-center justify-center cursor-pointer",
                selectedAgent === 'invoices' ? 'hover:opacity-80' : 'opacity-50 cursor-not-allowed'
              )}
              onClick={() => selectedAgent === 'invoices' && setIsEditorOpen(true)}
            >
              <div className="text-sm text-white">
                <span className="font-bold">Wordware Studio. </span>
                {selectedAgent === 'invoices' ? 'Remix this agent or create your own →' : 'Coming soon →'}
              </div>
            </div>
          )}
        </div>

        {/* Blue Header Section */}
        <div className={cn(
          "bg-gradient-to-r from-[#E5F1FA] to-[#F2F7FA] transition-all duration-500 ease-in-out overflow-hidden",
          isEditorOpen ? "max-h-0 opacity-0 py-0" : "max-h-[500px] opacity-100 px-4 py-12"
        )}>
          <div className={cn(
            "max-w-4xl mx-auto transition-all duration-500",
            isEditorOpen ? "scale-95" : "scale-100"
          )}>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{currentAgent.title}</h1>
              <div className="flex items-center gap-4">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button type="button" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium 
                    bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300
                    border border-slate-200 dark:border-slate-700 rounded-l-md
                    hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white
                    focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-slate-900">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{currentAgent.stats.downloads}</span>
                  </button>
                  <button type="button" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium 
                    bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300
                    border border-l-0 border-slate-200 dark:border-slate-700 rounded-r-md
                    hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white
                    focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-slate-900">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                        fill="currentColor"/>
                    </svg>
                    <span>{currentAgent.stats.rating}</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="text-sm font-medium mt-1">by Wordware</div>
            {/* <p className="mt-8 text-slate-500">
              {currentAgent.description}
            </p> */}
          </div>
        </div>

        {/* Form Section */}
        <div className={cn(
          "flex-1 bg-white dark:bg-slate-800 transition-all duration-500 ease-in-out overflow-auto",
          isEditorOpen ? "px-4 py-4" : "px-4 pt-12 pb-8"
        )}>
          <div className="max-w-4xl mx-auto space-y-12 transition-all duration-500 ease-in-out origin-right">
            {currentAgent.content(isEditorOpen)}

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <div className={cn(
                "flex items-center gap-2",
                selectedAgent !== 'invoices' && "opacity-50"
              )}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{currentAgent.stats.credits}</span>
              </div>
              <button 
                className={cn(
                  "px-6 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-medium flex items-center gap-2 transition-all"
                )}
              >
                {isEditorOpen 
                  ? 'Run'
                  : selectedAgent === 'invoices' ? 'Generate Categorized CSV' : 'Unsubscribe All Spam'
                }
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 