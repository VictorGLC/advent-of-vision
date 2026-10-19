import type { MetadataRoute } from "next";
import { DIAS } from "@/lib/dias";
import { type Lang, LANGS, rota } from "@/lib/i18n";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas: ((l: Lang) => string)[] = [rota.inicio, rota.sobre, ...DIAS.map((d) => (l: Lang) => rota.dia(l, d.n))];
  return paginas.flatMap((rotaDe) =>
    LANGS.map((lang) => ({
      url: new URL(rotaDe(lang), SITE).href,
      alternates: { languages: { "pt-BR": new URL(rotaDe("pt"), SITE).href, en: new URL(rotaDe("en"), SITE).href } },
    })),
  );
}
