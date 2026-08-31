# Produto

## Visão do produto

`4dinha` é um jogo de cartas multiplayer com experiência mobile horizontal, foco em partidas rápidas e feedback sensorial (som, vibração e animações).

O produto hoje está estruturado em:

- autenticação social (Google e Apple)
- criação/entrada em salas
- lobby com estado de prontidão
- partida em tempo real com aposta e jogadas por rodada
- telas de perfil e ajustes

## Público-alvo (hipótese atual)

- jogadores casuais de cartas em sessões curtas
- grupos de amigos que entram por código da sala
- usuários mobile que valorizam experiência visual/sonora

## Jornada principal do usuário

1. Entrar com conta social.
2. Ver lista de salas abertas ou criar uma nova.
3. Compartilhar código da sala e aguardar jogadores no lobby.
4. Marcar status como pronto.
5. Host inicia partida.
6. Jogar rodadas com apostas e acompanhamento de turnos.
7. Encerrar partida e visualizar vencedor.

## Funcionalidades atuais

### 1) Autenticação e onboarding

- Login com Google e Apple
- Fluxo para completar perfil (ex.: username) quando necessário
- Suporte a múltiplos idiomas (PT, EN, ES, ZH)

### 2) Home / descoberta

- Lista de salas abertas
- Acesso rápido para partidas em andamento do usuário
- Ações de perfil, configurações, chat e ranking (chat/ranking ainda vazios)

### 3) Lobby

- Entrada em sala por clique/código
- Lista de jogadores na sala
- Controle de pronto/cancelar pronto
- Início da partida pelo dono da sala, com validações mínimas

### 4) Gameplay

- Distribuição de cartas pelo dealer
- Definição de trunfo/manilha por rodada
- Fase de aposta e fase de jogadas
- Resultado da rodada e transição para próxima
- Condição de fim de partida com tela de vencedor

### 5) Perfil e personalização

- Exibição de avatar em SVG
- Edição de avatar (DiceBear builder)
- Configurações de áudio granulares (master/UI/music/effects)

## Métricas de produto sugeridas

- taxa de login concluído
- tempo para entrar na primeira partida
- taxa de criação de sala vs entrada em sala existente
- tempo médio de espera no lobby
- abandono por etapa (lobby, rodada, fim)

## Limitações conhecidas no estado atual

- chat e leaderboard ainda não possuem conteúdo funcional
- economia (moedas/saldo) aparece na UI, mas sem lógica de negócio consolidada
- algumas mensagens/fluxos de erro ainda dependem de retorno técnico do backend
