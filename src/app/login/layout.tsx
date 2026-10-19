import { Cabecalho } from "@/components/Cabecalho";
import { fontes } from "../fonte";
import "../globals.css";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fontes}>
      <body>
        <Cabecalho lang="pt" />
        <main className="largo">{children}</main>
      </body>
    </html>
  );
}
