"use client";

import { useSyncExternalStore } from "react";

// Por dia, a resposta aceita de cada parte: { "3": { "1": "832", "2": "361" } }.
// A versão anterior (só uma parte, outros puzzles) usava outra chave e é ignorada.
const KEY = "advent-of-vision-v2";
const EVENTO = "aov-estrelas";
const VAZIO = "{}";

export type Progresso = Record<string, { 1?: string; 2?: string }>;

function ler(): string {
  try {
    return localStorage.getItem(KEY) ?? VAZIO;
  } catch {
    return VAZIO;
  }
}

function assinar(cb: () => void) {
  window.addEventListener(EVENTO, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENTO, cb);
    window.removeEventListener("storage", cb);
  };
}

function parse(raw: string): Progresso {
  try {
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}

export function useProgresso() {
  return parse(useSyncExternalStore(assinar, ler, () => VAZIO));
}

export function contarEstrelas(p: Progresso) {
  return Object.values(p).reduce((n, d) => n + (d[1] !== undefined ? 1 : 0) + (d[2] !== undefined ? 1 : 0), 0);
}

export function ganharEstrela(dia: number, parte: 1 | 2, resposta: string) {
  const atual = parse(ler());
  atual[dia] = { ...atual[dia], [parte]: resposta };
  try {
    localStorage.setItem(KEY, JSON.stringify(atual));
  } catch {}
  window.dispatchEvent(new Event(EVENTO));
}
