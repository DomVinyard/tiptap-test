import { getAssignments } from '@/lib/data/assignments'
import { SidebarNavigation } from './components/SidebarNavigation'
import Image from 'next/image'

export default function SampleAssignmentsLayout({ children }: { children: React.ReactNode }) {
  const assignments = getAssignments()

  return (
    <div className="flex h-screen">
      <aside className="w-96 bg-neutral-100 dark:bg-neutral-900/50 p-6 border-r border-neutral-200 dark:border-neutral-800 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <Image src="/sauna.png" alt="Sauna logo" width={20} height={8} />
          <h1 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">Sample Assignments</h1>
        </div>
        <div className="overflow-y-auto flex-1 pr-2">
          <SidebarNavigation assignments={assignments} />
        </div>
      </aside>
      <main className="flex-1 bg-neutral-200 dark:bg-neutral-900 overflow-y-auto">
        <div className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
