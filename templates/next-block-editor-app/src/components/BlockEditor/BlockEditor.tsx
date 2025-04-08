import { EditorContent } from '@tiptap/react'
import React, { useRef, useState } from 'react'

import { LinkMenu } from '@/components/menus'
import { useBlockEditor } from '@/hooks/useBlockEditor'
import '@/styles/index.css'

import { Sidebar } from '@/components/Sidebar'
import { RightSidebar } from '@/components/Sidebar/RightSidebar'
import ImageBlockMenu from '@/extensions/ImageBlock/components/ImageBlockMenu'
import { ColumnsMenu } from '@/extensions/MultiColumn/menus'
import { TableColumnMenu, TableRowMenu } from '@/extensions/Table/menus'
import { EditorHeader } from './components/EditorHeader'
import { ModelPicker } from './components/ModelPicker'
import { FlowRunner } from './components/FlowRunner'
import { TextMenu } from '../menus/TextMenu'
import { ContentItemMenu } from '../menus/ContentItemMenu'
import * as Y from 'yjs'
import { TiptapCollabProvider } from '@hocuspocus/provider'

const InputTag = ({ label }: { label: string }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg text-sm">
    <span className="text-xs text-emerald-500 font-medium">abc</span>
    <span className="text-gray-900">{label}</span>
  </div>
)

const NewInputButton = () => (
  <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
    <span className="text-gray-600">+</span>
    <span className="text-gray-900">New Input</span>
  </button>
)

export const BlockEditor = ({
  aiToken,
  ydoc,
  provider,
}: {
  aiToken?: string
  ydoc: Y.Doc | null
  provider?: TiptapCollabProvider | null | undefined
}) => {
  const [isEditable, setIsEditable] = useState(true)
  const menuContainerRef = useRef(null)

  const { editor, users, collabState } = useBlockEditor({
    aiToken,
    ydoc,
    provider,
    onTransaction({ editor: currentEditor }) {
      setIsEditable(currentEditor.isEditable)
    },
  })

  if (!editor || !users) {
    return null
  }

  return (
    <div className="flex h-screen bg-neutral-100" ref={menuContainerRef}>
      <Sidebar editor={editor} />
      <div className="relative flex flex-col flex-1 h-screen overflow-hidden">
        <EditorHeader
          editor={editor}
          collabState={collabState}
          users={users}
        />
        <div className="flex-1 overflow-y-auto bg-neutral-100">
          <div className="max-w-4xl mx-auto mt-8">
            <div className="mb-8">
              <h2 className="text-gray-500 mb-4 text-sm font-medium">INPUTS</h2>
              <div className="flex gap-2 items-center">
                <InputTag label="topic" />
                <InputTag label="style" />
                <NewInputButton />
              </div>
            </div>
            <div className="bg-white shadow-sm">
              <div className="w-full [&_*]:outline-none p-0">
                <EditorContent className="p-0" editor={editor} />
              </div>
            </div>
            <div className="mt-4">
              <ModelPicker />
            </div>
          </div>
        </div>
        <ContentItemMenu editor={editor} isEditable={isEditable} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        <div className="flex-none bg-white border-t border-neutral-200 dark:bg-black dark:border-neutral-800">
          <div className="max-w-4xl mx-auto w-full">
            <FlowRunner />
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  )
}

export default BlockEditor
