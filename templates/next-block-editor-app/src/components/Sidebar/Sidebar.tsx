import { memo } from 'react'
import { Editor } from '@tiptap/react'
import { Icon } from '@/components/ui/Icon'

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
  <button className="flex items-start gap-3 w-full p-3 hover:bg-gray-50 rounded-lg group transition-colors text-left">
    <Icon name={icon} className="w-4 h-4 mt-0.5 text-gray-500" />
    <div>
      <div className="text-sm text-gray-900">{title}</div>
      {description && <div className="text-xs text-gray-500 mt-0.5">{description}</div>}
    </div>
  </button>
)

export const Sidebar = memo(({ editor }: { editor: Editor }) => {
  return (
    <div className="w-80 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
      <div className="w-full h-full p-6 overflow-y-auto scrollbar-hide">
        <div className="space-y-8">
          <div>
            <SectionTitle>Your Flows</SectionTitle>
            <div className="space-y-1">
              <SidebarItem icon="FileText" title="Welcome to Wordware" />
              <SidebarItem icon="FileText" title="My first flow" />
              <SidebarItem icon="FileText" title="Image generation" />
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
            <SectionTitle>START FROM A TEMPLATE</SectionTitle>
            <div className="space-y-2">
              <SidebarItem 
                icon="File" 
                title="Blank Flow"
                description="Start from scratch"
              />
              <SidebarItem 
                icon="FileText" 
                title="Legal document generator"
                description="This WordApp - a Wordware application - generates legal"
              />
              <SidebarItem 
                icon="Bot" 
                title="AuthorGPT"
                description="This WordApp - a Wordware application - can create a whole"
              />
              <SidebarItem 
                icon="PenTool" 
                title="Blog Post Generator"
                description="This WordApp - a Wordware application - creates SEO-"
              />
              <SidebarItem 
                icon="Search" 
                title="Research founders to help VC"
                description="This app helps venture capitalists quickly prepare for their meetings"
              />
              <SidebarItem 
                icon="Image" 
                title="Image analyzing agent"
                description="This WordApp - a Wordware application - gives you insights"
              />
              <SidebarItem 
                icon="FileText" 
                title="Summarization & knowledge"
                description="This app helps you check your knowledge in minutes! This"
              />
              <SidebarItem 
                icon="Bot" 
                title="Basic ReAct agent (v2.1)"
                description="What is an agent? Generally 'agent' is used to refer to any"
              />
              <SidebarItem 
                icon="Flame" 
                title="Gordon Ramsay reviews"
                description="This app rates your plate in the style of Gordon Ramsay"
              />
              <SidebarItem 
                icon="Globe" 
                title="Personal website creator"
                description="This WordApp - a Wordware application - creates a fully"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

Sidebar.displayName = 'Sidebar'
