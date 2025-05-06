import { Book, Clock, Bookmark, Star } from 'lucide-react'

// Define interface for automations
export interface AutomationType {
  id: string;
  trigger: string;
  action: string;
  icon: string;
  isOn: boolean;
  category: 'trigger' | 'scheduled';
  taskId: string;
  meta: {
    project: string;
    size: string;
    owner: string;
    updated: string;
  };
}

// Automations data
export const sampleAutomations: AutomationType[] = [
  {
    id: 'auto1',
    trigger: 'New entry in Projects table',
    action: 'Summarize Project',
    icon: 'notion',
    isOn: true,
    category: 'trigger',
    taskId: 'product1',
    meta: {
      project: 'My Project',
      size: '22.5 KB',
      owner: 'Dom Vinyard',
      updated: '12 Nov 2024'
    }
  },
  {
    id: 'auto2',
    trigger: 'New Email from known contact',
    action: 'Draft Email Reply',
    icon: 'gmail',
    isOn: true,
    category: 'trigger',
    taskId: 'marketing1',
    meta: {
      project: 'My Project',
      size: '22.5 KB',
      owner: 'Dom Vinyard',
      updated: '12 Nov 2024'
    }
  },
  {
    id: 'auto3',
    trigger: 'New Email from unknown contact',
    action: 'Triage Email',
    icon: 'gmail',
    isOn: true,
    category: 'trigger',
    taskId: 'accounting1',
    meta: {
      project: 'My Project',
      size: '22.5 KB',
      owner: 'Dom Vinyard',
      updated: '12 Nov 2024'
    }
  },
  {
    id: 'auto4',
    trigger: 'Spam Email Identified',
    action: 'Unsubscribe',
    icon: 'gmail',
    isOn: true,
    category: 'trigger',
    taskId: 'legal1',
    meta: {
      project: 'My Project',
      size: '22.5 KB',
      owner: 'Dom Vinyard',
      updated: '12 Nov 2024'
    }
  },
  {
    id: 'auto5',
    trigger: 'Every Friday afternoon',
    action: 'Summarize Week in Slack',
    icon: 'calendar',
    isOn: true,
    category: 'scheduled',
    taskId: 'hr1',
    meta: {
      project: 'My Project',
      size: '22.5 KB',
      owner: 'Dom Vinyard',
      updated: '12 Nov 2024'
    }
  },
  {
    id: 'auto6',
    trigger: 'Every Monday morning',
    action: 'Submit Expense Report',
    icon: 'calendar',
    isOn: true,
    category: 'scheduled',
    taskId: 'accounting4',
    meta: {
      project: 'My Project',
      size: '22.5 KB',
      owner: 'Dom Vinyard',
      updated: '12 Nov 2024'
    }
  }
]

// Helper function to get automations by category
export const getAutomationsByCategory = (category: 'trigger' | 'scheduled'): AutomationType[] => {
  return sampleAutomations.filter(automation => automation.category === category);
}

// Category definitions
export const categories = [
  { id: 'all', label: 'All Documents', icon: Book },
  { id: 'recent', label: 'Recent', icon: Clock },
  { id: 'bookmarked', label: 'Bookmarked', icon: Bookmark },
  { id: 'favorites', label: 'Favorites', icon: Star }
] 