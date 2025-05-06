'use client'

import { Surface } from '@/components/ui/Surface'
import { ArrowRight, Clock, Plus, Search, Star, Zap } from 'lucide-react'
import { DM_Serif_Display } from 'next/font/google'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { TaskCard } from './components/TaskCard'
import { customTasks, sampleAutomations, searchTasks, pageSections, TaskItemType, getFavoriteItems, getAutomationsByCategory, getTaskById } from './data/index'
import { CardDetail } from './components/CardDetail'

// Initialize the DM Serif Display font
const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

// Add a CSS class for emoji silhouettes
const emojiSilhouette = "inline-block mr-4 text-2xl opacity-60 [filter:brightness(0)_contrast(1)_saturate(0)]"

// Add styles for the animated gradient
const gradientStyles = `
  @keyframes gradientAnimation {
    0% {
      background-position: 0% 0%;
      transform: rotate(0deg);
    }
    25% {
      background-position: 100% 0%;
      transform: rotate(1deg);
    }
    50% {
      background-position: 100% 100%;
      transform: rotate(0deg);
    }
    75% {
      background-position: 0% 100%;
      transform: rotate(-1deg);
    }
    100% {
      background-position: 0% 0%;
      transform: rotate(0deg);
    }
  }

  .animated-gradient {
    background: linear-gradient(
      -45deg,
      #1e3a8a,
      #3b82f6,
      #6366f1,
      #7c3aed
    );
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: gradientAnimation 6s ease-in-out infinite;
    display: inline-block;
    padding: 0 0.1em;
    font-weight: inherit;
    transform-origin: center;
  }
`

