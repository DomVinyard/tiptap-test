import { useCallback } from 'react'
import { Editor } from '@tiptap/core'
import { BubbleMenu } from '@tiptap/react'

import { Surface } from '@/components/ui/Surface'
import { Toolbar } from '@/components/ui/Toolbar'
import { Icon } from '@/components/ui/Icon'
import { ColorPicker } from '@/components/panels'
import { useTextmenuCommands } from './hooks/useTextmenuCommands'

export interface TextMenuProps {
  editor: Editor
}

export const TextMenu = ({ editor }: TextMenuProps) => {
  const {
    onBold,
    onItalic,
    onStrike,
    onUnderline,
    onCode,
    onCodeBlock,
    onSubscript,
    onSuperscript,
    onAlignLeft,
    onAlignCenter,
    onAlignRight,
    onAlignJustify,
    onChangeColor,
    onClearColor,
    onChangeHighlight,
    onClearHighlight,
  } = useTextmenuCommands(editor)

  const handleColorChange = useCallback(
    (color: string) => {
      onChangeColor(color)
    },
    [onChangeColor],
  )

  const handleHighlightChange = useCallback(
    (color: string) => {
      onChangeHighlight(color)
    },
    [onChangeHighlight],
  )

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <Surface className="p-1">
        <Toolbar.Wrapper>
          <Toolbar.Button
            variant="ghost"
            onClick={onBold}
            active={editor.isActive('bold')}
            tooltip="Bold"
          >
            <Icon name="Bold" className="h-4 w-4" />
          </Toolbar.Button>
          <Toolbar.Button
            variant="ghost"
            onClick={onItalic}
            active={editor.isActive('italic')}
            tooltip="Italic"
          >
            <Icon name="Italic" className="h-4 w-4" />
          </Toolbar.Button>
          <Toolbar.Button
            variant="ghost"
            onClick={onStrike}
            active={editor.isActive('strike')}
            tooltip="Strike"
          >
            <Icon name="Strikethrough" className="h-4 w-4" />
          </Toolbar.Button>
          <Toolbar.Button
            variant="ghost"
            onClick={onUnderline}
            active={editor.isActive('underline')}
            tooltip="Underline"
          >
            <Icon name="Underline" className="h-4 w-4" />
          </Toolbar.Button>
          <Toolbar.Button
            variant="ghost"
            onClick={onCode}
            active={editor.isActive('code')}
            tooltip="Code"
          >
            <Icon name="Code" className="h-4 w-4" />
          </Toolbar.Button>
          <Toolbar.Button
            variant="ghost"
            onClick={onCodeBlock}
            active={editor.isActive('codeBlock')}
            tooltip="Code Block"
          >
            <Icon name="Code" className="h-4 w-4" />
          </Toolbar.Button>
          <Toolbar.Button
            variant="ghost"
            onClick={onSubscript}
            active={editor.isActive('subscript')}
            tooltip="Subscript"
          >
            <Icon name="Subscript" className="h-4 w-4" />
          </Toolbar.Button>
          <Toolbar.Button
            variant="ghost"
            onClick={onSuperscript}
            active={editor.isActive('superscript')}
            tooltip="Superscript"
          >
            <Icon name="Superscript" className="h-4 w-4" />
          </Toolbar.Button>
          <Toolbar.Button
            variant="ghost"
            onClick={onAlignLeft}
            active={editor.isActive({ textAlign: 'left' })}
            tooltip="Align Left"
          >
            <Icon name="AlignLeft" className="h-4 w-4" />
          </Toolbar.Button>
          <Toolbar.Button
            variant="ghost"
            onClick={onAlignCenter}
            active={editor.isActive({ textAlign: 'center' })}
            tooltip="Align Center"
          >
            <Icon name="AlignCenter" className="h-4 w-4" />
          </Toolbar.Button>
          <Toolbar.Button
            variant="ghost"
            onClick={onAlignRight}
            active={editor.isActive({ textAlign: 'right' })}
            tooltip="Align Right"
          >
            <Icon name="AlignRight" className="h-4 w-4" />
          </Toolbar.Button>
          <Toolbar.Button
            variant="ghost"
            onClick={onAlignJustify}
            active={editor.isActive({ textAlign: 'justify' })}
            tooltip="Align Justify"
          >
            <Icon name="AlignJustify" className="h-4 w-4" />
          </Toolbar.Button>
          <ColorPicker
            color={editor.getAttributes('textStyle').color}
            onChange={handleColorChange}
            onClear={onClearColor}
          />
          <ColorPicker
            color={editor.getAttributes('highlight').color}
            onChange={handleHighlightChange}
            onClear={onClearHighlight}
          />
        </Toolbar.Wrapper>
      </Surface>
    </BubbleMenu>
  )
}
