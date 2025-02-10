import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { GoodbyeWorldView } from './components/GoodbyeWorldView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    goodbyeWorld: {
      setGoodbyeWorld: () => ReturnType
    }
  }
}

export const GoodbyeWorld = Node.create({
  name: 'goodbyeWorld',

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
      setGoodbyeWorld:
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
    return ReactNodeViewRenderer(GoodbyeWorldView)
  },
})
