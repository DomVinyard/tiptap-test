export interface Lesson {
  id: string
  title: string
  duration: string
  description: string
  videoUrl?: string  // Optional URL for the lesson video
  videoThumbnail?: string  // Optional thumbnail image for the video
} 