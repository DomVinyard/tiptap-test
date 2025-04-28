import type { MDXComponents } from 'mdx/types'
import { VideoSection } from './src/components/VideoSection'
import { Quiz } from './src/components/Quiz'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    VideoSection,
    Quiz,
    ...components,
  }
} 