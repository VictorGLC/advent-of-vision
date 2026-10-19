import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Partes } from "@/components/Resposta";
import { CONTEUDO } from "@/conteudo";
import { DIAS, diaAtivo } from "@/lib/dias";
import { LANGS, type Lang, TEXTOS, rota } from "@/lib/i18n";
import { metaPagina } from "@/lib/seo";

type Props = { params: Promise<{ lang: Lang; n: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => DIAS.map((d) => ({ lang, n: String(d.n) })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, n: ns } = await params;
  const n = Number(ns);
  const { titulo, tam } = DIAS[n - 1];
  const descricao =
    lang === "en"
      ? `Day ${n} of Advent of Vision: ${titulo.en}. Download the ${tam} image and solve both parts with image processing.`
      : `Dia ${n} do Advent of Vision: ${titulo.pt}. Baixe a imagem de ${tam} e resolva as duas partes com processamento de imagens.`;
  return metaPagina(lang, (l) => rota.dia(l, n), `${TEXTOS[lang].dia} ${n}: ${titulo[lang]}`, descricao);
}

export default async function DiaPage({ params }: Props) {
  const { lang, n: ns } = await params;
  const n = Number(ns);
  if (!diaAtivo(n)) notFound();
  const { titulo, inputs } = DIAS[n - 1];
  const { Parte1, Parte2 } = CONTEUDO[lang][n];
  return (
    <Partes dia={n} lang={lang} inputs={inputs} titulo={titulo[lang]} parte1={<Parte1 />} parte2={<Parte2 />} />
  );
}
