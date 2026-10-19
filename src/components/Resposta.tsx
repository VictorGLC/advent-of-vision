"use client";

import Link from "next/link";
import { useState } from "react";
import { DIAS } from "@/lib/dias";
import { ganharEstrela, useProgresso } from "@/lib/estrelas";
import { type Lang, TEXTOS, rota } from "@/lib/i18n";

type Arquivo = { href: string; nome: Record<Lang, string> };

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
    <div className="resposta">
      <form onSubmit={enviar}>
        <label className="prompt" htmlFor={`r${dia}-${parte}`}>
          {t.resposta}
        </label>
        <input
          type="text"
          id={`r${dia}-${parte}`}
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" className="submit" disabled={enviando}>
          {t.enviar}
        </button>
      </form>
      {erro && (
        <p className="saida wrong" role="status">
          {erro}
        </p>
      )}
    </div>
  );
}

/** A resposta já aceita, no mesmo terminal do formulário. */
function Aceita({ resposta, msg, lang }: { resposta: string; msg: string; lang: Lang }) {
  return (
    <div className="resposta">
      <p>
        <span className="prompt">{TEXTOS[lang].resposta}</span> {resposta}
      </p>
      <p className="saida ok">{msg}</p>
    </div>
  );
}

/** Enunciado das duas partes: a parte 2 só aparece depois da 1. */
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
      <div className="titulo-dia">
        <span className="n">{String(dia).padStart(2, "0")}</span>
        <h1>{titulo}</h1>
      </div>
      <div className="meta">
        {t.parte} <b>{r1 === undefined ? 1 : 2}</b>/2 · input:{" "}
        {inputs.map((a, i) => (
          <span key={a.href}>
            {i > 0 && ", "}
            <a href={a.href} download>
              {inputs.length > 1 ? a.nome[lang] : a.href.slice(a.href.lastIndexOf("/") + 1)}
            </a>
          </span>
        ))}{" "}
        · {DIAS[dia - 1].tam}
      </div>

      <article>{parte1}</article>
      {r1 === undefined ? (
        <Formulario dia={dia} parte={1} lang={lang} />
      ) : (
        <>
          <Aceita resposta={r1} msg={t.certo1} lang={lang} />
          <article>
            <h2>
              {t.parte} 2
            </h2>
            {parte2}
          </article>
          {r2 === undefined ? (
            <Formulario dia={dia} parte={2} lang={lang} />
          ) : (
            <Aceita resposta={r2} msg={t.certo2} lang={lang} />
          )}
        </>
      )}

      <div className="navega">
        {dia > 1 ? <Link href={rota.dia(lang, dia - 1)}>← {t.dia.toLowerCase()} {dia - 1}</Link> : <span />}
        <Link href={rota.inicio(lang)}>{t.todos}</Link>
        {dia < DIAS.length ? <Link href={rota.dia(lang, dia + 1)}>{t.dia.toLowerCase()} {dia + 1} →</Link> : <span />}
      </div>
    </>
  );
}
