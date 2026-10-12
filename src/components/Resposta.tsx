"use client";

import Link from "next/link";
import { useState } from "react";
import { ganharEstrela, useEstrelas } from "@/lib/estrelas";

type Arquivo = { href: string; nome: string };

export function Resposta({ dia, inputs }: { dia: number; inputs: Arquivo[] }) {
  const resolvida = useEstrelas()[dia];
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
        body: JSON.stringify({ dia, resposta: v }),
      });
      const dados = await r.json();
      if (!r.ok) throw new Error(dados.erro);
      if (dados.certo) {
        setErro(null);
        ganharEstrela(dia, v.toUpperCase());
      } else {
        setErro(`Essa não é a resposta certa. Confira se você usou o arquivo original e tente de novo.`);
      }
    } catch {
      setErro("Deu algum problema ao conferir. Tenta de novo daqui a pouco.");
    } finally {
      setEnviando(false);
    }
  }

  if (resolvida !== undefined) {
    return (
      <>
        {resolvida && (
          <p>
            Sua resposta foi <code>{resolvida}</code>.
          </p>
        )}
        <p className="day-success">Você completou este dia! Ganhou uma estrela: *</p>
        <p>
          Agora você pode <Link href="/">[voltar ao calendário]</Link>.
        </p>
      </>
    );
  }

  return (
    <>
      <p>
        Para começar,{" "}
        {inputs.map((a, i) => (
          <span key={a.href}>
            {i > 0 && (i === inputs.length - 1 ? " e " : ", ")}
            <a href={a.href} download>
              {a.nome}
            </a>
          </span>
        ))}
        .
      </p>
      <form onSubmit={enviar}>
        <p>
          <label htmlFor={`r${dia}`}>Resposta:</label>{" "}
          <input
            type="text"
            id={`r${dia}`}
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            size={12}
          />{" "}
          <button type="submit" className="submit" disabled={enviando}>
            [Enviar]
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
