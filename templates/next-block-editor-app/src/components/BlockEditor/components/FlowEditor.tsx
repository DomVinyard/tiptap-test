import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Surface } from '@/components/ui/Surface'
import { useCallback, useState } from 'react'
import { ModelPicker } from './ModelPicker'

type FlowEditorProps = {
  isFirst?: boolean
}

export const FlowEditor = ({ isFirst = false }: FlowEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Continue flow...'
      })
    ],
    editorProps: {
      attributes: {
        class: 'w-full p-4'
      }
    },
    content: '',
    autofocus: true,
    onUpdate: ({ editor }) => {
      // Only consider it has content if there's actual text, not just empty paragraphs
      const hasContent = editor.getText().trim().length > 0;
      setHasContent(hasContent);
    }
  })

  const [hasContent, setHasContent] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Surface className="w-full">
        <div className={`w-full [&_*]:outline-none ${isFirst ? 'first-editor' : 'subsequent-editor'}`}>
          <EditorContent className="w-full" editor={editor} />
        </div>
      </Surface>
      {hasContent && (
        <div className="mt-4">
          <ModelPicker isSecondary={true} />
        </div>
      )}
    </div>
  )
} 