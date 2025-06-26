import { getAssignment, getAssignments } from '@/lib/data/assignments'
import { notFound } from 'next/navigation'
import { AssignmentView } from '../components/AssignmentView'

export default function AssignmentPage({ params }: { params: { assignmentId: string } }) {
  const assignment = getAssignment(params.assignmentId)

  if (!assignment) {
    notFound()
  }

  return <AssignmentView assignment={assignment} />
}

export async function generateStaticParams() {
  const assignments = getAssignments()

  return assignments.map(assignment => ({
    assignmentId: assignment.id,
  }))
}
