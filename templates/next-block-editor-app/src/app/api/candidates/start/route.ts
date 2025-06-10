const Pusher = require('pusher')

console.log('PUSHER_SECRET', process.env.PUSHER_SECRET)

const pusher = new Pusher({
  appId: '2006171',
  key: '37677dc9f2d0ad56109f',
  secret: process.env.PUSHER_SECRET,
  cluster: 'us3',
  useTLS: true,
})

type CandidateState = 'not-started' | 'starting' | 'evaluating' | 'complete' | 'failure'

interface Candidate {
  id: string
  name: string
  state: CandidateState
  createdAt: string
  evaluationsTotal: number
  evaluationsComplete: number
  evaluationsFailed: number
  evaluationResults: Array<{
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

const setupCheck = { name: '🏗️ Setup', description: 'Pre-evaluation setup and basic functionality check' }

const evaluationTemplates = [
  { name: 'Logic Test', description: 'Evaluates logical reasoning capabilities' },
  { name: 'Creativity', description: 'Tests creative problem-solving skills' },
  { name: 'Knowledge', description: 'Assesses domain-specific expertise' },
  { name: 'Communication', description: 'Evaluates written and verbal communication' },
  { name: 'Problem Solving', description: 'Tests analytical and critical thinking' },
]

const candidateNames = [
  'Alex Chen',
  'Morgan Rodriguez',
  'Sam Johnson',
  'Casey Williams',
  'Jordan Brown',
  'Taylor Davis',
  'Riley Wilson',
  'Avery Garcia',
  'Quinn Martinez',
  'Dakota Thompson',
  'Blake Anderson',
  'Cameron Lee',
  'Drew Parker',
  'Ellis Morgan',
  'Finley Wright',
  'Harper Kim',
  'Indigo Foster',
  'Jules Rivera',
  'Kai Nguyen',
  'Lane Cooper',
  'Micah Bell',
  'Nova Price',
  'Ocean Torres',
  'Phoenix Gray',
  'Quinn Stone',
  'River Hayes',
  'Sage Murphy',
  'Sky Coleman',
  'Tatum Brooks',
  'Vale Chen',
  'West Jordan',
  'Zara Singh',
  'Ari Patel',
  'Bay Martinez',
  'Crew Walker',
  'Davi Silva',
  'Eden Clark',
  'Frost Reed',
  'Gray Watson',
  'Haven Cole',
  'Iris Young',
  'Jazz Phillips',
  'Knox Evans',
  'Lyra Adams',
  'Mars Kelly',
  'Neo Scott',
  'Onyx Turner',
  'Penn Hughes',
  'Quest Moore',
  'Rune Baker',
]

function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

function generateShortUuid() {
  return Math.random().toString(36).substr(2, 8).toUpperCase()
}

function getRandomDelay(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function simulateCandidate(candidate: Candidate, evaluations: Evaluation[]) {
  const channel = 'candidates-channel'

  // Start with 'not-started' state
  await pusher.trigger(channel, 'candidate-created', candidate)

  // Wait a bit, then move to starting
  await sleep(getRandomDelay(2000, 5000))

  candidate.state = 'starting'

  // Wait a bit, then start setup check
  await sleep(getRandomDelay(3000, 6000))

  // Process setup check first (higher failure rate)
  const setupFailed = Math.random() < 0.4 // 40% failure for setup

  if (setupFailed) {
    // Setup failed - candidate fails immediately, no pills shown
    candidate.state = 'failure'
    candidate.evaluationsFailed = 1
    candidate.evaluationsTotal = evaluations.length
    candidate.evaluationResults = [
      {
        id: generateId(),
        name: setupCheck.name,
        status: 'failed' as const,
      },
      ...evaluations.map(evaluation => ({
        id: evaluation.id,
        name: evaluation.name,
        status: 'pending' as const,
      })),
    ]

    await pusher.trigger(channel, 'candidate-updated', {
      id: candidate.id,
      state: candidate.state,
      evaluationsTotal: candidate.evaluationsTotal,
      evaluationsComplete: 0,
      evaluationsFailed: candidate.evaluationsFailed,
      evaluationResults: candidate.evaluationResults,
    })
    return
  }

  // Setup passed - show pills with Setup already green
  candidate.evaluationsTotal = evaluations.length
  candidate.evaluationResults = [
    {
      id: generateId(),
      name: setupCheck.name,
      status: 'passed' as const,
    },
    ...evaluations.map(evaluation => ({
      id: evaluation.id,
      name: evaluation.name,
      status: 'pending' as const,
    })),
  ]
  candidate.state = 'evaluating'
  candidate.evaluationsComplete = 0
  candidate.evaluationsFailed = 0

  await pusher.trigger(channel, 'candidate-updated', {
    id: candidate.id,
    state: candidate.state,
    evaluationsTotal: candidate.evaluationsTotal,
    evaluationsComplete: candidate.evaluationsComplete,
    evaluationsFailed: candidate.evaluationsFailed,
    evaluationResults: candidate.evaluationResults,
  })

  // Process each actual evaluation (starting from index 1, after setup)
  for (let i = 1; i < candidate.evaluationResults.length; i++) {
    await sleep(getRandomDelay(2000, 4000))

    // 15% failure rate for evaluations
    const failed = Math.random() < 0.15

    if (failed) {
      candidate.evaluationsFailed++
      candidate.evaluationResults[i].status = 'failed'
      candidate.state = 'failure'

      await pusher.trigger(channel, 'candidate-updated', {
        id: candidate.id,
        state: candidate.state,
        evaluationsTotal: candidate.evaluationsTotal,
        evaluationsComplete: candidate.evaluationsComplete,
        evaluationsFailed: candidate.evaluationsFailed,
        evaluationResults: candidate.evaluationResults,
      })
      return
    } else {
      candidate.evaluationsComplete++
      candidate.evaluationResults[i].status = 'passed'

      await pusher.trigger(channel, 'candidate-updated', {
        id: candidate.id,
        state: candidate.state,
        evaluationsTotal: candidate.evaluationsTotal,
        evaluationsComplete: candidate.evaluationsComplete,
        evaluationsFailed: candidate.evaluationsFailed,
        evaluationResults: candidate.evaluationResults,
      })
    }
  }

  // All evaluations passed - mark as complete
  candidate.state = 'complete'
  await pusher.trigger(channel, 'candidate-updated', {
    id: candidate.id,
    state: candidate.state,
    evaluationsTotal: candidate.evaluationsTotal,
    evaluationsComplete: candidate.evaluationsComplete,
    evaluationsFailed: candidate.evaluationsFailed,
    evaluationResults: candidate.evaluationResults,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { agent, inputValue } = body

    if (!agent) {
      return new Response(JSON.stringify({ error: 'Agent is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const channel = 'candidates-channel'

    // Signal simulation start
    await pusher.trigger(channel, 'simulation-started', {
      agent,
      inputValue,
      timestamp: new Date().toISOString(),
    })

    // Create 5 evaluations
    const evaluations: Evaluation[] = []
    const numEvaluations = 5

    for (let i = 0; i < numEvaluations; i++) {
      const template = evaluationTemplates[i]
      const evaluation: Evaluation = {
        id: generateId(),
        name: template.name,
        description: template.description,
      }
      evaluations.push(evaluation)

      await pusher.trigger(channel, 'evaluation-created', evaluation)
      await sleep(50) // Small delay between evaluation creation
    }

    // Create 50 candidates
    const candidates: Candidate[] = []
    const numCandidates = 50

    for (let i = 0; i < numCandidates; i++) {
      const candidate: Candidate = {
        id: generateId(),
        name: `candidate_${(i + 1).toString().padStart(2, '0')}`,
        state: 'not-started',
        createdAt: new Date().toISOString(),
        evaluationsTotal: 0,
        evaluationsComplete: 0,
        evaluationsFailed: 0,
        evaluationResults: [],
      }
      candidates.push(candidate)
    }

    // Start processing candidates concurrently with slight delays
    const promises = candidates.map((candidate, index) => {
      return new Promise(async resolve => {
        // Stagger candidate creation more for 50 candidates
        await sleep(index * 500)
        await simulateCandidate(candidate, evaluations)
        resolve(null)
      })
    })

    // Wait for all candidates to complete, then signal simulation end
    Promise.all(promises).then(async () => {
      await sleep(1000) // Brief pause before signaling completion
      await pusher.trigger(channel, 'simulation-completed', {
        timestamp: new Date().toISOString(),
      })
    })

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Simulation started',
        candidatesCount: candidates.length,
        evaluationsCount: evaluations.length,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error starting simulation:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
