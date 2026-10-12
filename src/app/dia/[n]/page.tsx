import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Resposta } from "@/components/Resposta";
import { CONTEUDO } from "@/conteudo";
import { DIAS, diaAtivo } from "@/lib/dias";

type Props = { params: Promise<{ n: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return DIAS.map((d) => ({ n: String(d.n) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = Number((await params).n);
  const dia = DIAS.find((d) => d.n === n);
  return { title: dia ? `Dia ${n}` : "Dia não encontrado" };
}

export default async function DiaPage({ params }: Props) {
  const n = Number((await params).n);
  if (!diaAtivo(n)) notFound();
  const { titulo, inputs } = DIAS[n - 1];
  const Enunciado = CONTEUDO[n];

  return (
    <>
      <article>
        <h2>
          --- Dia {n}: {titulo} ---
        </h2>
        <Enunciado />
      </article>
      <Resposta dia={n} inputs={inputs} />
    </>
  );
}
