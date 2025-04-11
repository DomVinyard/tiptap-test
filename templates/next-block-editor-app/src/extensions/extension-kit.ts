'use client'

import { HocuspocusProvider } from '@hocuspocus/provider'
import { Extension } from '@tiptap/core'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { MetaView } from './Meta/components/MetaView'

import { API } from '@/lib/api'

import {
  BlockquoteFigure,
  CharacterCount,
  CodeBlock,
  Color,
  Document,
  Dropcursor,
  Figcaption,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  ImageBlock,
  Link,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  Underline,
  Columns,
  Column,
  TaskItem,
  TaskList,
  HelloWorld,
  GoodbyeWorld,
} from '.'

import { ImageUpload } from './ImageUpload'
import { isChangeOrigin } from '@tiptap/extension-collaboration'

interface ExtensionKitProps {
  provider?: HocuspocusProvider | null
}

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

export const ExtensionKit = ({ provider }: ExtensionKitProps) => {
  return [
    StarterKit.configure({
      document: false,
      dropcursor: false,
      heading: false,
      horizontalRule: false,
      blockquote: false,
    }),
    Document,
    Dropcursor,
    Heading,
    HorizontalRule,
    BlockquoteFigure,
    CharacterCount,
    CodeBlock,
    Color,
    Focus,
    FontFamily,
    FontSize,
    Highlight,
    ImageBlock,
    Link,
    Placeholder,
    Selection,
    SlashCommand,
    Subscript,
    Superscript,
    Table,
    TableCell,
    TableHeader,
    TableRow,
    TextAlign,
    TextStyle,
    TrailingNode,
    Typography,
    Underline,
    Columns,
    Column,
    TaskItem,
    TaskList,
    HelloWorld,
    GoodbyeWorld,
    Meta,
    ImageUpload.configure({
      clientId: provider?.document?.clientID,
    }),
  ]
}

export default ExtensionKit
