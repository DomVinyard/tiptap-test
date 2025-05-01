import { useState } from 'react'

interface LessonVideoProps {
  title: string
  duration: string
  videoUrl: string
  thumbnailUrl: string
}

export function LessonVideo({ title, duration, videoUrl, thumbnailUrl }: LessonVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!isPlaying) {
  return (
        <button 
        onClick={() => setIsPlaying(true)}
        className="w-full relative aspect-video bg-neutral-100 rounded-lg overflow-hidden group"
      >
        <img 
          src={thumbnailUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-black border-b-[12px] border-b-transparent ml-1" />
            </div>
            <div className="text-white font-medium">{duration}</div>
          </div>
        </div>
        </button>
    )
  }

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        src={videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
} 