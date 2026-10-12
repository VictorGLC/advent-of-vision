import { Enunciado as Dia1 } from "./Dia1";
import { Enunciado as Dia2 } from "./Dia2";
import { Enunciado as Dia3 } from "./Dia3";

export const CONTEUDO: Record<number, () => React.ReactNode> = { 1: Dia1, 2: Dia2, 3: Dia3 };
