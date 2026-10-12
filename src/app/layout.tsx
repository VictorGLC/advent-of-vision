import type { Metadata } from "next";
import Link from "next/link";
import { Source_Code_Pro } from "next/font/google";
import { Calendario, Placar } from "@/components/Calendario";
import "./globals.css";

const mono = Source_Code_Pro({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: { default: "Advent of Vision", template: "%s · Advent of Vision" },
  description: "Puzzles diários de processamento de imagens: você recebe uma imagem e descobre uma propriedade dela.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={mono.variable}>
      <body>
        <div className="wrap">
          <header>
            <Link href="/" className="logo">
              Advent of Vision <span>// missão Andorinha-3</span>
            </Link>
            <div className="sub">
              Puzzles de processamento de imagens. Resposta exata, sem machine learning. <Placar />
            </div>
          </header>
          <Calendario />
          {children}
          <footer>
            Protótipo: dias 1 a 3, parte 1. As estrelas ficam salvas só neste navegador.
          </footer>
        </div>
      </body>
    </html>
  );
}
