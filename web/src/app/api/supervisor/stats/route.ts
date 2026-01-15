import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase' // Using the shared client or creating a new one with cookies if needed

export const runtime = 'edge'

export async function GET(request: NextRequest) {
    try {
        // 1. Authenticate User
        // Note: For Edge runtimes, we might need to parse cookies manually or use a specific auth helper.
        // For simplicity in this structure, we'll try to get the auth header.
        const authHeader = request.headers.get('Authorization')

        if (!authHeader) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const token = authHeader.replace('Bearer ', '')
        const { data: { user }, error: authError } = await supabase.auth.getUser(token)

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 2. Call RPC Function
        const { data, error } = await supabase
            .rpc('get_supervisor_stats', { input_supervisor_id: user.id })

        if (error) {
            console.error('RPC Error:', error)
            return NextResponse.json({ error: 'Error fetching stats' }, { status: 500 })
        }

        return NextResponse.json(data)

    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
