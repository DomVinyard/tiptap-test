'use client'

import Link from 'next/link'
import { Surface } from '@/components/ui/Surface'

const experiments = [
  {
    id: 'three-layers-abstraction',
    title: 'Three Layers of Abstraction',
    description: 'A dedicated environment for creating, managing, and interacting with AI agents, featuring a modern studio interface for agent development and testing.',
    date: '2024-04-30',
  },
  {
    id: 'agents-studio',
    title: 'Agents & Studio',
    description: 'A dedicated environment for creating, managing, and interacting with AI agents, featuring a modern studio interface for agent development and testing.',
    date: '2024-04-24',
  },
  {
    id: 'inline-runtime',
    title: 'Inline Runtime UX',
    description: 'Exploring improvements to the runtime user experience with inline interactions and feedback.',
    date: '2024-04-14',
  },
  {
    id: 'week-1',
    title: 'Initial Experiments',
    description: 'Exploring editor concepts with persistent right sidebar for document/component editing, refined block and app language, block exportability for AI via npm/github, and an improved flow interface in the center panel.',
    date: '2024-04-07',
  },
  {
    id: 'education-101',
    title: 'Fundamentals',
    description: 'A basic educational environment for learning and experimenting with the platform fundamentals.',
    date: '2024-04-28',
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Wordware Experiments</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          A sandbox for exploring and testing new ideas at Wordware. Each experiment explores concepts that could inform the future of the platform.
        </p>
      </div>
      <div className="space-y-4">
        {experiments.map((experiment) => (
          <Link key={experiment.id} href={`/${experiment.id}`} className="block">
            <Surface className="p-6 transition-all hover:ring-2 hover:ring-blue-500 cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">{experiment.title}</h2>
              <p className="text-neutral-500 dark:text-neutral-400 mb-4">{experiment.description}</p>
              <time className="text-sm text-neutral-400 dark:text-neutral-500">{experiment.date}</time>
            </Surface>
          </Link>
        ))}
      </div>
    </div>
  )
} 