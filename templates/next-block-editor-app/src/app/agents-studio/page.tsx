'use client'

import { Surface } from '@/components/ui/Surface'
import { FileUpload } from './components/FileUpload'
import { Sidebar } from './components/Sidebar'

export default function AgentsStudioPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-black text-white px-4 py-2 flex items-center justify-center cursor-pointer">
          <div className="text-sm">
            <span className="font-bold">Wordware Studio. </span>Remix this agent or create your own →
          </div>
        </div>

        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#E5F1FA] to-[#F2F7FA] px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Categorize invoices by vendor</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-medium">24k</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" fill="currentColor"/>
                  </svg>
                  <span className="font-medium">4.9</span>
                </div>
              </div>
            </div>
            <div className="text-sm font-medium mt-1">by Wordware</div>
            <p className="mt-8 text-slate-500">
              Automatically categorizes invoices from a CSV file using AI. For each invoice row, it analyzes the 
              vendor name, description, and total amount to assign a business-relevant category (e.g. "SaaS", 
              "Travel", "Marketing")
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 bg-white dark:bg-slate-800 px-4 pt-12 pb-8 shadow-sm">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* CSV Upload */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center">
                  <label className="text-sm font-medium">
                    CSV File <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <div className="text-xs text-slate-500">The raw invoice CSV</div>
                </div>
              </div>
              <FileUpload />
            </div>

            {/* Category Style */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center">
                  <label className="text-sm font-medium">Category Style</label>
                </div>
                <div className="flex items-center">
                  <div className="text-xs text-slate-500">
                    E.g. "business function", "accounting GL class", "plain-English purpose"
                  </div>
                </div>
              </div>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 
                          bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Business function"
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>1</span>
              </div>
              <button className="px-6 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 
                              rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                Run Agent
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