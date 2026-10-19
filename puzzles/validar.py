"""Roda as soluções de referência (OpenCV e na mão) em exemplos e inputs e compara com o gabarito.

Uso: python validar.py [dias...]
Partes que se leem a olho (texto numa imagem) são puladas e marcadas com "olho".
"""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parent
GAB = json.loads((AQUI / "gabarito.json").read_text(encoding="utf-8"))

# arquivos e argumentos de cada dia: (exemplo, input)
ARGS = {
    1: (["exemplos/dia01.png"], ["inputs/dia01.png"]),
    2: (["exemplos/dia02.png"], ["inputs/dia02.png"]),
    3: (["exemplos/dia03_a.png", "exemplos/dia03_b.png"], ["inputs/dia03_a.png", "inputs/dia03_b.png"]),
    4: (["exemplos/dia04.png", "6", "3"], ["inputs/dia04.png", "20", "5"]),
    5: (["exemplos/dia05.png"], ["inputs/dia05.png"]),
    6: (["exemplos/dia06.png"], ["inputs/dia06.png"]),
    7: (["exemplos/dia07.png", "4"], ["inputs/dia07.png", "12"]),
    8: (["exemplos/dia08.png", "3"], ["inputs/dia08.png", "8"]),
    9: (["exemplos/dia09.png"], ["inputs/dia09.png"]),
    10: (["exemplos/dia10_a.png", "exemplos/dia10_b.png"], ["inputs/dia10_a.png", "inputs/dia10_b.png"]),
    11: (["exemplos/dia11_esq.png", "exemplos/dia11_dir.png"], ["inputs/dia11_esq.png", "inputs/dia11_dir.png"]),
    12: (["exemplos/dia12.png"], ["inputs/dia12.png"]),
}
A_OLHO = {(2, 1), (2, 2), (8, 2), (9, 1), (12, 2)}


def rodar(script, args):
    with tempfile.TemporaryDirectory() as tmp:
        cmd = [sys.executable, str(RAIZ / "solucoes" / script)] + \
              [str(RAIZ / "public" / a) if a.endswith(".png") else a for a in args]
        saida = subprocess.run(cmd, capture_output=True, text=True, cwd=tmp, encoding="utf-8",
                               env={"PYTHONIOENCODING": "utf-8", **__import__("os").environ})
    resp = {}
    for linha in saida.stdout.splitlines():
        for p in (1, 2):
            if linha.startswith(f"parte {p}:"):
                resp[p] = linha.split(":", 1)[1].strip()
    if saida.returncode:
        resp["erro"] = saida.stderr.strip().splitlines()[-1]
    return resp


def main(dias):
    falhas = 0
    for d in dias:
        for tipo, args in zip(("exemplo", "input"), ARGS[d]):
            esperado = GAB[f"dia{d:02d}"][tipo]
            for versao in ("opencv", "manual"):
                r = rodar(f"dia{d:02d}_{versao}.py", args)
                marcas = []
                for p in (1, 2):
                    if (d, p) in A_OLHO:
                        marcas.append(f"p{p}: olho")
                    elif str(r.get(p)) == str(esperado[f"parte{p}"]):
                        marcas.append(f"p{p}: ok")
                    else:
                        falhas += 1
                        marcas.append(f"p{p}: FALHOU ({r.get(p)} != {esperado[f'parte{p}']})")
                extra = f"  [{r['erro']}]" if "erro" in r else ""
                print(f"dia {d:2d} {tipo:7s} {versao:6s}  " + "  ".join(marcas) + extra)
    print("OK" if not falhas else f"{falhas} FALHAS")
    return falhas


if __name__ == "__main__":
    sys.exit(main([int(a) for a in sys.argv[1:]] or list(range(1, 13))))
