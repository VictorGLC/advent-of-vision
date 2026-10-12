export const TOTAL_DIAS = 12;

type Arquivo = { href: string; nome: string };

export const DIAS: { n: number; titulo: string; inputs: Arquivo[] }[] = [
  { n: 1, titulo: "Censo Estelar", inputs: [{ href: "/inputs/dia01.png", nome: "baixe sua placa" }] },
  { n: 2, titulo: "Sussurro no Azul", inputs: [{ href: "/inputs/dia02.png", nome: "baixe sua imagem" }] },
  {
    n: 3,
    titulo: "Algo Se Moveu",
    inputs: [
      { href: "/inputs/dia03_a.png", nome: "baixe a placa A" },
      { href: "/inputs/dia03_b.png", nome: "a placa B" },
    ],
  },
];

export const DIAS_ATIVOS = DIAS.length;

export function diaAtivo(n: number) {
  return Number.isInteger(n) && n >= 1 && n <= DIAS_ATIVOS;
}
