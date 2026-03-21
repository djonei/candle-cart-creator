

## Plano: Logo sobre o Hero com contraste garantido + cores pastel

### Problema
- Logo e hero têm tons semelhantes (dourado/bege), logo "some" se sobreposta diretamente
- Fundo geral muito escuro, precisa mudar para tons pastel
- Hero ocupa muito espaço vertical no mobile

### Solução

**1. Fundir Header + Hero em uma seção única**
- Remover o `Header` como componente separado com fundo escuro
- Colocar a logo centralizada no topo do Hero, sobre a imagem de fundo
- Adicionar uma **faixa semi-transparente escura** (overlay) atrás da logo para criar contraste (ex: `bg-black/40 backdrop-blur-sm` com padding e border-radius)
- O botão "Pedido" (carrinho) fica posicionado no canto superior direito, flutuando sobre o hero
- Reduzir altura do hero para `35vh` no mobile, `45vh` no desktop

**2. Aumentar a logo**
- Logo com `h-16 md:h-24` (significativamente maior que o atual `h-10 md:h-14`)

**3. Paleta pastel para o fundo**
- Mudar `--background` de `30 15% 12%` (marrom muito escuro) para `30 25% 92%` (bege claro pastel ~#EDE4DA)
- Mudar `--foreground` para tom escuro para legibilidade (~marrom escuro)
- Ajustar `--card`, `--secondary`, `--muted`, `--border` para variações pastel compatíveis
- Ajustar `--card-foreground`, `--secondary-foreground`, `--muted-foreground` para tons escuros
- Manter `--primary` (dourado) e `--accent` como estão para botões e destaques

**4. Arquivos modificados**
- `src/index.css` — nova paleta de cores pastel
- `src/components/Hero.tsx` — incorporar logo com overlay de contraste + botão do carrinho + reduzir altura
- `src/components/Header.tsx` — remover ou simplificar (pode virar apenas o botão flutuante do carrinho)
- `src/pages/Index.tsx` — ajustar uso dos componentes

### Detalhes técnicos
- A logo terá um contêiner com `bg-warm-dark/50 backdrop-blur-sm rounded-2xl p-4` para garantir contraste sem parecer um "bloco" rígido
- O gradiente do hero será ajustado para ir do tom pastel (novo background) de baixo para transparente em cima
- Textos do catálogo, cards e footer serão automaticamente ajustados pela mudança das CSS variables

