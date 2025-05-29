import Link from 'next/link'

export default function AiJobsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">AI Jobs Projects</h1>

      <ul className="space-y-4">
        <li>
          <Link href="/ai-jobs/may-28" className="text-blue-600 hover:text-blue-800 hover:underline text-xl">
            May 28 - Blinking Robot Animation
          </Link>
        </li>
      </ul>
    </div>
  )
}
