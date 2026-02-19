import { type Database } from './Database';

export type PlayerCard = Database['public']['Tables']['player_cards']['Row'];
export type PlayerCardOnGame =
  Database['public']['Functions']['get_player_cards']['Returns'];
/** Single card from get_player_cards (element of the array). */
export type PlayerCardOnGameItem = PlayerCardOnGame[number];
