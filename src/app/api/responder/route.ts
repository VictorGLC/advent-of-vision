import { NextResponse } from "next/server";
import { diaAtivo } from "@/lib/dias";
import { conferir } from "@/lib/respostas";

export async function POST(req: Request) {
  let body: { dia?: unknown; resposta?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ erro: "Corpo inválido." }, { status: 400 });
  }
  const dia = Number(body.dia);
  const resposta = typeof body.resposta === "string" ? body.resposta.slice(0, 64) : "";
  if (!diaAtivo(dia) || !resposta.trim()) {
    return NextResponse.json({ erro: "Dia ou resposta inválidos." }, { status: 400 });
  }
  return NextResponse.json({ certo: conferir(dia, resposta) });
}
