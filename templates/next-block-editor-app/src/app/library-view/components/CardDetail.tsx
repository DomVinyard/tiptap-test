'use client'

import React, { useState, useEffect } from 'react';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import { DM_Mono } from 'next/font/google';
import { Star, Repeat, Play, Zap, Heart, ZoomIn, CircleDollarSign, FileText, Info } from 'lucide-react';
import { X as XIcon } from 'lucide-react';
import { TaskItemType } from '../data/index';
import { TaskCard } from './TaskCard';
import { searchTasks } from '../data/tasks';
import { useRouter } from 'next/navigation';

// Initialize DM Serif Display font
const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

// Initialize DM Sans font
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

// Initialize DM Mono font
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
});

// Vintage color palette - matching TaskCard.tsx
const COLORS = {
  terracotta: '#FAAE88',
  lightGreen: '#E1EBC9',
  lightYellow: '#FFF0C4',
  cream: '#EEDECA',
  lightGrey: '#FFFFFF',
};

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

interface CardDetailProps {
  task: TaskItemType;
  onClose: () => void;
  onCardClick?: (cardId: string) => void;
}

// Helper to find the category of a task
const findTaskCategory = (taskId: string): string | null => {
  for (const [category, tasks] of Object.entries(searchTasks)) {
    if (tasks.some(task => task.id === taskId)) {
      return category;
    }
  }
  return null;
};

// Helper to get random tasks
const getRandomTask = (excludeCategory: string): TaskItemType => {
  const availableCategories = Object.keys(searchTasks).filter(cat => cat !== excludeCategory);
  const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
  const categoryTasks = searchTasks[randomCategory as keyof typeof searchTasks];
  return categoryTasks[Math.floor(Math.random() * categoryTasks.length)];
};

// Add a CSS class for emoji silhouettes - matching the page.tsx style
const emojiSilhouette = "inline-block mr-4 text-2xl opacity-60 [filter:brightness(0)_contrast(1)_saturate(0)]"

