import { Icon } from '@/components/ui/Icon'
import { Surface } from '@/components/ui/Surface'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { DropdownButton } from '@/components/ui/Dropdown'
import { useState, useCallback, useEffect } from 'react'
import { FlowEditor } from './FlowEditor'

const models = [
  { id: 'gpt-4o', name: 'GPT-4o' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini' }
]

type ModelPickerProps = {
  isSecondary?: boolean
  onSelect?: (isSelected: boolean) => void
  isModelSelected?: boolean
}

export const ModelPicker = ({ isSecondary = false, onSelect, isModelSelected = false }: ModelPickerProps) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [isSelected, setIsSelected] = useState(false)

  // Sync isSelected state with parent component
  useEffect(() => {
    setIsSelected(isModelSelected)
  }, [isModelSelected])

  const handleReset = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedModel(null)
    setIsSelected(false)
    onSelect?.(false)
  }, [onSelect])

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (selectedModel) {
      e.stopPropagation()
      setIsSelected(!isSelected)
      onSelect?.(!isSelected)
    }
  }, [selectedModel, isSelected, onSelect])

  const handleModelSelect = useCallback((modelId: string) => {
    setSelectedModel(modelId)
  }, [])

  return (
    <>
      <Surface 
        className={`!bg-gradient-to-br from-neutral-200 via-neutral-200 to-neutral-300 dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-700 flex items-center justify-between p-4 max-w-4xl mx-auto border-0 shadow-xl shadow-black/10 dark:shadow-white/5 transition-all mb-4 ${!isSecondary ? '!rounded-tl-none !rounded-tr-none' : ''} ${selectedModel && isSelected ? 'ring-2 ring-blue-500' : ''} ${selectedModel ? 'cursor-pointer' : ''}`}
        withBorder={false}
        onClick={handleClick}
      >
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <button className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-neutral-400 transition-all ml-14">
                <Icon name="Sparkles" className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-neutral-500 ml-0  !text-sm">{selectedModel ? models.find(m => m.id === selectedModel)?.name : 'Select AI model to run'}</span>
              <Icon name="ChevronDown" className="w-4 h-4 text-neutral-500" />
            </button>
          </Dropdown.Trigger>
          <Dropdown.Portal>
            <Dropdown.Content align="start" className="z-50">
              <Surface className="p-2 min-w-[12rem]">
                {models.map(model => (
                  <Dropdown.Item key={model.id} asChild>
                    <DropdownButton 
                      isActive={selectedModel === model.id}
                      onClick={() => handleModelSelect(model.id)}
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
          className="text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors"
          onClick={handleReset}
        >
          <Icon name="X" className="w-4 h-4" />
        </button>
      </Surface>
      {selectedModel && <FlowEditor isFirst={false} />}
    </>
  )
} 