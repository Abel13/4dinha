# Arquitetura

## Visão geral

`4dinha` é um app mobile em React Native (Expo) com foco em partidas multiplayer em tempo real.
O app usa:

- `expo-router` para navegação por arquivos
- `@tanstack/react-query` para cache e sincronização de dados
- `supabase-js` para autenticação, banco e realtime
- `axios` para chamadas HTTP da engine de jogo (`/api/deal`, `/api/play`, etc.)
- `zustand` + persistência para sessão e preferências locais

## Camadas principais

### App/UI

- Rotas em `app/` (grupos: `auth`, `(tabs)`, `lobby`, `(game)/4dinha`)
- Componentes reutilizáveis em `components/`
- Tema e tokens visuais em `constants/Colors.ts`

### Estado e regras de tela

- Hooks de orquestração em `hooks/`
- `useGame` concentra estado da partida, ciclo da rodada e ações do jogador
- `useMatchList`, `useMatch`, `useMatchUsers` gerenciam lobby e partidas abertas

### Dados e integrações

- Cliente Supabase em `providers/supabase.ts`
- Tipagem do banco em `types/Database.ts`
- Serviços em `services/`:
  - leitura/escrita direta no Supabase (`match`, `matchUsers`, parte de `game`)
  - chamadas HTTP via `services/api.ts` para endpoints de jogo

## Fluxo de navegação

1. `app/_layout.tsx` valida sessão e redireciona para `/auth` quando necessário.
2. Usuário autenticado entra no grupo `(tabs)` (home principal).
3. Da home:
   - cria sala (`/lobby/new`)
   - entra em sala existente (`/lobby/[matchId]`)
   - retorna para partida em andamento (`/(game)/4dinha`)
4. No lobby, host inicia a partida.
5. App navega para tela de jogo e evolui por rodada até tela final (`end` ou `indiozinho`).

## Realtime e sincronização

- Realtime Supabase (`postgres_changes`) para:
  - atualização de lobbies (`match_users`)
  - transição de status de partida (`matches`)
  - atualização de ações de jogo (`match_actions`)
- React Query faz polling complementar no jogo (`refetchInterval`), além de refetch manual.

## Persistência local

- Sessão de usuário e dados de perfil via stores (Zustand) e/ou sessão Supabase persistida
- Configurações de áudio/vibração em `useSettingsStore` (AsyncStorage)
- Tokens de autenticação armazenados via `expo-secure-store`

## Plataforma e build

- App orientado para landscape (`app.json`)
- iOS e Android habilitados
- Distribuição/configuração via EAS (`eas.json`) com canais `development`, `preview` e `production`

## Dependências externas críticas

- Supabase (Auth, DB, Realtime, RPC)
- Backend HTTP para regras de engine de jogo
- Provedores OAuth nativos (Google e Apple)

## Riscos técnicos atuais

- Parte da regra de aposta ainda está no cliente (`@todo` em `services/game.ts`)
- Há mistura de leitura de estado por polling e por realtime no fluxo de partida
- Logs de debug de Supabase ativos em `providers/supabase.ts` (útil em dev, sensível para produção)
