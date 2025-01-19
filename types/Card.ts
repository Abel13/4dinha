import { Database } from './Database';

export type Symbol = Database['public']['Enums']['card_symbol'];
export type Suit = Database['public']['Enums']['card_suit'];
export type HandStatus = Database['public']['Enums']['hand_status'];

export type Deck = Database['public']['Tables']['deck']['Row'];
