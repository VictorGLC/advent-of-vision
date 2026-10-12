import type { Lang } from "@/lib/i18n";
import * as en01 from "./en/dia01";
import * as en02 from "./en/dia02";
import * as en03 from "./en/dia03";
import * as en04 from "./en/dia04";
import * as en05 from "./en/dia05";
import * as en06 from "./en/dia06";
import * as en07 from "./en/dia07";
import * as en08 from "./en/dia08";
import * as en09 from "./en/dia09";
import * as en10 from "./en/dia10";
import * as en11 from "./en/dia11";
import * as en12 from "./en/dia12";
import * as pt01 from "./pt/dia01";
import * as pt02 from "./pt/dia02";
import * as pt03 from "./pt/dia03";
import * as pt04 from "./pt/dia04";
import * as pt05 from "./pt/dia05";
import * as pt06 from "./pt/dia06";
import * as pt07 from "./pt/dia07";
import * as pt08 from "./pt/dia08";
import * as pt09 from "./pt/dia09";
import * as pt10 from "./pt/dia10";
import * as pt11 from "./pt/dia11";
import * as pt12 from "./pt/dia12";

type Dia = { Parte1: () => React.ReactNode; Parte2: () => React.ReactNode };

const lista = (dias: Dia[]) => Object.fromEntries(dias.map((d, i) => [i + 1, d])) as Record<number, Dia>;

export const CONTEUDO: Record<Lang, Record<number, Dia>> = {
  pt: lista([pt01, pt02, pt03, pt04, pt05, pt06, pt07, pt08, pt09, pt10, pt11, pt12]),
  en: lista([en01, en02, en03, en04, en05, en06, en07, en08, en09, en10, en11, en12]),
};
