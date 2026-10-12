"use client";

import { useSyncExternalStore } from "react";

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

function parse(raw: string): Record<string, boolean> {
  try {
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

export function useEstrelas() {
  const raw = useSyncExternalStore(assinar, ler, () => VAZIO);
  return parse(raw);
}

export function ganharEstrela(dia: number) {
  const atual = parse(ler());
  atual[dia] = true;
  try {
    localStorage.setItem(KEY, JSON.stringify(atual));
  } catch {}
  window.dispatchEvent(new Event(EVENTO));
}
