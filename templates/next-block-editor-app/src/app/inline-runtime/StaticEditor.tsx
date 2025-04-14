'use client'

import React, { useState, useEffect } from 'react'
import { Icon } from '@/components/ui/Icon'
import Link from 'next/link'
import { motion } from 'framer-motion'

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

const GeneratorBlock = ({ 
  name = "generator_block", 
  inputs = [],
  isAnimating = false,
  stage = 0,
  targetStage = 5
}: { 
  name?: string; 
  inputs?: { label: string; value: string }[];
  isAnimating?: boolean;
  stage?: number;
  targetStage?: number;
}) => {
  const isLoading = isAnimating && stage >= targetStage && stage < 6;
  
  return (
    <motion.div 
      className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-4 mb-4"
      animate={isAnimating && stage === targetStage ? {
        scale: [1, 1.02, 1],
        boxShadow: [
          '0 0 0 rgba(59, 130, 246, 0)',
          '0 0 15px rgba(59, 130, 246, 0.3)',
          '0 0 0 rgba(59, 130, 246, 0)'
        ]
      } : {}}
      transition={{
        duration: 0.8,
        ease: "easeInOut"
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center"
            animate={isAnimating && stage === targetStage ? {
              backgroundColor: ['#f5f5f5', '#3b82f6', '#f5f5f5']
            } : {}}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Icon name="Loader" className="w-4 h-4 text-blue-500" />
              </motion.div>
            ) : (
              <Icon name="Sparkles" className="w-4 h-4 text-neutral-500" />
            )}
          </motion.div>
          <span className="text-sm font-medium">{name}</span>
        </div>
      </div>
      <div className="space-y-4">
        {inputs.map((input, index) => (
          <div key={index}>
            <label className="block text-xs font-medium text-neutral-500 mb-1">{input.label}</label>
            <input
              type="text"
              value={input.value}
              readOnly
              className="w-full px-3 py-1.5 text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black"
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

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

const FlowRunner = ({ onStart, onReset, isRunning }: { onStart: () => void, onReset: () => void, isRunning: boolean }) => {
  return (
    <div className="flex items-center gap-3 px-6">
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1">
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black disabled:bg-neutral-50 dark:disabled:bg-neutral-900 disabled:text-neutral-400 dark:disabled:text-neutral-600 disabled:cursor-not-allowed transition-colors"
            placeholder="new_input_1"
            defaultValue="input from the user"
            disabled={isRunning}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black disabled:bg-neutral-50 dark:disabled:bg-neutral-900 disabled:text-neutral-400 dark:disabled:text-neutral-600 disabled:cursor-not-allowed transition-colors"
            placeholder="new_input_2"
            defaultValue="another input value goes here"
            disabled={isRunning}
          />
        </div>
      </div>
      {!isRunning ? (
        <button 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 hover:bg-black text-white"
          onClick={onStart}
        >
          <Icon name="Play" className="w-4 h-4" />
        </button>
      ) : (
        <button 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 hover:bg-black text-white"
          onClick={onReset}
        >
          <Icon name="RotateCcw" className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

const AnimatedWord = ({ word, index, isAnimating, stage, totalWords, targetStage = 1 }: { 
  word: string, 
  index: number,
  totalWords: number,
  isAnimating: boolean, 
  stage: number,
  targetStage?: number
}) => {
  return (
    <>
      <motion.span
        className="inline-block"
        initial={{ scale: 1, color: '#1e1e1e' }}
        animate={isAnimating && stage === targetStage ? {
          scale: [1, 1.05, 1],
          color: ['#1e1e1e', '#3b82f6', '#3b82f6', '#1e1e1e'],
          opacity: [1, 0.5, 1]
        } : {
          scale: 1,
          color: '#1e1e1e',
          opacity: 1
        }}
        transition={{
          duration: 0.6,
          times: [0, 0.04, 0.09, 1],
          delay: index * 0.02,
          ease: "easeInOut",
        }}
      >
        {word}
      </motion.span>
      {' '}
    </>
  )
}

const AnimatedInput = ({ isAnimating, value, stage, targetStage }: { 
  isAnimating: boolean; 
  value: string; 
  stage: number;
  targetStage: number;
}) => {
  const chars = value.split('');
  const showTyped = stage >= targetStage && isAnimating;
  const showVariable = !showTyped;
  
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-sm font-medium rounded border border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300"
    >
      <motion.span
        animate={showVariable ? { opacity: 1, position: 'relative' } : { opacity: 0, position: 'absolute' }}
        transition={{ duration: 0.1 }}
      >
        {value.startsWith('@new_input_1') ? '@new_input_1' : '@new_input_2'}
      </motion.span>
      {showTyped && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="relative"
        >
          {chars.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.05,
                delay: stage === targetStage ? index * 0.01 : 0, // Only delay during initial typing
                ease: "easeInOut"
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      )}
    </span>
  )
}

export const StaticEditor: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const words = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`.split(' ')
  const secondParagraphWords = `dolor sit amet consectetur adipiscing elit`.split(' ')
  
  const startAnimation = async () => {
    setIsAnimating(true)
    setCurrentStage(1)
    
    // Start stage 2 earlier, when last word starts its animation
    const lastWordStartTime = (words.length - 1) * 0.02 // Delay for last word
    const stage2StartTime = lastWordStartTime + 0.1 // Start just after last word begins
    
    // Calculate timing for stages 3 and 4
    const typingDuration = ("input from the user".length * 0.01) + 0.1 // Reduced typing duration
    const stage3StartTime = stage2StartTime + typingDuration // Start stage 3 right after typing completes
    const stage4StartTime = stage3StartTime + 0.3 // Start stage 4 after second text animation
    const stage5StartTime = stage4StartTime + 0.4 // Start stage 5 after second variable types
    const stage6StartTime = stage5StartTime + 4 // End loading state after 4 seconds
    
    setTimeout(() => {
      setCurrentStage(2)
    }, stage2StartTime * 1000)

    setTimeout(() => {
      setCurrentStage(3)
    }, stage3StartTime * 1000)

    setTimeout(() => {
      setCurrentStage(4)
    }, stage4StartTime * 1000)

    setTimeout(() => {
      setCurrentStage(5)
    }, stage5StartTime * 1000)

    setTimeout(() => {
      setCurrentStage(6)
    }, stage6StartTime * 1000)
  }

  const handleReset = () => {
    setIsAnimating(false)
    setCurrentStage(0)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100">
      <LeftSidebar />
      <div className="relative flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto bg-neutral-100">
          <div className="max-w-4xl mx-auto mt-8">
            <motion.div 
              className="bg-white dark:bg-black shadow-sm relative overflow-hidden min-h-[800px]"
              animate={{
                background: isAnimating 
                  ? ['linear-gradient(120deg, #ffffff 0%, #ffffff 100%)', 
                     'linear-gradient(120deg, #ffffff 0%, #f5f9ff 50%, #ffffff 100%)', 
                     'linear-gradient(120deg, #ffffff 0%, #ffffff 100%)']
                  : 'linear-gradient(120deg, #ffffff 0%, #ffffff 100%)',
              }}
              transition={{
                duration: (words.length * 0.03) + 3.8,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            >
              <div className="relative z-10">
                <div className="px-20 pt-10">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">My App</h1>
                  <div className="mb-6 mt-6">
                    <h2 className="text-xs font-medium text-neutral-500 uppercase mb-1">INPUTS</h2>
                    <div className="flex gap-2 items-center">
                      <InputTag label="new_input_1" />
                      <InputTag label="new_input_2" />
                      <AddInputButton />
                    </div>
                  </div>
                  <hr className="border-neutral-200 dark:border-neutral-800" />
                </div>
                <div className="px-20 py-8">
                  <p className="text-neutral-900 mb-6 leading-relaxed">
                    {words.map((word, index) => (
                      <React.Fragment key={index}>
                        <AnimatedWord 
                          word={word} 
                          index={index}
                          totalWords={words.length}
                          isAnimating={isAnimating} 
                          stage={currentStage}
                          targetStage={1}
                        />
                      </React.Fragment>
                    ))}
                    {' '}
                    <AnimatedInput 
                      isAnimating={isAnimating} 
                      value="input from the user" 
                      stage={currentStage}
                      targetStage={2}
                    />
                    .
                  </p>
                  <p className="text-neutral-900 mb-6 leading-relaxed">
                    {secondParagraphWords.map((word, index) => (
                      <React.Fragment key={index}>
                        <AnimatedWord 
                          word={word} 
                          index={index}
                          totalWords={secondParagraphWords.length}
                          isAnimating={isAnimating} 
                          stage={currentStage}
                          targetStage={3}
                        />
                      </React.Fragment>
                    ))}
                    :{' '}
                    <AnimatedInput 
                      isAnimating={isAnimating} 
                      value="another input value goes here" 
                      stage={currentStage}
                      targetStage={4}
                    />
                  </p>
                  <GeneratorBlock 
                    name="subflow_1" 
                    inputs={[
                      { label: "topic", value: "test" },
                      { label: "style", value: "test" }
                    ]}
                    isAnimating={isAnimating}
                    stage={currentStage}
                    targetStage={5}
                  />
                  dolor sit amet:{' '}
                  <span className="inline-flex items-center px-2 py-0.5 text-sm font-medium rounded border border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300">
                    @subflow_1.output
                  </span>
                  <br/>
                  <br/>
                  <p className="text-neutral-900 mb-6 leading-relaxed">
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <GeneratorBlock 
                    name="new_structured_generation" 
                    inputs={[
                      { label: "lorum_ipsum", value: "" }
                    ]} 
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="flex-none bg-white border-t border-neutral-200 dark:bg-black dark:border-neutral-800">
          <div className="max-w-4xl mx-auto w-full py-4">
            <FlowRunner 
              onStart={startAnimation} 
              onReset={handleReset}
              isRunning={isAnimating}
            />
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  )
} 