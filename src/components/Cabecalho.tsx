import Link from "next/link";
import { Placar, TrocaIdioma } from "@/components/Calendario";
import { type Lang, TEXTOS, rota } from "@/lib/i18n";

export function Cabecalho({ lang }: { lang: Lang }) {
  const t = TEXTOS[lang];
  return (
    <header>
      <Link className="logo" href={rota.inicio(lang)}>
        advent<i>·</i>of<i>·</i>vision
      </Link>
      <nav>
        <Link href={rota.inicio(lang)}>{t.calendario}</Link>
        <Link href={rota.sobre(lang)}>{t.sobre}</Link>
        <TrocaIdioma lang={lang} />
        <Placar />
      </nav>
    </header>
  );
}
