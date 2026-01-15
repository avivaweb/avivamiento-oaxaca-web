export interface Report {
    id: string;
    created_at: string;
    date: string;
    cell_id: string;
    user_id: string;
    supervisor_id?: string;

    // Metrics
    adults_attendance: number;
    children_attendance: number;
    new_decisions: number;

    // Stewardship
    offering: number;

    // Edification
    lesson_topic?: string;

    // Glory & Power
    testimonies?: string;
    prayer_requests?: string;
    fotos_urls?: string[]; // Array of image URLs

    // Metadata
    week_number?: number;
    year?: number;
    destacado?: boolean;
    comentario_pastoral?: string;
}

export interface ReportWithLEader extends Report {
    leader_name?: string; // To be joined from profiles/users
    cell_name?: string;   // To be joined from grupos_familiares
}
