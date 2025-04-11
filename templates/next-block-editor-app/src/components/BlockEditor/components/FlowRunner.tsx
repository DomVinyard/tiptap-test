import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'

type FlowInputs = {
  input_1: string
  input_2: string
}

export const FlowRunner = () => {
  const [inputs, setInputs] = useState<FlowInputs>({
    input_1: '',
    input_2: ''
  })
  
  return (
    <div className="flex items-center gap-4 py-6 px-4">
      <div className="flex-1 flex gap-4">
        <div className="flex-1 relative">
          <span className="absolute -top-2.5 left-2 px-1 text-xs font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-black">input_1</span>
          <input
            type="text"
            className="w-full h-12 px-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black"
            placeholder="Enter input_1..."
            value={inputs.input_1}
            onChange={(e) => setInputs(prev => ({ ...prev, input_1: e.target.value }))}
          />
        </div>
        <div className="flex-1 relative">
          <span className="absolute -top-2.5 left-2 px-1 text-xs font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-black">input_2</span>
          <input
            type="text"
            className="w-full h-12 px-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black"
            placeholder="Enter input_2..."
            value={inputs.input_2}
            onChange={(e) => setInputs(prev => ({ ...prev, input_2: e.target.value }))}
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