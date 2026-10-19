"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DIAS } from "@/lib/dias";
import { contarEstrelas, useProgresso } from "@/lib/estrelas";
import { type Lang, LANGS, MARCA, TEXTOS, rota, trocarIdioma } from "@/lib/i18n";

// "dia03_a.png" + "dia03_b.png" vira "dia03_{a,b}.png"
function nomeArquivos(hrefs: string[]) {
  const nomes = hrefs.map((h) => h.slice(h.lastIndexOf("/") + 1));
  if (nomes.length === 1) return nomes[0];
  const [base] = nomes[0].split("_");
  return `${base}_{${nomes.map((n) => n.slice(base.length + 1, -4)).join(",")}}.png`;
}

export function Calendario({ lang }: { lang: Lang }) {
  const progresso = useProgresso();
  const t = TEXTOS[lang];
  return (
    <>
      <h1 className="so-leitor">Advent of Vision 2026</h1>
      <p className="caminho">
        ~/advent-of-vision/2026 · {DIAS.length} {t.dias} · {DIAS.length * 2} {MARCA}
      </p>
      <ul className="dias">
        {DIAS.map(({ n: d, titulo, inputs, tam }) => {
          const feito = progresso[d] ?? {};
          const n = (feito[1] !== undefined ? 1 : 0) + (feito[2] !== undefined ? 1 : 0);
          return (
            <li key={d}>
              <Link href={rota.dia(lang, d)} aria-label={`${t.dia} ${d}: ${titulo[lang]}, ${n}/2`}>
                <span className="n">{String(d).padStart(2, "0")}</span>
                <span className="t">{titulo[lang]}</span>
                <span className="arq">
                  {nomeArquivos(inputs.map((i) => i.href))} {tam}
                </span>
                <span className="st">
                  {MARCA.repeat(n)}
                  <i>{MARCA.repeat(2 - n)}</i>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="rodape">
        {t.inspirado} <a href="https://adventofcode.com">Advent of Code</a>.
      </p>
    </>
  );
}

export function Placar() {
  return (
    <span className="placar">
      <b>{contarEstrelas(useProgresso())}</b>/{DIAS.length * 2} {MARCA}
    </span>
  );
}

export function TrocaIdioma({ lang }: { lang: Lang }) {
  const caminho = usePathname() ?? "/";
  return (
    <span>
      {LANGS.map((l, i) => (
        <span key={l}>
          {i > 0 && " / "}
          {l === lang ? (
            <span className="atual">{l}</span>
          ) : (
            <Link href={trocarIdioma(caminho, l)} hrefLang={l}>
              {l}
            </Link>
          )}
        </span>
      ))}
    </span>
  );
}
