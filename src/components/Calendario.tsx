"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DIAS_ATIVOS } from "@/lib/dias";
import { contarEstrelas, useProgresso } from "@/lib/estrelas";
import { type Lang, LANGS, TEXTOS, rota, trocarIdioma } from "@/lib/i18n";

// Uma linha por dia: o céu da missão, com a sonda, a antena de Alcântara e o asteroide Jabuticaba.
const ARTE = [
  "  .    *     .      .     +    .     .    *   ",
  "     .    .      *     .      .     +     .   ",
  "  +    .     .      -=[o]=-      .     .      ",
  "    .     *     .      ' '   .      *     .   ",
  "  .    .     .      .     .     .   _    .    ",
  "     *    .    +     .     .     . ( @ )   .  ",
  "  .     .    .     .     .    *     ~~~    +  ",
  "    +     .     .     *     .     .     .     ",
  "  .    .    *      .     .     +     .     .  ",
  "     .      .    .     *     .     .     *    ",
  "   ___    .     .    .     .     *     .      ",
  "  (___)--'  .      +     .     .     .     .  ",
];

function Ceu({ linha }: { linha: string }) {
  const pedacos: { cls: string; txt: string }[] = [];
  for (const ch of linha) {
    const cls = ch === "." ? "c-dot" : ch === "*" || ch === "+" ? "c-star" : ch === " " ? "" : "c-art";
    const ult = pedacos[pedacos.length - 1];
    if (ult && ult.cls === cls) ult.txt += ch;
    else pedacos.push({ cls, txt: ch });
  }
  return (
    <>
      {pedacos.map((p, i) => (p.cls ? <span key={i} className={p.cls}>{p.txt}</span> : p.txt))}
    </>
  );
}

export function Calendario({ lang }: { lang: Lang }) {
  const progresso = useProgresso();
  const t = TEXTOS[lang];
  return (
    <pre className="calendar">
      {ARTE.map((linha, i) => {
        const d = i + 1;
        if (d > DIAS_ATIVOS) {
          return (
            <span key={d} className="locked">
              {linha.replace(/\S/g, " ")}
            </span>
          );
        }
        const feito = progresso[d] ?? {};
        const n = (feito[1] !== undefined ? 1 : 0) + (feito[2] !== undefined ? 1 : 0);
        return (
          <Link
            key={d}
            href={rota.dia(lang, d)}
            className={n === 2 ? "calendar-verycomplete" : n === 1 ? "calendar-complete" : undefined}
            aria-label={`${t.dia} ${d}${n ? `, ${n === 2 ? t.estrelas : t.estrela}` : ""}`}
          >
            <Ceu linha={linha} /> <span className="calendar-day">{String(d).padStart(2, " ")}</span>{" "}
            <span className="calendar-mark-complete">{n >= 1 ? "*" : " "}</span>
            <span className="calendar-mark-verycomplete">{n === 2 ? "*" : " "}</span>
          </Link>
        );
      })}
    </pre>
  );
}

export function Placar() {
  return <span className="star-count">{contarEstrelas(useProgresso())}*</span>;
}

export function TrocaIdioma({ lang }: { lang: Lang }) {
  const caminho = usePathname() ?? "/";
  return (
    <>
      {LANGS.map((l) => (
        <li key={l}>
          {l === lang ? (
            <span className="lang-atual">[{l.toUpperCase()}]</span>
          ) : (
            <Link href={trocarIdioma(caminho, l)} hrefLang={l}>
              [{l.toUpperCase()}]
            </Link>
          )}
        </li>
      ))}
    </>
  );
}
