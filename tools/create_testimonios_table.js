import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://otqryfvktrckhlotqugo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90cXJ5ZnZrdHJja2hsb3RxdWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4ODcwMDMsImV4cCI6MjA2NjQ2MzAwM30.JxeiaBg-iYLhNP8CXFwNmOqzohMSDPguXc2h-HBe6r4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const createTestimoniosTable = async () => {
    const { error } = await supabase.sql(`
        CREATE TABLE testimonios (
            id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
            title text NOT NULL,
            url text
        );
    `);

    if (error) {
        console.error('Error creating testimonios table:', error);
    } else {
        console.log('Testimonios table created successfully');
    }
};

createTestimoniosTable();