# Candidates Backend Integration Documentation

## Overview

This document provides everything a backend developer needs to integrate with the existing candidates frontend. The
system displays real-time candidate evaluations using Pusher WebSockets, with a structured evaluation pipeline and live
UI updates.

## Pusher Configuration

### Environment Variables

```env
PUSHER_SECRET=your_pusher_secret_here
```

### Pusher Settings

- **App ID**: `2006171`
- **Key**: `37677dc9f2d0ad56109f`
- **Secret**: Use `PUSHER_SECRET` environment variable
- **Cluster**: `us3`
- **Channel**: `candidates`
- **Event**: `candidate-updated`

## Data Structure

### Candidate Object

```typescript
interface Candidate {
  id: string // e.g., "candidate_01", "candidate_02"
  status: CandidateStatus // See status enum below
  createdAt: string // ISO timestamp
  evaluationResults?: EvaluationResult[] // Always include in updates
}
```

### Candidate Status

```typescript
enum CandidateStatus {
  STARTING = 'starting', // Initial state with spinner
  EVALUATING = 'evaluating', // Running evaluations with spinner
  COMPLETED = 'completed', // All evaluations finished
  FAILED = 'failed', // Evaluation failed
}
```

### Evaluation Result Structure

```typescript
interface EvaluationResult {
  name: string // Evaluation name
  status: EvaluationStatus // Evaluation outcome
  completedAt?: string // ISO timestamp when completed
}

enum EvaluationStatus {
  PENDING = 'pending', // Not started (gray)
  PASSED = 'passed', // Completed successfully (green)
  FAILED = 'failed', // Failed evaluation (red)
}
```

### Required Evaluations (in order)

1. **Setup** - Prerequisite check (40% failure rate)
2. **Logic Test** - Core evaluation (15% failure rate)
3. **Creativity** - Core evaluation (15% failure rate)
4. **Knowledge** - Core evaluation (15% failure rate)
5. **Communication** - Core evaluation (15% failure rate)
6. **Problem Solving** - Core evaluation (15% failure rate)

## Implementation Flow

### 1. Candidate Creation

When creating a new candidate:

```javascript
// Send initial candidate data
pusher.trigger('candidates', 'candidate-updated', {
  id: 'candidate_01',
  status: 'starting',
  createdAt: new Date().toISOString(),
  evaluationResults: [], // Empty array initially
})
```

### 2. Setup Phase

Before running actual evaluations, complete the Setup check:

```javascript
// Setup in progress (optional - can skip directly to Setup completion)
pusher.trigger('candidates', 'candidate-updated', {
  id: 'candidate_01',
  status: 'evaluating',
  createdAt: '2025-01-10T14:12:45.000Z',
  evaluationResults: [
    {
      name: 'Setup',
      status: 'pending',
      completedAt: new Date().toISOString(),
    },
  ],
})

// Setup completed (40% should fail here)
const setupPassed = Math.random() > 0.4 // 40% failure rate

pusher.trigger('candidates', 'candidate-updated', {
  id: 'candidate_01',
  status: setupPassed ? 'evaluating' : 'failed',
  createdAt: '2025-01-10T14:12:45.000Z',
  evaluationResults: [
    {
      name: 'Setup',
      status: setupPassed ? 'passed' : 'failed',
      completedAt: new Date().toISOString(),
    },
  ],
})
```

### 3. Running Evaluations

Only proceed with actual evaluations if Setup passed:

```javascript
const evaluations = ['Logic Test', 'Creativity', 'Knowledge', 'Communication', 'Problem Solving']
let currentResults = [{ name: 'Setup', status: 'passed', completedAt: '2025-01-10T14:12:45.000Z' }]

for (const evaluation of evaluations) {
  // Add pending evaluation
  currentResults.push({
    name: evaluation,
    status: 'pending',
  })

  pusher.trigger('candidates', 'candidate-updated', {
    id: 'candidate_01',
    status: 'evaluating',
    createdAt: '2025-01-10T14:12:45.000Z',
    evaluationResults: [...currentResults],
  })

  // Simulate evaluation processing time
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Complete evaluation (15% failure rate for each)
  const passed = Math.random() > 0.15
  const lastResult = currentResults[currentResults.length - 1]
  lastResult.status = passed ? 'passed' : 'failed'
  lastResult.completedAt = new Date().toISOString()

  // If any evaluation fails, mark candidate as failed
  if (!passed) {
    pusher.trigger('candidates', 'candidate-updated', {
      id: 'candidate_01',
      status: 'failed',
      createdAt: '2025-01-10T14:12:45.000Z',
      evaluationResults: [...currentResults],
    })
    break
  }
}

// If all evaluations passed
const allPassed = currentResults.every(r => r.status === 'passed')
if (allPassed) {
  pusher.trigger('candidates', 'candidate-updated', {
    id: 'candidate_01',
    status: 'completed',
    createdAt: '2025-01-10T14:12:45.000Z',
    evaluationResults: [...currentResults],
  })
}
```

## Critical Implementation Notes

### 1. Always Include evaluationResults

