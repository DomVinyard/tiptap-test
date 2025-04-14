'use client'

import React, { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const InputTag = ({ label }: { label: string }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-emerald-50 dark:bg-emerald-950">
    <span className="text-xs text-emerald-500 font-medium">abc</span>
    <span className="text-gray-900 dark:text-gray-100">{label}</span>
  </div>
)

const AddInputButton = () => (
  <button className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm border border-dashed border-gray-300 dark:border-gray-700 text-gray-500">
    <Icon name="Plus" className="w-4 h-4 mr-1" />
    New Input
  </button>
)

const GeneratorBlock = ({ name, inputs }: { name: string; inputs?: { label: string; value: string }[] }) => (
  <div className="bg-white rounded-lg border border-neutral-200 p-4 mb-4">
    <div className="flex items-center gap-2 mb-3">
      <Icon name="Sparkles" className="w-4 h-4 text-neutral-500" />
      <span className="text-sm text-neutral-900">{name}</span>
    </div>
    {inputs && inputs.map((input, i) => (
      <div key={i} className="flex items-center gap-2 mb-2">
        <span className="text-sm text-neutral-500">{input.label}:</span>
        <span className="text-sm text-neutral-900">{input.value}</span>
      </div>
    ))}
  </div>
)

const LeftSidebar = () => (
  <div className="w-[320px] border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black flex flex-col overflow-hidden">
    <div className="px-6 py-4 flex items-center justify-between">
      <Link href="/">
        <img 
          src="https://cdn.prod.website-files.com/66e00503e1e57f5fafdfa7d5/66e005da47c0c33bca665c3a_wordware-logotype.svg" 
          alt="Wordware"
          className="h-5 opacity-70 hover:opacity-100 transition-opacity"
        />
      </Link>
      <div className="flex gap-1 items-center">
        <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
          <Icon name="FilePlus" className="w-4 h-4 text-gray-500" />
        </button>
        <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
          <Icon name="FolderPlus" className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
    <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
      <div className="space-y-8">
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase text-gray-500">Recent Apps</h2>
          <div className="space-y-1">
            <button className="flex items-start gap-3 w-full py-3 pr-3 hover:bg-gray-50 rounded-lg group transition-colors text-left">
              <Icon name="FileText" className="w-4 h-4 mt-0.5 text-gray-500" />
              <div className="text-sm text-gray-900">My App</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const RightSidebar = () => (
  <div className="w-[320px] border-l border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black flex flex-col overflow-hidden">
    <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
      <div className="space-y-8">
        <div>
          <h2 className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">App settings</h2>
          <div className="mb-8 p-4 bg-gradient-to-br from-white via-gray-50/50 to-gray-100/50 dark:from-black dark:via-gray-900 dark:to-gray-800/50 rounded-lg border border-gray-200/60 dark:border-gray-800/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Visibility</h3>
                <button className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100">
                  <div className="flex items-center gap-2">
                    <Icon name="Globe" className="w-4 h-4 text-gray-500" />
                    <span>Private</span>
                  </div>
                  <Icon name="ChevronDown" className="w-4 h-4 text-gray-400" />
                </button>
                <p className="mt-2 text-xs text-gray-400">Only accessible by you.</p>
              </div>
              <hr className="border-gray-200 dark:border-gray-800" />
              <div>
                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Deployment</h3>
                <button className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100">
                  <div className="flex items-center gap-2">
                    <Icon name="Server" className="w-4 h-4 text-gray-500" />
                    <span>Not Live</span>
                  </div>
                  <Icon name="ChevronDown" className="w-4 h-4 text-gray-400" />
                </button>
                <p className="mt-2 text-xs text-gray-400">This will not run except for testing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const FlowRunner = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)

  const startAnimation = async () => {
    setIsAnimating(true)
    setCurrentStage(1)
    // Future stages will be added here
  }

  return (
    <div className="flex items-center gap-3 px-6">
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1">
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black"
            placeholder="new_input_1"
            defaultValue="input from the user"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black"
            placeholder="new_input_2"
            defaultValue="another input value goes here"
          />
        </div>
      </div>
      <button 
        className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 hover:bg-black text-white"
        onClick={startAnimation}
        disabled={isAnimating}
      >
        <Icon name="Play" className="w-4 h-4" />
      </button>
    </div>
  )
}

const AnimatedParagraph = ({ isAnimating }: { isAnimating: boolean }) => {
  return (
    <motion.p
      className={`text-lg text-gray-600 dark:text-gray-300 leading-relaxed ${
        isAnimating ? 'animate-gradient-text' : ''
      }`}
      animate={{
        background: isAnimating 
          ? ['linear-gradient(to right, #000, #000)', 'linear-gradient(to right, #3b82f6, #000)', 'linear-gradient(to right, #000, #000)']
          : 'none',
        backgroundClip: isAnimating ? 'text' : 'none',
        WebkitBackgroundClip: isAnimating ? 'text' : 'none',
        color: isAnimating ? 'transparent' : 'inherit',
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
      }}
    >
      This is a static version of the editor that demonstrates how the runtime works. You can see the inputs at the bottom
      of the page, and when you click run, it will show you how the flow executes step by step.
    </motion.p>
  )
}

const StaticEditor = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)

  return (
    <div className="flex h-screen">
      <LeftSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="px-20 pt-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">My Flow</h1>
            <div className="mb-8 mt-12">
              <h2 className="text-sm font-medium text-neutral-500 uppercase mb-3">INPUTS</h2>
              <div className="flex gap-2 items-center">
                <InputTag label="new_input_1" />
                <InputTag label="new_input_2" />
              </div>
            </div>
            <div className="space-y-8">
              <AnimatedParagraph isAnimating={isAnimating} />
              <GeneratorBlock />
              <GeneratorBlock />
            </div>
          </div>
        </div>
        <div className="flex-none bg-white border-t border-neutral-200 dark:bg-black dark:border-neutral-800">
          <div className="max-w-4xl mx-auto w-full py-4">
            <FlowRunner />
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  )
}

export default StaticEditor 