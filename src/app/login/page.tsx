import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { RESOLUCOES } from "@/conteudo/resolucoes";
import { estaLogado, loginAtivo } from "@/lib/admin";
import { DIAS } from "@/lib/dias";
import { rota } from "@/lib/i18n";
import { gabaritoDoDia } from "@/lib/respostas";
import { sair } from "./actions";
import { FormLogin } from "./FormLogin";

export const metadata: Metadata = { title: "Login", robots: { index: false, follow: false } };

function Python({ codigo }: { codigo: string }) {
  // esmaece os comentários (# ...) linha a linha
  const linhas = codigo.replace(/\s+$/, "").split("\n");
  return (
    <pre className="codigo">
      {linhas.map((linha, i) => {
        const m = /(^|\s)#.*$/.exec(linha);
        const corpo = m ? linha.slice(0, m.index + m[1].length) : linha;
        return (
          <span key={i}>
            {corpo}
            {m && <span className="comentario">{m[0].slice(m[1].length)}</span>}
            {"\n"}
          </span>
        );
      })}
    </pre>
  );
}

const VERSOES = [
  { sufixo: "opencv", titulo: "OpenCV" },
  { sufixo: "manual", titulo: "Pillow + NumPy, na mão" },
];

export default async function Login() {
  if (!(await estaLogado())) {
    return (
      <article>
        <h1>Acesso restrito</h1>
        {loginAtivo() ? <FormLogin /> : <p>Login desativado. Defina ADMIN_PASSWORD no ambiente.</p>}
      </article>
    );
  }

  const codigos = await Promise.all(
    RESOLUCOES.map((r) =>
      Promise.all(
        VERSOES.map((v) =>
          readFile(path.join(process.cwd(), "solucoes", `dia${String(r.dia).padStart(2, "0")}_${v.sufixo}.py`), "utf8"),
        ),
      ),
    ),
  );

  return (
    <>
      <article>
        <h1>Resoluções</h1>
        <p>
          Cada dia tem duas soluções: uma com OpenCV e outra feita na mão, só com Pillow para abrir a imagem e
          NumPy para os arrays. Todas foram rodadas sobre os exemplos e os inputs publicados e batem com o gabarito
          (<code>python puzzles/validar.py</code>). Os inputs são gerados com seed fixa por{" "}
          <code>python puzzles/gerar.py</code>. Precisa de <code>pip install opencv-python pillow numpy scipy</code>.
        </p>
        <p>
          Ir para:{" "}
          {RESOLUCOES.map((r) => (
            <span key={r.dia}>
              <a href={`#dia${r.dia}`}>[{r.dia}]</a>{" "}
            </span>
          ))}
        </p>
        <form action={sair}>
          <button type="submit" className="submit">
            sair
          </button>
        </form>
      </article>

      {RESOLUCOES.map((r, i) => {
        const g = gabaritoDoDia(r.dia);
        return (
          <article key={r.dia} id={`dia${r.dia}`} className="resolucao">
            <h2>
              Dia {r.dia}: {DIAS[r.dia - 1].titulo.pt} <Link href={rota.dia("pt", r.dia)}>enunciado</Link>
            </h2>
            <p>
              Parte 1: <em className="star">{String(g.input.parte1)}</em> · Parte 2:{" "}
              <em className="star">{String(g.input.parte2)}</em>{" "}
              <span className="dim">
                (exemplo: {String(g.exemplo.parte1)} / {String(g.exemplo.parte2)})
              </span>
            </p>
            {r.abordagem}
            {r.notas}
            {VERSOES.map((v, j) => (
              <details key={v.sufixo}>
                <summary>
                  {v.titulo} <span className="dim">· dia{String(r.dia).padStart(2, "0")}_{v.sufixo}.py {r.args}</span>
                </summary>
                <Python codigo={codigos[i][j]} />
              </details>
            ))}
          </article>
        );
      })}
    </>
  );
}
