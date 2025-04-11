import { EditorContent } from '@tiptap/react'
import React, { useRef, useState, useCallback } from 'react'

import { LinkMenu } from '@/components/menus'
import { useBlockEditor } from '@/hooks/useBlockEditor'
import '@/styles/index.css'

import { Sidebar } from '@/components/Sidebar'
import { RightSidebar } from '@/components/Sidebar/RightSidebar'
import ImageBlockMenu from '@/extensions/ImageBlock/components/ImageBlockMenu'
import { ColumnsMenu } from '@/extensions/MultiColumn/menus'
import { TableColumnMenu, TableRowMenu } from '@/extensions/Table/menus'
import { ModelPicker } from './components/ModelPicker'
import { FlowRunner } from './components/FlowRunner'
import { ContentItemMenu } from '../menus/ContentItemMenu'
import * as Y from 'yjs'
import { TiptapCollabProvider } from '@hocuspocus/provider'
import { Icon } from '@/components/ui/Icon'

const InputTag = ({ label, onClick, isSelected }: { label: string; onClick: () => void; isSelected: boolean }) => (
  <div 
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm cursor-pointer bg-emerald-50 dark:bg-emerald-950 ${
      isSelected ? 'ring-2 ring-blue-500' : ''
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
  ydoc,
  provider,
}: {
  ydoc: Y.Doc | null
  provider?: TiptapCollabProvider | null | undefined
}) => {
  const [isEditable, setIsEditable] = useState(true)
  const [selectedInput, setSelectedInput] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState(false)
  const [hasContent, setHasContent] = useState(false)
  const menuContainerRef = useRef(null)

  const { editor, users, collabState } = useBlockEditor({
    ydoc,
    provider,
    onTransaction({ editor: currentEditor }) {
      setIsEditable(currentEditor.isEditable)
      setHasContent(!currentEditor.isEmpty)
    },
  })

  // Handle clicks outside of input tags and model selector
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if the click is outside of input tags and model selector
      if (!target.closest('.input-tags-container') && !target.closest('.model-selector')) {
        setSelectedInput(null);
        setSelectedModel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleModelSelect = useCallback((isSelected: boolean) => {
    setSelectedModel(isSelected);
    if (isSelected) {
      setSelectedInput(null);
    }
  }, []);

  if (!editor || !users) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100" ref={menuContainerRef}>
      <Sidebar editor={editor} />
      <div className="relative flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto bg-neutral-100">
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white dark:bg-black shadow-sm rounded-t-lg">
              <div className="px-20 pt-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">My App</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-6">This is a short description of the app</p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex gap-2 items-center input-tags-container">
                    <InputTag 
                      label="input_1" 
                      onClick={() => {
                        setSelectedInput('input_1');
                        setSelectedModel(false);
                      }}
                      isSelected={selectedInput === 'input_1'}
                    />
                    <InputTag 
                      label="input_2" 
                      onClick={() => {
                        setSelectedInput('input_2');
                        setSelectedModel(false);
                      }}
                      isSelected={selectedInput === 'input_2'}
                    />
                    <AddInputButton />
                  </div>
                </div>
                <hr className="border-neutral-200 dark:border-neutral-800" />
              </div>
            </div>
            <div className="bg-white shadow-sm">
              <div className="w-full [&_*]:outline-none p-0">
                <EditorContent className="p-0" editor={editor} />
              </div>
            </div>
            {hasContent && (
              <div className="mt-4 model-selector">
                <ModelPicker onSelect={handleModelSelect} isModelSelected={selectedModel} />
              </div>
            )}
          </div>
        </div>
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        <div className="flex-none bg-white border-t border-neutral-200 dark:bg-black dark:border-neutral-800">
          <div className="max-w-4xl mx-auto w-full py-2">
            <FlowRunner />
          </div>
        </div>
      </div>
      <RightSidebar selectedInput={selectedInput} selectedModel={selectedModel} />
    </div>
  )
}

export default BlockEditor
