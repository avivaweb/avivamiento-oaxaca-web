import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    // Initialize Supabase Client with Cookies
    const cookieStore = await cookies();
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
    );

    try {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = session.user;
        const body = await request.json();
        const {
            adults_attendance,
            children_attendance,
            new_decisions,
            offering,
            lesson_topic,
            testimonies,
            prayer_requests,
            cell_id,
            supervisor_id,
            fotos_urls,
            // New fields
            zona,
            milagro_categoria
        } = body;

        // Server-side validation
        if (!cell_id) {
            return NextResponse.json({ error: 'Cell ID is required' }, { status: 400 });
        }

        // Construct the insert object
        // NOTE: We are adding 'zona' and 'milagro_categoria'. 
        // Ensure the database table 'celula_reports' has these columns.
        const reportData = {
            user_id: user.id,
            cell_id,
            supervisor_id,
            adults_attendance: parseInt(adults_attendance) || 0,
            children_attendance: parseInt(children_attendance) || 0,
            new_decisions: parseInt(new_decisions) || 0,
            offering: parseFloat(offering) || 0,
            lesson_topic,
            testimonies,
            prayer_requests,
            fotos_urls: fotos_urls || [],
            date: new Date().toISOString(),
            zona, // New Field
            milagro_categoria // New Field
        };

        const { error } = await supabase
            .from('celula_reports')
            .insert(reportData);

        if (error) {
            console.error('Error inserting report:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('SERVER ERROR:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
