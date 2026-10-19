# Advent of Vision

Calendário de puzzles inspirado no Advent of Code, em que o input de cada dia é uma imagem. São 12 dias, cada um com duas partes, contando a história da sonda Andorinha-3. Tudo se resolve com processamento de imagens clássico. O site tem versão em português (`/pt`) e em inglês (`/en`).

## Rodando o site

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

Crie um `.env.local` a partir do `.env.example` com `ADMIN_PASSWORD` para liberar a página `/login`, que mostra as resoluções.

## Puzzles

```bash
pip install opencv-python pillow numpy scipy
python puzzles/gerar.py          # gera public/inputs, public/exemplos e puzzles/gabarito.json (seed fixa)
python puzzles/validar.py        # roda as 24 soluções de solucoes/ e confere com o gabarito
```

- `puzzles/dNN.py`: gerador de cada dia (input e exemplo do enunciado).
- `solucoes/diaNN_opencv.py` e `solucoes/diaNN_manual.py`: soluções de referência, com OpenCV e só com Pillow + NumPy.
- `puzzles/gabarito.json`: respostas. O servidor confere as respostas por ele (`src/lib/respostas.ts`).

## Site

- `src/app/[lang]/`: calendário, dias e página Sobre. As rotas em inglês (`/en/day/N`, `/en/about`) são reescritas para as mesmas páginas no `next.config.ts`.
- `src/conteudo/{pt,en}/diaNN.tsx`: enunciado das duas partes de cada dia.
- `src/conteudo/resolucoes.tsx`: notas da página de admin.
- `src/app/globals.css`: visual do site (grafite, creme e ciano; IBM Plex Mono no texto e Anton nos títulos).
- O progresso (um ◉ por parte resolvida) fica no `localStorage` do navegador.

## Deploy

Funciona direto na Vercel. Lembre de definir `ADMIN_PASSWORD` nas variáveis de ambiente do projeto.
