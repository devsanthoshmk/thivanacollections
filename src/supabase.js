import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wilrixrpvkerhnqsdxtu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpbHJpeHJwdmtlcmhucXNkeHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMzI1MDQsImV4cCI6MjA3MTYwODUwNH0.pYD9cHKV83Rtc5fC6KRpp56BZjjBJP4vDFRV5dt8XTM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)