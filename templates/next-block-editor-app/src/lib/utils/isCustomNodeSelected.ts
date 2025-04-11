import { Editor } from '@tiptap/core'
import { ImageBlock } from '@/extensions/ImageBlock'
import { Columns } from '@/extensions/MultiColumn'

export const isCustomNodeSelected = (editor: Editor, node: HTMLElement) => {
  const customNodes = [
    ImageBlock.name,
    Columns.name,
  ]

  return customNodes.some(nodeName => node.classList.contains(`node-${nodeName}`))
}

export default isCustomNodeSelected
