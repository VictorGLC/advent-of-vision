import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const COOKIE = "aov_admin";

function senha() {
  return process.env.ADMIN_PASSWORD || "";
}

function iguais(a: string, b: string) {
  // compara hashes de mesmo tamanho para não vazar nada pelo tempo de resposta
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

// O cookie é um HMAC derivado da senha: trocar a senha derruba as sessões antigas.
export function token() {
  return createHmac("sha256", senha()).update("aov-admin-v1").digest("hex");
}

export function loginAtivo() {
  return senha().length > 0;
}

export function senhaCorreta(tentativa: string) {
  return loginAtivo() && iguais(tentativa, senha());
}

export async function estaLogado() {
  if (!loginAtivo()) return false;
  const valor = (await cookies()).get(COOKIE)?.value;
  return !!valor && iguais(valor, token());
}
