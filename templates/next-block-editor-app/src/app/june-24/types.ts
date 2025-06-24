export interface Message {
  id: number
  type: 'ai' | 'user'
  content: string
  timestamp: Date
}
