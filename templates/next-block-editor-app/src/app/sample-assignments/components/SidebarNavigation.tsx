'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Assignment } from '@/lib/data/assignments'
import clsx from 'clsx'

export const SidebarNavigation = ({
  assignments,
}: {
  assignments: Omit<Assignment, 'representation' | 'risks' | 'memory'>[]
}) => {
  const pathname = usePathname()

  return (
    <div className="space-y-1">
      {assignments.map(assignment => {
        const isActive = pathname === `/sample-assignments/${assignment.id}`
        return (
          <Link
            key={assignment.id}
            href={`/sample-assignments/${assignment.id}`}
            className={clsx(
              'block rounded-lg px-4 py-3 text-base transition-colors',
              isActive ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-neutral-200/75 dark:hover:bg-neutral-800/50',
            )}
          >
            <div
              className={clsx(
                'font-semibold',
                isActive ? 'text-black dark:text-white' : 'text-neutral-700 dark:text-neutral-300',
              )}
            >
              {assignment.title}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
