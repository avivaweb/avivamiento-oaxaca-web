'use server';

import { createClient } from '@supabase/supabase-js';

interface YouTubeVideo {
    videoId: string;
    title: string;
    description: string;
    publishedAt: string;
    thumbnailUrl: string;
}

export interface SyncResult {
    success: boolean;
    synced: number;
    updated: number;
    errors: string[];
    message: string;
}

/**
 * Synchronizes YouTube content from Avivamiento Oaxaca channel
 * Fetches latest videos and upserts to Supabase messages table
 */
export async function syncYouTubeContent(): Promise<SyncResult> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    // Validation
    if (!apiKey || !channelId) {
        console.error('[YouTube Sync] Missing API credentials');
        return {
            success: false,
            synced: 0,
            updated: 0,
            errors: ['Credenciales de YouTube faltantes. Verifique variables de entorno.'],
            message: 'Error de configuración'
        };
    }

    try {
        // 1. Fetch from YouTube API v3
        const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20&type=video`;

        console.log('[YouTube Sync] Fetching videos from channel:', channelId);
        const response = await fetch(url, {
            cache: 'no-store',
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[YouTube Sync] API Error:', response.status, errorText);

            return {
                success: false,
                synced: 0,
                updated: 0,
                errors: [`Error de YouTube API (${response.status})`],
                message: 'Error al conectar con YouTube'
            };
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            console.warn('[YouTube Sync] No videos found');
            return {
                success: true,
                synced: 0,
                updated: 0,
                errors: [],
                message: 'No se encontraron videos nuevos'
            };
        }

        // 2. Map YouTube response to our structure
        const videos: YouTubeVideo[] = data.items.map((item: any) => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description || '',
            publishedAt: item.snippet.publishedAt,
            thumbnailUrl: item.snippet.thumbnails?.maxres?.url ||
                item.snippet.thumbnails?.high?.url ||
                `https://img.youtube.com/vi/${item.id.videoId}/maxresdefault.jpg`
        }));

        console.log(`[YouTube Sync] Found ${videos.length} videos to process`);

        // 3. Initialize Supabase client (server-side con SERVICE_ROLE_KEY para bypass de RLS)
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        // SEGURIDAD: usar SERVICE_ROLE_KEY para escrituras desde el servidor
        // NUNCA exponer esta clave en el cliente
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            return {
                success: false,
                synced: 0,
                updated: 0,
                errors: ['Configuración de Supabase faltante. Verifica SUPABASE_SERVICE_ROLE_KEY en variables de entorno.'],
                message: 'Error de configuración de base de datos'
            };
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // 4. Process and upsert each video
        const errors: string[] = [];
        let syncedCount = 0;
        let updatedCount = 0;

        for (const video of videos) {
            try {
                // Detect series name from title
                const serieName = detectSeries(video.title);

                // Check if video already exists
                const { data: existing } = await supabase
                    .from('messages')
                    .select('id, video_id')
                    .eq('video_id', video.videoId)
                    .single();

                const isUpdate = !!existing;

                // Upsert to messages table
                const { error } = await supabase
                    .from('messages')
                    .upsert({
                        video_id: video.videoId,
                        title: video.title,
                        description: video.description,
                        published_at: video.publishedAt,
                        thumbnail_url: video.thumbnailUrl,
                        serie_name: serieName,
                        updated_at: new Date().toISOString()
                    }, {
                        onConflict: 'video_id'
                    });

                if (error) {
                    console.error(`[YouTube Sync] Error upserting video ${video.videoId}:`, error);
                    errors.push(`${video.title}: ${error.message}`);
                } else {
                    if (isUpdate) {
                        updatedCount++;
                    } else {
                        syncedCount++;
                    }

                    console.log(`[YouTube Sync] ${isUpdate ? 'Updated' : 'Synced'}: ${video.title}${serieName ? ` (Serie: ${serieName})` : ''}`);
                }

            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
                console.error(`[YouTube Sync] Exception processing video:`, err);
                errors.push(`${video.title}: ${errorMsg}`);
            }
        }

        // 5. Return result summary
        const totalProcessed = syncedCount + updatedCount;
        const hasErrors = errors.length > 0;

        return {
            success: !hasErrors || totalProcessed > 0,
            synced: syncedCount,
            updated: updatedCount,
            errors,
            message: hasErrors
                ? `Sincronizado parcialmente: ${totalProcessed} videos (${syncedCount} nuevos, ${updatedCount} actualizados)`
                : `✅ Sincronización exitosa: ${syncedCount} videos nuevos, ${updatedCount} actualizados`
        };

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
        console.error('[YouTube Sync] Fatal error:', error);

        return {
            success: false,
            synced: 0,
            updated: 0,
            errors: [errorMsg],
            message: 'Error crítico durante sincronización'
        };
    }
}

/**
 * Detects series name from video title
 * Example: "Vida Zoé: Parte 1" -> "Vida Zoé"
 * Example: "La Fe de Dios: Episode 3" -> "La Fe de Dios"
 * Example: "Mensaje Dominical" -> null
 */
function detectSeries(title: string): string | null {
    const colonIndex = title.indexOf(':');

    if (colonIndex > 0 && colonIndex < title.length - 1) {
        const serieName = title.substring(0, colonIndex).trim();

        // Ensure it's not too short (avoid false positives)
        if (serieName.length >= 3) {
            return serieName;
        }
    }

    return null;
}
