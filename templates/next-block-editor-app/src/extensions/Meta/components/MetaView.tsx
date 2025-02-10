import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { Panel } from '@/components/ui/Panel'
import { Bot } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

export const MetaView = ({ editor, getPos }: NodeViewProps) => {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus on mount with a small delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
    return () => clearTimeout(timeoutId)
  }, [])

  // Handle blur to remove component
  const handleBlur = useCallback(() => {
    if (!isLoading) {
      // Clear the input
      setValue('')
      // Remove the node
      const pos = typeof getPos === 'function' ? getPos() : editor.state.selection.$anchor.pos
      if (pos >= 0) {
        editor
          .chain()
          .focus()
          .deleteRange({ from: pos, to: pos + 1 })
          .run()
      }
    }
  }, [editor, getPos, isLoading])

  // Generate text using our API
  const generateText = async (prompt: string) => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate text')
      }

      const data = await response.json()
      console.log('API Response:', data)

      if (data.error) {
        throw new Error(data.error)
      }

      if (!data.text || !Array.isArray(data.text)) {
        console.error('Invalid response format - expected data.text to be an array:', data)
        throw new Error('Invalid response format')
      }

      return data.text
    } catch (error) {
      console.error('Error generating text:', error)
      return [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Error generating text. Please try again.' }],
        },
      ]
    }
  }

  // Handle key events (Escape to dismiss, Enter to submit)
  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        // Clear the input
        setValue('')
        // Let the input lose focus
        inputRef.current?.blur()
        // Remove the node
        const pos = editor.state.selection.$anchor.pos
        editor
          .chain()
          .focus()
          .deleteRange({ from: pos - 1, to: pos + 1 })
          .run()
      } else if (e.key === 'Enter' && !isLoading) {
        e.preventDefault()
        setIsLoading(true)

        try {
          // Get the position after the current node
          const pos = typeof getPos === 'function' ? getPos() + 1 : editor.state.selection.$anchor.pos

          // Generate text using our API
          const blocks = await generateText(value)

          // Remove the agent node first
          editor
            .chain()
            .focus()
            .deleteRange({ from: pos - 1, to: pos })
            .run()

          // Create a new chain
          let chain = editor.chain().focus()

          // Insert each block sequentially if blocks exist
          if (Array.isArray(blocks)) {
            blocks.forEach((block: any) => {
              chain = chain.insertContent(block)
            })
            // Execute all insertions in one transaction
            chain.run()
          } else {
            console.error('Invalid response format:', blocks)
            editor
              .chain()
              .focus()
              .insertContent({
                type: 'paragraph',
                content: [{ type: 'text', text: 'Error: Invalid response format. Please try again.' }],
              })
              .run()
          }
        } catch (error) {
          console.error('Error:', error)
          editor
            .chain()
            .focus()
            .insertContent({
              type: 'paragraph',
              content: [{ type: 'text', text: 'Error generating text. Please try again.' }],
            })
            .run()
        } finally {
          setIsLoading(false)
        }
      }
    },
    [editor, getPos, value, isLoading],
  )

  return (
    <NodeViewWrapper data-drag-handle>
      <Panel noShadow className="w-full">
        <div className={`relative p-4 rounded-lg transition-colors duration-150 ${isLoading ? 'bg-[#f0f7ff]' : ''}`}>
          <div className="absolute top-4 left-4">
            <Bot className={`w-5 h-5 ${isLoading ? 'text-blue-500 animate-pulse' : 'text-gray-500'}`} />
          </div>
          <div className="pl-8">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder={isLoading ? 'Generating...' : 'What do you need to do next?'}
              className="w-full bg-transparent border-none outline-none placeholder:text-gray-400"
              disabled={isLoading}
              autoFocus
            />
          </div>
        </div>
      </Panel>
    </NodeViewWrapper>
  )
}
