import { Sermon } from '@/types/sermon';

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
// Avivamiento Oaxaca Channel ID: UC-n0aGfXz3zZ4D6pS2fR0A
// Uploads Playlist ID typically replaces 'UC' with 'UU'
const UPLOADS_PLAYLIST_ID = 'UU-n0aGfXz3zZ4D6pS2fR0A';

export async function fetchLatestSermons(): Promise<Sermon[]> {
    if (!YOUTUBE_API_KEY) {
        console.warn('YouTube API Key is missing. Returning empty list.');
        return [];
    }

    // Call playlistItems to get latest videos from the "Uploads" playlist
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=5&key=${YOUTUBE_API_KEY}`;

    try {
        const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour

        if (!res.ok) {
            const errorBody = await res.text();
            console.error(`YouTube API Error: ${res.status} ${res.statusText}`, errorBody);
            // We return empty array so the page can fallback to something else if needed, 
            // or just show nothing.
            return [];
        }

        const data = await res.json();

        if (!data.items) {
            console.warn('YouTube API returned no items.');
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
                // We don't get Pastor/Topic from YouTube, so we set defaults
                pastor: "Avivamiento Oaxaca",
                topic: "Mensaje General",
                date: snippet.publishedAt,
                thumbnailUrl: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url
            };
        });

    } catch (error) {
        console.error('Failed to fetch sermons from YouTube:', error);
        return [];
    }
}
