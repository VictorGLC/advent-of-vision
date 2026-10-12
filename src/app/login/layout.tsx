import { Cabecalho } from "@/components/Cabecalho";
import { mono } from "../fonte";
import "../globals.css";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={mono.variable}>
      <body>
        <Cabecalho lang="pt" />
        <main className="largo">{children}</main>
      </body>
    </html>
  );
}
