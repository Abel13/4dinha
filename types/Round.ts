import { Database } from './Database';

export type Round = Database['public']['Tables']['rounds']['Row'];

export type RoundStatus = Database['public']['Enums']['round_status'];
