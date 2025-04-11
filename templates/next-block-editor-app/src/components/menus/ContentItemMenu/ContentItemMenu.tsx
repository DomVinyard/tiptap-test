import { Icon } from '@/components/ui/Icon'
import { Toolbar } from '@/components/ui/Toolbar'
import { Editor } from '@tiptap/react'

import * as Popover from '@radix-ui/react-popover'
import { Surface } from '@/components/ui/Surface'
import { DropdownButton } from '@/components/ui/Dropdown'
import useContentItemActions from './hooks/useContentItemActions'
import { useData } from './hooks/useData'
import { useEffect, useState } from 'react'

export type ContentItemMenuProps = {
  editor: Editor
  isEditable?: boolean
}

export const ContentItemMenu = ({ editor, isEditable = true }: ContentItemMenuProps) => {
  const { currentNode, currentNodePos, handleNodeChange } = useData()
  const { resetTextFormatting, duplicateNode, copyNodeToClipboard, deleteNode } = useContentItemActions(
    editor,
    currentNode,
    currentNodePos,
  )

  return (
    <div className="flex items-center gap-1">
      <Toolbar.Button
        onClick={resetTextFormatting}
        tooltip="Reset formatting"
        disabled={!isEditable}
      >
        <Icon name="TextCursor" />
      </Toolbar.Button>
      <Toolbar.Button
        onClick={duplicateNode}
        tooltip="Duplicate"
        disabled={!isEditable}
      >
        <Icon name="Copy" />
      </Toolbar.Button>
      <Toolbar.Button
        onClick={copyNodeToClipboard}
        tooltip="Copy to clipboard"
      >
        <Icon name="Clipboard" />
      </Toolbar.Button>
      <Toolbar.Button
        onClick={deleteNode}
        tooltip="Delete"
        disabled={!isEditable}
      >
        <Icon name="Trash" />
      </Toolbar.Button>
    </div>
  )
}
