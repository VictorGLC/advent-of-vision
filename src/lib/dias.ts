import type { Lang } from "./i18n";

export const TOTAL_DIAS = 12;

type Arquivo = { href: string; nome: Record<Lang, string> };

export const DIAS: { n: number; titulo: Record<Lang, string>; inputs: Arquivo[]; tam: string }[] = [
  { n: 1, titulo: { pt: "Censo Estelar", en: "Star Census" }, inputs: [arq("dia01.png")], tam: "2400×1600" },
  { n: 2, titulo: { pt: "Sussurro no Azul", en: "Whisper in the Blue" }, inputs: [arq("dia02.png")], tam: "1600×900" },
  {
    n: 3,
    titulo: { pt: "Algo Se Moveu", en: "Something Moved" },
    inputs: [arq("dia03_a.png", "placa A", "plate A"), arq("dia03_b.png", "placa B", "plate B")], tam: "2000×1400",
  },
  { n: 4, titulo: { pt: "Modo Rajada", en: "Burst Mode" }, inputs: [arq("dia04.png")], tam: "2000×1200" },
  { n: 5, titulo: { pt: "Estrelas Grudadas", en: "Stuck Together" }, inputs: [arq("dia05.png")], tam: "1800×1200" },
  { n: 6, titulo: { pt: "Rastros em Jabuticaba", en: "Tracks on Jabuticaba" }, inputs: [arq("dia06.png")], tam: "1400×1000" },
  { n: 7, titulo: { pt: "Etiqueta Queimada", en: "Burnt Label" }, inputs: [arq("dia07.png")], tam: "1400×1000" },
  { n: 8, titulo: { pt: "Panorama Embaralhado", en: "Scrambled Panorama" }, inputs: [arq("dia08.png")], tam: "566×566" },
  { n: 9, titulo: { pt: "Interferência", en: "Interference" }, inputs: [arq("dia09.png")], tam: "1400×900" },
  {
    n: 10,
    titulo: { pt: "Quanto Girou?", en: "How Far Did It Turn?" },
    inputs: [arq("dia10_a.png", "placa A", "plate A"), arq("dia10_b.png", "placa B", "plate B")], tam: "1600×1200",
  },
  {
    n: 11,
    titulo: { pt: "Profundidade", en: "Depth" },
    inputs: [arq("dia11_esq.png", "imagem esquerda", "left image"), arq("dia11_dir.png", "imagem direita", "right image")], tam: "1200×800",
  },
  { n: 12, titulo: { pt: "Mensagem Final", en: "Final Message" }, inputs: [arq("dia12.png")], tam: "1000×143" },
];

function arq(arquivo: string, pt?: string, en?: string): Arquivo {
  return { href: `/inputs/${arquivo}`, nome: { pt: pt ?? arquivo, en: en ?? arquivo } };
}

export const DIAS_ATIVOS = DIAS.length;

export function diaAtivo(n: number) {
  return Number.isInteger(n) && n >= 1 && n <= DIAS_ATIVOS;
}
