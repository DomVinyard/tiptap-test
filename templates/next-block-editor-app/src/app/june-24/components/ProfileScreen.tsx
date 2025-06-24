import { User } from 'lucide-react'

const ProfileScreen = () => {
  return (
    <div className="p-4 h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Profile</h1>
      </div>
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <User className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
          <p className="text-neutral-500 dark:text-neutral-400">User profile</p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">Profile settings coming soon</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen
