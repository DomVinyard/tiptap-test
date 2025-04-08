'use client'

import { Icon } from '@/components/ui/Icon'
import { EditorUser } from '../types'
import { WebSocketStatus } from '@hocuspocus/provider'
import { Toolbar } from '@/components/ui/Toolbar'
import { Editor } from '@tiptap/core'

export type EditorHeaderProps = {
  editor: Editor
  collabState: WebSocketStatus
  users: EditorUser[]
}

export const EditorHeader = ({ editor }: EditorHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between flex-none py-4 pl-6 pr-3 text-black bg-white border-b border-neutral-200 dark:bg-black dark:text-white dark:border-neutral-800">
      <div className="flex flex-row gap-x-1.5 items-center">
        <img 
          src="https://cdn.prod.website-files.com/66e00503e1e57f5fafdfa7d5/66e005da47c0c33bca665c3a_wordware-logotype.svg" 
          alt="Wordware"
          className="h-5 opacity-70 hover:opacity-100 transition-opacity"
        />
      </div>
    </div>
  )
} 