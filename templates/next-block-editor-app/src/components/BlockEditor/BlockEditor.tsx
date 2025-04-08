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
import { Icon } from '@/components/ui/Icon'

const InputTag = ({ label, onClick, isSelected }: { label: string; onClick: () => void; isSelected: boolean }) => (
  <div 
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm cursor-pointer ${
      isSelected ? 'bg-emerald-100 dark:bg-emerald-900' : 'bg-emerald-50 dark:bg-emerald-950'
    }`}
  >
    <span className="text-xs text-emerald-500 font-medium">abc</span>
    <span className="text-gray-900 dark:text-gray-100">{label}</span>
  </div>
)

const AddInputButton = () => (
  <button className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm border border-dashed border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
    <Icon name="Plus" className="w-4 h-4 mr-1" />
    Add input
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
  const [selectedInput, setSelectedInput] = useState<string | null>(null)
  const menuContainerRef = useRef(null)

  const { editor, users, collabState } = useBlockEditor({
    aiToken,
    ydoc,
    provider,
    onTransaction({ editor: currentEditor }) {
      setIsEditable(currentEditor.isEditable)
    },
  })

  // Handle clicks outside of input tags
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if the click is outside of input tags
      if (!target.closest('.input-tags-container')) {
        setSelectedInput(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              <div className="flex items-center gap-4">
                <h2 className="text-gray-500 text-sm font-medium">INPUTS</h2>
                <div className="flex gap-2 items-center input-tags-container">
                  <InputTag 
                    label="topic" 
                    onClick={() => setSelectedInput('topic')}
                    isSelected={selectedInput === 'topic'}
                  />
                  <InputTag 
                    label="style" 
                    onClick={() => setSelectedInput('style')}
                    isSelected={selectedInput === 'style'}
                  />
                  <AddInputButton />
                </div>
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
      <RightSidebar selectedInput={selectedInput} />
    </div>
  )
}

export default BlockEditor
