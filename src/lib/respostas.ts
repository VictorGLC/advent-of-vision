import "server-only";
import { createHash } from "node:crypto";

// SHA-256 de "pixels-d<dia>:<resposta normalizada>". As respostas em si não ficam no repositório.
const HASH: Record<number, string> = {
  1: "332142da2a47d5b91aaff6a4942c503688682c61793087dba0de0cb874e72a5e",
  2: "469903ecdd3a0dbb1cc785ef7c7eccead08b5ab0bc24c0c10b3e9e3eddafaeaf",
  3: "6d8a9452517a25fa09e8b9c47d19a5d0961a946c93b35cb4cf914bea446f8a5c",
};

export function normalizar(resposta: string) {
  return resposta.trim().toUpperCase().replace(/\s+/g, "");
}

export function conferir(dia: number, resposta: string) {
  const esperado = HASH[dia];
  if (!esperado) return false;
  const h = createHash("sha256").update(`pixels-d${dia}:${normalizar(resposta)}`).digest("hex");
  return h === esperado;
}
