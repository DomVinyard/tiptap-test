import { useEffect, useState } from 'react'
import { useEditor, useEditorState } from '@tiptap/react'
import type { AnyExtension, Editor, EditorOptions } from '@tiptap/core'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { TiptapCollabProvider, WebSocketStatus } from '@hocuspocus/provider'
import type { Doc as YDoc } from 'yjs'

import { ExtensionKit } from '@/extensions/extension-kit'
import { userColors, userNames } from '../lib/constants'
import { randomElement } from '../lib/utils'
import type { EditorUser } from '../components/BlockEditor/types'
import { initialContent } from '@/lib/data/initialContent'
import { HelloWorld } from '@/extensions/HelloWorld'

declare global {
  interface Window {
    editor: Editor | null
  }
}

export const useBlockEditor = ({
  ydoc,
  provider,
  userId,
  userName = 'Maxi',
  ...editorOptions
}: {
  ydoc: YDoc | null
  provider?: TiptapCollabProvider | null | undefined
  userId?: string
  userName?: string
} & Partial<Omit<EditorOptions, 'extensions'>>) => {
  const [collabState, setCollabState] = useState<WebSocketStatus>(
    provider ? WebSocketStatus.Connecting : WebSocketStatus.Disconnected,
  )

  const editor = useEditor(
    {
      ...editorOptions,
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      onCreate: ctx => {
        if (provider && !provider.isSynced) {
          provider.on('synced', () => {
            setTimeout(() => {
              if (ctx.editor.isEmpty) {
                ctx.editor.commands.setContent(initialContent)
              }
            }, 0)
          })
        } else if (ctx.editor.isEmpty) {
          ctx.editor.commands.setContent(initialContent)
          ctx.editor.commands.focus('start', { scrollIntoView: true })
        }
      },
    },
  )

  return {
    editor,
    collabState,
    setCollabState,
  }
} 