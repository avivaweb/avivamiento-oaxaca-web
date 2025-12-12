import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'edge'

// Shared schema with frontend
const groupSchema = z.object({
    fullName: z.string().min(5),
    phone: z.string().regex(/^\d{10}$/),
    email: z.string().email(),
    preference: z.enum(['presencial', 'online']),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate request body
        const validatedData = groupSchema.parse(body)

        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) {
            console.error('API URL not configured')
            return NextResponse.json({ error: 'Configuration error' }, { status: 500 })
        }

        // Proxy to backend
        const response = await fetch(`${apiUrl}/groups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData),
        })

        // If backend returns error, try to pass it through or default to 500
        if (!response.ok) {
            console.error(`Backend responded with ${response.status} for /groups`)
            // Try to read error body if possible
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
            return NextResponse.json({
                error: 'Validation failed',
                details: error.issues
            }, { status: 400 })
        }

        console.error('Internal Error /api/groups:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
