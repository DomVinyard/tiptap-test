import { customAlphabet } from 'nanoid'

export const dynamic = 'auto'
export const dynamicParams = true

const getNanoId = (): string => {
  const nanoid = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 10)
  return nanoid()
}

export async function GET(): Promise<Response> {
  return new Response(null, {
    status: 307,
    headers: {
      Location: `/${getNanoId()}`,
      'Cache-Control': 'no-store, max-age=0',
    },
  })
} 