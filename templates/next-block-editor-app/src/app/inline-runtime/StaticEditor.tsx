'use client'

import React, { useState, useEffect } from 'react'
import { Icon } from '@/components/ui/Icon'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const borderAnimationStyles = `
  .border-animation {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .border-animation::before {
    content: "";
    display: block;
    background: linear-gradient(
      90deg,
      hsla(197, 100%, 64%, 1) 0%,
      hsla(339, 100%, 55%, 1) 100%
    );
    height: 500px;
    width: 500px;
    position: absolute;
    animation: rotate 8s linear infinite;
    z-index: 0;
  }

  .inner {
    position: relative;
    z-index: 1;
    width: 100%;
    margin: 3px;
  }

  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const InputTag = ({ label, isAnimating }: { label: string, isAnimating?: boolean }) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
    isAnimating 
    ? 'bg-blue-50 dark:bg-blue-950' 
    : 'bg-emerald-50 dark:bg-emerald-950'
  }`}>
    <span className={`text-xs font-medium ${
      isAnimating 
      ? 'text-blue-500' 
      : 'text-emerald-500'
    }`}>abc</span>
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
  name = "My Subflow", 
  inputs = [],
  isAnimating = false,
  stage = 0,
  targetStage = 5,
  onProgressComplete
}: { 
  name?: string; 
  inputs?: { label: string; value: string }[];
  isAnimating?: boolean;
  stage?: number;
  targetStage?: number;
  onProgressComplete?: () => void;
}) => {
  const [isProgressComplete, setIsProgressComplete] = React.useState(false);
  const [hasTriggeredComplete, setHasTriggeredComplete] = React.useState(false);
  const isLoading = isAnimating && stage >= 4.5 && !isProgressComplete;
  const showSpinner = isAnimating && stage >= 4.5 && !isProgressComplete;
  
  React.useEffect(() => {
    console.log('GeneratorBlock state:', { isAnimating, stage, isProgressComplete });
    if (!isAnimating || stage < 4.5) {
      setIsProgressComplete(false);
      setHasTriggeredComplete(false);
    }
  }, [isAnimating, stage]);

  React.useEffect(() => {
    if (isProgressComplete && !hasTriggeredComplete) {
      setHasTriggeredComplete(true);
      console.log('Progress complete, calling onProgressComplete');
      onProgressComplete?.();
    }
  }, [isProgressComplete, hasTriggeredComplete, onProgressComplete]);

  return (
    <motion.div 
      className="rounded-lg mb-8 relative
      before:absolute before:inset-0 before:bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] before:bg-[length:4px_4px] before:opacity-50 before:pointer-events-none
      after:absolute after:left-0 after:right-0 after:top-[24px] after:bottom-0 after:shadow-[0_6px_12px_rgba(0,0,0,0.08)] after:pointer-events-none"
      animate={isAnimating && stage >= 4.5 ? {
        backgroundColor: ['#fff8dc', '#f5f9ff'],
        background: [
          'linear-gradient(45deg, #fff8dc, #fff3cc)',
          'linear-gradient(45deg, #f5f9ff, #edf4ff)'
        ]
      } : {
        backgroundColor: '#fff8dc',
        background: 'linear-gradient(45deg, #fff8dc, #fff3cc)'
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut"
      }}
    >
      <div className="relative">
        <motion.div 
          className="rounded-t-lg px-4 py-2"
          animate={isAnimating && stage >= 4.5 ? {
            backgroundColor: ['#fff3cc', '#e6f0ff']
          } : {
            backgroundColor: '#fff3cc'
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
        >
          <div className="flex">
            <div className="flex-none self-center">
              <motion.div 
                className="w-8 h-8 rounded-lg flex items-center justify-center relative"
                animate={isAnimating && stage >= 4.5 ? {
                  backgroundColor: ['#ffdd80', '#3b82f6']
                } : {
                  backgroundColor: '#ffdd80'
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              >
                {showSpinner ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Icon name="Loader" className="w-4 h-4 text-white" />
                  </motion.div>
                ) : (
                  <Icon 
                    name={isProgressComplete ? "Check" : "Code"} 
                    className={`w-4 h-4 ${isProgressComplete ? 'text-white' : 'text-neutral-600'}`} 
                  />
                )}
              </motion.div>
            </div>
            <div className="flex-1 ml-2 flex items-center">
              <div className="text-[15px] font-semibold text-neutral-700">{name}</div>
            </div>
          </div>
        </motion.div>
        <div className="pl-4 pr-4 pb-4 space-y-2 pt-4">
          {inputs.map((input, index) => (
            <div key={index} className="relative">
              <motion.div 
                className="absolute inset-y-0 left-0 flex items-center pl-3 pr-2 rounded-l-lg min-w-[120px]"
                animate={isAnimating && stage >= 4.5 ? {
                  backgroundColor: ['#ffedba', '#e6f0ff']
                } : {
                  backgroundColor: '#ffedba'
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              >
                <span className="text-xs font-medium text-neutral-900">{input.label}</span>
              </motion.div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {!isLoading && (
                  <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center">
                    <Icon name="Hexagon" className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                )}
              </div>
              <motion.input
                type="text"
                defaultValue={input.value}
                placeholder={`Enter ${input.label}...`}
                className="w-full pl-[132px] pr-12 py-2.5 text-sm rounded-lg text-neutral-700 placeholder:text-neutral-400
                focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all"
                animate={isAnimating && stage >= 4.5 ? {
                  backgroundColor: ['#fffef5', '#f8faff']
                } : {
                  backgroundColor: '#fffef5'
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              />
              {input.value === 'new_input_2' && (
                <div className="absolute inset-y-0 left-[132px] right-3 pointer-events-none">
                  <div className="h-full flex items-center">
                    <AnimatedInput 
                      isAnimating={isAnimating} 
                      value="another input value goes here"
                      stage={stage}
                      targetStage={4.5}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="mt-3 ml-0 pt-2">
            {isLoading ? (
              <div className="relative h-2 py-2 bg-blue-100 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-blue-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2,
                    ease: "linear"
                  }}
                  onAnimationComplete={() => {
                    setIsProgressComplete(true);
                  }}
                />
              </div>
            ) : (
              <p className="text-xs text-neutral-500">Hi, I am the description for the subflow</p>
            )}
          </div>
        </div>
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

const RightSidebar = ({ outputs }: { outputs: { text: string, timestamp: Date }[] }) => (
  <div className="w-[320px] border-l border-neutral-200 bg-white flex flex-col overflow-hidden">
    <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
      <div className="space-y-4">
        <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Runs</h2>
        {outputs.length === 0 ? (
          <div className="text-sm text-neutral-500 py-4">None yet</div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {outputs.map((output, index) => (
                <motion.div
                  key={outputs.length - index}
                  initial={{ scale: 0.8, opacity: 0, y: -20 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1, 
                    y: 0,
                    backgroundColor: ['#ffffff', '#f0f9ff', '#ffffff'],
                    transition: {
                      backgroundColor: {
                        duration: 1,
                        times: [0, 0.1, 1]
                      },
                      scale: {
                        type: "spring",
                        stiffness: 400,
                        damping: 15
                      },
                      opacity: {
                        duration: 0.2
                      },
                      y: {
                        type: "spring",
                        stiffness: 400,
                        damping: 20
                      }
                    }
                  }}
                  exit={{ scale: 0.8, opacity: 0, y: -20 }}
                  className="p-4 rounded-lg border border-neutral-200 bg-white"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-emerald-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.5, 1] }}
                      transition={{ 
                        duration: 0.4,
                        times: [0, 0.6, 1],
                        ease: "easeOut"
                      }}
                    />
                    <div className="text-sm font-medium text-neutral-900">v1.0.{outputs.length - index}</div>
                    <div className="text-xs text-neutral-500 ml-auto">
                      {output.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <motion.div 
                    className="text-sm text-neutral-600 font-mono bg-neutral-50 rounded p-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                  >
                    {output.text}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  </div>
)

const FlowRunner = ({ onStart, onReset, isRunning }: { onStart: () => void, onReset: () => void, isRunning: boolean }) => {
  return (
    <div className="flex items-center gap-3 px-6 py-6">
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 relative">
          <div className="absolute -top-3.5 left-3 px-1 bg-white dark:bg-black">
            <span className="text-xs font-medium text-neutral-500">new_input_1</span>
          </div>
          <input
            type="text"
            className="w-full px-4 py-3 text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black disabled:bg-neutral-50 dark:disabled:bg-neutral-900 disabled:text-neutral-400 dark:disabled:text-neutral-600 disabled:cursor-not-allowed transition-colors"
            placeholder="new_input_1"
            defaultValue="input from the user"
            disabled={isRunning}
          />
        </div>
        <div className="flex-1 relative">
          <div className="absolute -top-3.5 left-3 px-1 bg-white dark:bg-black">
            <span className="text-xs font-medium text-neutral-500">new_input_2</span>
          </div>
          <input
            type="text"
            className="w-full px-4 py-3 text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black disabled:bg-neutral-50 dark:disabled:bg-neutral-900 disabled:text-neutral-400 dark:disabled:text-neutral-600 disabled:cursor-not-allowed transition-colors"
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

const AnimatedWord = ({ word, index, isAnimating, stage, totalWords, targetStage = 1, onComplete }: { 
  word: string, 
  index: number,
  totalWords: number,
  isAnimating: boolean, 
  stage: number,
  targetStage?: number,
  onComplete?: () => void
}) => {
  const jumpHeight = React.useMemo(() => -3 - Math.random() * 2, []);
  const timeOffset = React.useMemo(() => Math.random() * 0.01, []);
  
  // Only the last word triggers completion
  const shouldTriggerComplete = index === totalWords - 1;

  React.useEffect(() => {
    if (index === 0) {
      console.log(`AnimatedWord conditions for first word:
        isAnimating: ${isAnimating}
        stage: ${stage}
        targetStage: ${targetStage}
        shouldAnimate: ${isAnimating && stage === targetStage}
      `);
    }
  }, [index, isAnimating, stage, targetStage]);

  return (
    <>
      <motion.span
        className="inline-block"
        initial={{ y: 0, color: '#1e1e1e', scale: 1, fontWeight: 400 }}
        animate={isAnimating && stage === targetStage ? {
          y: [0, jumpHeight, 0],
          color: ['#1e1e1e', '#3b82f6', '#3b82f6', '#1e1e1e'],
          opacity: [1, 0.7, 1],
          scale: [1, 1.05, 1],
          fontWeight: [400, 600, 400]
        } : {
          y: 0,
          color: '#1e1e1e',
          opacity: 1,
          scale: 1,
          fontWeight: 400
        }}
        transition={{
          y: {
            duration: 0.06,
            times: [0, 0.4, 0.8],
            ease: ["linear", "linear", "linear"],
            delay: index * 0.02
          },
          color: {
            duration: 0.4,
            times: [0, 0.1, 0.8, 1],
            ease: "easeInOut",
            delay: index * 0.02
          },
          opacity: {
            duration: 0.06,
            times: [0, 0.5, 1],
            ease: "easeInOut",
            delay: index * 0.02
          },
          scale: {
            duration: 0.06,
            times: [0, 0.4, 0.8],
            ease: "easeInOut",
            delay: index * 0.02
          },
          fontWeight: {
            duration: 0.06,
            times: [0, 0.4, 0.8],
            ease: "easeInOut",
            delay: index * 0.02
          }
        }}
        onAnimationComplete={() => {
          if (shouldTriggerComplete && isAnimating && stage === targetStage) {
            console.log('Animation complete triggered for last word');
            onComplete?.();
          }
        }}
      >
        {word}
      </motion.span>
      {' '}
    </>
  )
}

const AnimatedInput = ({ isAnimating, value, stage, targetStage, onComplete }: { 
  isAnimating: boolean; 
  value: string; 
  stage: number;
  targetStage: number;
  onComplete?: () => void;
}) => {
  const chars = value.split('');
  const showTyped = stage >= targetStage - 0.3 && isAnimating;
  const showVariable = !showTyped;

  return (
    <motion.span
      className="inline-flex items-center px-2 py-0.5 text-sm font-medium rounded border"
      animate={showTyped ? {
        backgroundColor: 'rgb(239 246 255)', // bg-blue-50
        borderColor: 'rgb(191 219 254)', // border-blue-200
        color: 'rgb(29 78 216)' // text-blue-700
      } : {
        backgroundColor: 'rgb(240 253 244)', // bg-emerald-50
        borderColor: 'rgb(167 243 208)', // border-emerald-200
        color: 'rgb(4 120 87)' // text-emerald-700
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        animate={showVariable ? { opacity: 1, position: 'relative' } : { opacity: 0, position: 'absolute' }}
        transition={{ duration: 0.1 }}
      >
        {value === "input from the user" ? '@new_input_1' : value === "another input value goes here" ? '@new_input_2' : '@My Subflow.output'}
      </motion.span>
      {showTyped && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="relative"
          onAnimationComplete={() => {
            if (isAnimating && stage >= targetStage - 0.1) {
              setTimeout(() => {
                onComplete?.();
              }, 100);
            }
          }}
        >
          {chars.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.05,
                delay: stage >= targetStage - 0.1 ? index * 0.005 : 0,
                ease: "easeInOut"
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      )}
    </motion.span>
  )
}

const AIGenerationBlock = ({ 
  name = "My Generation",
  isAnimating = false,
  stage = 0,
  onComplete,
  onReset
}: { 
  name?: string;
  isAnimating?: boolean;
  stage?: number;
  onComplete?: (output: string) => void;
  onReset?: () => void;
}) => {
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.";
  const chars = loremIpsum.split('');
  const shouldAnimate = isAnimating && stage >= 7;
  const isStreaming = isAnimating && stage >= 7.1;
  const [isStreamingComplete, setIsStreamingComplete] = React.useState(false);

  React.useEffect(() => {
    if (!isStreaming) {
      setIsStreamingComplete(false);
    }
    if (isStreaming) {
      const totalDelay = chars.length * 0.008;
      const timer = setTimeout(() => {
        setIsStreamingComplete(true);
        onComplete?.(loremIpsum);
        // Add a small delay before resetting to show the checkmark
        setTimeout(() => {
          onReset?.();
        }, 1000);
      }, (totalDelay + 0.1) * 1000);
      return () => clearTimeout(timer);
    }
  }, [isStreaming, chars.length, onComplete, loremIpsum, onReset]);

  return (
    <div className="mb-8 flex items-start gap-3">
      <div className="flex-none mt-1">
        <motion.div 
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          animate={shouldAnimate ? {
            backgroundColor: '#3b82f6'
          } : {
            backgroundColor: '#64748b'
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
        >
          {shouldAnimate ? (
            isStreamingComplete ? (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Icon name="Check" className="w-5 h-5 text-white" />
              </motion.div>
            ) : (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Icon name="Loader" className="w-5 h-5 text-white" />
              </motion.div>
            )
          ) : (
            <Icon name="Bot" className="w-5 h-5 text-white" />
          )}
        </motion.div>
      </div>
      <motion.div 
        className="flex-1 relative rounded-2xl p-4
        shadow-sm border border-neutral-200
        before:absolute before:w-2 before:h-2 before:rotate-45
        before:-left-1 before:top-4 before:border-l before:border-b before:border-neutral-200"
        animate={shouldAnimate ? {
          backgroundColor: '#f0f9ff',
          borderColor: '#e0f2fe',
        } : {
          backgroundColor: '#fafafa',
          borderColor: '#e5e5e5',
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-[15px] leading-none font-medium text-neutral-900">{name}</div>
          <div className="text-xs leading-none font-medium text-neutral-500">GPT 4.1</div>
        </div>
        <div className="text-sm text-neutral-700 min-h-[1.5rem]">
          {!isStreaming ? (
            "This is where the content will appear from your LLM generation. It will take everything above as context."
          ) : (
            <motion.div>
              {chars.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.03, // Faster fade-in
                    delay: index * 0.008, // Faster delay between characters
                    ease: "easeIn"
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

const SuccessCheckmark = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
  >
    <motion.div 
      className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center"
      initial={{ rotate: -90, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      exit={{ rotate: 90, opacity: 0 }}
      transition={{ type: "spring", damping: 15 }}
    >
      <Icon name="Check" className="w-12 h-12 text-white" />
    </motion.div>
  </motion.div>
);

export const StaticEditor: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [outputs, setOutputs] = useState<{ text: string, timestamp: Date }[]>([])
  const [isFirstRun, setIsFirstRun] = useState(true)
  const [showSuccessCheck, setShowSuccessCheck] = useState(false)
  const words = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`.split(' ')
  const secondParagraphWords = `dolor sit amet consectetur adipiscing elit`.split(' ')
  const finalParagraphWords = `Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat.`.split(' ')
  
  React.useEffect(() => {
    console.log('Animation state changed:', { isAnimating, currentStage });
  }, [isAnimating, currentStage]);

  const startAnimation = async () => {
    console.log('Starting animation');
    setIsAnimating(true)
    setCurrentStage(1)
    setIsFirstRun(false)
  }

  const handleFirstSequenceComplete = () => {
    setCurrentStage(2)
  }

  const handleFirstVariableComplete = () => {
    setCurrentStage(3)
  }

  const handleSecondSequenceComplete = () => {
    setCurrentStage(4)
  }

  const handleSecondVariableComplete = () => {
    setCurrentStage(4.5)
  }

  const handleSubflowVariableComplete = () => {
    console.log('Variable complete, isAnimating:', isAnimating);
    setTimeout(() => {
      console.log('Setting stage 6, isAnimating:', isAnimating);
      setCurrentStage(6);
    }, 100);
  }

  const handleFinalSequenceComplete = () => {
    console.log('Final sequence complete, isAnimating:', isAnimating);
    setCurrentStage(7);
    setTimeout(() => {
      setCurrentStage(7.1);
    }, 100);
  }

  const handleGenerationComplete = (output: string) => {
    if (!isFirstRun) {
      // Add initial delay before showing checkmark
      setTimeout(() => {
        setShowSuccessCheck(true);
        // Short delay to show checkmark
        setTimeout(() => {
          handleReset();
          setTimeout(() => {
            setShowSuccessCheck(false);
          }, 400);
        }, 1000);
        // Longer delay for sidebar update
        setTimeout(() => {
          setOutputs(prev => [...prev, { text: "Output/Artifacts from that run will go here", timestamp: new Date() }]);
        }, 1700);
      }, 500); // New delay before showing checkmark
      setIsFirstRun(true);
    }
  }

  React.useEffect(() => {
    if (currentStage === 7) {
      const timer = setTimeout(() => {
        console.log('Final delay complete');
        setCurrentStage(8);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  const handleReset = () => {
    console.log('Resetting animation');
    setIsAnimating(false);
    setCurrentStage(0);
    setIsFirstRun(true);
  }

  // Make handleReset available globally
  React.useEffect(() => {
    (window as any).handleReset = handleReset;
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100">
      <LeftSidebar />
      <div className="relative flex flex-col flex-1">
        <div className={`
          flex-1 overflow-y-auto flex flex-col bg-neutral-100 relative
          ${isAnimating ? 'overflow-hidden' : ''}
        `}>
          {isAnimating && (
            <>
              <div className="absolute inset-0 bg-gradient-bg animate-bg-pulse" />
              <div className="absolute inset-0 bg-gradient-bg animate-bg-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-0 bg-gradient-bg animate-bg-pulse" style={{ animationDelay: '2s' }} />
            </>
          )}
          <div className="relative z-10 max-w-4xl mx-auto mt-8 w-full flex-1 flex flex-col">
            <motion.div 
              className={`
                bg-white dark:bg-black shadow-sm relative mb-20 flex-1 ${isAnimating ? '' : 'rounded-lg'}
                ${isAnimating ? `
                  before:absolute before:inset-0 before:bg-gradient-animated before:animate-border-flow before:bg-[length:200%_100%] before:rounded-[inherit]
                  after:absolute after:inset-[2px] after:bg-white dark:after:bg-black after:rounded-[calc(inherit-2px)]
                  overflow-hidden
                ` : ''}
              `}
              style={{
                clipPath: isAnimating ? 'none' : undefined
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              <div className="relative z-10 h-full">
                <div className="px-20 pt-10">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">My App</h1>
                  <p className="mt-2 text-neutral-500 dark:text-neutral-400">This is a wordware app which contains a subflow and a generation</p>
                  <div className="mb-6 mt-6">
                    <h2 className="text-xs font-medium text-neutral-500 uppercase mb-1">INPUTS</h2>
                    <div className="flex gap-2 items-center">
                      <InputTag label="new_input_1" isAnimating={isAnimating} />
                      <InputTag label="new_input_2" isAnimating={isAnimating} />
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
                          onComplete={handleFirstSequenceComplete}
                        />
                      </React.Fragment>
                    ))}
                    {' '}
                    <AnimatedInput 
                      isAnimating={isAnimating} 
                      value="input from the user" 
                      stage={currentStage}
                      targetStage={2}
                      onComplete={handleFirstVariableComplete}
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
                          onComplete={handleSecondSequenceComplete}
                        />
                      </React.Fragment>
                    ))}
                    :{' '}
                    <AnimatedInput 
                      isAnimating={isAnimating} 
                      value="another input value goes here" 
                      stage={currentStage}
                      targetStage={4}
                      onComplete={handleSecondVariableComplete}
                    />
                  </p>
                  <GeneratorBlock 
                    name="My Subflow" 
                    inputs={[
                      { label: "subflow_input_1", value: "new_input_2" },
                      { label: "subflow_input_2", value: "lorum ipsum" }
                    ]}
                    isAnimating={isAnimating}
                    stage={currentStage}
                    targetStage={5}
                    onProgressComplete={() => {
                      setCurrentStage(5.5);
                    }}
                  />
                  {currentStage < 5.5 ? (
                    <span className="inline-flex items-center px-2 py-0.5 text-sm font-medium rounded border border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300">
                      @My Subflow.output
                    </span>
                  ) : (
                    <AnimatedInput 
                      isAnimating={isAnimating} 
                      value="Hello! I am a value returned from the subflow." 
                      stage={currentStage}
                      targetStage={5.5}
                      onComplete={handleSubflowVariableComplete}
                    />
                  )}
                  <br/>
                  <br/>
                  <p className="text-neutral-900 mb-6 leading-relaxed">
                    {finalParagraphWords.map((word, index) => (
                      <React.Fragment key={index}>
                        <AnimatedWord 
                          word={word} 
                          index={index}
                          totalWords={finalParagraphWords.length}
                          isAnimating={isAnimating} 
                          stage={currentStage}
                          targetStage={6}
                          onComplete={handleFinalSequenceComplete}
                        />
                      </React.Fragment>
                    ))}
                  </p>
                  <div className="mb-8">
                    <AIGenerationBlock 
                      name="My Generation"
                      isAnimating={isAnimating}
                      stage={currentStage}
                      onComplete={handleGenerationComplete}
                      onReset={handleReset}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-200 dark:bg-black dark:border-neutral-800 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
          animate={{
            y: isAnimating && currentStage > 0 && currentStage < 8 ? 100 : 0,
            opacity: isAnimating && currentStage > 0 && currentStage < 8 ? 0 : 1
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 1
          }}
        >
          <div className="max-w-4xl mx-auto w-full py-2">
            <FlowRunner 
              onStart={startAnimation} 
              onReset={handleReset}
              isRunning={isAnimating}
            />
          </div>
        </motion.div>
      </div>
      <RightSidebar outputs={outputs} />
      <AnimatePresence>
        {showSuccessCheck && <SuccessCheckmark />}
      </AnimatePresence>
    </div>
  )
} 