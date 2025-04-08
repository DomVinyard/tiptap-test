import { Icon } from '@/components/ui/Icon'
import React, { useState } from 'react'

const SearchBar = () => (
  <div className="relative mb-8">
    <input
      type="text"
      placeholder="Search blocks..."
      className="w-full px-4 py-2 pl-10 bg-white border rounded-lg border-gray-200"
    />
    <Icon name="Search" className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
    <button className="absolute right-3 top-2.5">
      <Icon name="ArrowUpDown" className="w-4 h-4 text-gray-400" />
    </button>
  </div>
)

interface ItemProps {
  icon: React.ComponentProps<typeof Icon>['name'];
  title: string;
  description: string;
}

const CategoryItem = ({ icon, title, description }: ItemProps) => (
  <button className="flex items-start gap-3 w-full p-4 hover:bg-gray-50 rounded-lg group transition-colors">
    <Icon name={icon} className="w-5 h-5 mt-0.5 text-gray-500" />
    <div className="text-left">
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
    <Icon name="ChevronRight" className="w-4 h-4 ml-auto mt-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
  </button>
)

const PopularItem = ({ icon, title, description }: ItemProps) => (
  <button className="flex items-start gap-3 w-full p-3 hover:bg-gray-50 rounded-lg group transition-colors">
    <Icon name={icon} className="w-5 h-5 mt-0.5 text-gray-500" />
    <div className="text-left">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
    <Icon name="ChevronRight" className="w-4 h-4 ml-auto mt-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
  </button>
)

const InputConfig = ({ label }: { label: string }) => {
  const [isLongText, setIsLongText] = useState(false)
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Input</h2>
        <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1">
          Docs <Icon name="ExternalLink" className="w-3 h-3" />
        </a>
      </div>
      
      <p className="text-gray-500 dark:text-gray-400">Input blocks allow you to collect information from the user.</p>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Label</label>
          <input 
            type="text" 
            value={label}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black"
            readOnly
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea 
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black resize-none"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
            <span className="text-red-500">*</span>
          </div>
          <button className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black text-left flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-emerald-50 dark:bg-emerald-900 flex items-center justify-center">
              <span className="text-xs text-emerald-500 font-medium">abc</span>
            </div>
            <span className="text-gray-900 dark:text-gray-100">Text</span>
            <Icon name="ChevronDown" className="w-4 h-4 ml-auto text-gray-400" />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Long text</span>
          </div>
          <button 
            onClick={() => setIsLongText(!isLongText)}
            className={`w-11 h-6 rounded-full transition-colors ${isLongText ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'} relative`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${isLongText ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>
      
      <div className="pt-4 mt-8 border-t border-gray-200 dark:border-gray-800">
        <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <Icon name="Trash2" className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}

interface RightSidebarProps {
  selectedInput: string | null;
}

export const RightSidebar = ({ selectedInput }: RightSidebarProps) => {
  return (
    <div className="w-[400px] border-l border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
      <div className="w-full h-full p-6 overflow-y-auto scrollbar-hide">
        {selectedInput ? (
          <InputConfig label={selectedInput} />
        ) : (
          <div className="space-y-8">
            <div>
              <SearchBar />
              
              <div className="space-y-2">
                <CategoryItem
                  icon="Terminal"
                  title="Core"
                  description="Run code, send HTTP requests, basic system functionality"
                />
                <CategoryItem
                  icon="Lock"
                  title="Secure action"
                  description="Do something in a secure app or service like Notion, Gmail or Telegram"
                />
                <CategoryItem
                  icon="Database"
                  title="Data tasks"
                  description="Manipulate, filter or convert data. Classification, summation or extraction"
                />
                <CategoryItem
                  icon="GitBranch"
                  title="Flow and routing"
                  description="Branch merge or loop the flow"
                />
                <CategoryItem
                  icon="Monitor"
                  title="Create or generate"
                  description="Generate outputs, this could mean deploying a website or presentation"
                />
              </div>

              <h2 className="mt-8 mb-2 text-sm font-semibold text-gray-500">POPULAR BLOCKS</h2>
              <div className="space-y-1">
                <PopularItem
                  icon="Globe"
                  title="Deploy Webpage"
                  description="Upload a website to a free hosting platform"
                />
                <PopularItem
                  icon="Pen"
                  title="Analyze writing style"
                  description="Capture the style of a piece of writing"
                />
                <PopularItem
                  icon="FileText"
                  title="Generate Powerpoint presentation"
                  description="Turn a description into a .ppx"
                />
                <PopularItem
                  icon="Search"
                  title="Summarize search results"
                  description="Do a web search and summarize the results"
                />
                <PopularItem
                  icon="Database"
                  title="Generate fake data"
                  description="Create mock data for testing"
                />
                <PopularItem
                  icon="Fingerprint"
                  title="Verify is real"
                  description="Check if a person or company exists"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 