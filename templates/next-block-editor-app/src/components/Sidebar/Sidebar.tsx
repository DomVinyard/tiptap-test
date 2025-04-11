import { memo } from 'react'
import { Editor } from '@tiptap/react'
import { Icon } from '@/components/ui/Icon'
import React from 'react'
import type { ComponentProps } from 'react'

const SectionTitle = ({ children }: { children: string }) => (
  <h2 className="mb-2 text-xs font-semibold uppercase text-gray-500">{children}</h2>
)

const SidebarItem = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ComponentProps<typeof Icon>['name']; 
  title: string;
  description?: string;
}) => (
  <button className="flex items-start gap-3 w-full py-3 pr-3 hover:bg-gray-50 rounded-lg group transition-colors text-left">
    <Icon name={icon} className="w-4 h-4 mt-0.5 text-gray-500" />
    <div>
      <div className="text-sm text-gray-900">{title}</div>
      {description && <div className="text-xs text-gray-500 mt-0.5">{description}</div>}
    </div>
  </button>
)

type IconProps = ComponentProps<typeof Icon>

const getIconStyle = (icon: IconProps['name']): { bg: string; gradient: string } => {
  const styles: Record<string, { bg: string; gradient: string }> = {
    'Scale': {
      bg: 'bg-blue-500',
      gradient: 'bg-gradient-to-br from-blue-400 to-blue-600'
    },
    'Bot': {
      bg: 'bg-purple-500',
      gradient: 'bg-gradient-to-br from-purple-400 to-purple-600'
    },
    'PenTool': {
      bg: 'bg-pink-500',
      gradient: 'bg-gradient-to-br from-pink-400 to-pink-600'
    },
    'Users': {
      bg: 'bg-green-500',
      gradient: 'bg-gradient-to-br from-green-400 to-green-600'
    },
    'FileSearch': {
      bg: 'bg-orange-500',
      gradient: 'bg-gradient-to-br from-orange-400 to-orange-600'
    }
  }
  return styles[icon] || { bg: 'bg-gray-500', gradient: 'bg-gradient-to-br from-gray-400 to-gray-600' }
}

const PopularItem = ({ title, description, icon }: { title: string; description: string; icon: IconProps['name'] }) => {
  const style = getIconStyle(icon)
  return (
    <button className="w-full py-3 pr-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 text-left transition-colors">
      <div className="flex gap-2">
        <div className="flex-none mt-0.5">
          <div className={`w-6 h-6 rounded-lg ${style.gradient} shadow-sm flex items-center justify-center`}>
            <Icon name={icon} className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-900 dark:text-gray-100">{title}</div>
          <div className="text-xs text-gray-500 line-clamp-2">{description}</div>
        </div>
      </div>
    </button>
  )
}

interface SidebarProps {
  editor: Editor
}

export const Sidebar = memo(({ editor }: SidebarProps) => {
  return (
    <div className="w-[320px] border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black flex flex-col overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between">
        <img 
          src="https://cdn.prod.website-files.com/66e00503e1e57f5fafdfa7d5/66e005da47c0c33bca665c3a_wordware-logotype.svg" 
          alt="Wordware"
          className="h-5 opacity-70 hover:opacity-100 transition-opacity"
        />
        <div className="flex gap-1 items-center">
          <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
            <Icon name="FilePlus" className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
            <Icon name="FolderPlus" className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
        <div className="space-y-8">
          <div>
            <SectionTitle>Recent Apps</SectionTitle>
            <div className="space-y-1">
              <SidebarItem icon="FileText" title="My App" />
              <SidebarItem icon="FileText" title="Another App" />
            </div>
          </div>

          <div>
            <SectionTitle>Favorites</SectionTitle>
            <div className="space-y-1">
              <SidebarItem icon="Star" title="Daily summary" />
              <SidebarItem icon="Star" title="Code review" />
              <SidebarItem icon="Star" title="Meeting notes" />
            </div>
          </div>

          <div>
            <SectionTitle>SUGGESTED APPS</SectionTitle>
            <div className="space-y-2">
              <PopularItem
                icon="Scale"
                title="Legal document generator"
                description="Generate professional legal documents with proper formatting and standard clauses based on specific requirements."
              />
              <PopularItem
                icon="Bot"
                title="AuthorGPT"
                description="Create complete books with AI assistance, maintaining consistent plot lines and character development throughout chapters."
              />
              <PopularItem
                icon="PenTool"
                title="Blog Post Generator"
                description="Create SEO-optimized blog posts with structured content and engaging headlines to maximize reader engagement."
              />
              <PopularItem
                icon="Users"
                title="Research founders to help VC"
                description="Get comprehensive insights about startup founders including their background, experience, and market presence."
              />
              <PopularItem
                icon="FileSearch"
                title="Content Summarizer"
                description="Extract key points and main ideas from long documents while preserving essential context and meaning."
              />
              <div className="pt-2">
                <hr className="border-neutral-200 dark:border-neutral-800 mb-8" />
                <a 
                  href="/explore" 
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <Icon name="LayoutGrid" className="w-4 h-4" />
                  Explore all apps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

Sidebar.displayName = 'Sidebar'
