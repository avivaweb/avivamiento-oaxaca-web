export interface Sermon {
    id: string | number;
    title: string;
    description: string;
    video_url: string;
    pastor: string;
    topic: string;
    date: string;
    thumbnailUrl?: string; // High resolution thumbnail from YouTube
    created_at?: string;
}
