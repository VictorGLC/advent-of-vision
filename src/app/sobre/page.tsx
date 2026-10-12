import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Sobre" };

export default function Sobre() {
  return (
    <article>
      <h2>--- Sobre ---</h2>
      <p>
        O Advent of Vision é um calendário de puzzles de programação no espírito do{" "}
        <a href="https://adventofcode.com" target="_blank" rel="noreferrer">
          Advent of Code
        </a>
        , com uma diferença: o input de cada dia é uma <em>imagem</em>.
      </p>
      <p>
        Você baixa o arquivo, escreve um programa na linguagem que quiser e descobre alguma coisa sobre a imagem.
        Pode ser quantas estrelas aparecem, que mensagem está escondida ou o que mudou entre duas fotos. A resposta é
        sempre exata, e cada resposta certa vale uma <em className="star">estrela</em>.
      </p>
      <p>
        Não precisa de machine learning. Tudo sai com processamento de imagens clássico, e OpenCV ou NumPy já dão
        conta. Se preferir ler pixel por pixel na mão, também funciona.
      </p>
      <p>
        Suas estrelas ficam guardadas só no seu navegador. Novos dias vão aparecendo no{" "}
        <Link href="/">calendário</Link>.
      </p>
    </article>
  );
}
