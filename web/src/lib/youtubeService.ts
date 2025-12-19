import { Sermon } from '@/types/sermon';

const YOUTUBE_API_KEY = "AIzaSyDhqY0Jro3q7yMh_JUCdi5ayxvluJRjNB0";

// Playlist Configuration
const PLAYLISTS = [
    {
        id: 'PLubW3TO-vkDy1TBVG9TzLRiFtwB5q7Ii_',
        topic: 'Reunión General',
        pastor: 'Avivamiento Oaxaca' // Default pastor if not parseable
    },
    {
        id: 'PLubW3TO-vkDyM0jYemWqhynTS4BSR2io9',
        topic: 'Mujeres en Victoria',
        pastor: 'Pastora Montserrat' // Reasonable default for Women's ministry
    }
];

export async function fetchLatestSermons(): Promise<Sermon[]> {
    if (!YOUTUBE_API_KEY) {
        console.warn('YouTube API Key is missing. Returning empty list.');
        return [];
    }

    try {
        const sermonPromises = PLAYLISTS.map(playlist =>
            fetchPlaylistItems(playlist.id, playlist.topic, playlist.pastor)
        );

        const results = await Promise.all(sermonPromises);

        // Flatten array and sort by date descending
        const allSermons = results.flat().sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        return allSermons;

    } catch (error) {
        console.error('Failed to fetch sermons from YouTube:', error);
        return [];
    }
}

async function fetchPlaylistItems(playlistId: string, topic: string, defaultPastor: string): Promise<Sermon[]> {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=20&key=${YOUTUBE_API_KEY}`;

    try {
        const res = await fetch(url, { next: { revalidate: 3600 } });

        if (!res.ok) {
            console.error(`YouTube API Error for playlist ${playlistId}: ${res.status} ${res.statusText}`);
            return [];
        }

        const data = await res.json();

        if (!data.items) {
            return [];
        }

        return data.items.map((item: any) => {
            const snippet = item.snippet;
            const videoId = snippet.resourceId.videoId;

            return {
                id: videoId,
                title: snippet.title,
                description: snippet.description,
                video_url: `https://www.youtube.com/watch?v=${videoId}`,
                pastor: defaultPastor, // We can refine this later with regex if needed
                topic: topic,
                date: snippet.publishedAt,
                thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url
            };
        });

    } catch (error) {
        console.error(`Error fetching playlist ${playlistId}:`, error);
        return [];
    }
}
