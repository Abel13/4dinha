# Regras Oficiais do 4dinha

Este documento descreve **como o jogo funciona oficialmente** para orientar desenvolvimento, QA e evolução de produto.

## Estrutura da partida

- Cada partida comporta de **3 a 6 jogadores**.
- Todos entram na sala e marcam-se como prontos.
- A partida começa quando o host inicia, respeitando o mínimo de 3 jogadores.

## Elementos do jogo

- Baralho padrão com naipes `♣️ ♥️ ♠️ ♦️`.
- Cartas: `A,2,3,4,5,6,7,8,9,10,Q,J,K`.
- Cada rodada possui uma **manilha** e um conjunto de **trunfos** vinculados à rodada.

## Fases de uma rodada

Cada rodada acontece nesta ordem:

1. **Distribuição** de cartas.
2. **Apostas** de todos os jogadores.
3. **Jogadas** por turno.
4. **Fechamento da rodada** com resultado parcial.

## Quantidade de cartas por rodada

A quantidade de cartas por jogador varia conforme o número da rodada:

- último dígito `0` => 2 cartas
- último dígito `1..6` => valor do dígito
- último dígito `7..9` => `12 - dígito`

Exemplos:

- rodada 1 => 1 carta
- rodada 6 => 6 cartas
- rodada 7 => 5 cartas
- rodada 9 => 3 cartas
- rodada 10 => 2 cartas

## Regras de aposta

- Cada jogador informa sua aposta para a rodada.
- A aposta define a previsão de vazas que o jogador pretende vencer.
- Regra especial da última aposta do dealer:
  - a soma final das apostas da rodada **não pode** ser igual ao total de cartas da rodada.

## Regras de jogada

- Apenas o jogador da vez pode jogar.
- A rodada avança até conclusão das jogadas previstas.
- Ao fim da rodada, são consolidados:
  - aposta feita por jogador
  - vazas vencidas por jogador
  - vidas restantes por jogador

## Vidas e progressão

- Todo jogador participa da partida com vidas.
- A partida evolui por rodadas, atualizando o estado de vidas ao final de cada uma.
- O detalhamento da fórmula de perda/ganho de vidas deve ser mantido neste documento sempre que ajustado em produto.

## Condição de vitória

- A partida termina quando resta somente um jogador elegível para vencer.
- Esse jogador é declarado vencedor da partida.
