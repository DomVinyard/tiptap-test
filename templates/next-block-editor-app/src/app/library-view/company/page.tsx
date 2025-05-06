'use client'

import { DM_Serif_Display } from 'next/font/google'
import { DM_Sans } from 'next/font/google'
import Link from 'next/link'
import { ArrowLeft, Search, Heart, Zap, FileText, Settings } from 'lucide-react'

// Initialize fonts
const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Introducing Wordware: The Future of AI Task Management",
    description: "Today we're launching Wordware, a new way to manage and automate your AI tasks with unprecedented control and simplicity.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop",
    category: "Product",
    date: "March 12, 2024",
    featured: true
  },
  {
    id: 2,
    title: "The Evolution of Task Automation: A New Paradigm",
    description: "How modern AI is reshaping the way we think about task automation and productivity.",
    image: "https://i.imgur.com/791uaql.png",
    category: "Research",
    date: "March 8, 2024"
  },
  {
    id: 3,
    title: "Building Trust in AI Systems Through Transparency",
    description: "Our commitment to creating transparent, accountable AI systems that users can trust.",
    image: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=80&w=2070&auto=format&fit=crop",
    category: "Company",
    date: "March 5, 2024"
  },
  {
    id: 4,
    title: "The Road to 1 Million Tasks: Our Journey",
    description: "A look back at our growth, the challenges we've overcome, and what's next for Wordware.",
    image: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=1932&auto=format&fit=crop",
    category: "Milestone",
    date: "March 1, 2024"
  }
]

export default function CompanyNews() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      {/* Left Sidebar */}
      <div className="w-16 shrink-0 bg-[#121218] fixed left-0 top-0 bottom-0 flex flex-col items-center py-4 z-10">
        {/* Navigation Icons */}
        <div className="flex flex-col items-center space-y-6">
          <button 
            className="w-10 h-10 rounded-md flex items-center justify-center transition-colors text-gray-400 hover:text-white hover:bg-[#1e1e2e]"
            onClick={() => {
              window.location.href = '/library-view';
            }}
            title="Browse"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button 
            className="w-10 h-10 rounded-md flex items-center justify-center transition-colors text-gray-400 hover:text-white hover:bg-[#1e1e2e]"
            onClick={() => {
              window.location.href = '/library-view?page=your-tasks';
            }}
            title="My Tasks"
          >
            <Heart className="w-5 h-5" />
          </button>
          
          <button 
            className="w-10 h-10 rounded-md flex items-center justify-center transition-colors text-gray-400 hover:text-white hover:bg-[#1e1e2e]"
            onClick={() => {
              window.location.href = '/library-view?page=automations';
            }}
            title="Automations"
          >
            <Zap className="w-5 h-5" />
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Bottom Icons */}
        <div className="flex flex-col items-center space-y-4 py-4">
          <button 
            className="w-10 h-10 rounded-md flex items-center justify-center transition-colors bg-indigo-600 text-white"
            onClick={() => {
              window.location.href = '/library-view/company';
            }}
            title="News & Company"
          >
            <FileText className="w-5 h-5" />
          </button>
          
          <button 
            className="w-10 h-10 rounded-md flex items-center justify-center transition-colors text-gray-400 hover:text-white hover:bg-[#1e1e2e]"
            onClick={() => {
              // Handle settings click
            }}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-16">
        {/* Navigation */}
        <nav className="fixed top-0 right-0 left-16 bg-[#0A0A0A]/90 backdrop-blur-sm z-50 border-b border-white/10">
          <div className="max-w-6xl mx-auto px-0 py-4 flex items-center">
            <Link 
              href="/library-view"
              className="flex items-center text-white/70 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Back to Library
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-24 pb-20">
          {/* Featured Post */}
          {blogPosts.filter(post => post.featured).map(post => (
            <div key={post.id} className="max-w-6xl mx-auto mb-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-emerald-500 font-medium">{post.category}</span>
                      <span className="text-white/40">{post.date}</span>
                    </div>
                    <h1 className={`${dmSerifDisplay.className} text-5xl leading-tight`}>
                      {post.title}
                    </h1>
                    <p className="text-white/70 text-xl leading-relaxed">
                      {post.description}
                    </p>
                    <button className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-white/90 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Recent Posts Grid */}
          <div className="max-w-6xl mx-auto">
            <h2 className={`${dmSerifDisplay.className} text-3xl mb-12`}>Recent Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.filter(post => !post.featured).map(post => (
                <div key={post.id} className="group cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <span className="text-emerald-500 text-sm font-medium">{post.category}</span>
                      <span className="text-white/40 text-sm">{post.date}</span>
                    </div>
                    <h3 className={`${dmSerifDisplay.className} text-2xl group-hover:text-emerald-500 transition-colors`}>
                      {post.title}
                    </h3>
                    <p className="text-white/70 line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 