export default function LibraryViewPage() {
  const searchParams = useSearchParams()
  
  // Map URL params to sidebar items and get selected card
  const getInitialSidebarItem = () => {
    const page = searchParams?.get('page')
    switch (page) {
      case 'your-tasks':
        return 'mytasks'
      case 'automations':
        return 'automations'
      default:
        return 'browse'
    }
  }

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeSidebarItem, setActiveSidebarItem] = useState<'browse' | 'automations' | 'mytasks'>(getInitialSidebarItem())
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true)
  const [runs, setRuns] = useState<any[]>([])

  // Get selected card from URL
  const selectedCardId = searchParams?.get('card')
  const selectedCard = selectedCardId ? getTaskById(selectedCardId) : undefined

  // Handle card selection
  const handleCardClick = (cardId: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('card', cardId)
    window.history.pushState({}, '', url)
    // Force a re-render to show the selected card
    window.dispatchEvent(new Event('popstate'))
  }

  // Handle card detail close
  const handleCardDetailClose = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('card')
    window.history.pushState({}, '', url)
    // Force a re-render to hide the card detail
    window.dispatchEvent(new Event('popstate'))
  }

  // Update URL when sidebar item changes
  useEffect(() => {
    const url = new URL(window.location.href)
    switch (activeSidebarItem) {
      case 'mytasks':
        url.searchParams.set('page', 'your-tasks')
        break
      case 'automations':
        url.searchParams.set('page', 'automations')
        break
      default:
        url.searchParams.delete('page')
    }
    // Preserve card selection when switching views
    const cardId = searchParams?.get('card')
    if (cardId) {
      url.searchParams.set('card', cardId)
    }
    window.history.replaceState({}, '', url)
  }, [activeSidebarItem])

  // Update active sidebar item when URL changes
  useEffect(() => {
    setActiveSidebarItem(getInitialSidebarItem())
  }, [searchParams])

  // Render content based on active sidebar item
  const renderMainContent = () => {
    // If a card is selected, show the detail view
    if (selectedCard) {
      return <CardDetail 
        task={selectedCard} 
        onClose={handleCardDetailClose}
        onCardClick={handleCardClick}
      />;
    }

    // Otherwise show the regular view
    switch (activeSidebarItem) {
      case 'browse':
        return (
          <>
            {/* Wordware Header */}
            <div className="flex justify-between items-center mb-8 px-2 py-3">
              <div className="-ml-2">
                <img 
                  src="https://cdn.prod.website-files.com/66e00503e1e57f5fafdfa7d5/66e005da47c0c33bca665c3a_wordware-logotype.svg" 
                  alt="Wordware" 
                  className="h-5" 
                />
              </div>
              <div className="flex items-center">
                <div className="flex items-center space-x-7 text-sm mr-8">
                  <span className="text-slate-700 hover:text-slate-900 cursor-pointer">Docs</span>
                  <span className="text-slate-700 hover:text-slate-900 cursor-pointer">Pricing</span>
                  <span className="text-slate-700 hover:text-slate-900 cursor-pointer">About us</span>
                </div>
                <div className="flex items-center space-x-6">
                  <span className="text-slate-700 text-sm hover:text-slate-900 cursor-pointer">Sign in</span>
                  <button className="bg-[#0F172A] text-white px-4 py-2 rounded text-sm flex items-center">
                    Sign Up <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* SaaS Splash Section */}
            <div className="text-center mb-6 mt-24">
              <h1 className={`text-7xl ${dmSerifDisplay.className} mb-0`}>
                Make AI <span className="animated-gradient">work</span> for you
              </h1>
            </div>

            {/* Centered Search Bar styled like AI chat input */}
            <div className="max-w-2xl mx-auto mb-32 relative">
              <input
                type="text"
                placeholder="Your AI Task..."
                className="w-full pl-6 pr-14 py-4 border border-slate-300 dark:border-slate-600 rounded-full bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-white dark:text-black" />
              </button>
            </div>

            {/* Content Sections */}
            {pageSections.map(section => (
              <div key={section.id} className="mb-16">
                {/* Section Header */}
                <div className="mb-4 flex justify-between">
                  <h2 className={`text-3xl ${dmSerifDisplay.className} flex items-center`}>
                    <span className={emojiSilhouette}>{section.emoji}</span>
                    {section.title}
                  </h2>
                  <div className="flex items-center">
                    <span 
                      className="text-base text-black text-opacity-70 mt-3"
                    >
                      {section.viewAllLink} →
                    </span>
                  </div>
                </div>
                
                {/* Section Content Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchTasks[section.cardsSource].map((item, index) => (
                    <TaskCard
                      key={`${section.id}-${item.id}-${index}`}
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      date={item.date || ''}
                      starred={item.starred || false}
                      runCount={item.run_count}
                      eval_rating={item.eval_rating}
                      cost={item.cost}
                      onClick={() => handleCardClick(item.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )

      case 'automations':
        // Get automations by category
        const triggerAutomations = getAutomationsByCategory('trigger');
        const scheduledAutomations = getAutomationsByCategory('scheduled');
        
        return (
          <>
            {/* Page Header - Automations */}
            <div className="mb-16 mt-8 flex items-center justify-between">
              <h1 className={`text-5xl ${dmSerifDisplay.className}`}>
                Automations
              </h1>
              <button className="flex items-center bg-[#0F172A] hover:bg-black text-white rounded-md py-2 px-4 mt-2">
                <Plus className="w-4 h-4 mr-2" />
                <span>New Automation</span>
              </button>
            </div>

            {/* Triggers Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-3xl ${dmSerifDisplay.className} flex items-center`}>
                  <span className={emojiSilhouette}>⚡</span>
                  Triggers
                </h2>
              </div>

              {/* Triggers List */}
              <div className="space-y-6">
                {triggerAutomations.map((automation) => {
                  // Get the linked task
                  const linkedTask = getTaskById(automation.taskId);
                  
                  return (
                    <div key={automation.id} className="flex items-center w-full gap-4">
                      {/* Left side with background - includes both icon and title */}
                      <div className="flex-shrink-0 bg-slate-50 dark:bg-slate-800 p-4 rounded-l-lg flex items-center justify-between w-[450px]">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 flex items-center justify-center mr-3">
                            {automation.icon === 'notion' && (
                              <img src="/library/Notion-Logo.png" alt="Notion" className="w-8 h-auto object-contain" />
                            )}
                            {automation.icon === 'gmail' && (
                              <img src="/library/Gmail_icon_(2020).png" alt="Gmail" className="w-7 h-auto object-contain" />
                            )}
                            {automation.icon === 'calendar' && (
                              <Clock className="w-6 h-6 text-black dark:text-white" />
                            )}
                          </div>
                          
                          {/* Trigger Label */}
                          <div>
                            <div className="font-medium text-base">{automation.trigger}</div>
                          </div>
                        </div>
                        
                        {/* Toggle moved to left side */}
                        <div className="flex items-center ml-2">
                          <div className={`text-xs font-medium mr-2 ${automation.isOn ? 'text-purple-600' : 'text-slate-500'}`}>
                            {automation.isOn ? 'ON' : 'OFF'}
                          </div>
                          <div className={`w-10 h-5 rounded-full relative ${automation.isOn ? 'bg-purple-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                            <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-transform ${automation.isOn ? 'right-0.5 transform' : 'left-0.5'}`}></div>
                          </div>
                        </div>
                      </div>

                      {/* Arrow (aligned) */}
                      <div className="text-black dark:text-white flex-shrink-0 text-xl font-bold">→</div>

                      {/* Right side - Task (Square Card) - match height with left box */}
                      <div className="flex-1 h-[64px] flex">
                        <Surface className="p-4 flex items-center w-full">
                          <div className="flex items-center">
                            {linkedTask && (
                              <div>
                                <div className="font-medium">{linkedTask.title}</div>
                                <div className="text-xs text-slate-500 mt-1 max-w-[300px] truncate">
                                  {linkedTask.description}
                                </div>
                              </div>
                            )}
                            {!linkedTask && <span className="font-medium">{automation.action}</span>}
                          </div>
                        </Surface>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scheduled Section */}
            <div>
              <div className="flex items-center justify-between mb-4 pt-6">
                <h2 className={`text-3xl ${dmSerifDisplay.className} flex items-center`}>
                  <span className={emojiSilhouette}>🌴</span>
                  Scheduled
                </h2>
              </div>

              {/* Scheduled List */}
              <div className="space-y-6">
                {scheduledAutomations.map((automation) => {
                  // Get the linked task
                  const linkedTask = getTaskById(automation.taskId);
                  
                  return (
                    <div key={automation.id} className="flex items-center w-full gap-4">
                      {/* Left side with background - includes both icon and title */}
                      <div className="flex-shrink-0 bg-slate-50 dark:bg-slate-800 p-4 rounded-l-lg flex items-center justify-between w-[450px]">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 flex items-center justify-center mr-3">
                            {automation.icon === 'notion' && (
                              <img src="/library/Notion-Logo.png" alt="Notion" className="w-8 h-auto object-contain" />
                            )}
                            {automation.icon === 'gmail' && (
                              <img src="/library/Gmail_icon_(2020).png" alt="Gmail" className="w-7 h-auto object-contain" />
                            )}
                            {automation.icon === 'calendar' && (
                              <Clock className="w-6 h-6 text-black dark:text-white" />
                            )}
                          </div>
                          
                          {/* Trigger Label */}
                          <div>
                            <div className="font-medium text-base">{automation.trigger}</div>
                          </div>
                        </div>
                        
                        {/* Toggle moved to left side */}
                        <div className="flex items-center ml-2">
                          <div className={`text-xs font-medium mr-2 ${automation.isOn ? 'text-purple-600' : 'text-slate-500'}`}>
                            {automation.isOn ? 'ON' : 'OFF'}
                          </div>
                          <div className={`w-10 h-5 rounded-full relative ${automation.isOn ? 'bg-purple-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                            <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-transform ${automation.isOn ? 'right-0.5 transform' : 'left-0.5'}`}></div>
                          </div>
                        </div>
                      </div>

                      {/* Arrow (aligned) */}
                      <div className="text-black dark:text-white flex-shrink-0 text-xl font-bold">→</div>

                      {/* Right side - Task (Square Card) - match height with left box */}
                      <div className="flex-1 h-[64px] flex">
                        <Surface className="p-4 flex items-center w-full">
                          <div className="flex items-center">
                            {linkedTask && (
                              <div>
                                <div className="font-medium">{linkedTask.title}</div>
                                <div className="text-xs text-slate-500 mt-1 max-w-[300px] truncate">
                                  {linkedTask.description}
                                </div>
                              </div>
                            )}
                            {!linkedTask && <span className="font-medium">{automation.action}</span>}
                          </div>
                        </Surface>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )

      case 'mytasks':
        // Sort tasks by last edited, most recent first
        const sortedTasks = [...customTasks].sort((a, b) => {
          // Map relative times to numeric values for sorting
          const getTimeValue = (timeStr: string | undefined): number => {
            if (!timeStr) return 9999;
            if (timeStr.includes('hour')) return 1;
            if (timeStr === 'Yesterday') return 24;
            if (timeStr.includes('day')) {
              const days = parseInt(timeStr.split(' ')[0]);
              return days * 24;
            }
            return 9999; // For older items
          };
          
          return getTimeValue(a.lastEdited) - getTimeValue(b.lastEdited);
        });
        
        // Get favorite library items for the Favorite Tasks section
        const favoriteItems = getFavoriteItems();
        
        return (
          <>
            {/* Page Header - My Tasks */}
            <div className="mb-16 mt-8 flex items-center justify-between">
              <h1 className={`text-5xl ${dmSerifDisplay.className}`}>
                Your Tasks
              </h1>
              <button className="flex items-center bg-[#0F172A] hover:bg-black text-white rounded-md py-2 px-4 mt-2">
                <Plus className="w-4 h-4 mr-2" />
                <span>New Task</span>
              </button>
            </div>
            
            {/* Custom Tasks Section */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-3xl ${dmSerifDisplay.className} flex items-center`}>
                  <span className={emojiSilhouette}>✏️</span>
                  Custom Tasks
                </h2>
                <div className="flex items-center">
                  <span 
                    className="text-base text-black text-opacity-70 mt-3"
                  >
                    View All →
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    lastEdited={task.lastEdited || ''}
                    version={task.version || ''}
                    runCount={task.run_count}
                    eval_rating={task.eval_rating}
                    cost={task.cost}
                    onClick={() => handleCardClick(task.id)}
                  />
                ))}
              </div>
            </div>
            
            {/* Favorite Tasks Section */}
            {favoriteItems.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-3xl ${dmSerifDisplay.className} flex items-center`}>
                    <span className={emojiSilhouette}>⭐</span>
                    Favorite Tasks
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteItems.map((item) => (
                    <TaskCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      date={item.date || ''}
                      starred={true}
                      runCount={item.run_count}
                      eval_rating={item.eval_rating}
                      cost={item.cost}
                      onClick={() => handleCardClick(item.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex">
      <style jsx global>{gradientStyles}</style>
      {/* Narrow Left Sidebar - Icons Only */}
      <div className="w-16 shrink-0 bg-[#121218] fixed left-0 top-0 bottom-0 flex flex-col items-center py-4 z-10">
        {/* Logo */}
        <Link 
          href="/" 
          className="mb-8 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-md hover:shadow-lg transition-shadow"
        >
          W
        </Link>
        
        {/* Navigation Icons */}
        <div className="flex flex-col items-center space-y-6">
          <button 
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
              activeSidebarItem === 'browse' && !selectedCard
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-[#1e1e2e]'
            }`}
            onClick={() => {
              setActiveSidebarItem('browse');
              handleCardDetailClose();
            }}
            title="Browse"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button 
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
              activeSidebarItem === 'mytasks' && !selectedCard
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-[#1e1e2e]'
            }`}
            onClick={() => {
              setActiveSidebarItem('mytasks');
              handleCardDetailClose();
            }}
            title="My Tasks"
          >
            <Star className="w-5 h-5" />
          </button>
          
          <button 
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
              activeSidebarItem === 'automations' && !selectedCard
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-[#1e1e2e]'
            }`}
            onClick={() => {
              setActiveSidebarItem('automations');
              handleCardDetailClose();
            }}
            title="Automations"
          >
            <Zap className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-6 pl-0 overflow-hidden bg-[#F8F5EB] pr-[288px] ml-16">
        <div className="max-w-5xl mx-auto pb-16">
          {renderMainContent()}
        </div>
      </div>

      {/* Right Sidebar for Runs */}
      {isRightSidebarOpen && (
        <div className="w-72 border-l border-slate-700 bg-slate-800 text-slate-200 shrink-0 h-screen fixed right-0 overflow-hidden flex flex-col">
          <div className="p-4 flex-1 overflow-y-auto">
            {runs.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-sm font-medium mb-2 text-slate-200">No completed tasks yet</h3>
                <p className="text-xs text-slate-400">
                  Run a task to see the results here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {runs.map(run => (
                  <div key={run.id} className="p-3 bg-slate-700 rounded-md shadow-sm">
                    {/* Run content would go here */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}