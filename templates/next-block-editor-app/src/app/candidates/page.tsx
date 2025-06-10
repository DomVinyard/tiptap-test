'use client'

import { useState, useEffect } from 'react'
import Pusher from 'pusher-js'
import Image from 'next/image'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Surface } from '@/components/ui/Surface'

type CandidateState = 'not-started' | 'starting' | 'evaluating' | 'complete' | 'failure'

interface Candidate {
  id: string
  name: string
  state: CandidateState
  createdAt: string
  evaluationsTotal: number
  evaluationsComplete: number
  evaluationsFailed: number
  evaluationResults?: Array<{
    id: string
    name: string
    status: 'pending' | 'passed' | 'failed'
  }>
}

interface Evaluation {
  id: string
  name: string
  description: string
}

const stateColors = {
  'not-started': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  starting: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  evaluating: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  complete: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  failure: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

// Simple 3-tier sorting: successful -> pending -> failures
// No sorting within tiers to minimize movement
const getTier = (state: CandidateState) => {
  if (state === 'complete') return 0 // Successful
  if (state === 'failure') return 2 // Failures
  return 1 // Pending (not-started, starting, evaluating)
}

export default function CandidatesPage() {
  const [agent, setAgent] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [evaluations, setEvaluations] = useState<Evaluation[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [pusher, setPusher] = useState<Pusher | null>(null)
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list')
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null)

  useEffect(() => {
    // Initialize Pusher
    const pusherInstance = new Pusher('37677dc9f2d0ad56109f', {
      cluster: 'us3',
    })

    const channel = pusherInstance.subscribe('candidates-channel')

    // Listen for candidate events
    channel.bind('candidate-created', (data: Candidate) => {
      setCandidates(prev => [...prev, data])
    })

    channel.bind(
      'candidate-updated',
      (data: {
        id: string
        state: CandidateState
        evaluationsTotal?: number
        evaluationsComplete?: number
        evaluationsFailed?: number
        evaluationResults?: Array<{
          id: string
          name: string
          status: 'pending' | 'passed' | 'failed'
        }>
      }) => {
        setCandidates(prev =>
          prev.map(candidate =>
            candidate.id === data.id
              ? {
                  ...candidate,
                  state: data.state,
                  ...(data.evaluationsTotal !== undefined && { evaluationsTotal: data.evaluationsTotal }),
                  ...(data.evaluationsComplete !== undefined && { evaluationsComplete: data.evaluationsComplete }),
                  ...(data.evaluationsFailed !== undefined && { evaluationsFailed: data.evaluationsFailed }),
                  ...(data.evaluationResults !== undefined && { evaluationResults: data.evaluationResults }),
                }
              : candidate,
          ),
        )
      },
    )

    channel.bind('evaluation-created', (data: Evaluation) => {
      setEvaluations(prev => [...prev, data])
    })

    channel.bind('simulation-started', () => {
      setIsRunning(true)
      setCandidates([])
      setEvaluations([])
    })

    channel.bind('simulation-completed', () => {
      setIsRunning(false)
    })

    setPusher(pusherInstance)

    return () => {
      pusherInstance.unsubscribe('candidates-channel')
      pusherInstance.disconnect()
    }
  }, [])

  const handleStartSimulation = async () => {
    if (!agent.trim()) return

    try {
      const response = await fetch('/api/candidates/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent: agent.trim(),
          inputValue: inputValue.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to start simulation')
      }
    } catch (error) {
      console.error('Error starting simulation:', error)
    }
  }

  // Simple 3-tier sorting: successful -> pending -> failures
  // Preserve original order within tiers to minimize movement
  const sortedCandidates = [...candidates]
    .map((candidate, index) => ({ candidate, originalIndex: index }))
    .sort((a, b) => {
      const tierDiff = getTier(a.candidate.state) - getTier(b.candidate.state)
      if (tierDiff !== 0) return tierDiff
      // If same tier, preserve original order
      return a.originalIndex - b.originalIndex
    })
    .map(item => item.candidate)

  const getStateIcon = (state: CandidateState) => {
    switch (state) {
      case 'not-started':
        return '⏸️'
      case 'starting':
        return '🚀'
      case 'evaluating':
        return '⚡'
      case 'complete':
        return '✅'
      case 'failure':
        return '❌'
    }
  }

  const getStateColor = (state: CandidateState) => {
    switch (state) {
      case 'complete':
        return 'text-green-600 dark:text-green-400'
      case 'failure':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-blue-600 dark:text-blue-400'
    }
  }

  const handleCandidateClick = (candidateId: string) => {
    setSelectedCandidateId(candidateId)
    setCurrentView('detail')
  }

  const handleBackToList = () => {
    setCurrentView('list')
    setSelectedCandidateId(null)
  }

  // Get selected candidate
  const selectedCandidate = selectedCandidateId ? candidates.find(c => c.id === selectedCandidateId) : null

  // Detail view component
  if (currentView === 'detail' && selectedCandidate) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header with Back Link */}
          <button
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Candidates
          </button>

          {/* Candidate Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              {/* Show spinner for starting/evaluating states */}
              {selectedCandidate.state === 'starting' || selectedCandidate.state === 'evaluating' ? (
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
              ) : (
                <span className="text-2xl">{getStateIcon(selectedCandidate.state)}</span>
              )}
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">{selectedCandidate.name}</h1>
              <span className={`text-lg font-medium ${getStateColor(selectedCandidate.state)}`}>
                {selectedCandidate.state.replace('-', ' ')}
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Created: {new Date(selectedCandidate.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Details & Evaluations */}
            <div className="lg:col-span-2 space-y-6">
              {/* Candidate Details */}
              <Surface className="p-6">
                <h2 className="text-xl font-semibold mb-4">Candidate Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">ID:</span>
                    <span className="font-mono text-sm">{selectedCandidate.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Status:</span>
                    <span className={`font-medium ${getStateColor(selectedCandidate.state)}`}>
                      {selectedCandidate.state.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Evaluations:</span>
                    <span>
                      {selectedCandidate.evaluationsComplete}/{selectedCandidate.evaluationsTotal} completed
                    </span>
                  </div>
                  {selectedCandidate.evaluationsFailed > 0 && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Failed:</span>
                      <span className="text-red-600 dark:text-red-400">{selectedCandidate.evaluationsFailed}</span>
                    </div>
                  )}
                </div>
              </Surface>

              {/* Evaluation Results */}
              <Surface className="p-6">
                <h2 className="text-xl font-semibold mb-4">Evaluation Results</h2>
                {selectedCandidate.evaluationResults && selectedCandidate.evaluationResults.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCandidate.evaluationResults.map(result => (
                      <div
                        key={result.id}
                        className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
                      >
                        <span className="font-medium">{result.name}</span>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            result.status === 'passed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : result.status === 'failed'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                          }`}
                        >
                          {result.status}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-500 dark:text-neutral-400">No evaluation results available</p>
                )}
              </Surface>

              {/* Output Section */}
              <Surface className="p-6">
                <h2 className="text-xl font-semibold mb-4">Output</h2>
                <div className="space-y-4">
                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Generated Response</h3>
                    <div className="bg-white dark:bg-neutral-900 rounded border p-4 font-mono text-sm">
                      <p className="text-neutral-600 dark:text-neutral-400 mb-2"># Candidate Output Preview</p>
                      <p>This is a placeholder for the candidate's actual output.</p>
                      <p className="mt-2">
                        The candidate completed the evaluation process with status:{' '}
                        <strong>{selectedCandidate.state}</strong>
                      </p>
                      <ul className="mt-2 ml-4 list-disc text-neutral-700 dark:text-neutral-300">
                        <li>
                          Evaluations completed: {selectedCandidate.evaluationsComplete}/
                          {selectedCandidate.evaluationsTotal}
                        </li>
                        <li>Current state: {selectedCandidate.state}</li>
                        {selectedCandidate.evaluationsFailed > 0 && (
                          <li>Failed evaluations: {selectedCandidate.evaluationsFailed}</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Performance Metrics</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">Response Time:</span>
                        <p className="font-medium">2.3s average</p>
                      </div>
                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">Success Rate:</span>
                        <p className="font-medium">
                          {selectedCandidate.evaluationsTotal > 0
                            ? Math.round(
                                (selectedCandidate.evaluationsComplete / selectedCandidate.evaluationsTotal) * 100,
                              )
                            : 0}
                          %
                        </p>
                      </div>
                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">Quality Score:</span>
                        <p className="font-medium">94/100</p>
                      </div>
                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">Efficiency:</span>
                        <p className="font-medium">{selectedCandidate.state === 'complete' ? 'High' : 'Pending'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Surface>
            </div>

            {/* Right Column - Actions */}
            <div className="lg:col-span-1 space-y-6">
              <Surface className="p-6">
                <h2 className="text-xl font-semibold mb-4">Actions</h2>
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => window.open('https://wordware.ai', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open in Wordware
                  </Button>

                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedCandidate.id)
                    }}
                  >
                    Copy Candidate ID
                  </Button>

                  <Button variant="ghost" className="w-full" onClick={() => window.print()}>
                    Export Report
                  </Button>
                </div>
              </Surface>

              <Surface className="p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Runtime:</span>
                    <span>45.2s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Memory Usage:</span>
                    <span>2.4 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">API Calls:</span>
                    <span>127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Tokens Used:</span>
                    <span>15,430</span>
                  </div>
                </div>
              </Surface>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // List view component
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 flex items-center gap-4">
            <Image src="/icons/wwblack.png" alt="Wordware Logo" width={60} height={60} className="h-12 w-auto" />
            Candidates
          </h1>
        </div>

        {/* Input Controls */}
        <Surface className="p-6 mb-8">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="agent" className="block text-sm font-medium mb-2">
                Agent
              </label>
              <input
                id="agent"
                type="text"
                value={agent}
                onChange={e => setAgent(e.target.value)}
                placeholder="Enter agent description..."
                className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                disabled={isRunning}
              />
            </div>
            <div className="w-64">
              <label htmlFor="inputValue" className="block text-sm font-medium mb-2">
                Input Value
              </label>
              <input
                id="inputValue"
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Config value..."
                className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                disabled={isRunning}
              />
            </div>
            <Button onClick={handleStartSimulation} disabled={!agent.trim() || isRunning} className="px-6 py-3">
              {isRunning ? 'Running...' : 'Run Simulation'}
            </Button>
          </div>
        </Surface>

        {/* Two Column Layout */}
        {(candidates.length > 0 || evaluations.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Candidates (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              {candidates.length > 0 && (
                <Surface className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Candidates</h2>
                  <div className="space-y-4">
                    {sortedCandidates.map(candidate => {
                      const isComplete = candidate.state === 'complete'
                      const isFailed = candidate.state === 'failure'
                      const cardColorClass = isComplete
                        ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                        : isFailed
                          ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
                          : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'

                      return (
                        <div
                          key={candidate.id}
                          onClick={() => handleCandidateClick(candidate.id)}
                          className={`p-4 rounded-lg border ${cardColorClass} min-h-[80px] flex flex-col justify-center hover:shadow-md transition-shadow cursor-pointer`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {/* Show spinner for starting/evaluating states */}
                              {candidate.state === 'starting' || candidate.state === 'evaluating' ? (
                                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                              ) : (
                                <span className="text-lg flex-shrink-0">{getStateIcon(candidate.state)}</span>
                              )}
                              <h3 className="font-medium">{candidate.name}</h3>
                            </div>

                            <span className="text-xs text-neutral-500 flex-shrink-0">
                              {new Date(candidate.createdAt).toLocaleTimeString()}
                            </span>
                          </div>

                          {/* Show evaluation pills */}
                          {candidate.evaluationResults && candidate.evaluationResults.length > 0 ? (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {candidate.evaluationResults.map(result => (
                                <div
                                  key={result.id}
                                  className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                    result.status === 'passed'
                                      ? 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700'
                                      : result.status === 'failed'
                                        ? 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700'
                                        : 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
                                  }`}
                                  title={`${result.name}: ${result.status}`}
                                >
                                  {result.name}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2 mt-3">
                              <div className="px-2 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                                🏗️ Running Setup
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </Surface>
              )}
            </div>

            {/* Right Column - Evaluations (1/3 width) */}
            <div className="lg:col-span-1 space-y-6">
              {evaluations.length > 0 && (
                <Surface className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Active Evaluations</h2>
                  <div className="space-y-4">
                    {evaluations.map(evaluation => (
                      <div key={evaluation.id} className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                        <h3 className="font-medium">{evaluation.name}</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{evaluation.description}</p>
                      </div>
                    ))}
                  </div>
                </Surface>
              )}
            </div>
          </div>
        )}

        {candidates.length === 0 && !isRunning && (
          <div className="text-center py-12">
            <p className="text-neutral-500 dark:text-neutral-400">
              Describe an agent and click "Run Simulation" to begin
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
