import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
});

export const apiSupabase = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SUPABASE_URL,
  headers: {
    apiKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  },
});