// Helper to format numbers consistently
const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return `${(num/1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return num.toString();
};

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

// Add Tooltip component before CardDetail component
const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute z-10 invisible group-hover:visible bg-slate-800 text-white text-sm rounded-lg py-2 px-3 w-64 -right-2 top-full mt-1">
        {content}
        <div className="absolute -top-1 right-4 w-2 h-2 bg-slate-800 rotate-45"></div>
      </div>
    </div>
  );
};

export const CardDetail: React.FC<CardDetailProps> = ({ task, onClose, onCardClick }) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<{ [key: number]: string }>({});
  const [isFavorited, setIsFavorited] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Clear form values when task changes
  useEffect(() => {
    setFormValues({});
  }, [task.id]);

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  // Handle edit click
  const handleEditClick = () => {
    alert('Open in Studio');
  };

  // Helper to check if form has values
  const hasFormValues = () => {
    if (!task.form?.fields) return true;
    return task.form.fields.some((field, index) => formValues[index]);
  };

  // Helper to load demo values
  const loadDemoValues = () => {
    if (task.form?.fields) {
      const newValues: Record<number, string> = {};
      task.form.fields.forEach((field, index) => {
        if (field.demo_value) {
          newValues[index] = field.demo_value;
        }
      });
      setFormValues(newValues);
    }
  };

  // Handle automation click
  const handleAutomateClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', 'automations');
    url.searchParams.set('automation', `task-${task.id}`);
    router.push(url.search);
  };

  if (!isClient) {
    return null; // Or a loading state
  }

  // Handle run task
  const handleRunTask = () => {
    // If form is empty, populate with demo values
    if (!hasFormValues()) {
      loadDemoValues();
      return;
    }

    // Get demo output based on task type
    const getDemoOutput = (): {
      type: 'file' | 'website' | 'integration' | 'input' | 'code' | 'message' | 'media';
      output: string;
      metadata?: {
        fileType?: string;
        thumbnail?: string;
        url?: string;
        platform?: string;
        summary?: string;
      };
    } => {
      if (task.demo_output) {
        return task.demo_output;
      }

      // Default demo outputs based on task type
      switch (task.output_type) {
        case 'file':
          return {
            type: 'file',
            output: 'https://example.com/report.xlsx',
            metadata: {
              fileType: 'Excel Report',
              summary: 'Monthly analytics report'
            }
          };
        case 'website':
          return {
            type: 'website',
            output: 'https://preview.example.com/generated-site',
            metadata: {
              thumbnail: '/demo/website-preview.png',
              url: 'https://preview.example.com/generated-site'
            }
          };
        case 'integration':
          return {
            type: 'integration',
            output: 'Updated 3 platforms:\nNotion page created\nSlack notification sent\nCalendar event added',
            metadata: {
              platform: 'multi-platform'
            }
          };
        case 'input':
          return {
            type: 'input',
            output: 'Please review the generated content and approve or suggest changes.',
            metadata: {
              summary: 'Human review required'
            }
          };
        case 'code':
          return {
            type: 'code',
            output: JSON.stringify({ status: 'success', data: { key: 'value' }}, null, 2),
            metadata: {
              summary: 'API Response'
            }
          };
        case 'message':
          return {
            type: 'message',
            output: 'Your weekly newsletter has been generated and scheduled.',
            metadata: {
              platform: 'Email',
              summary: 'Newsletter scheduled'
            }
          };
        case 'media':
          return {
            type: 'media',
            output: '/demo/generated-image.png',
            metadata: {
              summary: 'AI-generated visualization'
            }
          };
        default:
          return {
            type: 'message',
            output: 'Task completed successfully'
          };
      }
    };

    // Create new artifact with demo output
    const demoOutput = getDemoOutput();
    const newArtifact: RunArtifact = {
      id: Math.random().toString(36).substring(7),
      taskId: task.id,
      taskTitle: task.title,
      timestamp: Date.now(),
      output: demoOutput.output,
      type: demoOutput.type,
      metadata: demoOutput.metadata,
      isNew: true
    };

    // Dispatch event for new artifact
    const event = new CustomEvent('runArtifactAdded', { detail: newArtifact });
    window.dispatchEvent(event);

    // Clear form after creating artifact
    setFormValues({});
  };

  // Handle field change
  const handleFieldChange = (index: number, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [index]: value
    }));
  };

  // Determine the border color based on the task id
  const getCardColor = (id: string): string => {
    if (task.lastEdited) return COLORS.lightGrey;
    
    const colorIndex = getHashValue(id.split('').reverse().join(''), 4);
    const colorKeys = ['terracotta', 'lightGreen', 'lightYellow', 'cream', 'lightGrey'];
    return COLORS[colorKeys[colorIndex] as keyof typeof COLORS];
  };

  const borderColor = getCardColor(task.id);

  // Get similar tasks
  const taskCategory = findTaskCategory(task.id);
  const similarTasks = taskCategory ? searchTasks[taskCategory as keyof typeof searchTasks]
    .filter(t => t.id !== task.id)
    .slice(0, 5) : [];
  
  // Add one random task from a different category
  const randomTask = taskCategory ? getRandomTask(taskCategory) : null;

  return (
    <div>
      <div 
        className="bg-white mb-8 mt-2 relative"
        style={{
          border: `16px solid ${borderColor}`,
          borderRadius: '3px',
          transition: 'transform 500ms ease-out'
        }}
      >
        {/* Close button moved to match other icons */}
        <div className="absolute top-1.5 right-0 flex items-center gap-2">
          <button 
            className="p-1.5 hover:bg-black/5 rounded-md transition-colors"
            onClick={handleFavoriteToggle}
          >
            <Heart 
              className="w-5 h-5 text-black" 
              strokeWidth={1.5}
              fill={isFavorited ? "currentColor" : "none"}
            />
          </button>
          <button 
            onClick={() => {
              window.location.href = window.location.pathname;
            }}
            className="p-1.5 hover:bg-black/5 rounded-md transition-colors"
          >
            <XIcon className="w-[28px] h-[28px] text-black" strokeWidth={1.2} />
          </button>
        </div>

        {/* Task Information Section - Now at top */}
        <div style={{ backgroundColor: borderColor }}>
          <div className="px-0 pt-1 pb-5 flex justify-between items-start">
            <div className="pl-0">
              <h2 className={`text-3xl ${dmSerifDisplay.className} mb-2`}>{task.title}</h2>
              <div className="flex items-center gap-3 text-xs text-black">
                {task.run_count && (
                  <div className="flex items-center gap-1">
                    <Repeat className="w-3.5 h-3.5" />
                    <span>{formatNumber(task.run_count)}</span>
                  </div>
                )}
                {task.eval_rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    <span>{task.eval_rating.toFixed(1)} rating</span>
                  </div>
                )}
                {task.author && (
                  <div className="flex items-center gap-1">
                    <div className="w-3.5 h-3.5 rounded-full bg-white/80 flex items-center justify-center">
                      <span className="text-black text-[10px]">
                        {task.author.charAt(0)}
                      </span>
                    </div>
                    <span>{task.author}</span>
                    {task.version && (
                      <span className="text-black">· v{task.version}</span>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <CircleDollarSign className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>{task.cost}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content container with consistent max-width */}
        <div className="max-w-4xl mx-auto pt-12 pb-12">
          {/* Form Fields */}
          {task.form?.fields && (
            <div className="space-y-3.5">
              {task.form.fields.map((field, index) => (
                <div key={index} className="pb-4">
                  {/* Only show field if it has an input type or description */}
                  {(field.type || field.description) ? (
                    <>
                      {/* Field Label */}
                      <div className="mb-2">
                        <h3 className={`text-xl font-bold ${dmSans.className}`}>
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                          {field.description && (
                            <Tooltip content={field.description}>
                              <Info className="w-4 h-4 text-slate-500 cursor-help ml-1 inline-block -mt-1" />
                            </Tooltip>
                          )}
                        </h3>
                      </div>

                      {/* Field Input */}
                      {field.type === 'file' && (
                        <>
                          <div className="mt-3 flex justify-center w-full rounded-lg border border-dashed border-slate-300 px-6 py-8">
                            <div className="text-center">
                              <FileText className="mx-auto h-12 w-12 text-slate-300" />
                              <div className="mt-4 flex text-sm leading-6 text-slate-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={(e) => handleFieldChange(index, e.target.files?.[0]?.name || '')}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs leading-5 text-slate-500">PDF, DOC, TXT up to 10MB</p>
                            </div>
                          </div>
                        </>
                      )}

                      {field.type === 'select' && field.options && (
                        <>
                          <div className="relative">
                            <select 
                              className="mt-3 block w-full appearance-none bg-slate-50 rounded-md border border-slate-300 px-4 py-2 pr-8 text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                              value={formValues[index] || ''}
                              onChange={(e) => handleFieldChange(index, e.target.value)}
                            >
                              <option value="">Select an option</option>
                              {field.options.map((option, optionIndex) => (
                                <option key={optionIndex} value={option}>{option}</option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-2">
                              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </>
                      )}

                      {field.type === 'text' && (
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          value={formValues[index] || ''}
                          onChange={(e) => handleFieldChange(index, e.target.value)}
                          className="mt-3 block w-full rounded-md border-0 px-4 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      )}

                      {field.type === 'textarea' && (
                        <textarea
                          rows={4}
                          placeholder={field.placeholder}
                          value={formValues[index] || ''}
                          onChange={(e) => handleFieldChange(index, e.target.value)}
                          className="mt-3 block w-full rounded-md border-0 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-base leading-6"
                        />
                      )}
                    </>
                  ) : (
                    <h3 className={`text-xl font-bold ${dmSans.className}`}>
                      {field.label}
                    </h3>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div style={{ backgroundColor: borderColor }}>
          <div className="px-0 pt-3 pb-0 flex justify-between items-center">
            <div className="flex items-center gap-5">
              <button 
                className="text-black hover:text-black/80 rounded-md flex items-center gap-2 transition-colors ml-4"
                onClick={handleEditClick}
              >
                <ZoomIn className="w-4 h-4" />
                <span className="font-medium">Zoom In</span>
              </button>
            </div>
            
            <div className="flex items-center gap-5">
              <button 
                className="text-black hover:text-black/80 rounded-md flex items-center gap-2 transition-colors"
                onClick={handleAutomateClick}
              >
                <Zap className="w-4 h-4" fill="currentColor" />
                <span className="font-medium">Automate Task</span>
              </button>
              
              <div className="pr-4">
                <button 
                  className="bg-black text-white px-5 py-2.5 rounded-md flex items-center gap-2 hover:bg-slate-800 transition-colors"
                  onClick={handleRunTask}
                >
                  <Play className="w-4 h-4" fill="currentColor" />
                  <span className="font-medium">Run Task</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Tasks Section */}
      {taskCategory && (similarTasks.length > 0 || randomTask) && (
        <div className="mt-24">
          <h2 className={`text-2xl ${dmSerifDisplay.className} flex items-center mb-4`}>
            <span className={emojiSilhouette}>🔍</span>
            Similar Tasks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {similarTasks.map((similarTask) => (
              <TaskCard
                key={similarTask.id}
                id={similarTask.id}
                title={similarTask.title}
                description={similarTask.description}
                date={similarTask.date}
                starred={similarTask.starred}
                runCount={similarTask.run_count}
                eval_rating={similarTask.eval_rating}
                cost={similarTask.cost}
                onClick={() => onCardClick?.(similarTask.id)}
              />
            ))}
            {randomTask && (
              <TaskCard
                key={randomTask.id}
                id={randomTask.id}
                title={randomTask.title}
                description={randomTask.description}
                date={randomTask.date}
                starred={randomTask.starred}
                runCount={randomTask.run_count}
                eval_rating={randomTask.eval_rating}
                cost={randomTask.cost}
                onClick={() => onCardClick?.(randomTask.id)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 