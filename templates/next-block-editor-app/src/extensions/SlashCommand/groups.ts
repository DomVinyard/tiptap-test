import { Group } from './types'

export const GROUPS: Group[] = [
  {
    name: 'ai',
    title: 'AI',
    commands: [
      {
        name: 'aiWriter',
        label: 'AI Writer',
        iconName: 'Sparkles',
        description: 'Let AI finish your thoughts',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => editor.chain().focus().setAiWriter().run(),
      },
      {
        name: 'aiImage',
        label: 'AI Image',
        iconName: 'Sparkles',
        description: 'Generate an image from text',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => editor.chain().focus().setAiImage().run(),
      },
    ],
  },
  {
    name: 'format',
    title: 'Format',
    commands: [
      {
        name: 'heading1',
        label: 'Heading 1',
        iconName: 'Heading1',
        description: 'High priority section title',
        aliases: ['h1'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 1 }).run()
        },
      },
      {
        name: 'heading2',
        label: 'Heading 2',
        iconName: 'Heading2',
        description: 'Medium priority section title',
        aliases: ['h2'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 2 }).run()
        },
      },
      {
        name: 'heading3',
        label: 'Heading 3',
        iconName: 'Heading3',
        description: 'Low priority section title',
        aliases: ['h3'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 3 }).run()
        },
      },
      {
        name: 'bulletList',
        label: 'Bullet List',
        iconName: 'List',
        description: 'Unordered list of items',
        aliases: ['ul'],
        action: editor => {
          editor.chain().focus().toggleBulletList().run()
        },
      },
      {
        name: 'orderedList',
        label: 'Ordered List',
        iconName: 'ListOrdered',
        description: 'Ordered list of items',
        aliases: ['ol'],
        action: editor => {
          editor.chain().focus().toggleOrderedList().run()
        },
      },
      {
        name: 'taskList',
        label: 'Task List',
        iconName: 'CheckSquare',
        description: 'List with checkboxes',
        aliases: ['todo'],
        action: editor => {
          editor.chain().focus().toggleTaskList().run()
        },
      },
      {
        name: 'codeBlock',
        label: 'Code Block',
        iconName: 'Code2',
        description: 'Code with syntax highlighting',
        aliases: ['code'],
        action: editor => {
          editor.chain().focus().setCodeBlock().run()
        },
      },
    ],
  },
  {
    name: 'insert',
    title: 'Insert',
    commands: [
      {
        name: 'horizontalRule',
        label: 'Horizontal Rule',
        iconName: 'Minus',
        description: 'Insert a horizontal divider',
        aliases: ['hr', 'divider', '---'],
        action: editor => {
          editor.chain().focus().setHorizontalRule().run()
        },
      },
      {
        name: 'columns',
        label: 'Columns',
        iconName: 'Columns',
        description: 'Add two columns side by side',
        aliases: ['cols'],
        action: editor => {
          editor.chain().focus().setColumns().run()
        },
      },
      {
        name: 'table',
        label: 'Table',
        iconName: 'Table',
        description: 'Insert a table',
        aliases: ['tb'],
        action: editor => {
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        },
      },
      {
        name: 'image',
        label: 'Image',
        iconName: 'Image',
        description: 'Upload an image',
        aliases: ['img'],
        action: editor => {
          editor.chain().focus().setImageUpload().run()
        },
      },
    ],
  },
]

export default GROUPS
