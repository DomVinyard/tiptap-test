import fs from 'fs'
import path from 'path'

const assignmentsDirectory = path.join(process.cwd(), 'src/app/sample-assignments/assignments')

interface Representation {
  markdown: string
}

interface IntentAmbiguity {
  area: string
  simple: boolean
  medium: boolean
  complete: boolean
}

interface ExecutionRisk {
  area_describe: string
  simple: boolean
  medium: boolean
  complete: boolean
}

interface ScoreAndReasoning {
  score: number
  reasoning: string
}

interface Risks {
  intent_ambiguity: IntentAmbiguity[]
  execution_risk: ExecutionRisk[]
  readability: {
    simple: ScoreAndReasoning
    medium: ScoreAndReasoning
    complete: ScoreAndReasoning
  }
  executability: {
    simple: ScoreAndReasoning
    medium: ScoreAndReasoning
    complete: ScoreAndReasoning
  }
}

interface MemoryArea {
  description: string
  derivation: string
  how_improved: string
  risks: string
}

export interface Assignment {
  id: string
  title: string
  purpose: string
  representation: {
    simple: Representation
    medium: Representation
    complete: Representation
  }
  risks: Risks
  memory: {
    areas: MemoryArea[]
  }
}

const extractTitle = (markdown: string) => {
  const titleMatch = markdown.match(/^# (.*)/)
  return titleMatch ? titleMatch[1] : ''
}

const extractPurpose = (markdown: string) => {
  const purposeMatch = markdown.match(/### Purpose\n(.+)/)
  return purposeMatch ? purposeMatch[1].trim() : ''
}

export function getAssignments(): Omit<Assignment, 'representation' | 'risks' | 'memory'>[] {
  const fileNames = fs.readdirSync(assignmentsDirectory).filter(f => f.endsWith('.json'))

  const allAssignmentsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.json$/, '')
    const fullPath = path.join(assignmentsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const assignmentData = JSON.parse(fileContents)

    return {
      id,
      title: extractTitle(assignmentData.representation.simple.markdown),
      purpose: extractPurpose(assignmentData.representation.simple.markdown),
    }
  })

  return allAssignmentsData.sort((a, b) => (a.title > b.title ? 1 : -1))
}

export function getAssignment(id: string): Assignment | undefined {
  const fullPath = path.join(assignmentsDirectory, `${id}.json`)
  if (!fs.existsSync(fullPath)) {
    return undefined
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const assignmentData = JSON.parse(fileContents)

  return {
    id,
    title: extractTitle(assignmentData.representation.simple.markdown),
    purpose: extractPurpose(assignmentData.representation.simple.markdown),
    representation: assignmentData.representation,
    risks: assignmentData.risks,
    memory: assignmentData.memory,
  }
}
