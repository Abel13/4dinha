import { Match } from './Match';
import { PlayerCardOnGame } from './PlayerCards';
import { Round } from './Round';

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
   * Quantidade de vidas restantes do jogador na partida.
   * Utilizado para determinar se o jogador está ativo ou eliminado.
   */
  lives: number;

  /**
   * Posição do jogador na mesa.
   * Usado para organizar os jogadores no layout da partida.
   */
  table_sit: number;

  /**
   * Informações sobre as cartas que o jogador possui durante o jogo.
   * Define o estado das cartas na mão do jogador.
   */
  cards: PlayerCardOnGame;
}

export interface Game {
  match: Match;
  players: GamePlayer[];
  round: Round;
  player_cards: PlayerCardOnGame;
}
