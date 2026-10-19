export const LANGS = ["pt", "en"] as const;
export type Lang = (typeof LANGS)[number];

export function ehLang(x: string): x is Lang {
  return (LANGS as readonly string[]).includes(x);
}

// Em inglês as rotas têm nome em inglês; o next.config reescreve para as pastas em português.
export const rota = {
  inicio: (l: Lang) => `/${l}`,
  sobre: (l: Lang) => (l === "en" ? "/en/about" : "/pt/sobre"),
  dia: (l: Lang, n: number) => (l === "en" ? `/en/day/${n}` : `/pt/dia/${n}`),
};

/** Mesmo lugar do site, no outro idioma. */
export function trocarIdioma(caminho: string, para: Lang): string {
  const dia = /^\/(?:pt|en)\/(?:dia|day)\/(\d+)/.exec(caminho);
  if (dia) return rota.dia(para, Number(dia[1]));
  if (/^\/(?:pt\/sobre|en\/about)/.test(caminho)) return rota.sobre(para);
  return rota.inicio(para);
}

/** Símbolo de cada parte resolvida, no placar e na listagem. */
export const MARCA = "◉";

export const TEXTOS = {
  pt: {
    sobre: "sobre",
    calendario: "dias",
    dia: "Dia",
    dias: "dias",
    parte: "parte",
    resposta: "$ resposta",
    enviar: "enter",
    certo1: `✓ certo · +1 ${MARCA} · parte 2 liberada`,
    certo2: `✓ certo · +1 ${MARCA} · dia completo`,
    errada: "✗ não é essa · confira se você resolveu sobre o arquivo original",
    problema: "✗ deu algum problema ao conferir · tenta de novo daqui a pouco",
    todos: "todos os dias",
    inspirado: "Inspirado no",
    slogan: "Advent of Vision 2026: puzzles de processamento de imagens",
    descricao:
      "12 puzzles de programação em que o input é uma imagem. Resolva com processamento de imagens clássico, em OpenCV, NumPy ou na mão. Inspirado no Advent of Code.",
  },
  en: {
    sobre: "about",
    calendario: "days",
    dia: "Day",
    dias: "days",
    parte: "part",
    resposta: "$ answer",
    enviar: "enter",
    certo1: `✓ correct · +1 ${MARCA} · part 2 unlocked`,
    certo2: `✓ correct · +1 ${MARCA} · day complete`,
    errada: "✗ not quite · make sure you solved it on the original file",
    problema: "✗ something went wrong while checking · try again in a moment",
    todos: "all days",
    inspirado: "Inspired by",
    slogan: "Advent of Vision 2026: image processing puzzles",
    descricao:
      "12 programming puzzles where the input is an image. Solve them with classic image processing, in OpenCV, NumPy or by hand. Inspired by Advent of Code.",
  },
} satisfies Record<Lang, Record<string, string>>;
