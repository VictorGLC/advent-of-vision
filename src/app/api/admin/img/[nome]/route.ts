import { readFile } from "node:fs/promises";
import path from "node:path";
import { estaLogado } from "@/lib/admin";

const PERMITIDAS = new Set(["d1_resolvido.png", "d2_lsb.png", "d3_resolvido.png"]);

export async function GET(_: Request, { params }: { params: Promise<{ nome: string }> }) {
  const { nome } = await params;
  if (!(await estaLogado())) return new Response("Não autorizado", { status: 401 });
  if (!PERMITIDAS.has(nome)) return new Response("Não encontrado", { status: 404 });
  const dados = await readFile(path.join(process.cwd(), "private", "solucoes", nome));
  return new Response(dados, {
    headers: { "Content-Type": "image/png", "Cache-Control": "private, no-store" },
  });
}
