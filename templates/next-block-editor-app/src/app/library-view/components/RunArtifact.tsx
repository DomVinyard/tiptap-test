import { Download, ExternalLink, Check, Calendar, Mail, Code, MessageSquare, FileSpreadsheet, Image as ImageIcon, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RunArtifactProps {
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
  hasMultiple?: boolean;
  currentIndex?: number;
  totalCount?: number;
  onNavigate?: (direction: 'prev' | 'next') => void;
}

const formatRelativeTime = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'just now';
};

export function RunArtifact({ 
  id, 
  taskId, 
  taskTitle, 
  timestamp, 
  output, 
  type, 
  metadata, 
  isNew = false,
  hasMultiple = false,
  currentIndex = 0,
  totalCount = 0,
  onNavigate
}: RunArtifactProps) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(isNew);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  
  // Handle task title click
  const handleTitleClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('card', taskId);
    router.push(url.search);
  };

  // Only run loading animation for new artifacts
  useEffect(() => {
    if (isNew) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            return prev;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    } else {
      // Ensure loading is false for non-new artifacts
      setIsLoading(false);
    }
  }, [isNew]);

  // Function to limit lines of text
  const limitLines = (text: string, limit: number) => {
    const lines = text.split('\n');
    if (lines.length <= limit) return text;
    return lines.slice(0, limit).join('\n') + '\n...';
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          <div className="h-1.5 w-full bg-slate-600 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-200 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-slate-400">Processing...</div>
        </div>
      );
    }

    switch (type) {
      case 'file':
        return (
          <button 
            className="w-full p-3 bg-slate-600 rounded-md flex items-center gap-3 hover:bg-slate-500 transition-colors group"
            onClick={() => window.open(output, '_blank')}
          >
            <div className="w-10 h-10 bg-emerald-500 rounded flex items-center justify-center flex-shrink-0">
              <FileSpreadsheet className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm text-slate-200 font-medium group-hover:text-white transition-colors">
                {metadata?.fileType || 'Document'} ready
              </div>
              <div className="text-xs text-slate-400">Click to download</div>
            </div>
          </button>
        );

      case 'website':
        return (
          <a 
            href={metadata?.url || output}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full overflow-hidden rounded-md hover:opacity-95 transition-opacity"
          >
            {metadata?.thumbnail && (
              <div className="w-full h-32 bg-slate-600 rounded-t-md overflow-hidden">
                <img 
                  src={metadata.thumbnail} 
                  alt="Website preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-3 bg-slate-600 rounded-b-md flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-slate-300" />
              <span className="text-sm text-slate-300 truncate">
                {metadata?.url || output}
              </span>
            </div>
          </a>
        );

      case 'integration':
        return (
          <div className="space-y-2">
            {output.split('\n').map((line, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300">
                <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-sm">{line}</span>
              </div>
            ))}
          </div>
        );

      case 'input':
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-orange-400">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">Input needed</span>
            </div>
            <div className="text-sm text-slate-300">{output}</div>
            <div className="flex gap-2 justify-end">
              <button className="px-3 py-1.5 text-xs bg-slate-600 hover:bg-slate-500 rounded text-slate-300 transition-colors">
                Reply
              </button>
            </div>
          </div>
        );

      case 'code':
        const lines = output.split('\n');
        const hasMoreLines = lines.length > 4;
        const displayedOutput = isExpanded ? output : limitLines(output, 4);
        
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Code className="w-4 h-4" />
              <span className="text-xs">JSON Output</span>
            </div>
            <pre className={`text-xs font-mono bg-slate-800 p-3 rounded-md overflow-x-auto ${!isExpanded ? 'max-h-[96px] overflow-y-hidden' : ''}`}>
              {displayedOutput}
            </pre>
            {hasMoreLines && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors mt-1"
              >
                {isExpanded ? (
                  <>
                    Show less <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>
        );

      case 'message':
        const messageLines = output.split('\n');
        const hasMoreMessageLines = messageLines.length > 4;
        const displayedMessage = isExpanded ? output : limitLines(output, 4);
        
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Mail className="w-4 h-4" />
              <span className="text-xs">{metadata?.platform || 'Message'} Sent</span>
            </div>
            <div className={`text-sm text-slate-300 bg-slate-800 p-3 rounded-md whitespace-pre-wrap ${!isExpanded ? 'max-h-[96px] overflow-y-hidden' : ''}`}>
              {displayedMessage}
            </div>
            {hasMoreMessageLines && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors mt-1"
              >
                {isExpanded ? (
                  <>
                    Show less <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
            {metadata?.summary && (
              <div className="text-xs text-slate-400 mt-2">{metadata.summary}</div>
            )}
          </div>
        );

      case 'media':
        return (
          <div className="space-y-2">
            <div className="w-full rounded-md overflow-hidden bg-slate-600">
              <img 
                src={output} 
                alt="Generated media"
                className="w-full h-full object-cover"
              />
            </div>
            {metadata?.summary && (
              <div className="text-xs text-slate-400 mt-2">{metadata.summary}</div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-sm text-slate-300">
            {output || 'Output goes here'}
          </div>
        );
    }
  };

  return (
    <div className="p-4 bg-slate-700 rounded-lg shadow-sm border border-slate-600">
      <div className="flex justify-between items-start mb-3">
        <div className="space-y-1">
          <h4 
            onClick={handleTitleClick}
            className="font-medium text-sm text-slate-200 hover:text-white cursor-pointer transition-colors"
          >
            {taskTitle}
          </h4>
          <div className="text-xs text-slate-400">{formatRelativeTime(timestamp)}</div>
        </div>
        {hasMultiple && (
          <div className="flex items-center gap-1.5 bg-slate-600/50 px-2 py-1 rounded-full">
            <button
              onClick={() => onNavigate?.('prev')}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="text-xs text-slate-300 min-w-[32px] text-center">
              {currentIndex + 1}/{totalCount}
            </span>
            <button
              onClick={() => onNavigate?.('next')}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
      {renderContent()}
    </div>
  );
} 