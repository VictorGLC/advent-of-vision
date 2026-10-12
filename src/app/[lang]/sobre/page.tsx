import type { Metadata } from "next";
import Link from "next/link";
import { type Lang, rota } from "@/lib/i18n";

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "en" ? "About" : "Sobre" };
}

export default async function Sobre({ params }: Props) {
  const { lang } = await params;
  if (lang === "en") {
    return (
      <article>
        <h2>--- About ---</h2>
        <p>
          Advent of Vision is a calendar of programming puzzles in the spirit of{" "}
          <a href="https://adventofcode.com" target="_blank" rel="noreferrer">
            Advent of Code
          </a>
          , with one twist: every day&apos;s input is an <em>image</em>.
        </p>
        <p>
          You download the file, write a program in whatever language you like, and figure something out about the
          image: how many stars it holds, what message is hidden in it, what changed between two photos. Every
          puzzle has two parts, the answer is always exact, and each correct answer is worth a{" "}
          <em className="star">star</em>.
        </p>
        <p>
          No machine learning needed. Everything can be solved with classic image processing, the kind taught in
          an introductory course, and the later days ask for a little more. OpenCV or NumPy will do, and if you
          prefer to walk the pixels yourself, that works too.
        </p>
        <p>
          The puzzles tell one story, about a Brazilian space probe that woke up after twenty years, so they are
          best played in order. Your stars are stored only in your browser.{" "}
          <Link href={rota.inicio(lang)}>[Back to the calendar]</Link>
        </p>
      </article>
    );
  }
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
        Você baixa o arquivo, escreve um programa na linguagem que quiser e descobre alguma coisa sobre a imagem:
        quantas estrelas ela tem, que mensagem está escondida, o que mudou entre duas fotos. Todo dia tem duas
        partes, a resposta é sempre exata, e cada resposta certa vale uma <em className="star">estrela</em>.
      </p>
      <p>
        Não precisa de machine learning. Tudo sai com processamento de imagens clássico, do tipo que se vê numa
        disciplina de PDI, e os últimos dias pedem um pouco mais. OpenCV ou NumPy já dão conta, e se você preferir
        andar pelos pixels na mão, também funciona.
      </p>
      <p>
        Os puzzles contam uma história só, de uma sonda brasileira que acordou depois de vinte anos, então vale
        jogar na ordem. Suas estrelas ficam guardadas só no seu navegador.{" "}
        <Link href={rota.inicio(lang)}>[Voltar ao calendário]</Link>
      </p>
    </article>
  );
}
