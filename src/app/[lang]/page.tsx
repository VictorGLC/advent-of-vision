import type { Metadata } from "next";
import { Calendario } from "@/components/Calendario";
import { type Lang, TEXTOS, rota } from "@/lib/i18n";
import { NOME, SITE, metaPagina } from "@/lib/seo";

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = TEXTOS[lang];
  return { ...metaPagina(lang, rota.inicio, NOME, t.descricao), title: { absolute: NOME } };
}

export default async function Inicio({ params }: Props) {
  const { lang } = await params;
  // nome do site nos resultados do Google
  const site = { "@context": "https://schema.org", "@type": "WebSite", name: NOME, url: SITE.href, inLanguage: ["pt-BR", "en"] };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
      <Calendario lang={lang} />
    </>
  );
}
