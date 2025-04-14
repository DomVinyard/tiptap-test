'use client'

import { TiptapCollabProvider } from '@hocuspocus/provider'
import 'iframe-resizer/js/iframeResizer.contentWindow'
import { useEffect, useState } from 'react'
import { Doc as YDoc } from 'yjs'

import { BlockEditor } from '@/components/BlockEditor'
import { useCollaboration } from '@/hooks/useCollaboration'

const useDarkmode = () => {
  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  return {
    isDarkMode: false,
    toggleDarkMode: () => {},
    lightMode: () => {},
    darkMode: () => {},
  }
}

export default function WeekOneExperiment() {
  const { isDarkMode } = useDarkmode()
  const [aiToken, setAiToken] = useState<string | null | undefined>()
  
  const providerState = useCollaboration({
    docId: 'week-1',
    enabled: true,
  })

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('No AI token provided, please set TIPTAP_AI_SECRET in your environment')
        }
        const data = await response.json()
        const { token } = data
        setAiToken(token)
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message)
        }
        setAiToken(null)
        return
      }
    }

    dataFetch()
  }, [])

  if (providerState.state === 'loading' || aiToken === undefined) return null

  // Only render BlockEditor when we have both yDoc and provider
  if (!providerState.yDoc || !providerState.provider) return null

  return (
    <div className="relative">
      <BlockEditor ydoc={providerState.yDoc} provider={providerState.provider} />
    </div>
  )
} 