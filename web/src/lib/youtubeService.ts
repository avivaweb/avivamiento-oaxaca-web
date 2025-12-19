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

    // We use the 'search' endpoint because 'playlistItems' is currently returning errors/restrictions.
    // Search allows us to get the latest videos from the channel.
    // Note: Search relies on quota (100 units) vs playlistItems (1 unit), but it is the working path.
    const channelId = 'UCcOMgfZtPbjoMBVHuzqWYSg';
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`;

    try {
        const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour

        if (!res.ok) {
            const errorBody = await res.text();
            console.error(`YouTube API Error: ${res.status} ${res.statusText}`, errorBody);
            return [];
        }

        const data = await res.json();

        if (!data.items) {
            console.warn('YouTube API returned no items.');
            return [];
        }

        return data.items.map((item: any) => {
            const snippet = item.snippet;
            const videoId = item.id.videoId; // In search response, it's id.videoId

            return {
                id: videoId,
                title: snippet.title,
                description: snippet.description,
                video_url: `https://www.youtube.com/watch?v=${videoId}`,
                // We don't get Pastor/Topic from YouTube, so we set defaults
                pastor: "Avivamiento Oaxaca",
                topic: "Mensaje General",
                date: snippet.publishedAt,
                thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url
            };
        });

    } catch (error) {
        console.error('Failed to fetch sermons from YouTube:', error);
        return [];
    }
}
