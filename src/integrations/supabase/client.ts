
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

//TODO: itay -> make auto-trigger

const SUPABASE_URL = "https://vmfawnqfghsvnqrmepbo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZmF3bnFmZ2hzdm5xcm1lcGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1MTQyOTYsImV4cCI6MjA1ODA5MDI5Nn0.EXbViLiDuxpPm6Vp9EaNCyOu-QX_z_i5LYjGat5cjas";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
