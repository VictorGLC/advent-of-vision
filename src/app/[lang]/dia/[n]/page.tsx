import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Partes } from "@/components/Resposta";
import { CONTEUDO } from "@/conteudo";
import { DIAS, diaAtivo } from "@/lib/dias";
import { LANGS, type Lang, TEXTOS } from "@/lib/i18n";

type Props = { params: Promise<{ lang: Lang; n: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => DIAS.map((d) => ({ lang, n: String(d.n) })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, n } = await params;
  return { title: `${TEXTOS[lang].dia} ${n}` };
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
