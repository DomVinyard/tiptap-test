import { useState } from 'react'
import { DM_Mono } from 'next/font/google'

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
})

export interface QuizQuestion {
  question: string
  options?: {
    id: string
    text: string
    isCorrect: boolean
  }[]
  type: 'multiple-choice' | 'true-false' | 'fill-in'
  correctAnswer?: string
  successMessage: string
}

interface QuizProps {
  questions: QuizQuestion[]
  onComplete: () => void
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }))

    // Check if all questions are answered correctly
    const allCorrect = questions.every((q, idx) => {
      const userAnswer = idx === questionIndex ? answer : answers[idx]
      if (!userAnswer) return false
      const correctOption = q.options?.find(opt => opt.isCorrect)
      return correctOption?.id === userAnswer
    })

    if (allCorrect) {
      onComplete()
    }
  }

  const isCorrect = (questionIndex: number): boolean => {
    const question = questions[questionIndex]
    const userAnswer = answers[questionIndex]
    if (!userAnswer) return false
    const correctOption = question.options?.find(opt => opt.isCorrect)
    return Boolean(correctOption?.id === userAnswer)
  }

  return (
    <div className="space-y-6 mb-8">
      {questions.map((question, index) => {
        const correct = isCorrect(index)
        return (
          <div key={index} className="p-3 pt-2 border border-neutral-200 rounded-lg bg-neutral-50">
            <div className="flex items-start gap-2 mb-3">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-neutral-400 flex-shrink-0 mt-0.5"
              >
                <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2"/>
                <path 
                  d="M12 16.5V15M10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12V13.5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
              <h3 className="font-medium text-lg">{question.question}</h3>
            </div>
            
            {question.type === 'fill-in' ? (
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md ${dmMono.className}`}
                value={answers[index] || ''}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder="Type your answer..."
                disabled={correct}
              />
            ) : (
              <div className={`space-y-1 mt-3 ${dmMono.className}`}>
                {question.options?.map(option => (
                  <label
                    key={option.id}
                    className={`flex items-start gap-2 p-2 rounded-md transition-colors cursor-pointer ${
                      answers[index] === option.id
                        ? option.isCorrect
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                        : 'hover:bg-white'
                    } ${correct ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option.id}
                      checked={answers[index] === option.id}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      disabled={correct}
                      className="mt-1"
                    />
                    <span className="leading-tight">{option.text}</span>
                  </label>
                ))}
              </div>
            )}

            {answers[index] && (
              <div 
                className={`mt-3 p-3 rounded-md ${
                  isCorrect(index) 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                } ${dmMono.className}`}
              >
                {isCorrect(index) 
                  ? (
                    <>
                      <div className="font-medium">✓ Correct!</div>
                      <div className="text-sm mt-1">{question.successMessage}</div>
                    </>
                  )
                  : '✗ Try another answer.'
                }
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
} 