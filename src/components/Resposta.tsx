"use client";

import { useState } from "react";
import { ganharEstrela, useEstrelas } from "@/lib/estrelas";

type Msg = { texto: string; tipo: "ok" | "err" } | null;

export function Resposta({ dia }: { dia: number }) {
  const resolvido = useEstrelas()[dia];
  const [valor, setValor] = useState("");
  const [msg, setMsg] = useState<Msg>(null);
  const [enviando, setEnviando] = useState(false);

  async function enviar(ev: React.FormEvent) {
    ev.preventDefault();
    const v = valor.trim();
    if (!v) {
      setMsg({ texto: "Digite uma resposta antes de enviar.", tipo: "err" });
      return;
    }
    setEnviando(true);
    try {
      const r = await fetch("/api/responder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dia, resposta: v }),
      });
      const dados = await r.json();
      if (!r.ok) throw new Error(dados.erro);
      if (dados.certo) {
        ganharEstrela(dia);
        setMsg({ texto: "Resposta certa! Você ganhou uma estrela.", tipo: "ok" });
      } else {
        setMsg({
          texto: `Resposta errada para "${v.toUpperCase()}". Confira se resolveu sobre o arquivo original.`,
          tipo: "err",
        });
      }
    } catch {
      setMsg({ texto: "Não foi possível conferir a resposta agora. Tente de novo.", tipo: "err" });
    } finally {
      setEnviando(false);
    }
  }

  const mostrada = msg ?? (resolvido ? { texto: "Resolvido. Você ganhou uma estrela.", tipo: "ok" as const } : null);

  return (
    <form className="answer" onSubmit={enviar}>
      <label htmlFor={`r${dia}`}>Resposta:</label>
      <input
        id={`r${dia}`}
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        autoComplete="off"
        spellCheck={false}
      />
      <button type="submit" disabled={enviando}>
        {enviando ? "conferindo" : "enviar"}
      </button>
      <div className={"msg" + (mostrada ? ` ${mostrada.tipo}` : "")} role="status">
        {mostrada?.texto}
      </div>
    </form>
  );
}
