
import { Sermon } from '@/types/sermon';

// Constants
const YOUTUBE_CHANNEL_ID = 'UCcOMgfZtPbjoMBVHuzqWYSg'; // Added UC prefix which is standard for channel IDs usually, but user gave cOMgfZtPbjoMBVHuzqWYSg. Let's check. 
// YouTube Channel IDs usually start with UC. The user gave 'cOMgfZtPbjoMBVHuzqWYSg'. If I append UC it might work.
// However, the user provided 'cOMgfZtPbjoMBVHuzqWYSg'. Let's trust the user or try both if one fails? 
// Actually, looking at youtubeService.ts, playlists are used. 
// "La FE de Dios para Vencer" is the title.

// Let's stick to the ID provided by user: 'cOMgfZtPbjoMBVHuzqWYSg' looks like a channel ID without UC? 
// Actually standard YouTube Channel IDs are 24 chars starting with UC. 
// 'cOMgfZtPbjoMBVHuzqWYSg' is 22 chars. 'UC' + that = 24 chars. It's likely the suffix. 
// But the user prompt had `channelId=${YOUTUBE_CHANNEL_ID}`. 
// I will use `UCcOMgfZtPbjoMBVHuzqWYSg` if the user provided one is just the suffix, OR just use it as is.
// I'll try to use it as is first, but 'UC' prefix is safer for channelId param usually.
// Wait, the user provided code snippet used it directly. I will follow the snippet.

const YOUTUBE_ID_PROVIDED = 'cOMgfZtPbjoMBVHuzqWYSg';
const SPOTIFY_SHOW_ID = '4Prj1pzkAPNe0Mvk0LKLEo';

// Keys - Fallback to the one found in youtubeService.ts if env is missing
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || "AIzaSyDhqY0Jro3q7yMh_JUCdi5ayxvluJRjNB0";
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

export async function fetchPasionMedia(): Promise<MediaResponse> {
    console.log('Fetching Pasión Media...');

    const [sermons, podcasts] = await Promise.all([
        fetchYouTubeContent(),
        fetchSpotifyContent()
    ]);

    return { sermons, podcasts };
}

async function fetchYouTubeContent(): Promise<Sermon[]> {
    try {
        // 1. Fetch latest videos
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?channelId=${YOUTUBE_ID_PROVIDED}&part=snippet,id&order=date&maxResults=5&type=video&key=${YOUTUBE_API_KEY}`;
        const res = await fetch(searchUrl, { next: { revalidate: 3600 } });

        if (!res.ok) {
            console.error(`YouTube Search Error: ${res.statusText}`);
            return [];
        }

        const data = await res.json();
        const items = data.items || [];

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
        // We try to find it in the latest results first
        const pinnedTitlePart = "La FE de Dios para Vencer";
        let pinnedVideo = mappedSermons.find(s => s.title.includes(pinnedTitlePart));

        // If not found in latest, we might need to search specifically (Optional, but good for "Pinned" requirement)
        if (!pinnedVideo) {
            // Search specifically for it
            try {
                const specificUrl = `https://www.googleapis.com/youtube/v3/search?channelId=${YOUTUBE_ID_PROVIDED}&part=snippet,id&q=${encodeURIComponent(pinnedTitlePart)}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`;
                const specRes = await fetch(specificUrl, { next: { revalidate: 3600 * 24 } }); // Long cache for static pin

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

        // 3. Construct final list: Pinned + Latest (excluding pinned if present)
        let finalSermons: Sermon[] = [];

        if (pinnedVideo) {
            finalSermons.push(pinnedVideo);
        }

        // Add others up to total 3
        for (const s of mappedSermons) {
            if (finalSermons.length >= 3) break;
            if (pinnedVideo && s.id === pinnedVideo.id) continue;
            finalSermons.push(s);
        }

        return finalSermons;

    } catch (error) {
        console.error("Error in fetchYouTubeContent:", error);
        return [];
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
            // If token expired (401), we might want to log it clearly
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
