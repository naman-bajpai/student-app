import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://rareyhzrzaviqfbgkjzz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcmV5aHpyemF2aXFmYmdranp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNzM2MDEsImV4cCI6MjA1MzY0OTYwMX0.sD8DP0ECEV20cv4daY3mk8NW-x66i8MuIJHf5mhqmVE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }, 
});
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh(); 
  } else {
    supabase.auth.stopAutoRefresh();
  }
});