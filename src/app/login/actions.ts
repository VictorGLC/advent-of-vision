"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, senhaCorreta, token } from "@/lib/admin";

export async function entrar(_: string | null, form: FormData): Promise<string | null> {
  const tentativa = String(form.get("senha") ?? "");
  if (!senhaCorreta(tentativa)) {
    await new Promise((r) => setTimeout(r, 800)); // freia tentativa e erro
    return "Senha errada.";
  }
  (await cookies()).set(COOKIE, token(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/login");
}

export async function sair() {
  (await cookies()).delete(COOKIE);
  redirect("/login");
}
