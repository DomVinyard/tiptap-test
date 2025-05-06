'use client'

import { Surface } from '@/components/ui/Surface'
import { ArrowRight, Clock, Heart, Plus, Search, Zap, FileText, Settings, Trash2, ChevronLeft, ChevronRight, Repeat, Star, CircleDollarSign, X } from 'lucide-react'
import { DM_Serif_Display } from 'next/font/google'
import Link from 'next/link'
import { useState, useEffect, Suspense, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { TaskCard } from './components/TaskCard'
import { customTasks, sampleAutomations, searchTasks, pageSections, TaskItemType, getFavoriteItems, getAutomationsByCategory, getTaskById } from './data/index'
import { CardDetail } from './components/CardDetail'
import { AddAutomationModal } from './components/AddAutomationModal'
import { RunArtifactSidebar } from './components/RunArtifactSidebar'
import Image from 'next/image'

// Vintage color palette - matching TaskCard.tsx
const COLORS = {
  terracotta: '#FAAE88',
  lightGreen: '#E1EBC9',
  lightYellow: '#FFF0C4',
  cream: '#EEDECA',
  lightGrey: '#FFFFFF',
} as const;

type ColorKey = keyof typeof COLORS;

// Helper to get deterministic values from a string - matching TaskCard.tsx
const getHashValue = (str: string, modulus: number): number => {
  if (str.startsWith('template-') && str.includes('-color-')) {
    const parts = str.split('-');
    if (parts.length >= 4) {
      const templateIndex = parseInt(parts[1], 10);
      const colorIndex = parseInt(parts[3], 10);
      return modulus === 4 ? templateIndex : colorIndex;
    }
  }
  
  if (!str) return 0;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % modulus);
};

