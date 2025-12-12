import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'edge'

const subscribeSchema = z.object({
  email: z.string().email(),
  whatsapp_number: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, whatsapp_number } = subscribeSchema.parse(body)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ltgpdrcwfuwpnqaizsgj.supabase.co'
    if (!apiUrl) {
      console.error('API URL not configured')
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 })
    }

    const response = await fetch(`${apiUrl}/newsletter_subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, whatsapp_number }),
    })

    if (!response.ok) {
      console.error(`Backend responded with ${response.status} for /subscribers`)
      try {
        const errorBody = await response.json()
        return NextResponse.json(errorBody, { status: response.status })
      } catch {
        return NextResponse.json({ error: 'Backend error' }, { status: response.status })
      }
    }

    const responseBody = await response.json()

    return NextResponse.json(responseBody, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 })
    }
    console.error('Unexpected error /api/subscribe:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}