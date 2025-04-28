'use client'

import { notFound } from 'next/navigation'
import { lessons } from '../../data'
import { useEffect, useState } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { VideoSection } from '@/components/VideoSection'
import { Quiz } from '@/components/Quiz'
import { 
  lesson1Quiz, lesson2Quiz, lesson3Quiz, lesson4Quiz,
  lesson5Quiz, lesson6Quiz, lesson7Quiz, lesson8Quiz,
  lesson9Quiz, lesson10Quiz, lesson11Quiz, lesson12Quiz 
} from '../../quizData'

const components = {
  VideoSection,
  Quiz,
}

export default function LessonPage({
  params,
}: {
  params: { lessonId: string }
}) {
  const [mdxSource, setMdxSource] = useState<any>(null)
  const lesson = lessons.find(l => l.id === params.lessonId)

  useEffect(() => {
    // Fetch the content from the public directory
    fetch(`/lessons/${params.lessonId}.md`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to load lesson')
        }
        return res.text()
      })
      .then(async text => {
        const mdxSource = await serialize(text, {
          parseFrontmatter: true,
          mdxOptions: {
            development: process.env.NODE_ENV === 'development'
          }
        })
        setMdxSource(mdxSource)
      })
      .catch(err => {
        console.error('Failed to load lesson content:', err)
        notFound()
      })
  }, [params.lessonId])

  if (!lesson) {
    notFound()
  }

  return (
    <div className="flex-1">
      <div className="prose prose-blue max-w-none [&_.video-section]:mt-0 [&_.video-section+h1]:mt-12 prose-h1:mt-12 prose-h2:mt-12 [&_img]:max-w-[100%] [&_img]:mx-0 [&_div.my-8]:mx-0 [&_div.my-8]:w-full [&_div.my-8_img]:w-full">
        {mdxSource && (
          <MDXRemote
            {...mdxSource}
            components={components}
            scope={{
              lesson1Quiz, lesson2Quiz, lesson3Quiz, lesson4Quiz,
              lesson5Quiz, lesson6Quiz, lesson7Quiz, lesson8Quiz,
              lesson9Quiz, lesson10Quiz, lesson11Quiz, lesson12Quiz
            }}
          />
        )}
      </div>
    </div>
  )
} 