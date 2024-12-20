import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lkgxwxqjkcilgqpaqbbi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrZ3h3eHFqa2NpbGdxcGFxYmJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2ODcxMDIsImV4cCI6MjA1MDI2MzEwMn0.ndFU8UKO4AA9IGuLyRlvYfwg6iQdkjmuFQ-h5Km3fMc';

export const supabase = createClient(supabaseUrl, supabaseKey);
