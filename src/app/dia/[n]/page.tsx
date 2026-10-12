import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Resposta } from "@/components/Resposta";
import { CONTEUDO } from "@/conteudo";
import { DIAS, DIAS_ATIVOS, diaAtivo } from "@/lib/dias";

type Props = { params: Promise<{ n: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return DIAS.map((d) => ({ n: String(d.n) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = Number((await params).n);
  const dia = DIAS.find((d) => d.n === n);
  return { title: dia ? `Dia ${n}: ${dia.titulo}` : "Dia não encontrado" };
}

export default async function DiaPage({ params }: Props) {
  const n = Number((await params).n);
  if (!diaAtivo(n)) notFound();
  const { titulo } = DIAS[n - 1];
  const { Enunciado, Resolucao } = CONTEUDO[n];

  return (
    <article>
      <h2>
        Dia {n}: {titulo}
      </h2>
      <Enunciado />
      <Resposta dia={n} />
      <details>
        <summary>Ver a resolução</summary>
        <Resolucao />
      </details>
      <nav className="nav-dia" aria-label="Navegação entre dias">
        {n > 1 ? <Link href={`/dia/${n - 1}`}>← Dia {n - 1}</Link> : <span />}
        {n < DIAS_ATIVOS && <Link href={`/dia/${n + 1}`}>Dia {n + 1} →</Link>}
      </nav>
    </article>
  );
}
