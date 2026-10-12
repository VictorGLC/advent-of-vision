import type { Metadata } from "next";
import Link from "next/link";
import { Source_Code_Pro } from "next/font/google";
import { Placar } from "@/components/Calendario";
import "./globals.css";

const mono = Source_Code_Pro({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: { default: "Advent of Vision", template: "%s - Advent of Vision" },
  description: "Puzzles de processamento de imagens: você recebe uma imagem e precisa descobrir alguma coisa sobre ela.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={mono.variable}>
      <body>
        <header>
          <div>
            <h1 className="title-global">
              <Link href="/">Advent of Vision</Link>
            </h1>
            <nav>
              <ul>
                <li>
                  <Link href="/sobre">[Sobre]</Link>
                </li>
                <li>
                  <Link href="/">[Calendário]</Link>
                </li>
              </ul>
            </nav>
            <div className="user">
              <Placar />
            </div>
          </div>
          <div>
            <h1 className="title-event">
              &nbsp;&nbsp;<span className="title-event-wrap">{"/^"}</span>
              <Link href="/">2026</Link>
              <span className="title-event-wrap">{"$/"}</span>
            </h1>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
