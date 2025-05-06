import { Clock, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { RunArtifact } from './RunArtifact';
import { useState } from 'react';

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

interface RunArtifactSidebarProps {
  isOpen: boolean;
  runs: { [type: string]: RunArtifact[] };
  onClearRuns: () => void;
}

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export function RunArtifactSidebar({ isOpen, runs, onClearRuns }: RunArtifactSidebarProps) {
  // Keep track of current index for each type
  const [currentIndices, setCurrentIndices] = useState<{ [type: string]: number }>({});

  // Navigate through runs of a specific type
  const handleNavigation = (type: string, direction: 'prev' | 'next') => {
    setCurrentIndices(prev => {
      const currentIndex = prev[type] || 0;
      const maxIndex = runs[type].length - 1;
      let newIndex;
      
      if (direction === 'prev') {
        newIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
      } else {
        newIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
      }
      
      return { ...prev, [type]: newIndex };
    });
  };

  // Sort types to show most recent first
  const sortedTypes = Object.entries(runs)
    .sort(([, a], [, b]) => {
      const latestA = a[0]?.timestamp || 0;
      const latestB = b[0]?.timestamp || 0;
      return latestB - latestA;
    })
    .map(([type]) => type);

  return (
    <div 
      className={`w-96 border-l border-slate-700 bg-slate-800 text-slate-200 shrink-0 h-screen fixed right-0 overflow-hidden flex flex-col transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 flex-1 overflow-y-auto">
        {Object.keys(runs).length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-sm font-medium mb-2 text-slate-200">No completed tasks</h3>
            <p className="text-xs text-slate-400">
              Run a task to see the results here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedTypes.map(type => {
              const runsOfType = runs[type];
              const currentIndex = currentIndices[type] || 0;
              const currentRun = runsOfType[currentIndex];
              const hasMultiple = runsOfType.length > 1;

              return (
                <div key={type} className="relative group">
                  <RunArtifact 
                    key={currentRun.id} 
                    {...currentRun}
                    isNew={currentIndex === 0 && currentRun.isNew}
                    hasMultiple={hasMultiple}
                    currentIndex={currentIndex}
                    totalCount={runsOfType.length}
                    onNavigate={(direction) => handleNavigation(type, direction)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      {Object.keys(runs).length > 0 && (
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={onClearRuns}
            className="w-full py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear run history
          </button>
        </div>
      )}
    </div>
  );
} 