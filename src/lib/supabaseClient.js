import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://otqryfvktrckhlotqugo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90cXJ5ZnZrdHJja2hsb3RxdWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4ODcwMDMsImV4cCI6MjA2NjQ2MzAwM30.JxeiaBg-iYLhNP8CXFwNmOqzohMSDPguXc2h-HBe6r4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
