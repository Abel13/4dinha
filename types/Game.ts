import { Bet } from './Bet';
import { Match } from './Match';
import { PlayerCardOnGame } from './PlayerCard';
import { GameRound } from './Round';

/**
 * Representa um jogador em uma partida de jogo.
 */
export interface GamePlayer {
  /**
   * Identificador único do jogador na partida.
   * Relacionado à tabela `match_users`.
   */
  id: string;

  /**
   * Identificador único do usuário associado ao jogador.
   * Relacionado ao sistema de autenticação.
   */
  user_id: string;

  /**
   * Indica se o jogador é o dealer (distribuidor de cartas) na rodada atual.
   * - `true`: O jogador é o dealer.
   * - `false`: O jogador não é o dealer.
   */
  dealer: boolean;

  /**
   * Indica se é a vez do jogador executar alguma ação.
   * - `true`: É a vez do jogador.
   * - `false`: Não é a vez do jogador.
   */
  current: boolean;

  /**
   * Quantidade de vidas restantes do jogador na partida.
   * Utilizado para determinar se o jogador está ativo ou eliminado.
   */
  lives: number;

  /**
   * Posição do jogador na mesa.
   * Usado para organizar os jogadores no layout da partida.
   */
  table_seat: number;

  /**
   * Informações sobre as cartas que o jogador possui durante o jogo.
   * Define o estado das cartas na mão do jogador.
   */
  cards: PlayerCardOnGame;

  /**
   * Quantidade apostada pelo jogador.
   * Define quantos turnos o jogador precisa ganhar na rodada.
   */
  bet: number;
}

export interface Game {
  match: Match;
  players: GamePlayer[];
  round: GameRound;
  player_cards: PlayerCardOnGame;
  bets: Bet[];
}
