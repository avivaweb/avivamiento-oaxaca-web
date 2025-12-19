export interface Sermon {
    id: number;
    title: string;
    description: string;
    video_url: string;
    pastor: string;
    topic: string;
    date: string;
    created_at?: string;
}
