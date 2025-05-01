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
        <div className={cn(
          "space-y-12 transition-all duration-300 ease-out",
          isEditorOpen ? "space-y-3" : "space-y-12"
        )}>
          {/* CSV Upload */}
          <div>
            <label className={cn(
              "font-large font-medium transition-all duration-300 ease-out",
              isEditorOpen ? "text-base" : "text-xl"
            )}>
              Analyze this CSV File. <span className="text-red-500">*</span>
            </label>
            <div className={cn(
              "transition-all duration-300 ease-out",
              isEditorOpen ? "mt-3" : "mt-2"
            )}>
              <FileUpload />
            </div>
          </div>

          {/* Category Style */}
          <div>
            <label className={cn(
              "font-large font-medium transition-all duration-300 ease-out",
              isEditorOpen ? "text-base" : "text-xl"
            )}>
              Next, automatically apply this category style to each row.
            </label>
            <div className={cn(
              "relative transition-all duration-300 ease-out",
              isEditorOpen ? "mt-3" : "mt-2"
            )}>
              <select
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 
                        bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none
                        appearance-none"
              >
                <option value="business-function">Business function</option>
                <option value="accounting-gl-class">Accounting GL class</option>
                <option value="plain-english-purpose">Plain-English purpose</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        
          {/* Final instruction */}
          <div>
            <div className={cn(
              "font-large font-medium transition-all duration-300 ease-out",
              isEditorOpen ? "text-base" : "text-xl"
            )}>
              Finally, generate a CSV file with the correct categories appended.
            </div>
          </div>
        </div>
      </>
    ),
    stats: {
      downloads: '24k',
      rating: '4.9',
      credits: 1
    }
  }
}

export default function AgentsStudioPage() {
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const currentAgent = agentContents['invoices']

  return (
    <div className="flex min-h-screen relative">
      <Sidebar 
        onSelectAgent={() => {}} 
        selectedAgent="invoices"
        isEditorOpen={isEditorOpen}
      />
      
      {/* Top Right Section - Appears when editor is open */}
      <div className={cn(
        "absolute top-0 right-0 bg-black text-white h-[160px] w-[320px] border-b border-l border-slate-700 transition-all duration-200 ease-out overflow-hidden z-50 flex items-center justify-center",
        isEditorOpen 
          ? "translate-x-0 delay-200" 
          : "translate-x-full delay-0"
      )}>
        <div className="text-center">
          <h3 className="text-xl font-bold mb-6">Wordware Studio</h3>
          <button 
            onClick={() => setIsEditorOpen(false)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-all text-white font-medium mx-auto block"
          >
            Save Changes
          </button>
        </div>
      </div>
      
      {/* Editor Panel - Always full width */}
      <div className="flex-1 border-r border-slate-300 dark:border-slate-800">
        <div className="h-full overflow-auto">
          <div className="pr-80">
            {/* Edit Button */}
            <button
              onClick={() => setIsEditorOpen(!isEditorOpen)}
              className={cn(
                "absolute top-4 right-4 px-4 py-2 rounded-lg text-sm font-medium transition-all z-10 duration-200 ease-out flex items-center gap-1.5",
                isEditorOpen 
                  ? "translate-x-full opacity-0 bg-slate-900 text-white delay-0" 
                  : "translate-x-0 opacity-100 bg-slate-900 text-white hover:bg-slate-800 delay-500"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil">
                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                <path d="m15 5 4 4"/>
              </svg>
              Edit
            </button>
            <AgentEditor 
              isPreviewMode={!isEditorOpen} 
              isExpanded={isExpanded}
              onExpandedChange={setIsExpanded}
            />
          </div>
        </div>
      </div>

      {/* Center Form Panel - First shifts left, then drops down */}
      <div 
        className="absolute bg-white border-b border-l border-r border-slate-200 w-[904px] top-[160px] transition-all ease-out duration-300"
        style={{
          right: isEditorOpen ? 'calc(50% - 452px)' : 'calc(50% - 452px - 160px)',
          opacity: isEditorOpen ? 0 : 1,
          height: 'calc(100vh - 160px)',
          pointerEvents: isEditorOpen ? 'none' : 'auto',
          transitionProperty: 'right, opacity',
          transitionDelay: isEditorOpen 
            ? '0ms, 150ms' 
            : '300ms, 0ms',
          transitionDuration: isEditorOpen 
            ? '300ms, 300ms' 
            : '300ms, 300ms',
        }}
      >
        {/* Form Content */}
        <div className="bg-white dark:bg-slate-800 overflow-auto px-12 py-4 h-full">
          <div className="max-w-4xl mx-auto space-y-12">
            {currentAgent.content(false)}

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{currentAgent.stats.credits}</span>
              </div>
              <button 
                className="px-6 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-medium flex items-center gap-2 transition-all"
              >
                Run
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Slides from right when editor is open */}
      <div className={cn(
        "absolute right-0 bg-white top-[160px] bottom-0 w-80 border-l border-slate-200 transition-all duration-300 ease-out",
        isEditorOpen 
          ? "translate-x-0 opacity-100 delay-200" 
          : "translate-x-full opacity-0 pointer-events-none delay-0"
      )}>
        {/* Form Content */}
        <div className="flex-1 bg-white dark:bg-slate-800 overflow-auto px-4 py-4 h-full">
          <div className="max-w-4xl mx-auto space-y-6">
            {currentAgent.content(true)}

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{currentAgent.stats.credits}</span>
              </div>
              <button 
                className="px-6 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-medium flex items-center gap-2 transition-all"
              >
                Run
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