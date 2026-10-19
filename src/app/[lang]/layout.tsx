import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cabecalho } from "@/components/Cabecalho";
import { LANGS, ehLang } from "@/lib/i18n";
import { NOME, SITE } from "@/lib/seo";
import { fontes } from "../fonte";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

// Título, descrição, canonical e hreflang ficam em cada página (metaPagina).
export const metadata: Metadata = {
  metadataBase: SITE,
  title: { default: NOME, template: `%s · ${NOME}` },
  twitter: { card: "summary" },
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!ehLang(lang)) notFound();
  return (
    <html lang={lang === "pt" ? "pt-BR" : "en"} className={fontes}>
      <body>
        <Cabecalho lang={lang} />
        <main>{children}</main>
      </body>
    </html>
  );
}
