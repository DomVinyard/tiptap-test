'use client'

import { useEffect } from 'react'

export default function AmbiguityCheckerPage() {
  useEffect(() => {
    // Redirect to the external Sauna Analysis site
    window.location.href = 'https://sauna-analysis.vercel.app'
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-neutral-600 dark:text-neutral-400">Redirecting to Ambiguity Checker...</p>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-2">
          If you are not redirected automatically,{' '}
          <a href="https://sauna-analysis.vercel.app" className="text-blue-600 hover:underline">
            click here
          </a>
          .
        </p>
      </div>
    </div>
  )
}
