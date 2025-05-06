'use client'

import React from 'react'
import { DM_Sans } from 'next/font/google'
import { TaskCard } from '../library-view/components/TaskCard'

// Initialize DM Sans font
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

// Sample task content to use for all cards
const SAMPLE_TASK = {
  id: 'sample-task',
  title: 'Sample Task',
  description: 'This is a sample task description that shows what the card looks like with some content.',
  lastEdited: '2 hours ago',
  version: 'v1.0',
}

// Color and template names for labels
const COLOR_NAMES = ['Terracotta', 'Light Green', 'Light Yellow', 'Cream']
const COLOR_KEYS = ['terracotta', 'lightGreen', 'lightYellow', 'cream']
const TEMPLATE_NAMES = ['Centered', 'Ornate Border', 'Oval Title', 'Right Aligned']

export default function TemplatesPage() {
  // Generate deterministic IDs for each template-color combination
  const generateCardId = (templateIndex: number, colorIndex: number) => {
    return `template-${templateIndex}-color-${colorIndex}`
  }
  
  return (
    <div className="mx-0 py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Template Grid: All Combinations</h1>
      
      <div className="mb-8">
        <p className="text-lg text-neutral-600">
          A 4×4 grid displaying all combinations of the four card templates and four color schemes.
        </p>
      </div>
      
      {/* Template Labels (Column Headers) */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        <div className=""></div> {/* Empty cell for row/column intersection */}
        {TEMPLATE_NAMES.map((name, i) => (
          <div key={`template-${i}`} className="text-center font-semibold">
            {name}
          </div>
        ))}
      </div>
      
      {/* Grid with row labels */}
      <div className="grid grid-cols-5 gap-4">
        {COLOR_NAMES.map((colorName, colorIndex) => (
          <React.Fragment key={`row-${colorIndex}`}>
            {/* Row Label */}
            <div className="flex items-center font-semibold">
              {colorName}
            </div>
            
            {/* Cards for this row */}
            {TEMPLATE_NAMES.map((_, templateIndex) => (
              <div key={`card-${colorIndex}-${templateIndex}`} className="w-full">
                <TaskCard
                  id={generateCardId(templateIndex, colorIndex)}
                  title={SAMPLE_TASK.title}
                  description={SAMPLE_TASK.description}
                  lastEdited={SAMPLE_TASK.lastEdited}
                  version={SAMPLE_TASK.version}
                  starred={colorIndex === 0 && templateIndex === 0} // Star just the first card
                  runCount={(colorIndex + 1) * (templateIndex + 1) * 1000}
                  eval_rating={3.5 + 0.1 * templateIndex + 0.2 * colorIndex}
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
} 