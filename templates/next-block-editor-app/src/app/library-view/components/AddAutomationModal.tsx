import React, { useEffect, useState } from 'react';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import { Zap, Clock, ArrowRight, Calendar, ChevronDown, X } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { getTaskById } from '../data/index';
import { Surface } from '@/components/ui/Surface';

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

interface AddAutomationModalProps {
  taskId?: string;
  onClose: () => void;
}

export function AddAutomationModal({ taskId, onClose }: AddAutomationModalProps) {
  const [selectedTask, setSelectedTask] = useState(taskId ? getTaskById(taskId) : null);
  const [showTriggerSelect, setShowTriggerSelect] = useState(false);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl relative">
        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            {/* Left side - Trigger Selection */}
            <div className="relative">
              <button 
                onClick={() => setShowTriggerSelect(true)}
                className="h-[220px] w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 transition-colors bg-gradient-to-b from-slate-50 to-white group"
              >
                {/* Logo and Icon Container */}
                <div className="flex flex-col items-center">
                  {/* Circular gradient background */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
                    <Calendar className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                  
                  {/* Text */}
                  <div className="text-center">
                    <p className="text-slate-800 font-medium mb-2">Set Your Trigger</p>
                    <p className="text-sm text-slate-500">Choose when to run this automation</p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -right-1 top-8 w-3 h-3 rounded-full bg-purple-500/20"></div>
                  <div className="absolute -left-2 bottom-12 w-2 h-2 rounded-full bg-indigo-500/20"></div>
                  <div className="absolute right-12 -bottom-1 w-2 h-2 rounded-full bg-purple-500/20"></div>
                </div>
              </button>

              {/* Dotted border on the right */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-[80%] border-r-2 border-dashed border-slate-300"></div>
            </div>

            {/* Arrow */}
            <div className="text-black dark:text-white flex-shrink-0 text-xl font-bold">→</div>

            {/* Right side - Task Selection */}
            <div>
              {selectedTask ? (
                <TaskCard
                  id={selectedTask.id}
                  title={selectedTask.title}
                  description={selectedTask.description}
                  date={selectedTask.date}
                  starred={selectedTask.starred}
                  runCount={selectedTask.run_count}
                  eval_rating={selectedTask.eval_rating}
                  cost={selectedTask.cost}
                  disableHover={true}
                />
              ) : (
                <div className="h-[220px] flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>Select a task</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-200"
          >
            Cancel
          </button>
          <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700">
            Create Automation
          </button>
        </div>

        {/* Trigger Selection Modal */}
        {showTriggerSelect && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl ${dmSerifDisplay.className}`}>Select Trigger Type</h3>
                <button
                  onClick={() => setShowTriggerSelect(false)}
                  className="text-slate-400 hover:text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <button className="w-full p-4 border rounded-lg hover:bg-slate-50 flex items-center gap-3 group transition-colors">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Schedule</div>
                    <div className="text-sm text-slate-500">Run at specific times</div>
                  </div>
                </button>
                
                <button className="w-full p-4 border rounded-lg hover:bg-slate-50 flex items-center gap-3 group transition-colors">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <Zap className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Event</div>
                    <div className="text-sm text-slate-500">Run when something happens</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 