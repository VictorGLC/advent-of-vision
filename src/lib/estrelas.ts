"use client";

import { useSyncExternalStore } from "react";

// Guarda, por dia, a resposta aceita. Ter uma entrada = ter a estrela.
const KEY = "advent-of-vision-estrelas";
const EVENTO = "aov-estrelas";
const VAZIO = "{}";

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

function parse(raw: string): Record<string, string> {
  try {
    const obj = JSON.parse(raw) || {};
    // versão anterior guardava `true` em vez da resposta
    return Object.fromEntries(
      Object.entries(obj).filter(([, v]) => v).map(([k, v]) => [k, typeof v === "string" ? v : ""]),
    );
  } catch {
    return {};
  }
}

export function useEstrelas() {
  const raw = useSyncExternalStore(assinar, ler, () => VAZIO);
  return parse(raw);
}

export function ganharEstrela(dia: number, resposta: string) {
  const atual = parse(ler());
  atual[dia] = resposta;
  try {
    localStorage.setItem(KEY, JSON.stringify(atual));
  } catch {}
  window.dispatchEvent(new Event(EVENTO));
}
