import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cabecalho } from "@/components/Cabecalho";
import { LANGS, ehLang } from "@/lib/i18n";
import { fontes } from "../fonte";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

const DESCRICAO = {
  pt: "Puzzles de processamento de imagens inspirados no Advent of Code: você recebe uma imagem e descobre alguma coisa sobre ela.",
  en: "Image processing puzzles inspired by Advent of Code: you get an image and find something out about it.",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: { default: "Advent of Vision", template: "%s - Advent of Vision" },
    description: ehLang(lang) ? DESCRICAO[lang] : DESCRICAO.pt,
    alternates: { languages: { "pt-BR": "/pt", en: "/en" } },
  };
}

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
