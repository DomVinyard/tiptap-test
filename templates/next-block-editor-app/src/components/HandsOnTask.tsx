import { ReactNode } from 'react'

interface HandsOnTaskProps {
  children: ReactNode
  title: string
  estimatedTime: string
}

export function HandsOnTask({ children, title, estimatedTime }: HandsOnTaskProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 my-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-600">
          Estimated time: {estimatedTime}
        </span>
      </div>
      <div className="prose prose-neutral max-w-none">
        {children}
      </div>
    </div>
  )
} 