**IMPORTANT**: Every `candidate-updated` event MUST include the `evaluationResults` array, even if empty. This was the
original bug - missing evaluationResults during status transitions.

```javascript
// ❌ WRONG - Missing evaluationResults
pusher.trigger('candidates', 'candidate-updated', {
  id: 'candidate_01',
  status: 'evaluating',
})

// ✅ CORRECT - Always include evaluationResults
pusher.trigger('candidates', 'candidate-updated', {
  id: 'candidate_01',
  status: 'evaluating',
  evaluationResults: [],
})
```

### 2. Candidate Naming Convention

Use sequential naming: `candidate_01`, `candidate_02`, etc.

### 3. Setup vs Core Evaluations

- **Setup**: Prerequisite (40% failure rate) - not counted in X/5 progress
- **Core Evaluations**: 5 actual evaluations (15% failure rate each) - counted as X/5

### 4. Timing Considerations

Pills only appear in the UI after Setup completes. If Setup fails, no pills are shown and candidate is marked as failed
immediately.

## Sample Complete Implementation

```javascript
const pusher = new Pusher(process.env.PUSHER_APP_ID, {
  key: '37677dc9f2d0ad56109f',
  secret: process.env.PUSHER_SECRET,
  cluster: 'us3',
  useTLS: true,
})

async function runCandidateEvaluation(candidateId) {
  // 1. Create candidate
  pusher.trigger('candidates', 'candidate-updated', {
    id: candidateId,
    status: 'starting',
    createdAt: new Date().toISOString(),
    evaluationResults: [],
  })

  await new Promise(resolve => setTimeout(resolve, 1000))

  // 2. Run Setup (40% failure rate)
  const setupPassed = Math.random() > 0.4

  pusher.trigger('candidates', 'candidate-updated', {
    id: candidateId,
    status: setupPassed ? 'evaluating' : 'failed',
    createdAt: new Date().toISOString(),
    evaluationResults: [
      {
        name: 'Setup',
        status: setupPassed ? 'passed' : 'failed',
        completedAt: new Date().toISOString(),
      },
    ],
  })

  if (!setupPassed) return // Stop if setup failed

  // 3. Run core evaluations
  const evaluations = ['Logic Test', 'Creativity', 'Knowledge', 'Communication', 'Problem Solving']
  let results = [{ name: 'Setup', status: 'passed', completedAt: new Date().toISOString() }]

  for (const evaluation of evaluations) {
    // Add pending evaluation
    results.push({ name: evaluation, status: 'pending' })

    pusher.trigger('candidates', 'candidate-updated', {
      id: candidateId,
      status: 'evaluating',
      createdAt: new Date().toISOString(),
      evaluationResults: [...results],
    })

    // Simulate evaluation time
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Complete evaluation (15% failure rate)
    const passed = Math.random() > 0.15
    const lastResult = results[results.length - 1]
    lastResult.status = passed ? 'passed' : 'failed'
    lastResult.completedAt = new Date().toISOString()

    if (!passed) {
      pusher.trigger('candidates', 'candidate-updated', {
        id: candidateId,
        status: 'failed',
        createdAt: new Date().toISOString(),
        evaluationResults: [...results],
      })
      return
    }
  }

  // All evaluations passed
  pusher.trigger('candidates', 'candidate-updated', {
    id: candidateId,
    status: 'completed',
    createdAt: new Date().toISOString(),
    evaluationResults: [...results],
  })
}

// Run 50 candidates
for (let i = 1; i <= 50; i++) {
  const candidateId = `candidate_${i.toString().padStart(2, '0')}`
  runCandidateEvaluation(candidateId)

  // Stagger candidate creation
  await new Promise(resolve => setTimeout(resolve, 500))
}
```

## Frontend Behavior

### UI States

- **Starting/Evaluating**: Shows spinner next to candidate name
- **Setup Failed**: Red background, no evaluation pills shown
- **Evaluations In Progress**: Pills appear as evaluations complete
- **Completed**: Green background, all pills green
- **Failed**: Red background, failed pill is red

### Sorting

Candidates auto-sort into three tiers:

1. **Successful** (status: completed) - Green background
2. **Pending** (status: starting/evaluating) - White background
3. **Failed** (status: failed) - Red background

### Detail View

Click any candidate to see:

- Full evaluation timeline
- Output preview placeholder
- Performance metrics placeholder
- "Open in Wordware" button

## Testing Checklist

- [ ] Candidates appear with sequential names
- [ ] Spinners show during starting/evaluating states
- [ ] Setup failures immediately show red background (no pills)
- [ ] Setup success shows green "Setup" pill first
- [ ] Core evaluation pills appear progressively
- [ ] Failed evaluations show red pills and red background
- [ ] Completed candidates show green background and all green pills
- [ ] WebSocket reconnection works properly
- [ ] Multiple candidates can run simultaneously
- [ ] Sorting works correctly across all states

## Environment Setup

Ensure your backend environment includes:

```env
PUSHER_SECRET=your_actual_pusher_secret
```

The frontend handles all UI logic - you only need to send properly formatted WebSocket events with the correct data
structure.
