import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'

type FlowInputs = {
  topic: string
  style: string
}

export const FlowRunner = () => {
  const [inputs, setInputs] = useState<FlowInputs>({
    topic: '',
    style: ''
  })
  
  return (
    <div className="flex items-center gap-4 py-6 px-4">
      <div className="flex-1 flex gap-4">
        <div className="flex-1 relative">
          <span className="absolute -top-2.5 left-2 px-1 text-xs font-medium text-emerald-500 bg-white dark:bg-black">topic</span>
          <input
            type="text"
            className="w-full h-12 px-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black"
            placeholder="Enter the topic..."
            value={inputs.topic}
            onChange={(e) => setInputs(prev => ({ ...prev, topic: e.target.value }))}
          />
        </div>
        <div className="flex-1 relative">
          <span className="absolute -top-2.5 left-2 px-1 text-xs font-medium text-emerald-500 bg-white dark:bg-black">style</span>
          <input
            type="text"
            className="w-full h-12 px-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black"
            placeholder="Enter the style..."
            value={inputs.style}
            onChange={(e) => setInputs(prev => ({ ...prev, style: e.target.value }))}
          />
        </div>
      </div>
      <button 
        className="w-10 h-10 flex items-center justify-center rounded-full bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        onClick={() => {
          // TODO: Implement flow running logic
          console.log('Running flow with inputs:', inputs)
        }}
      >
        <Icon name="Play" className="w-4 h-4 text-white dark:text-black" />
      </button>
    </div>
  )
} 