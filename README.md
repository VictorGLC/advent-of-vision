# Advent of Vision

Calendário de puzzles inspirado no Advent of Code, em que a entrada de cada dia é uma imagem. Você baixa o PNG, resolve com processamento de imagens clássico e envia uma resposta exata.

Primeira versão: dias 1 a 3 (missão Andorinha-3).

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Estrutura

- `src/app/dia/[n]/page.tsx`: página de cada dia (gerada estaticamente).
- `src/conteudo/DiaN.tsx`: enunciado de cada dia.
- `src/app/api/responder/route.ts`: confere a resposta no servidor, comparando o SHA-256 de `pixels-d<dia>:<resposta>`; as respostas não ficam no repositório nem no bundle do cliente.
- `src/lib/dias.ts`: lista de dias publicados. Para adicionar um dia, inclua-o aqui, crie `src/conteudo/DiaN.tsx` com o enunciado, registre-o em `src/conteudo/index.ts` e adicione o hash em `src/lib/respostas.ts`.
- `public/inputs` e `public/exemplos`: imagens. São servidas sem recompressão, o que importa para o dia 2.

As estrelas ficam no `localStorage` do navegador.

## Deploy

Funciona direto na Vercel: importe o repositório, sem configuração extra.
