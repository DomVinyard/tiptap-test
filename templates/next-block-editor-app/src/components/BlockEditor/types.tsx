import type { Doc as YDoc } from 'yjs'
import type { TiptapCollabProvider } from '@hocuspocus/provider'

export type EditorUser = {
  clientId: string
  name: string
  color: string
}

export type BlockEditorProps = {
  ydoc: YDoc | null
  provider?: TiptapCollabProvider | null | undefined
}
