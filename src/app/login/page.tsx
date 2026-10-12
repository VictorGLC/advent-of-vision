/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { RESOLUCOES } from "@/conteudo/resolucoes";
import { estaLogado, loginAtivo } from "@/lib/admin";
import { DIAS } from "@/lib/dias";
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

export default async function Login() {
  if (!(await estaLogado())) {
    return (
      <article>
        <h2>--- Acesso restrito ---</h2>
        {loginAtivo() ? (
          <FormLogin />
        ) : (
          <p>Login desativado. Defina ADMIN_PASSWORD no ambiente.</p>
        )}
      </article>
    );
  }

  const codigos = await Promise.all(
    RESOLUCOES.map((r) =>
      Promise.all(r.scripts.map((s) => readFile(path.join(process.cwd(), "solucoes", s.arquivo), "utf8"))),
    ),
  );

  return (
    <>
      <article>
        <h2>--- Resoluções ---</h2>
        <p>
          Cada dia tem duas soluções: uma com OpenCV e outra feita na mão, só com Pillow para abrir a imagem e
          NumPy para os arrays. Todas foram rodadas sobre os inputs publicados e batem com as respostas abaixo.
          Precisa de <code>pip install opencv-python pillow numpy</code>.
        </p>
        <p>
          Ir para:{" "}
          {RESOLUCOES.map((r) => (
            <span key={r.dia}>
              <a href={`#dia${r.dia}`}>[Dia {r.dia}]</a>{" "}
            </span>
          ))}
        </p>
        <form action={sair}>
          <button type="submit" className="submit">
            [Sair]
          </button>
        </form>
      </article>

      {RESOLUCOES.map((r, i) => (
        <article key={r.dia} id={`dia${r.dia}`} className="resolucao">
          <h2>
            --- Dia {r.dia}: {DIAS[r.dia - 1].titulo} ---
          </h2>
          <p>
            Resposta: <em className="star">{r.resposta}</em> · exemplo do enunciado: <code>{r.exemplo}</code>
          </p>
          {r.abordagem}
          {r.scripts.map((s, j) => (
            <section key={s.arquivo}>
              <h3>
                {s.titulo} <span className="dim">· {s.arquivo}</span>
              </h3>
              <p className="dim">$ {s.uso}</p>
              <Python codigo={codigos[i][j]} />
            </section>
          ))}
          <figure>
            <img src={`/api/admin/img/${r.imagem.nome}`} width={r.imagem.largura} height={r.imagem.altura} alt={r.imagem.legenda} />
            <figcaption className="dim">{r.imagem.legenda}</figcaption>
          </figure>
          {r.notas}
        </article>
      ))}
    </>
  );
}
