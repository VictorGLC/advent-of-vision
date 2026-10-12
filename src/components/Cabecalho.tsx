import Link from "next/link";
import { Placar, TrocaIdioma } from "@/components/Calendario";
import { type Lang, TEXTOS, rota } from "@/lib/i18n";

export function Cabecalho({ lang }: { lang: Lang }) {
  const t = TEXTOS[lang];
  return (
    <header>
      <div>
        <h1 className="title-global">
          <Link href={rota.inicio(lang)}>Advent of Vision</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link href={rota.sobre(lang)}>{t.sobre}</Link>
            </li>
            <li>
              <Link href={rota.inicio(lang)}>{t.calendario}</Link>
            </li>
            <TrocaIdioma lang={lang} />
          </ul>
        </nav>
        <div className="user">
          <Placar />
        </div>
      </div>
      <div>
        <h1 className="title-event">
          &nbsp;&nbsp;<span className="title-event-wrap">{"/^"}</span>
          <Link href={rota.inicio(lang)}>2026</Link>
          <span className="title-event-wrap">{"$/"}</span>
        </h1>
      </div>
    </header>
  );
}
