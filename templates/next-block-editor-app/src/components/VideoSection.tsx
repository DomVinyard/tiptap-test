import { ReactNode, useState } from 'react'

interface VideoSectionProps {
  children: ReactNode
}

export function VideoSection({ children }: VideoSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-neutral-200 rounded-lg my-4">
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-neutral-50 hover:bg-neutral-100 rounded-t-lg transition-colors"
      >
        <span className="flex items-center gap-2 font-medium">
          <span>📝</span>
          Video Transcript
        </span>
        <span
          className={`transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button> */}
      {isOpen && (
        <div className="p-4 leading-relaxed border-t border-neutral-200">
          {children}
        </div>
      )}
      <div className="aspect-video bg-neutral-100 rounded-b-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
            <span className="text-2xl">▶️</span>
          </div>
          <div className="text-neutral-600">2 min</div>
        </div>
      </div>
    </div>
  )
} 