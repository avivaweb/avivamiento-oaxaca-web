
import { Sermon } from '@/types/sermon';
import { siteConfig } from '@/config/site';

// Constants
const SPOTIFY_SHOW_ID = '4Prj1pzkAPNe0Mvk0LKLEo';
const SPOTIFY_ACCESS_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN;

export interface SpotifyEpisode {
    id: string;
    name: string;
    description: string;
    release_date: string;
    external_urls: { spotify: string };
    images: { url: string; height: number; width: number }[];
    duration_ms: number;
}

export interface MediaResponse {
    sermons: Sermon[];
    podcasts: SpotifyEpisode[];
}

const FALLBACK_SERMONS: Sermon[] = [
    {
        id: "cOMgfZtPbjo",
        title: "La FE de Dios para Vencer | Año de la Pasión",
        description: "Mensaje profético para iniciar el 2026 con la certeza de la victoria en Cristo.",
        video_url: "https://www.youtube.com/watch?v=cOMgfZtPbjo",
        pastor: "Avivamiento Oaxaca",
        topic: "FUNDAMENTO",
        date: new Date().toISOString(),
        thumbnailUrl: "https://i.ytimg.com/vi/cOMgfZtPbjo/hqdefault.jpg"
    },
    {
        id: "S9jG7P_XWk8",
        title: "Propósito Eterno: El Llamado",
        description: "Entiende tu asignación dentro del plan maestro de Dios para esta generación.",
        video_url: "https://www.youtube.com/watch?v=S9jG7P_XWk8",
        pastor: "Avivamiento Oaxaca",
        topic: "ASIGNACIÓN",
        date: new Date(Date.now() - 86400000 * 3).toISOString(),
        thumbnailUrl: "https://i.ytimg.com/vi/S9jG7P_XWk8/hqdefault.jpg"
    },
    {
        id: "Thissis_Kainos_ID",
        title: "Nueva Raza: Thissis Kainós",
        description: "La manifestación de los hijos de Dios en la tierra.",
        video_url: "https://www.youtube.com/watch?v=Thissis_Kainos_ID",
        pastor: "Avivamiento Oaxaca",
        topic: "IDENTIDAD",
        date: new Date(Date.now() - 86400000 * 7).toISOString(),
        thumbnailUrl: "https://i.ytimg.com/vi/cOMgfZtPbjo/hqdefault.jpg" // Fallback placeholder
    }
];

export async function fetchPasionMedia(limit: number = 3): Promise<MediaResponse> {
    console.log(`Fetching Pasión Media (Limit: ${limit})...`);

    const [sermons, podcasts] = await Promise.all([
        fetchYouTubeContent(limit),
        fetchSpotifyContent()
    ]);

    return { sermons, podcasts };
}

async function fetchYouTubeContent(limit: number = 3): Promise<Sermon[]> {
    try {
        const apiKey = siteConfig.youtube.apiKey;
        const channelId = siteConfig.youtube.channelId;

        // CRITICAL: Immediate Fallback if keys are missing
        if (!apiKey || !channelId) {
            console.warn('⚠️ YouTube API Keys missing. Rendering Fallback Content.');
            return FALLBACK_SERMONS.slice(0, limit);
        }

        // 1. Fetch latest videos
        // Request slightly more than limit to account for potential pinning duplicates
        const searchLimit = limit + 2;
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&part=snippet,id&order=date&maxResults=${searchLimit}&type=video&key=${apiKey}`;
        const res = await fetch(searchUrl, { next: { revalidate: 3600 } });

        if (!res.ok) {
            console.warn(`🛡️ Iniciando Protocolo de Resiliencia: Cargando Fundamentos (Status: ${res.status})`);
            // Return fallback instead of empty
            return FALLBACK_SERMONS.slice(0, limit);
        }

        const data = await res.json();
        const items = data.items || [];

        if (items.length === 0) {
            return FALLBACK_SERMONS.slice(0, limit);
        }

        // Map to Sermon type
        let mappedSermons: Sermon[] = items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            video_url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            pastor: 'Avivamiento Oaxaca',
            topic: 'Mensaje Reciente',
            date: item.snippet.publishedAt,
            thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
        }));

        // 2. Pin specific video: "La FE de Dios para Vencer"
        const pinnedTitlePart = "La FE de Dios para Vencer";
        let pinnedVideo = mappedSermons.find(s => s.title.includes(pinnedTitlePart));

        // If not found in latest, search specifically
        if (!pinnedVideo) {
            try {
                const specificUrl = `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&part=snippet,id&q=${encodeURIComponent(pinnedTitlePart)}&type=video&maxResults=1&key=${apiKey}`;
                const specRes = await fetch(specificUrl, { next: { revalidate: 3600 * 24 } });

                if (specRes.ok) {
                    const specData = await specRes.json();
                    if (specData.items && specData.items.length > 0) {
                        const item = specData.items[0];
                        pinnedVideo = {
                            id: item.id.videoId,
                            title: item.snippet.title,
                            description: item.snippet.description,
                            video_url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                            pastor: 'Avivamiento Oaxaca',
                            topic: 'Mensaje Destacado',
                            date: item.snippet.publishedAt,
                            thumbnailUrl: item.snippet.thumbnails?.high?.url,
                        };
                    }
                }
            } catch (e) {
                console.error("Error fetching pinned video explicitly", e);
            }
        }

        // 3. Construct final list: Pinned + Latest
        let finalSermons: Sermon[] = [];

        if (pinnedVideo) {
            finalSermons.push(pinnedVideo);
        }

        for (const s of mappedSermons) {
            if (finalSermons.length >= limit) break;
            if (pinnedVideo && s.id === pinnedVideo.id) continue;
            finalSermons.push(s);
        }

        if (finalSermons.length === 0) {
            return FALLBACK_SERMONS.slice(0, limit);
        }

        return finalSermons;

    } catch (error) {
        console.error("Error in fetchYouTubeContent:", error);
        return FALLBACK_SERMONS.slice(0, limit);
    }
}

async function fetchSpotifyContent(): Promise<SpotifyEpisode[]> {
    if (!SPOTIFY_ACCESS_TOKEN) {
        console.warn("Spotify Access Token missing. Skipping Spotify fetch.");
        return [];
    }

    try {
        const res = await fetch(`https://api.spotify.com/v1/shows/${SPOTIFY_SHOW_ID}/episodes?limit=3`, {
            headers: { 'Authorization': `Bearer ${SPOTIFY_ACCESS_TOKEN}` },
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            if (res.status === 401) {
                console.error("Spotify Token Expired or Invalid.");
            }
            return [];
        }

        const data = await res.json();
        return data.items || [];

    } catch (error) {
        console.error("Error in fetchSpotifyContent:", error);
        return [];
    }
}
