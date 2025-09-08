import { PostgrestClient } from '@supabase/postgrest-js';

const postgrest = new PostgrestClient('https://otqryfvktrckhlotqugo.supabase.co/rest/v1', {
    headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90cXJ5ZnZrdHJja2hsb3RxdWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4ODcwMDMsImV4cCI6MjA2NjQ2MzAwM30.JxeiaBg-iYLhNP8CXFwNmOqzohMSDPguXc2h-HBe6r4'
    }
});

const createEventsTable = async () => {
    const { error } = await postgrest.rpc('exec', {
        sql: `
            CREATE TABLE events (
                id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                title text NOT NULL,
                category text,
                date date NOT NULL,
                "endDate" date,
                "time" time,
                "endTime" time,
                location text,
                description text,
                speaker text,
                capacity integer,
                registered integer,
                price text,
                featured boolean DEFAULT false,
                image text
            );
        `
    });

    if (error) {
        console.error('Error creating events table:', error);
    } else {
        console.log('Events table created successfully');
    }
};

createEventsTable();