import type { Metadata } from "next";
import type { Lang } from "./i18n";

// URL pública: NEXT_PUBLIC_SITE_URL se definida, senão o domínio de produção que a Vercel passa no build.
const dominio = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? (dominio ? `https://${dominio}` : "http://localhost:3000"));

export const NOME = "Advent of Vision";

/** Canonical, hreflang e Open Graph de uma página que existe nos dois idiomas. */
export function metaPagina(lang: Lang, rotaDe: (l: Lang) => string, titulo: string, descricao: string): Metadata {
  return {
    title: titulo,
    description: descricao,
    alternates: {
      canonical: rotaDe(lang),
      languages: { "pt-BR": rotaDe("pt"), en: rotaDe("en"), "x-default": rotaDe("pt") },
    },
    openGraph: {
      title: titulo,
      description: descricao,
      url: rotaDe(lang),
      siteName: NOME,
      locale: lang === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
  };
}
