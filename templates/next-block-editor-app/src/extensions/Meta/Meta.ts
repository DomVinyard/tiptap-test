import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { MetaView } from './components/MetaView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    meta: {
      setMeta: () => ReturnType
    }
  }
}

export const Meta = Node.create({
  name: 'meta',

  group: 'block',

  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: `node-${this.name}`,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: `div.node-${this.name}`,
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setMeta:
        () =>
        ({ chain }) =>
          chain()
            .focus()
            .insertContent({
              type: this.name,
            })
            .run(),
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(MetaView)
  },
})
