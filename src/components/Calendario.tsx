"use client";

import Link from "next/link";
import { DIAS_ATIVOS } from "@/lib/dias";
import { useEstrelas } from "@/lib/estrelas";

// Uma linha de céu por dia; as linhas dos dias ainda fechados ficam apagadas.
const ARTE = [
  "  .    *     .      .     +    .     .  ",
  "     .    .     ___    .      *     .   ",
  "  +    .    .  (___)=====o   .     .    ",
  "    .     *    /   \\     .    +      .  ",
  " .     .      /     \\  .     .     *    ",
  "   *     .   '       '    .      .    . ",
  "     .      .    +      .    *     .    ",
  "  .    +       .     .      .    .      ",
  "     .     .      *     .      +     .  ",
  "  *     .     .      .     .      .     ",
  "     .     +      .     *      .     .  ",
  "  .     .     .      .     .     +      ",
];

function Ceu({ linha }: { linha: string }) {
  // agrupa caracteres consecutivos da mesma classe num só span
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

export function Calendario() {
  const estrelas = useEstrelas();
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
        return (
          <Link key={d} href={`/dia/${d}`} aria-label={`Dia ${d}${estrelas[d] !== undefined ? ", uma estrela" : ""}`}>
            <Ceu linha={linha} /> <span className="calendar-day">{String(d).padStart(2, " ")}</span>{" "}
            <span className="calendar-mark">{estrelas[d] !== undefined ? "*" : " "}</span>
          </Link>
        );
      })}
    </pre>
  );
}

export function Placar() {
  const n = Object.keys(useEstrelas()).length;
  return <span className="star-count">{n}*</span>;
}
