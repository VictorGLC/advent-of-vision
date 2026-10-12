export const TOTAL_DIAS = 12;

export const DIAS = [
  { n: 1, titulo: "Censo Estelar" },
  { n: 2, titulo: "Sussurro no Azul" },
  { n: 3, titulo: "Algo Se Moveu" },
] as const;

export const DIAS_ATIVOS = DIAS.length;

export function diaAtivo(n: number) {
  return Number.isInteger(n) && n >= 1 && n <= DIAS_ATIVOS;
}
