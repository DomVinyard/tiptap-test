import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { HelloWorldView } from './components/HelloWorldView'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    helloWorld: {
      setHelloWorld: () => ReturnType
    }
  }
}

export const HelloWorld = Node.create({
  name: 'helloWorld',

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
      setHelloWorld:
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
    return ReactNodeViewRenderer(HelloWorldView)
  },
})
