import { NextResponse } from "next/server";
import { diaAtivo } from "@/lib/dias";
import { conferir } from "@/lib/respostas";

export async function POST(req: Request) {
  let body: { dia?: unknown; parte?: unknown; resposta?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ erro: "Corpo inválido." }, { status: 400 });
  }
  const dia = Number(body.dia);
  const parte = Number(body.parte);
  const resposta = typeof body.resposta === "string" ? body.resposta.slice(0, 64) : "";
  if (!diaAtivo(dia) || (parte !== 1 && parte !== 2) || !resposta.trim()) {
    return NextResponse.json({ erro: "Dia, parte ou resposta inválidos." }, { status: 400 });
  }
  return NextResponse.json({ certo: conferir(dia, parte, resposta) });
}
