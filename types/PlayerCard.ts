import { type Database } from './Database';

export type PlayerCard = Database['public']['Tables']['player_cards']['Row'];
export type PlayerCardOnGame =
  Database['public']['Functions']['get_player_cards']['Returns'];
