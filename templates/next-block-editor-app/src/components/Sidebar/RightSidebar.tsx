import { Icon } from '@/components/ui/Icon'
import React from 'react'

const SearchBar = () => (
  <div className="relative mb-8">
    <input
      type="text"
      placeholder="Search nodes..."
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
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <Icon name="ChevronRight" className="w-4 h-4 ml-auto mt-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
  </button>
)

const PopularItem = ({ icon, title, description }: ItemProps) => (
  <button className="flex items-start gap-3 w-full p-3 hover:bg-gray-50 rounded-lg group transition-colors">
    <Icon name={icon} className="w-5 h-5 mt-0.5 text-gray-500" />
    <div className="text-left">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <Icon name="ChevronRight" className="w-4 h-4 ml-auto mt-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
  </button>
)

export const RightSidebar = () => {
  return (
    <div className="w-[400px] border-l border-neutral-200 bg-white p-6 overflow-y-auto">
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

      <h2 className="mt-8 mb-2 text-sm font-semibold text-gray-500">POPULAR</h2>
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
  )
} 