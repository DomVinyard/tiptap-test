import React from 'react'

export function LessonSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Title skeleton */}
      <div className="h-8 bg-neutral-200 rounded-lg w-3/4"></div>
      
      {/* Video section skeleton */}
      <div className="aspect-video bg-neutral-200 rounded-lg"></div>
      
      {/* Content sections */}
      <div className="space-y-6">
        {/* Paragraph skeletons */}
        <div className="space-y-3">
          <div className="h-4 bg-neutral-200 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
          <div className="h-4 bg-neutral-200 rounded w-4/5"></div>
        </div>
        
        {/* Quiz skeleton */}
        <div className="p-3 border border-neutral-200 rounded-lg bg-neutral-50">
          <div className="h-6 bg-neutral-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-10 bg-neutral-200 rounded"></div>
            <div className="h-10 bg-neutral-200 rounded"></div>
            <div className="h-10 bg-neutral-200 rounded"></div>
          </div>
        </div>
        
        {/* More paragraphs */}
        <div className="space-y-3">
          <div className="h-4 bg-neutral-200 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  )
} 