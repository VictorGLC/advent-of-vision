"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DIAS_ATIVOS, TOTAL_DIAS } from "@/lib/dias";
import { useEstrelas } from "@/lib/estrelas";

export function Calendario() {
  const estrelas = useEstrelas();
  const atual = Number(/^\/dia\/(\d+)/.exec(usePathname() ?? "")?.[1]);

  return (
    <nav className="cal" aria-label="Calendário">
      {Array.from({ length: TOTAL_DIAS }, (_, i) => i + 1).map((d) => {
        const conteudo = (
          <>
            <span className="n">{d}</span>
            <span className={"s" + (estrelas[d] ? " got" : "")}>
              {d > DIAS_ATIVOS ? "" : estrelas[d] ? "*" : "·"}
            </span>
          </>
        );
        return d > DIAS_ATIVOS ? (
          <span key={d} className="dia off" title="Em breve">
            {conteudo}
          </span>
        ) : (
          <Link
            key={d}
            href={`/dia/${d}`}
            className="dia"
            aria-label={`Dia ${d}`}
            aria-current={d === atual ? "page" : undefined}
          >
            {conteudo}
          </Link>
        );
      })}
    </nav>
  );
}

export function Placar() {
  const n = Object.keys(useEstrelas()).length;
  return <span className="score">{n}*</span>;
}
