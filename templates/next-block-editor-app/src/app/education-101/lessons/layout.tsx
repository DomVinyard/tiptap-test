'use client'

import { Surface } from '@/components/ui/Surface'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { lessons } from '../data'
import { LessonVideo } from '@/components/LessonVideo'
import { DM_Mono } from 'next/font/google'
import { MDXRemote } from 'next-mdx-remote'

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
})

function Header({ currentIndex, currentLesson }: { currentIndex: number; currentLesson?: { title: string } }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 z-50">
      <div className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/education-101" className="h-5">
                <img 
                  src="https://cdn.prod.website-files.com/66e00503e1e57f5fafdfa7d5/66e005da47c0c33bca665c3a_wordware-logotype.svg"
                  alt="Wordware"
                  className="h-full w-auto"
                />
              </Link>
              {currentLesson && (
                <>
                  <span className="text-neutral-300 text-sm translate-y-[3px]">/</span>
                  <span className={`text-sm text-neutral-500 translate-y-[3px] ${dmMono.className}`}>
                    <span className="font-bold text-neutral-900">Fundamentals</span> {String(currentIndex + 1).padStart(2, '0')}. {currentLesson.title}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-neutral-600 hover:text-neutral-900">
                Sign in
              </button>
              <button className="bg-neutral-200 hover:bg-neutral-300 text-neutral-700 px-4 py-2 rounded-md font-medium">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname() ?? ''
  const currentLessonId = pathname.split('/').pop()
  const currentLesson = lessons.find(lesson => lesson.id === currentLessonId)
  const currentIndex = lessons.findIndex(lesson => lesson.id === currentLessonId)
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-white">
      <Header currentIndex={currentIndex} currentLesson={currentLesson} />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Video */}

          {/* Lesson Content */}
              <div className="mb-8">
                <div className="prose prose-blue max-w-none [&_.video-section]:mt-0 [&_.video-section+h1]:mt-8 prose-h1:mt-0 prose-h2:mt-12">
            {children}
                </div>
              </div>

          {/* Navigation Footer */}
              <div className="flex justify-between items-center">
                {currentIndex === 0 ? (
                  <Link
                    href="/education-101"
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md transition-colors"
                  >
                    <span>←</span>
                    <span>Previous</span>
                  </Link>
                ) : prevLesson ? (
              <Link
                href={`/education-101/lessons/${prevLesson.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md transition-colors"
              >
                <span>←</span>
                    <span>Previous</span>
              </Link>
            ) : (
              <div />
            )}
            {nextLesson ? (
              <Link
                href={`/education-101/lessons/${nextLesson.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded-md transition-colors"
              >
                    <span>Next</span>
                <span>→</span>
              </Link>
            ) : (
              <div />
            )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-[320px] shrink-0">
              <div className="p-4 bg-white border border-neutral-200 rounded-lg sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Lessons</h2>
                <div className="space-y-2">
                  {lessons.map((l, index) => (
                    <Link
                      key={l.id}
                      href={`/education-101/lessons/${l.id}`}
                      className={`block p-3 rounded-md transition-colors ${
                        l.id === currentLessonId
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className={`text-sm text-neutral-400 ${dmMono.className}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={dmMono.className}>{l.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 