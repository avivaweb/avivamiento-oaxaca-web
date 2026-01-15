import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'

const subscribeSchema = z.object({
  email: z.string().email(),
  whatsapp_number: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, whatsapp_number } = subscribeSchema.parse(body)

    const { data, error } = await supabase
      .from('subscriber')
      .insert({
        email,
        phone: whatsapp_number, // User context implies whatsapp is the phone field in my new schema
        whatsapp_number, // Keeping it populated as well just in case
        source: 'newsletter'
      })
      .select()

    if (error) {
      // Handle unique constraint violation for email
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Este correo ya está suscrito.' }, { status: 409 })
      }
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 })
    }
    console.error('Unexpected error /api/subscribe:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}