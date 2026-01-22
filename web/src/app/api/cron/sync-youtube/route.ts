import { NextRequest, NextResponse } from 'next/server';
import { syncYouTubeContent } from '@/lib/actions/syncYouTubeContent';

/**
 * GET /api/cron/sync-youtube
 * Triggered by Vercel Cron Jobs to synchronize YouTube content.
 */
export async function GET(req: NextRequest) {
    // Basic security: Check for Vercel Cron Secret or custom header if configured
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // In production, Vercel sends an Authorization header with the CRON_SECRET
    if (process.env.NODE_ENV === 'production' && cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        console.log('[Cron] Starting YouTube synchronization...');
        const result = await syncYouTubeContent();

        if (result.success) {
            return NextResponse.json({
                message: 'Synchronization successful',
                details: {
                    synced: result.synced,
                    updated: result.updated,
                    summary: result.message
                }
            });
        } else {
            console.error('[Cron] Synchronization failed:', result.errors);
            return NextResponse.json({
                error: 'Synchronization failed',
                details: result.errors,
                message: result.message
            }, { status: 500 });
        }
    } catch (error) {
        console.error('[Cron] Critical error during YouTube sync:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
