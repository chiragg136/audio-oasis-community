
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://idpwghsuiaucwxjdzaqv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkcHdnaHN1aWF1Y3d4amR6YXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NTY0ODAsImV4cCI6MjA1OTQzMjQ4MH0.nEK9RRcMFsqrxwQqpBvPvXDjdGv6uKIVadwxIVK4gas';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
