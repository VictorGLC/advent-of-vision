"use client";

import Link from "next/link";
import { useState } from "react";
import { ganharEstrela, useProgresso } from "@/lib/estrelas";
import { type Lang, TEXTOS, rota } from "@/lib/i18n";

type Arquivo = { href: string; nome: Record<Lang, string> };

function LinksInput({ inputs, lang, texto }: { inputs: Arquivo[]; lang: Lang; texto: string }) {
  if (inputs.length === 1) {
    return (
      <a href={inputs[0].href} download>
        {texto}
      </a>
    );
  }
  return (
    <>
      {texto} (
      {inputs.map((a, i) => (
        <span key={a.href}>
          {i > 0 && ", "}
          <a href={a.href} download>
            {a.nome[lang]}
          </a>
        </span>
      ))}
      )
    </>
  );
}

function Formulario({ dia, parte, lang }: { dia: number; parte: 1 | 2; lang: Lang }) {
  const t = TEXTOS[lang];
  const [valor, setValor] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function enviar(ev: React.FormEvent) {
    ev.preventDefault();
    const v = valor.trim();
    if (!v) return;
    setEnviando(true);
    try {
      const r = await fetch("/api/responder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dia, parte, resposta: v }),
      });
      const dados = await r.json();
      if (!r.ok) throw new Error(dados.erro);
      if (dados.certo) {
        setErro(null);
        setValor("");
        ganharEstrela(dia, parte, v.toUpperCase());
      } else {
        setErro(t.errada);
      }
    } catch {
      setErro(t.problema);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <form onSubmit={enviar}>
        <p>
          <label htmlFor={`r${dia}-${parte}`}>{t.resposta}</label>{" "}
          <input
            type="text"
            id={`r${dia}-${parte}`}
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            size={14}
          />{" "}
          <button type="submit" className="submit" disabled={enviando}>
            {t.enviar}
          </button>
        </p>
      </form>
      {erro && (
        <p className="wrong" role="status">
          {erro}
        </p>
      )}
    </>
  );
}

/** Enunciado das duas partes, no fluxo do Advent of Code: a parte 2 só aparece depois da 1. */
export function Partes({
  dia,
  lang,
  inputs,
  titulo,
  parte1,
  parte2,
}: {
  dia: number;
  lang: Lang;
  inputs: Arquivo[];
  titulo: string;
  parte1: React.ReactNode;
  parte2: React.ReactNode;
}) {
  const t = TEXTOS[lang];
  const feito = useProgresso()[dia] ?? {};
  const r1 = feito[1];
  const r2 = feito[2];

  return (
    <>
      <article>
        <h2>
          --- {t.dia} {dia}: {titulo} ---
        </h2>
        {parte1}
      </article>
      {r1 === undefined ? (
        <>
          <p>
            {t.paraComecar} <LinksInput inputs={inputs} lang={lang} texto={t.baixeInput} />.
          </p>
          <Formulario dia={dia} parte={1} lang={lang} />
        </>
      ) : (
        <>
          <p>
            {t.suaResposta} <code>{r1}</code>.
          </p>
          {r2 === undefined && <p className="day-success">{t.umaEstrela}</p>}
          <article>
            <h2>{t.parteDois}</h2>
            {parte2}
          </article>
          {r2 === undefined ? (
            <>
              <Formulario dia={dia} parte={2} lang={lang} />
              <p className="dim-text">
                {t.aindaInput} <LinksInput inputs={inputs} lang={lang} texto={t.baixarDeNovo} />.
              </p>
            </>
          ) : (
            <>
              <p>
                {t.suaResposta} <code>{r2}</code>.
              </p>
              <p className="day-success">{t.duasEstrelas}</p>
              <p>
                {t.voltar} <Link href={rota.inicio(lang)}>{t.voltarLink}</Link>.
              </p>
            </>
          )}
        </>
      )}
    </>
  );
}
