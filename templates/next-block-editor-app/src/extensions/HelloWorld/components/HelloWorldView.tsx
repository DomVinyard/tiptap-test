import { NodeViewWrapper } from '@tiptap/react'
import { Panel } from '@/components/ui/Panel'

export const HelloWorldView = () => {
  return (
    <NodeViewWrapper data-drag-handle>
      <Panel noShadow className="w-full">
        <div className="flex items-center justify-center p-4">
          <h2 className="text-xl font-bold">Hello World! 👋</h2>
        </div>
      </Panel>
    </NodeViewWrapper>
  )
}
