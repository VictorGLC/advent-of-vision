import Link from "next/link";
import { DIAS } from "@/lib/dias";

export default function Home() {
  return (
    <article>
      <h2>Bem-vinda(o) ao Advent of Vision</h2>
      <p>
        Um calendário de puzzles inspirado no Advent of Code, só que a entrada de cada dia é uma{" "}
        <em>imagem</em>. Você baixa o PNG, escreve um programa (OpenCV, NumPy, o que preferir) e descobre alguma
        propriedade dela: quantos objetos há, que mensagem está escondida, o que mudou entre duas fotos.
      </p>
      <p>
        Cada resposta é exata e vale uma <em className="star">estrela</em>. Nada de machine learning: tudo se
        resolve com processamento de imagens clássico.
      </p>
      <ul className="dias">
        {DIAS.map((d) => (
          <li key={d.n}>
            <span className="num">Dia {d.n}:</span>{" "}
            <Link href={`/dia/${d.n}`}>{d.titulo}</Link>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/dia/1">[Começar pelo Dia 1]</Link>
      </p>
    </article>
  );
}
