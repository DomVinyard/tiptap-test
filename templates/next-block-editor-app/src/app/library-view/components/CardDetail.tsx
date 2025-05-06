import React from 'react';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import { DM_Mono } from 'next/font/google';
import { Star, Clock, Repeat, X, Play } from 'lucide-react';
import { FaCoins } from 'react-icons/fa';
import { TaskItemType } from '../data/index';
import { TaskCard } from './TaskCard';
import { searchTasks } from '../data/tasks';

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

export const CardDetail: React.FC<CardDetailProps> = ({ task, onClose, onCardClick }) => {
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
        className="bg-white mb-8 mt-8"
        style={{
          border: `16px solid ${borderColor}`,
          borderRadius: '3px',
          transition: 'transform 500ms ease-out'
        }}
      >
        {/* Header with colored background */}
        <div 
          className="flex justify-between items-start relative"
          style={{
            backgroundColor: borderColor,
            margin: '-16px -16px 40px -16px',
          }}
        >
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-2 pl-4 py-4">
              <h1 className={`text-sm ${dmMono.className} opacity-90 font-medium`}>{task.title}</h1>
              {task.author && (
                <span className={`text-sm ${dmMono.className} opacity-60`}>
                  by {task.author}
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-black opacity-90 hover:opacity-100 transition-opacity absolute top-1/2 -translate-y-1/2 right-3"
          >
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Main content container with consistent max-width */}
        <div className="max-w-3xl mx-auto px-8 pt-8 pb-16">
          {/* Form Fields */}
          {task.form?.fields && (
            <div className="space-y-4">
              {task.form.fields.map((field, index) => (
                <div key={index} className="pb-4">
                  {/* Only show field if it has an input type or description */}
                  {(field.type || field.description) ? (
                    <>
                      {/* Field Label */}
                      <div className="mb-2">
                        <h3 className={`text-2xl font-bold ${dmSans.className}`}>
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </h3>
                      </div>

                      {/* Field Input */}
                      {field.type === 'file' && (
                        <>
                          <div className="mt-3 flex justify-center rounded-lg border border-dashed border-slate-300 px-6 py-10 bg-slate-50">
                            <div className="text-center">
                              <div className="mt-1 flex text-sm leading-6 text-slate-600">
                                <label
                                  className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                            </div>
                          </div>
                          {field.description && (
                            <p className={`text-sm text-slate-500 mt-2 ${dmSans.className}`}>
                              {field.description}
                            </p>
                          )}
                        </>
                      )}

                      {field.type === 'select' && field.options && (
                        <>
                          <div className="relative">
                            <select 
                              className="mt-3 block w-full appearance-none bg-white rounded-md border border-slate-300 px-4 py-2 pr-8 text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
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
                          {field.description && (
                            <p className={`text-sm text-slate-500 mt-2 ${dmSans.className}`}>
                              {field.description}
                            </p>
                          )}
                        </>
                      )}

                      {field.type === 'text' && (
                        <>
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            className="mt-3 block w-full rounded-md border-0 px-4 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {field.description && (
                            <p className={`text-sm text-slate-500 mt-2 ${dmSans.className}`}>
                              {field.description}
                            </p>
                          )}
                        </>
                      )}

                      {field.type === 'textarea' && (
                        <>
                          <textarea
                            rows={4}
                            placeholder={field.placeholder}
                            className="mt-3 block w-full rounded-md border-0 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-base leading-6"
                          />
                          {field.description && (
                            <p className={`text-sm text-slate-500 mt-2 ${dmSans.className}`}>
                              {field.description}
                            </p>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <h3 className={`text-2xl font-bold ${dmSans.className}`}>
                      {field.label}
                    </h3>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Run Button Section */}
          <div className="mt-8 flex justify-end items-center">
            {/* Cost Indicator */}
            <div className="flex items-center gap-1.5 mr-4">
              <FaCoins size={16} className="text-black" />
              <div className={`text-base ${dmMono.className} text-black font-medium`}>
                {task.cost}
              </div>
            </div>
            
            {/* Run Button */}
            <button 
              className="bg-black text-white px-6 py-3 rounded-md flex items-center gap-2 hover:bg-slate-800 transition-colors"
              onClick={() => {/* Handle run */}}
            >
              <Play className="w-4 h-4" fill="currentColor" />
              <span className="font-medium">Run Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Similar Tasks Section */}
      {taskCategory && (similarTasks.length > 0 || randomTask) && (
        <div className="mt-12">
          <h2 className={`text-3xl ${dmSerifDisplay.className} flex items-center mb-4`}>
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