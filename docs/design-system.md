# Design System (estado atual)

## Princípios visuais

- Interface com estética "neon card game"
- Predominância de fundo escuro com contraste em ciano
- Layout horizontal (landscape) otimizado para mesa de jogo
- Feedback multimodal: visual + som + vibração

## Tokens de cor

Fonte: `constants/Colors.ts`.

### Base

- `background`: `#021223`
- `text`/`tint`: `#2AFAFD`
- `icon`: `#8AFFFF`
- `border`: `#A2A3AA`

### Status

- `danger`: `#ef5350`
- `success`: `#34a424`
- `info`: `#1a4e89EE`

### Superfícies auxiliares

- `purple`, `purpleLight`, `purpleGray`, `purpleTransparent`
- variações de preto translúcido para overlays/modais

> Diretriz oficial: o produto é **dark-only**. O tema claro não faz parte do escopo de UX.

## Tipografia

Fonte principal: família `BarlowCondensed`.

Escalas definidas em `components/ThemedText.tsx`:

- `title` (32, bold)
- `subtitle` (20, bold)
- `default` (16, regular)
- `defaultSemiBold` (16, semibold)
- `h4` (16, bold)
- `paragraph` (14)
- `error` (12, danger)
- `outdoor` (80, display)

## Componentes base

### Themed primitives

- `ThemedView`: container com cor via tema
- `ThemedText`: tipografia com variantes
- `ThemedButton`: botão principal com estados (`default`, `danger`, `outlined`, `link`), loading e feedback háptico/sonoro

### Componentes de domínio

- `Card`, `Bet`, `StatusPanel`, `ResultItem`, `TableSeat`, `PlayerItem`
- Componentes de identidade: `SvgImage`, construtor de avatar DiceBear

## Padrões de interação

- Botões com som e haptics por padrão
- Modais para ações críticas de rodada (apostar, fim de rodada, trunfos)
- Ícones `Feather`, `Ionicons`, `FontAwesome6`
- Foco em affordance alta (botões grandes, contraste forte, feedback imediato)

## Motion e feedback

- animação de loading no botão (ícone rotativo via Reanimated)
- confete na vitória (`react-native-confetti-cannon`)
- áudio segmentado por categoria (`ui`, `effects`, `music`) com controles independentes

## Assets e identidade

- fundos e logo em `assets/images`
- sons em `assets/sounds`
- stickers em `assets/images/stickers` (acervo em expansão)

## Acessibilidade e internacionalização

- internacionalização com `i18n-js` (PT/EN/ES/ZH)
- labels de UI traduzíveis por namespace
- ainda sem guideline explícita para contraste mínimo e tamanhos tocáveis

## Pontos para padronizar (decidir)

1. **Escala e espaçamento**
   - hoje há valores fixos em muitas telas; definir tokens de spacing e radius.
2. **Estados de componentes**
   - consolidar documentação de hover/pressed/disabled/focus (especialmente para web/tablet).
3. **Biblioteca de ícones**
   - padronizar um set principal para reduzir variação visual.
