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
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!apiUrl) {
      console.error('API URL not configured')
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 })
    }

    // Determine if we are hitting Supabase directly to adjust path and headers
    const isSupabase = apiUrl.includes('supabase.co')
    const finalUrl = isSupabase
      ? `${apiUrl}/rest/v1/subscriber` // TARGET TABLE: 'subscriber'
      : `${apiUrl}/subscriber`

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Prefer': 'return=representation' // To get the created row back
    }

    if (isSupabase) {
      if (!apiKey) {
        console.error('Supabase Anon Key not configured')
        return NextResponse.json({ error: 'Configuration error: Missing API Key' }, { status: 500 })
      }
      headers['apikey'] = apiKey
      headers['Authorization'] = `Bearer ${apiKey}`
    }

    const response = await fetch(finalUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, whatsapp_number }),
    })

    if (!response.ok) {
      console.error(`Backend responded with ${response.status} for ${finalUrl}`)
      try {
        const errorBody = await response.json()
        console.error('Error details:', errorBody)
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