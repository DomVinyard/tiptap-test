'use client'

import { Surface } from '@/components/ui/Surface'
import Link from 'next/link'
import { lessons } from './data'
import { DM_Mono } from 'next/font/google'

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
})

const learningPoints = [
  'Understanding AI-powered document editing',
  'Creating effective prompts for content generation',
  'Building automated workflows with triggers and actions',
  'Managing context and control flow in AI interactions',
  'Advanced techniques for complex use cases'
]

function BlueprintA() {
  return (
    <div className="relative w-[400px] h-[400px]">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{
          transform: 'rotate(-10deg)',
        }}
      >
        {/* Grid background */}
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#000000" strokeWidth="0.5" opacity="0.1" />
        </pattern>
        <rect width="200" height="200" fill="url(#grid)" />

        {/* Blueprint A */}
        <g transform="translate(40, 20)">
          {/* Main A shape */}
          <path
            d="M60,160 L20,160 L60,40 L80,40 L120,160 L100,160 L90,120 L70,120 L60,160"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
          />
          {/* Crossbar */}
          <line x1="75" y1="100" x2="85" y2="100" stroke="#000000" strokeWidth="2" />
          
          {/* Measurement lines and text */}
          <line x1="0" y1="160" x2="140" y2="160" stroke="#000000" strokeWidth="0.5" opacity="0.5" />
          <line x1="60" y1="165" x2="60" y2="155" stroke="#000000" strokeWidth="0.5" opacity="0.5" />
          <line x1="80" y1="165" x2="80" y2="155" stroke="#000000" strokeWidth="0.5" opacity="0.5" />
          
          {/* Angle indicators */}
          <path
            d="M60,160 A20,20 0 0 1 65,140"
            fill="none"
            stroke="#000000"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <text x="45" y="145" fill="#000000" fontSize="6">75°</text>
          
          {/* Dimensions */}
          <text x="65" y="175" fill="#000000" fontSize="6">120 units</text>
          <text x="20" y="100" fill="#000000" fontSize="6" transform="rotate(-75 20,100)">160 units</text>
        </g>

        {/* Technical annotations */}
        <g transform="translate(140, 40)">
          <line x1="0" y1="0" x2="-20" y2="20" stroke="#000000" strokeWidth="0.5" opacity="0.5" />
          <text x="5" y="5" fill="#000000" fontSize="6">Apex joint</text>
        </g>
        <g transform="translate(150, 100)">
          <line x1="0" y1="0" x2="-20" y2="0" stroke="#000000" strokeWidth="0.5" opacity="0.5" />
          <text x="5" y="5" fill="#000000" fontSize="6">Cross member</text>
        </g>
      </svg>
    </div>
  )
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 z-50">
      <div className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="h-5">
              <img 
                src="https://cdn.prod.website-files.com/66e00503e1e57f5fafdfa7d5/66e005da47c0c33bca665c3a_wordware-logotype.svg"
                alt="Wordware"
                className="h-full w-auto"
              />
            </Link>
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

export default function Education101Page() {
  const firstLesson = lessons[0]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-neutral-900">
        {/* Header Section with full-width background */}
        <div className="bg-neutral-50 pt-24 pb-16">
          <div className="px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <h1 className="text-5xl font-bold">Fundamentals</h1>
                    <span className="bg-neutral-100 text-neutral-600 text-xs px-1.5 py-0.5 rounded">v1</span>
                  </div>
                  <p className="text-xl text-neutral-600 mb-6">
                    Learn the fundamentals of Wordware through interactive lessons and hands-on exercises.
                  </p>
                  <Link 
                    href={`/education-101/lessons/${firstLesson.id}`}
                    className="inline-block bg-black hover:bg-neutral-800 text-white px-6 py-3 rounded-md font-medium"
                  >
                    Start course →
                  </Link>
                </div>
                <div className="hidden lg:block">
                  <BlueprintA />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">What you'll learn</h2>
                  <ul className="space-y-3">
                    {learningPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-blue-500">•</span>
                        <span className="text-neutral-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-6">Course Details</h2>
                  <div className="space-y-4 text-neutral-600">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>Updated April 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏱️</span>
                      <span>Total duration: 60 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📚</span>
                      <span>{lessons.length} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⚡</span>
                      <span>Prerequisites: Basic familiarity with text editors</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-6">Lessons</h2>
                  <div className="space-y-3">
                    {lessons.map((lesson, index) => (
                      <Link 
                        key={lesson.id}
                        href={`/education-101/lessons/${lesson.id}`}
                        className="block hover:bg-neutral-50 -mx-4 px-4 py-2 rounded-lg"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className={`text-neutral-400 w-6 flex-none ${dmMono.className}`}>{String(index + 1).padStart(2, '0')}</span>
                          <span className={dmMono.className}>{lesson.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-6">This tutorial includes</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span>🎥</span>
                      <span className="text-neutral-700">Video demos</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>✍️</span>
                      <span className="text-neutral-700">Practice exercises</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>📝</span>
                      <span className="text-neutral-700">Code examples</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>🎯</span>
                      <span className="text-neutral-700">Hands-on projects</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Lesson List */}
              <div className="lg:col-span-1">
                <div className="p-4 bg-white border border-neutral-200 rounded-lg">
                  <h2 className="text-lg font-semibold mb-4">Lessons</h2>
                  <div className="space-y-1">
                    {lessons.map((lesson, index) => (
                      <Link
                        key={lesson.id}
                        href={`/education-101/lessons/${lesson.id}`}
                        className="block pl-1 pr-3 py-3 rounded-md hover:bg-neutral-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className={`text-sm text-neutral-400 w-5 ${dmMono.className}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <div className={dmMono.className}>{lesson.title}</div>
                            <p className={`text-xs text-neutral-400 mt-0.5 ${dmMono.className}`}>{lesson.description}</p>
                          </div>
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
    </>
  )
} 