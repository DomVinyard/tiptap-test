import { NodeViewWrapper } from '@tiptap/react'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'

export const GoodbyeWorldView = () => {
  const handleGoodbye = () => {
    alert('Goodbye World! 👋')
  }

  return (
    <NodeViewWrapper data-drag-handle>
      <Panel noShadow className="w-full">
        <div className="flex items-center justify-center p-4">
          <Button onClick={handleGoodbye}>Say Goodbye</Button>
        </div>
      </Panel>
    </NodeViewWrapper>
  )
}
