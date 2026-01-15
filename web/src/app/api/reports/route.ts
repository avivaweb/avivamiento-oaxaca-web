import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value
                    },
                    set(name: string, value: string, options: any) {
                        cookieStore.set({ name, value, ...options })
                    },
                    remove(name: string, options: any) {
                        cookieStore.set({ name, value: '', ...options })
                    },
                },
            }
        )

        // 1. Verify Authentication
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const {
            date,
            adults_attendance,
            children_attendance,
            new_decisions,
            prayer_requests,
            observations,
            attendees_ids = [],
            new_guests = []
        } = body

        // 2. Insert Report
        const { data: report, error: reportError } = await supabase
            .from('celula_reports')
            .insert({
                leader_id: session.user.id,
                date,
                adults_attendance,
                children_attendance,
                new_decisions,
                prayer_requests,
                observations
            })
            .select()
            .single()

        if (reportError) throw reportError

        // 3. Process New Guests (Create Disciples)
        if (new_guests.length > 0) {
            const disciplesToInsert = new_guests.map((guest: any) => ({
                full_name: guest.full_name,
                phone: guest.phone,
                leader_id: session.user.id,
                status: 'Activo',
                conversion_date: new Date().toISOString() // Assuming conversion is now
            }))

            const { data: insertedDisciples, error: disciplesError } = await supabase
                .from('discipulos')
                .insert(disciplesToInsert)
                .select()

            if (disciplesError) {
                console.error('Error adding disciples:', disciplesError);
                // Continue execution to at least save the report, but log error
            } else {
                // If created successfully, mark them as attended too
                const newGuestsAttendance = insertedDisciples.map(d => ({
                    discipulo_id: d.id,
                    report_id: report.id,
                    attended: true
                }))
                await supabase.from('discipulo_attendance').insert(newGuestsAttendance)
            }
        }

        // 4. Process Attendance for Existing Disciples
        if (attendees_ids.length > 0) {
            const attendanceRecords = attendees_ids.map((id: string) => ({
                discipulo_id: id,
                report_id: report.id,
                attended: true
            }))

            const { error: attendanceError } = await supabase
                .from('discipulo_attendance')
                .insert(attendanceRecords)

            if (attendanceError) {
                console.error('Error saving attendance:', attendanceError)
            }
        }

        return NextResponse.json({ success: true, report_id: report.id })

    } catch (error: any) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        )
    }
}