// Helper to format numbers consistently
const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return `${(num/1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return num.toString();
};

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

interface RunArtifact {
  id: string;
  taskId: string;
  taskTitle: string;
  timestamp: number;
  output: string;
  type: 'file' | 'website' | 'integration' | 'input' | 'code' | 'message' | 'media';
  metadata?: {
    fileType?: string;
    thumbnail?: string;
    url?: string;
    platform?: string;
    summary?: string;
  };
  isNew?: boolean;
}

// Add this after the color palette definitions
const InfoPanel = ({ 
  title, 
  description, 
  icon: Icon, 
  id,
  onHide 
}: { 
  title: string; 
  description: string; 
  icon: any;
  id: string;
  onHide: () => void;
}) => (
  <div className="mb-20 bg-gradient-to-br from-[#1E293B] to-[#2D3B4F] rounded-2xl p-10 text-white flex items-start gap-8 shadow-lg border border-white/5 relative group">
    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400/10 to-purple-400/10 flex items-center justify-center backdrop-blur-sm">
      <Icon className="w-8 h-8 text-indigo-200" />
    </div>
    <div className="py-1">
      <h3 className="text-xl font-medium mb-3 text-blue-50">{title}</h3>
      <p className="text-blue-100/80 leading-relaxed text-[15px]">{description}</p>
    </div>
    <button 
      onClick={onHide}
      className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      title="Hide this panel"
    >
      <X className="w-4 h-4 text-white/70" />
    </button>
  </div>
)

export default function LibraryView() {
  const [activeSidebarItem, setActiveSidebarItem] = useState<'browse' | 'mytasks' | 'automations'>('browse');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex">
      <style jsx global>{gradientStyles}</style>
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      }>
        <LibraryViewContent />
      </Suspense>
    </div>
  )
}

function LibraryViewContent() {
  const router = useRouter()
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

  // Initialize state with default values to prevent hydration mismatch
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeSidebarItem, setActiveSidebarItem] = useState<'browse' | 'automations' | 'mytasks'>(getInitialSidebarItem())
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)
  const [runs, setRuns] = useState<{ [type: string]: RunArtifact[] }>({})
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Simplified state for panel visibility - no localStorage
  const [hiddenPanels, setHiddenPanels] = useState<{[key: string]: boolean}>({})

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleHidePanel = (panelId: string) => {
    setHiddenPanels(prev => ({
      ...prev,
      [panelId]: true
    }))
  }

  // Use useEffect to handle client-side initialization
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load run artifacts from localStorage only on client side
  useEffect(() => {
    if (!isClient) return;
    
    const artifactsStr = localStorage.getItem('runArtifacts');
    if (artifactsStr) {
      const loadedRuns = JSON.parse(artifactsStr);
      const groupedRuns = loadedRuns.reduce((acc: { [type: string]: RunArtifact[] }, run: RunArtifact) => {
        const { isNew, ...runWithoutNew } = run;
        if (!acc[run.type]) {
          acc[run.type] = [];
        }
        acc[run.type].unshift(runWithoutNew);
        return acc;
      }, {});
      setRuns(groupedRuns);
    }
  }, [isClient]);

  // Listen for new run artifacts
  useEffect(() => {
    const handleNewArtifact = (event: CustomEvent<RunArtifact>) => {
      const newArtifact = event.detail;
      setRuns(prevRuns => {
        const newRuns = { ...prevRuns };
        if (!newRuns[newArtifact.type]) {
          newRuns[newArtifact.type] = [];
        }
        
        // Always add the new run at the beginning, regardless of taskId
        newRuns[newArtifact.type].unshift(newArtifact);
        
        // Store updated runs in localStorage
        const allRuns = Object.values(newRuns).flat();
        localStorage.setItem('runArtifacts', JSON.stringify(allRuns));
        return newRuns;
      });
      // Keep this - open sidebar when new artifact is added
      setIsRightSidebarOpen(true);
    };

    window.addEventListener('runArtifactAdded', handleNewArtifact as EventListener);
    return () => {
      window.removeEventListener('runArtifactAdded', handleNewArtifact as EventListener);
    };
  }, []);

  // Format timestamp
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Handle navigation with debounce
  const handleNavigation = useCallback((path: string, newSidebarItem: 'browse' | 'automations' | 'mytasks') => {
    if (isNavigating) return;
    setIsNavigating(true);
    
    setActiveSidebarItem(newSidebarItem);
    
    // Create URL object to handle query params
    const url = new URL(window.location.href);
    // Remove the 'card' parameter
    url.searchParams.delete('card');
    
    // Update the URL based on the new sidebar item
    switch (newSidebarItem) {
      case 'mytasks':
        url.searchParams.set('page', 'your-tasks');
        break;
      case 'automations':
        url.searchParams.set('page', 'automations');
        break;
      default:
        url.searchParams.delete('page');
    }
    
    router.replace(path + url.search);
    // Reset navigation state after a short delay
    setTimeout(() => setIsNavigating(false), 100);
  }, [router, isNavigating]);

  // Get selected card from URL
  const selectedCardId = searchParams?.get('card')
  const selectedCard = selectedCardId ? getTaskById(selectedCardId) : undefined

  // Get automation modal state from URL
  const automationParam = searchParams?.get('automation')
  const isAddingAutomation = automationParam === 'new' || automationParam?.startsWith('task-')
  
  // Extract task ID from the automation parameter
  const taskId = automationParam?.startsWith('task-') ? automationParam.replace('task-', '') : undefined

  // Handle closing the modal
  const handleCloseAutomationModal = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('automation')
    router.push(url.search)
  }

  // Handle opening the new automation modal
  const handleNewAutomation = () => {
    const url = new URL(window.location.href)
    url.searchParams.set('automation', 'new')
    router.push(url.search)
  }

  // Handle card selection
  const handleCardClick = (cardId: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('card', cardId)
    router.push(url.search)
  }

  // Handle card detail close
  const handleCardDetailClose = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('card')
    router.push(url.search)
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

  // Handle clearing run artifacts
  const handleClearRuns = () => {
    setRuns({});
    localStorage.removeItem('runArtifacts');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
  };

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
            <div className="flex justify-between items-center mb-8 px-1 pt-0 pb-2 pr-0">
              <div className="-ml-2 flex items-center gap-1">
                <div className="flex items-center gap-1">
                  <span className={`${dmSerifDisplay.className} text-4xl`}>Tasks</span>
                  <span className="text-sm text-slate-600 mt-[11px] ml-[3px]">by</span>
                </div>
                <img 
                  src="https://cdn.prod.website-files.com/66e00503e1e57f5fafdfa7d5/66e005da47c0c33bca665c3a_wordware-logotype.svg" 
                  alt="Wordware" 
                  className="h-3 mt-[11px]" 
                />
              </div>
              <div className="flex items-center mt-[12px]">
                <div className="flex items-center space-x-7 text-sm mr-8">
                  <span className="text-slate-700 hover:text-slate-900 cursor-pointer">Pricing</span>
                  <span 
                    className="text-slate-700 hover:text-slate-900 cursor-pointer"
                    onClick={() => {
                      window.location.href = '/library-view/company';
                    }}
                  >Company & News</span>
                </div>
                <div className="flex items-center space-x-6">
                  <span className="text-slate-700 text-sm hover:text-slate-900 cursor-pointer">Sign in</span>
                  <button className="bg-[#0F172A] text-white px-4 py-2 rounded text-sm flex items-center">
                    Build Your Own <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* SaaS Splash Section */}
            <div className="text-center mb-8 mt-28">
              <h1 className={`text-6xl ${dmSerifDisplay.className} mb-0`}>
                Make AI <span className="animated-gradient">work</span> for you
              </h1>
            </div>

            {/* Centered Search Bar styled like AI chat input */}
            <div className="max-w-2xl mx-auto relative">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Describe an AI Task..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-6 pr-14 py-4 border border-slate-300 dark:border-slate-600 rounded-full bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
                <button 
                  type={isFormSubmitted ? "button" : "submit"}
                  onClick={() => {
                    if (isFormSubmitted) {
                      window.location.reload();
                    }
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center"
                >
                  {isFormSubmitted ? (
                    <X className="w-5 h-5 text-white dark:text-black" />
                  ) : (
                    <ArrowRight className="w-5 h-5 text-white dark:text-black" />
                  )}
                </button>
              </form>
            </div>

            {isFormSubmitted && (
              <>
                <div className="text-center mt-12 mb-12">
                  <p className="text-xl text-slate-600 mb-2">We don't have that task yet, but it's a great idea!</p>
                </div>
                <div className="grid grid-cols-2 gap-8 max-w-[800px] mx-auto mb-32">
                  {/* Build it for me CTA */}
                  <div className="bg-transparent rounded-2xl p-8 text-center border border-black min-w-[300px]">
                    <div className="w-24 h-24 mx-auto mb-6 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image 
                          src="/library/robot_3.svg" 
                          alt="Build it for me" 
                          width={80} 
                          height={80}
                          className="opacity-90" 
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">Build it for me</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">Let us handle everything</p>
                    <button className="w-full border-2 border-slate-300 text-slate-600 px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors text-lg font-medium">
                      From $99
                    </button>
                  </div>

                  {/* Build it myself CTA */}
                  <div className="bg-transparent rounded-2xl p-8 text-center border border-black min-w-[300px]">
                    <div className="w-24 h-24 mx-auto mb-6 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image 
                          src="/library/robot_4.svg" 
                          alt="Build it myself" 
                          width={80} 
                          height={80}
                          className="opacity-90" 
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">Build it myself</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">No code required</p>
                    <button className="w-full bg-slate-900 text-white px-8 py-4 rounded-xl hover:bg-slate-800 transition-colors text-lg font-medium">
                      Free
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Only show tasks section if form is not submitted */}
            {!isFormSubmitted && (
              <div className="mt-24">
                {/* Content Sections */}
                {pageSections.map(section => (
                  <div key={section.id} className="mb-16">
                    {/* Section Header */}
                    <div className="mb-3 flex justify-between">
                      <h2 className={`text-2xl ${dmSerifDisplay.className} flex items-center`}>
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
              </div>
            )}
          </>
        )

      case 'automations':
        // Get automations by category
        const triggerAutomations = getAutomationsByCategory('trigger');
        const scheduledAutomations = getAutomationsByCategory('scheduled');
        
        return (
          <>
            {/* Page Header - Automations */}
            <div className="mb-16 mt-1 flex items-center justify-between">
              <h1 className={`text-4xl ${dmSerifDisplay.className}`}>
                Automations
              </h1>
              <button 
                onClick={handleNewAutomation}
                className="flex items-center bg-[#0F172A] hover:bg-black text-white rounded-md py-2 px-4 mt-2 text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span>New Automation</span>
              </button>
            </div>

            {/* Only show panel if not hidden */}
            {!hiddenPanels['automations-info'] && (
              <div className="mb-20 bg-gradient-to-br from-[#1E293B] to-[#2D3B4F] rounded-2xl p-10 text-white flex items-start gap-8 shadow-lg border border-white/5 relative group">
                <div className="w-[120px] h-[100px] flex-shrink-0 flex items-center justify-center">
                  <Image 
                    src="/library/robot_2.svg" 
                    alt="Sleepy Robot" 
                    width={120} 
                    height={100} 
                    className="text-indigo-200"
                    priority
                  />
                </div>
                <div className="py-1 flex-1">
                  <h3 className="text-xl font-medium mb-3 text-blue-50">Work While You Rest</h3>
                  <p className="text-blue-100/80 leading-relaxed text-[15px]">
                    Set up your tasks once, and let them work their magic automatically. Whether you're focused on other projects or taking a well-deserved break, your automated tasks will keep things moving smoothly.
                  </p>
                </div>
                {isClient && (
                  <button 
                    onClick={() => handleHidePanel('automations-info')}
                    className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Hide this panel"
                  >
                    <X className="w-4 h-4 text-white/70" />
                  </button>
                )}
              </div>
            )}

            {/* Triggers Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-3">
                <h2 className={`text-2xl ${dmSerifDisplay.className} flex items-center`}>
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
                      <div className="flex-1 bg-slate-50 dark:bg-slate-800 h-[64px] p-4 rounded-[3px] flex items-center justify-between">
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
                        {linkedTask ? (
                          <div 
                            className="w-full rounded-[3px] flex items-center px-4 cursor-pointer hover:opacity-90 transition-opacity"
                            style={{ 
                              backgroundColor: (() => {
                                const colorIndex = getHashValue(linkedTask.id.split('').reverse().join(''), 4);
                                const colorKeys: ColorKey[] = ['terracotta', 'lightGreen', 'lightYellow', 'cream', 'lightGrey'];
                                return COLORS[colorKeys[colorIndex] as ColorKey];
                              })()
                            }}
                            onClick={() => handleCardClick(linkedTask.id)}
                          >
                            <div className="w-full">
                              <div className="font-medium text-black">{linkedTask.title}</div>
                              <div className="flex items-center gap-3 text-xs text-black/70 mt-1">
                                {linkedTask.run_count && (
                                  <div className="flex items-center gap-1">
                                    <Repeat className="w-3.5 h-3.5" />
                                    <span>{formatNumber(linkedTask.run_count)}</span>
                                  </div>
                                )}
                                {linkedTask.eval_rating && (
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3.5 h-3.5" />
                                    <span>{linkedTask.eval_rating.toFixed(1)}</span>
                                  </div>
                                )}
                                {linkedTask.cost && (
                                  <div className="flex items-center gap-1">
                                    <CircleDollarSign className="w-3.5 h-3.5" strokeWidth={1.5} />
                                    <span>{linkedTask.cost}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-[3px] flex items-center px-4">
                            <span className="font-medium">{automation.action}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scheduled Section */}
            <div>
              <div className="flex items-center justify-between mb-3 pt-6">
                <h2 className={`text-2xl ${dmSerifDisplay.className} flex items-center`}>
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
                      <div className="flex-1 bg-slate-50 dark:bg-slate-800 h-[64px] p-4 rounded-[3px] flex items-center justify-between">
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
                        {linkedTask ? (
                          <div 
                            className="w-full rounded-[3px] flex items-center px-4 cursor-pointer hover:opacity-90 transition-opacity"
                            style={{ 
                              backgroundColor: (() => {
                                const colorIndex = getHashValue(linkedTask.id.split('').reverse().join(''), 4);
                                const colorKeys: ColorKey[] = ['terracotta', 'lightGreen', 'lightYellow', 'cream', 'lightGrey'];
                                return COLORS[colorKeys[colorIndex] as ColorKey];
                              })()
                            }}
                            onClick={() => handleCardClick(linkedTask.id)}
                          >
                            <div className="w-full">
                              <div className="font-medium text-black">{linkedTask.title}</div>
                              <div className="flex items-center gap-3 text-xs text-black/70 mt-1">
                                {linkedTask.run_count && (
                                  <div className="flex items-center gap-1">
                                    <Repeat className="w-3.5 h-3.5" />
                                    <span>{formatNumber(linkedTask.run_count)}</span>
                                  </div>
                                )}
                                {linkedTask.eval_rating && (
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3.5 h-3.5" />
                                    <span>{linkedTask.eval_rating.toFixed(1)}</span>
                                  </div>
                                )}
                                {linkedTask.cost && (
                                  <div className="flex items-center gap-1">
                                    <CircleDollarSign className="w-3.5 h-3.5" strokeWidth={1.5} />
                                    <span>{linkedTask.cost}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-[3px] flex items-center px-4">
                            <span className="font-medium">{automation.action}</span>
                          </div>
                        )}
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
            <div className="mb-16 mt-1 flex items-center justify-between">
              <h1 className={`text-4xl ${dmSerifDisplay.className}`}>
                Your Tasks
              </h1>
              <button onClick={() => {
                alert('Open in Studio')
              }} className="flex items-center bg-[#0F172A] hover:bg-black text-white rounded-md py-2 px-4 mt-2 text-sm">
                <Plus className="w-4 h-4 mr-2" />
                <span>New Task</span>
              </button>
            </div>

            {/* Only show panel if not hidden */}
            {!hiddenPanels['tasks-info'] && (
              <div className="mb-20 bg-gradient-to-br from-[#1E293B] to-[#2D3B4F] rounded-2xl p-10 text-white flex items-start gap-8 shadow-lg border border-white/5 relative group">
                <div className="w-[90px] h-[90px] flex-shrink-0 flex items-center justify-center">
                  <Image 
                    src="/library/robot_1.svg" 
                    alt="Robot" 
                    width={90} 
                    height={90} 
                    className="text-indigo-200"
                    priority
                  />
                </div>
                <div className="py-1 flex-1">
                  <h3 className="text-xl font-medium mb-3 text-blue-50">Your Personal AI Library</h3>
                  <p className="text-blue-100/80 leading-relaxed text-[15px]">
                    Create and customize tasks that perfectly match your needs. From simple automations to complex workflows, your personal collection keeps everything organized and ready to use.
                  </p>
                </div>
                {isClient && (
                  <button 
                    onClick={() => handleHidePanel('tasks-info')}
                    className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Hide this panel"
                  >
                    <X className="w-4 h-4 text-white/70" />
                  </button>
                )}
              </div>
            )}

            {/* Custom Tasks Section */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-3">
                <h2 className={`text-2xl ${dmSerifDisplay.className} flex items-center`}>
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
                <div className="flex items-center justify-between mb-3">
                  <h2 className={`text-2xl ${dmSerifDisplay.className} flex items-center`}>
                    <span className={emojiSilhouette}>❤️</span>
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
    <>
      {/* Narrow Left Sidebar - Icons Only */}
      <div className="w-16 shrink-0 bg-[#121218] fixed left-0 top-0 bottom-0 flex flex-col items-center py-4 z-10">
        {/* Navigation Icons */}
        <div className="flex flex-col items-center space-y-6">
          <button 
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
              activeSidebarItem === 'browse' && !selectedCard
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-[#1e1e2e]'
            }`}
            onClick={() => handleNavigation('/library-view', 'browse')}
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
            onClick={() => handleNavigation('/library-view', 'mytasks')}
            title="My Tasks"
          >
            <Heart className="w-5 h-5" />
          </button>
          
          <button 
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
              activeSidebarItem === 'automations' && !selectedCard
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-[#1e1e2e]'
            }`}
            onClick={() => handleNavigation('/library-view', 'automations')}
            title="Automations"
          >
            <Zap className="w-5 h-5" />
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Bottom Icons */}
        <div className="flex flex-col items-center space-y-4 py-4">
          <button 
            className="w-10 h-10 rounded-md flex items-center justify-center transition-colors text-gray-400 hover:text-white hover:bg-[#1e1e2e]"
            onClick={() => handleNavigation('/library-view/company', 'browse')}
            title="News & Company"
          >
            <FileText className="w-5 h-5" />
          </button>
          
          <button 
            className="w-10 h-10 rounded-md flex items-center justify-center transition-colors text-gray-400 hover:text-white hover:bg-[#1e1e2e]"
            onClick={() => {
              router.push('/');
            }}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 pt-6 pl-0 overflow-hidden bg-[#F8F5EB] ml-16 transition-all duration-300 ${isRightSidebarOpen ? 'pr-[384px]' : 'pr-[40px]'}`}>
        <div className="max-w-5xl mx-auto pb-16">
          {renderMainContent()}
        </div>
      </div>

      {/* Right Sidebar Toggle Button */}
      <button 
        onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
        className={`fixed z-20 top-6 transition-all duration-300 ${
          isRightSidebarOpen 
            ? 'right-[388px] -mr-3' 
            : 'right-[12px] -mr-3'
        }`}
      >
        <div className="w-6 h-12 bg-slate-800 rounded-l-full flex items-center justify-center text-slate-300 hover:text-white transition-colors">
          {isRightSidebarOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </div>
      </button>

      {/* Right Sidebar for Runs */}
      <RunArtifactSidebar
        isOpen={isRightSidebarOpen}
        runs={runs}
        onClearRuns={handleClearRuns}
      />

      {/* Add Automation Modal */}
      {isAddingAutomation && (
        <AddAutomationModal
          taskId={taskId}
          onClose={handleCloseAutomationModal}
        />
      )}
    </>
  )
}