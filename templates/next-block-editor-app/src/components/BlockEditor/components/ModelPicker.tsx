import { Icon } from '@/components/ui/Icon'
import { Surface } from '@/components/ui/Surface'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { DropdownButton } from '@/components/ui/Dropdown'
import { useState, useCallback } from 'react'
import { FlowEditor } from './FlowEditor'

const models = [
  { id: 'gpt-4o', name: 'GPT-4O' },
  { id: 'gpt-4o-mini', name: 'GPT-4O Mini' }
]

export const ModelPicker = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)

  const handleReset = useCallback(() => {
    setSelectedModel(null)
  }, [])

  return (
    <>
      <Surface className="flex items-center justify-between p-4 mb-4 max-w-4xl mx-auto" style={{ backgroundColor: '#EBEBEB' }}>
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <button className="flex items-center gap-2">
              <span className="text-neutral-900">{selectedModel ? models.find(m => m.id === selectedModel)?.name : 'Select AI model to run'}</span>
              <Icon name="ChevronDown" className="w-4 h-4" />
            </button>
          </Dropdown.Trigger>
          <Dropdown.Portal>
            <Dropdown.Content align="start" className="z-50">
              <Surface className="p-2 min-w-[12rem]">
                {models.map(model => (
                  <Dropdown.Item key={model.id} asChild>
                    <DropdownButton 
                      isActive={selectedModel === model.id}
                      onClick={() => setSelectedModel(model.id)}
                    >
                      {model.name}
                    </DropdownButton>
                  </Dropdown.Item>
                ))}
              </Surface>
            </Dropdown.Content>
          </Dropdown.Portal>
        </Dropdown.Root>
        <button 
          className="text-neutral-400 hover:text-neutral-600"
          onClick={handleReset}
        >
          <Icon name="X" className="w-4 h-4" />
        </button>
      </Surface>
      {selectedModel && <FlowEditor />}
    </>
  )
} 