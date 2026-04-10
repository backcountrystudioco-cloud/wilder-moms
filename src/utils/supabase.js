import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fxdpdjxivteudkdmmtmd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZHBkanhpdnRldWRrZG1tdG1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NzcyOTksImV4cCI6MjA5MTM1MzI5OX0.qMpqtOE3_RAPs5t3Q4XMiP7tnhzeFl9ASVGxVCLq6Fw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
