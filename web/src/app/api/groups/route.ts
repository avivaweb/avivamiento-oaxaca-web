import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'

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

        // Insert into 'subscriber' table (acting as Leads)
        const { data, error } = await supabase
            .from('subscriber')
            .insert({
                full_name: validatedData.fullName,
                email: validatedData.email,
                phone: validatedData.phone,
                preference: validatedData.preference,
                source: 'unete-form'
            })
            .select()

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true, data }, { status: 201 })

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
