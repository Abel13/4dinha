import { Suit, Symbol } from './Card';
import { Database } from './Database';

export type Round = Database['public']['Tables']['rounds']['Row'];

export type RoundStatus = Database['public']['Enums']['round_status'];

export type GameRound = {
  round_number: number;
  status: RoundStatus;
  trump_symbol: Symbol;
  trump_suit: Suit;
};
