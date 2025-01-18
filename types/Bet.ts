import { Database } from './Database';

export type Bet = Database['public']['Tables']['bets']['Row'];
export type BetInsert = Database['public']['Tables']['bets']['Insert'];
