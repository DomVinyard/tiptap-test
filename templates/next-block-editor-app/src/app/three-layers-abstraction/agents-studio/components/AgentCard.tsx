import { Surface } from '@/components/ui/Surface'

interface AgentCardProps {
  name: string
  description: string
  status: 'active' | 'inactive'
  onClick?: () => void
}

export function AgentCard({ name, description, status, onClick }: AgentCardProps) {
  return (
    <Surface
      className="p-4 cursor-pointer transition-all hover:ring-2 hover:ring-blue-500"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium mb-1">{name}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs ${
          status === 'active' 
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-900/30 dark:text-neutral-400'
        }`}>
          {status}
        </div>
      </div>
    </Surface>
  )
} 