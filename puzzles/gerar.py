"""Gera inputs e exemplos de todos os dias (seed fixa: rodar de novo produz os mesmos PNGs).

Uso: python gerar.py [dias...]      ex.: python gerar.py 1 4 12
Escreve em ../public/{inputs,exemplos} e atualiza gabarito.json.
"""
import importlib
import json
import sys
from pathlib import Path

from comum import salvar

AQUI = Path(__file__).resolve().parent
PUBLICO = AQUI.parent / "public"
GABARITO = AQUI / "gabarito.json"


def main(dias):
    gab = json.loads(GABARITO.read_text(encoding="utf-8")) if GABARITO.exists() else {}
    for d in dias:
        mod = importlib.import_module(f"d{d:02d}")
        info = mod.produzir(lambda arr, rel: salvar(arr, PUBLICO / rel))
        gab[f"dia{d:02d}"] = info
        print(f"dia {d}: exemplo {info['exemplo']['parte1']} / {info['exemplo']['parte2']}, "
              f"input {info['input']['parte1']} / {info['input']['parte2']}")
    GABARITO.write_text(json.dumps(dict(sorted(gab.items())), indent=2, ensure_ascii=False, default=lambda o: o.item()), encoding="utf-8")


if __name__ == "__main__":
    main([int(a) for a in sys.argv[1:]] or list(range(1, 13)))
