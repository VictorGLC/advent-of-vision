import "server-only";
import gabarito from "../../puzzles/gabarito.json";

type Partes = { parte1: string | number; parte2: string | number };
type Entrada = { exemplo: Partes; input: Partes };
const GAB = gabarito as unknown as Record<string, Entrada>;

/** Respostas do exemplo e do input de um dia (só para a página de admin). */
export function gabaritoDoDia(dia: number): Entrada {
  return GAB[`dia${String(dia).padStart(2, "0")}`];
}

/** Maiúsculas, sem acento, sem espaços nem parênteses: "(209, 195)" vira "209,195". */
export function normalizar(resposta: string) {
  return resposta
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/[\s()°]/g, "");
}

export function esperada(dia: number, parte: 1 | 2): string | null {
  const e = GAB[`dia${String(dia).padStart(2, "0")}`];
  return e ? String(e.input[`parte${parte}`]) : null;
}

export function conferir(dia: number, parte: 1 | 2, resposta: string) {
  const certa = esperada(dia, parte);
  if (certa === null) return false;
  const r = normalizar(resposta);
  // respostas com casa decimal aceitam vírgula e zeros a mais ("17,30" = "17.3")
  if (/^\d+\.\d+$/.test(certa)) {
    const num = Number(r.replace(",", "."));
    return Number.isFinite(num) && num.toFixed(1) === certa && /^\d+([.,]\d+)?$/.test(r);
  }
  return r === normalizar(certa);
}
