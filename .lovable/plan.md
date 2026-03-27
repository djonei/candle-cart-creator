

## Plano: Escurecer o hero para contraste da logo

### Alteração

**Arquivo:** `src/components/Hero.tsx` (linha 20)

Adicionar um overlay escuro semi-transparente sobre a imagem do hero, antes do gradiente existente. Isso escurece a foto de fundo uniformemente, fazendo a logo clara se destacar.

- Adicionar uma `div` com `bg-black/30` cobrindo toda a imagem
- O gradiente existente (`from-background via-background/40 to-transparent`) continua por cima, mantendo a transição suave para o conteúdo abaixo

O resultado será a imagem do hero levemente mais escura, com a logo branca/clara bem visível.

