import * as Dia1 from "./Dia1";
import * as Dia2 from "./Dia2";
import * as Dia3 from "./Dia3";

type Dia = { Enunciado: () => React.ReactNode; Resolucao: () => React.ReactNode };

export const CONTEUDO: Record<number, Dia> = { 1: Dia1, 2: Dia2, 3: Dia3 };
