import { ReactNode } from 'react'

interface LessonContentProps {
  children: ReactNode
  title: string
}

export function LessonContent({ children, title }: LessonContentProps) {
  return (
    <div className="prose prose-neutral max-w-none">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  )
} 