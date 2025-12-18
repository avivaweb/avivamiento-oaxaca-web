export interface Event {
    id: string;
    title: string;
    description?: string;
    start_time: string; // ISO string
    end_time?: string;
    location?: string;
    category: 'general' | 'special' | 'workshop';
    image_url?: string;
}
