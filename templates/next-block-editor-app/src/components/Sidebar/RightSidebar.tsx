import { Icon } from '@/components/ui/Icon'
import React, { useState } from 'react'

const SearchBar = () => (
  <div className="relative mb-4">
    <input
      type="text"
      placeholder="Search blocks..."
      className="w-full px-3 py-1 pl-8 bg-white border rounded-lg border-gray-200 text-sm"
    />
    <Icon name="Search" className="absolute left-2.5 top-1.5 w-4 h-4 text-gray-400" />
    <Icon name="ArrowUpDown" className="absolute right-2.5 top-1.5 w-3.5 h-3.5 text-gray-400" />
  </div>
)

interface ItemProps {
  icon: React.ComponentProps<typeof Icon>['name'];
  title: string;
  description: string;
}

const CategoryItem = ({ icon, title, description }: ItemProps) => (
  <button className="flex items-start gap-3 w-full py-3 hover:bg-gray-50 rounded-lg group transition-colors">
    <div className="flex-none w-5 h-5 mt-0.5">
      <Icon name={icon} className="w-5 h-5 text-gray-500" />
    </div>
    <div className="text-left">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
    </div>
    <Icon name="ChevronRight" className="w-4 h-4 ml-auto mt-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
  </button>
)

const InputConfig = ({ label }: { label: string }) => {
  const [isLongText, setIsLongText] = useState(false)
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Input</h2>
        <a href="#" className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1">
          Docs <Icon name="ExternalLink" className="w-3 h-3" />
        </a>
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400">Input blocks allow you to collect information from the user.</p>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Label</label>
          <input 
            type="text" 
            value={label}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black"
            readOnly
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea 
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black resize-none"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Type</label>
            <span className="text-red-500">*</span>
          </div>
          <button className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black text-left flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-emerald-50 dark:bg-emerald-900 flex items-center justify-center">
              <span className="text-xs text-emerald-500 font-medium">abc</span>
            </div>
            <span className="text-gray-900 dark:text-gray-100">Text</span>
            <Icon name="ChevronDown" className="w-4 h-4 ml-auto text-gray-400" />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Long text</span>
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
        <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <Icon name="Trash2" className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}

const ModelConfig = () => {
  const [creativity, setCreativity] = useState(0.5)
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Generation</h2>
        <a href="#" className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1">
          Docs <Icon name="ExternalLink" className="w-3 h-3" />
        </a>
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400">
        The language model generates content here during execution, based on the settings below. The model uses all preceding text (with variables replaced) as context to generate the output. The pulsing <span className="text-pink-500">pink</span> text and nodes indicate what's included in the prompt.
      </p>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input 
            type="text" 
            value="new_generation"
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black"
            readOnly
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">AI Model</label>
          <button className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black text-left flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              <Icon name="Sparkles" className="w-3.5 h-3.5 text-neutral-500" />
            </div>
            <span className="text-gray-900 dark:text-gray-100">GPT-4o</span>
            <Icon name="ChevronDown" className="w-4 h-4 ml-auto text-gray-400" />
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Model Creativity</label>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={creativity}
              onChange={(e) => setCreativity(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>consistent</span>
              <span>{creativity}</span>
              <span>creative</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 mt-8 border-t border-gray-200 dark:border-gray-800">
        <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <Icon name="Trash2" className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}

interface RightSidebarProps {
  selectedInput: string | null;
  selectedModel?: boolean;
}

export const RightSidebar = ({ selectedInput, selectedModel }: RightSidebarProps) => {
  return (
    <div className="w-[320px] border-l border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black flex flex-col overflow-hidden">
      <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
        {selectedInput ? (
          <InputConfig label={selectedInput} />
        ) : selectedModel ? (
          <ModelConfig />
        ) : (
          <div className="space-y-8">
            <div>
              <h2 className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">App settings</h2>
              <div className="mb-8 p-4 bg-gradient-to-br from-white via-gray-50/50 to-gray-100/50 dark:from-black dark:via-gray-900 dark:to-gray-800/50 rounded-lg border border-gray-200/60 dark:border-gray-800/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Visibility</h3>
                    <button className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100">
                      <div className="flex items-center gap-2">
                        <Icon name="Globe" className="w-4 h-4 text-gray-500" />
                        <span>Private</span>
                      </div>
                      <Icon name="ChevronDown" className="w-4 h-4 text-gray-400" />
                    </button>
                    <p className="mt-2 text-xs text-gray-400">Only accessible by you.</p>
                  </div>
                  <hr className="border-gray-200 dark:border-gray-800" />
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Deployment</h3>
                    <button className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100">
                      <div className="flex items-center gap-2">
                        <Icon name="Server" className="w-4 h-4 text-gray-500" />
                        <span>Not Live</span>
                      </div>
                      <Icon name="ChevronDown" className="w-4 h-4 text-gray-400" />
                    </button>
                    <p className="mt-2 text-xs text-gray-400">This will not run except for testing.</p>
                  </div>
                </div>
              </div>
              
              <h2 className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Add new block</h2>
              <SearchBar />
              <div className="space-y-1">
                <CategoryItem
                  icon="Variable"
                  title="Inputs and variables"
                  description="Access and manage variables that can be used across your flow"
                />
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
                  icon="GitBranch"
                  title="Flow and routing"
                  description="Branch merge or loop the flow"
                />
                <CategoryItem
                  icon="Monitor"
                  title="Create or generate"
                  description="Generate outputs, this could mean deploying a website or presentation"
                />
                <CategoryItem
                  icon="Briefcase"
                  title="Business & Productivity"
                  description="Tools and actions for business processes and productivity workflows"
                />
                <CategoryItem
                  icon="Palette"
                  title="Creativity & Design"
                  description="Creative tools and design-related functionality"
                />
                <CategoryItem
                  icon="Database"
                  title="Data"
                  description="Data processing, analysis, and transformation tools"
                />
                <CategoryItem
                  icon="GitBranch"
                  title="Logic"
                  description="Control flow, conditions, and logical operations"
                />
                <CategoryItem
                  icon="Code"
                  title="Programming"
                  description="Code generation, analysis, and development tools"
                />
                <CategoryItem
                  icon="Search"
                  title="Research"
                  description="Research, analysis, and information gathering tools"
                />
                <CategoryItem
                  icon="Type"
                  title="Text"
                  description="Text processing, formatting, and manipulation"
                />
                <CategoryItem
                  icon="Globe"
                  title="Web"
                  description="Web-related tools and functionality"
                />
                <CategoryItem
                  icon="Settings"
                  title="Workflow & Meta"
                  description="Workflow automation and meta-programming tools"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 