import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface AgentEditorProps {
  isPreviewMode?: boolean
  isExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
}

function DocumentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 1.5h-6a1 1 0 00-1 1v11a1 1 0 001 1h11a1 1 0 001-1v-6" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13.5 1.5l-5 5m0-3h3v3" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 13.5h-13m1-8v6m4-3v3m4-6v6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
        stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function LoopIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-arrow-iteration">
      <path d="M8.5 16a5.5 5.5 0 1 0 -5.5 -5.5v.5"></path>
      <path d="M3 16h18"></path>
      <path d="M18 13l3 3l-3 3"></path>
    </svg>
  )
}

function RepeatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4v8M4 8h8" stroke="#9333EA" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function AgentEditor({ 
  isPreviewMode = false, 
  isExpanded = false,
  onExpandedChange
}: AgentEditorProps) {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#EDF5FB] to-[#F2F7FA] w-[100vw]" />
      <div className="relative py-8">
        <div className={cn(
          "w-[900px] absolute transition-all duration-300 ease-out",
          isPreviewMode 
            ? "right-[calc(50%-450px-160px)] delay-300" 
            : "right-[calc(50%-450px)] delay-0"
        )}>
          <div className="w-[904px] bg-white rounded-lg p-12 border border-slate-200">
            {/* Header - Always visible */}
            <h1 className="text-4xl font-bold text-slate-900 mb-0">
              <strong>Categorize invoices by vendor</strong>
            </h1>
            <div className="text-sm font-medium mt-1 text-slate-500">by Wordware</div>
            
            {/* Content - Conditionally visible */}
            <div className={cn(
              "transition-all duration-500 ease-out",
              isPreviewMode 
                ? "opacity-0 h-0 overflow-hidden" 
                : "opacity-100 delay-450"
            )}>
              <div className="react-renderer node-description min-w-0">
                <p className="mt-4 text-slate-600">
                  Automatically categorizes invoices from a CSV file using AI. For each invoice row, it analyzes the vendor 
                  name, description, and total amount to assign a business-relevant category (e.g. "SaaS", "Travel", 
                  "Marketing")
                </p>
              </div>

              {/* Inputs Section */}
              <div className="select-none rounded-lg py-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <span className="select-none text-xs font-semibold uppercase tracking-tight text-stone-400">
                      INPUTS
                    </span>
                  </div>
                  <div className="flex items-start flex-wrap">
                    <div className="relative my-1 mr-2 flex h-[30px] cursor-pointer select-none items-center rounded-md border border-slate-200 bg-white px-3">
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="rounded-[3px] p-[3px] text-cyan-500 bg-cyan-50">
                            <DocumentIcon />
                          </div>
                        </div>
                        <span className="ml-2 text-sm">CSV File</span>
                      </div>
                    </div>
                    <div className="relative my-1 mr-2 flex h-[30px] cursor-pointer select-none items-center rounded-md border border-slate-200 bg-white px-3">
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="rounded-[3px] p-[3px] text-emerald-500 bg-emerald-50">
                            <ChartIcon />
                          </div>
                        </div>
                        <span className="ml-2 text-sm">Category Style</span>
                      </div>
                    </div>
                    <button className="inline-flex items-center justify-center text-sm my-1 h-[30px] rounded-md px-3 border border-slate-200 bg-white hover:bg-slate-50">
                      <Plus className="mr-2 h-4 w-4" />
                      New Input
                    </button>
                  </div>
                </div>
              </div>

              <hr className="mt-4 mb-6 border-t border-stone-300" />

              <div className="border-l-4 border-stone-200 text-stone-400 pl-2 border-double italic">
                <p>
                  First fetch the CSV file
                </p>
              </div>

              <p className="mt-4">Analyze this CSV File</p>
              <p className="mt-2">
                <span className="inline-flex items-center rounded-lg px-1 py-0.5 bg-teal-50 text-teal-400">
                  @CSV File
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 inline p-0.5">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                    <path d="M10 9H8"></path>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                  </svg>
                </span>
              </p>

              <div className="border-l-4 border-stone-200 text-stone-400 pl-2 mt-6 border-double italic">
                <p>
                  Now loop each row and generate a category for it
                </p>
              </div>
              <div className="mt-4">
                <div className="isolate group relative my-2 rounded-lg border border-slate-200 bg-white">
                  <div className="bg-slate-50 group-hover:bg-slate-100 h-8 overflow-hidden flex items-center cursor-pointer gap-2 px-2 justify-between border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center bg-purple-100 text-purple-500 p-[2px] rounded-full">
                        <LoopIcon />
                      </div>
                      <span className="text-sm">Each Row</span>
                    </div>
                  </div>

                  <div className="px-3 py-2">
                    <p className="text-slate-700">Which category does this row fall into: {' '}
                      <span className="inline-flex items-center rounded-lg px-1 py-0.5 bg-teal-50 text-teal-400">
                        @Item
                      </span></p>
                    <p className="mt-3 text-slate-600">
                      Use the following category style{' '}
                      <span className="inline-flex items-center rounded-lg px-1 py-0.5 bg-teal-50 text-teal-400">
                        @Category Style
                      </span>
                    </p>

                    <div className="mt-4">
                      <button className="inline-flex items-center gap-2 rounded-md bg-[#F3E8FF] px-3 py-1.5">
                        <SparkleIcon />
                        <span className="text-sm text-[#9333EA]">Generate Row</span>
                        <span className="ml-1 rounded bg-white/50 px-1.5 py-0.5 text-xs text-[#9333EA]">
                          gpt-4.1
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p 
                className="mt-4 text-slate-700 cursor-pointer hover:text-slate-900 transition-colors"
                onClick={() => onExpandedChange?.(!isExpanded)}
              >
                {isExpanded ? (
                  "Append the categories to the initial data and return a CSV file with the category appended into the final column. This will create a new column called 'Category' at the end of each row, containing the AI-generated business category based on the vendor name and transaction details. The output will maintain all original columns and data integrity."
                ) : (
                  "Append the categories to the initial data and return a CSV file with the category appended into the final column."
                )}
              </p>

              <div className="mt-4">
                <button className="inline-flex items-center gap-2 rounded-md bg-[#F3E8FF] px-3 py-1.5">
                  <SparkleIcon />
                  <span className="text-sm text-[#9333EA]">Generate Output CSV</span>
                  <span className="ml-1 rounded bg-white/50 px-1.5 py-0.5 text-xs text-[#9333EA]">
                    gpt-4.1
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 