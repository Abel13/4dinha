import { Database } from './Database';

export type MatchUser = Database['public']['Tables']['match_users']['Row'];
export type MatchUserInsert =
  Database['public']['Tables']['match_users']['Insert'];
export type MatchUserUpdate =
  Database['public']['Tables']['match_users']['Update'];
