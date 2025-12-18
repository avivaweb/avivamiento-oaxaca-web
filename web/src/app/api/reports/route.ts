import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'edge'

const reportSchema = z.object({
    date: z.string(),
    adults_attendance: z.number().min(0),
    children_attendance: z.number().min(0),
    new_decisions: z.number().min(0),
    prayer_requests: z.string().optional(),
    observations: z.string().optional(),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = reportSchema.parse(body)

        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!apiUrl || !apiKey) {
            console.error('API configuration missing')
            return NextResponse.json({ error: 'Configuration error' }, { status: 500 })
        }

        const response = await fetch(`${apiUrl}/rest/v1/celula_reports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey,
                'Authorization': `Bearer ${apiKey}`,
                'Prefer': 'return=minimal',
            },
            body: JSON.stringify(validatedData),
        })

        if (!response.ok) {
            console.error('Supabase error:', await response.text())
            return NextResponse.json({ error: 'Error saving report' }, { status: response.status })
        }

        return NextResponse.json({ success: true }, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 })
        }
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
