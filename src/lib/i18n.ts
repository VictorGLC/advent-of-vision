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

export const TEXTOS = {
  pt: {
    sobre: "[Sobre]",
    calendario: "[Calendário]",
    dia: "Dia",
    parteDois: "--- Parte Dois ---",
    resposta: "Resposta:",
    enviar: "[Enviar]",
    paraComecar: "Para começar,",
    baixeInput: "baixe seu input",
    aindaInput: "O input não mudou, mas você ainda pode",
    baixarDeNovo: "baixá-lo de novo",
    suaResposta: "Sua resposta foi",
    umaEstrela: "A primeira metade deste desafio está completa! Ela vale uma estrela de ouro: *",
    duasEstrelas: "As duas partes deste desafio estão completas! Elas valem duas estrelas de ouro: **",
    voltar: "Agora você pode",
    voltarLink: "[voltar ao calendário]",
    errada: "Essa não é a resposta certa. Confira se você resolveu sobre o arquivo original e tente de novo.",
    problema: "Deu algum problema ao conferir. Tenta de novo daqui a pouco.",
    estrela: "uma estrela",
    estrelas: "duas estrelas",
  },
  en: {
    sobre: "[About]",
    calendario: "[Calendar]",
    dia: "Day",
    parteDois: "--- Part Two ---",
    resposta: "Answer:",
    enviar: "[Submit]",
    paraComecar: "To begin,",
    baixeInput: "get your puzzle input",
    aindaInput: "Although it hasn't changed, you can still",
    baixarDeNovo: "get your puzzle input",
    suaResposta: "Your puzzle answer was",
    umaEstrela: "The first half of this puzzle is complete! It provides one gold star: *",
    duasEstrelas: "Both parts of this puzzle are complete! They provide two gold stars: **",
    voltar: "At this point, you should",
    voltarLink: "[return to your calendar]",
    errada: "That's not the right answer. Make sure you solved it on the original file and try again.",
    problema: "Something went wrong while checking. Please try again in a moment.",
    estrela: "one star",
    estrelas: "two stars",
  },
} satisfies Record<Lang, Record<string, string>>;
