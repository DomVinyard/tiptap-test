'use client'

import ReactMarkdown from 'react-markdown'
import { Surface } from '@/components/ui/Surface'
import { Slider } from '@/components/ui/Slider'
import { useCallback, useState } from 'react'
import { type Assignment } from '@/lib/data/assignments'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { ScoreBar } from './ScoreBar'

const complexityLevels = ['simple', 'medium', 'complete'] as const
type ComplexityLevel = (typeof complexityLevels)[number]

export const AssignmentView = ({ assignment }: { assignment: Assignment }) => {
  const [complexity, setComplexity] = useState<ComplexityLevel>('simple')
  const [isCopied, setIsCopied] = useState(false)

  const handleSliderChange = (value: number[]) => {
    setComplexity(complexityLevels[value[0]])
  }

  const currentLevelData = assignment.representation[complexity]

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(currentLevelData.markdown).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }, [currentLevelData.markdown])

  return (
    <div className="flex flex-row gap-16">
      <div className="flex-1">
        <Surface className="relative p-12 bg-white dark:bg-black shadow-2xl rounded-lg border border-neutral-200 dark:border-neutral-800">
          <div className="absolute top-4 right-4">
            <Button onClick={handleCopy} variant="ghost" buttonSize="icon">
              <Icon name={isCopied ? 'Check' : 'Copy'} />
            </Button>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{currentLevelData.markdown}</ReactMarkdown>
          </div>
        </Surface>
      </div>
      <div className="w-96">
        <div className="sticky top-0">
          <div className="space-y-6 text-sm pt-0 pb-8 px-0">
            <div className="bg-white dark:bg-black p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Complexity</label>
                <Slider defaultValue={[0]} max={2} step={1} onValueChange={handleSliderChange} />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-2 text-neutral-800 dark:text-neutral-200">Readability</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold w-8 text-right text-neutral-800 dark:text-neutral-200">
                  {assignment.risks.readability[complexity].score}
                </span>
                <div className="flex-1">
                  <ScoreBar score={assignment.risks.readability[complexity].score} />
                </div>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                {assignment.risks.readability[complexity].reasoning}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-2 text-neutral-800 dark:text-neutral-200">Executability</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold w-8 text-right text-neutral-800 dark:text-neutral-200">
                  {assignment.risks.executability[complexity].score}
                </span>
                <div className="flex-1">
                  <ScoreBar score={assignment.risks.executability[complexity].score} />
                </div>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                {assignment.risks.executability[complexity].reasoning}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-2 text-neutral-800 dark:text-neutral-200">Intent Ambiguity</h3>
              <ul className="space-y-1.5 list-disc list-inside text-xs text-neutral-600 dark:text-neutral-400">
                {assignment.risks.intent_ambiguity.map((risk, i) => (
                  <li key={i}>
                    <span className={!risk[complexity] ? 'line-through text-neutral-400 dark:text-neutral-600' : ''}>
                      {risk.area}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-2 text-neutral-800 dark:text-neutral-200">Execution Risk</h3>
              <ul className="space-y-1.5 list-disc list-inside text-xs text-neutral-600 dark:text-neutral-400">
                {assignment.risks.execution_risk.map((risk, i) => (
                  <li key={i}>
                    <span className={!risk[complexity] ? 'line-through text-neutral-400 dark:text-neutral-600' : ''}>
                      {risk.area_describe}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
