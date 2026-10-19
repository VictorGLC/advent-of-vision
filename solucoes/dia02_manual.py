# Dia 2 na mão: Pillow + NumPy. Testa os planos de bit 0 e as combinações entre canais,
# escolhe sozinho os que têm estrutura e desenha o texto em ASCII no terminal.
# uso: python dia02_manual.py dia02.png
import sys

import numpy as np
from PIL import Image

img = np.array(Image.open(sys.argv[1]).convert("RGB"))  # Pillow carrega em RGB
r, g, b = (img[..., i] & 1 for i in range(3))


def ascii_art(plano, colunas=110):
    """Recorta a caixa do texto e reduz para caber no terminal."""
    ys, xs = np.nonzero(plano)
    caixa = plano[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    px = max(1, caixa.shape[1] // colunas)
    py = px * 2  # caractere do terminal é mais alto que largo
    for y in range(0, caixa.shape[0], py):
        faixa = caixa[y:y + py]
        print("".join("#" if faixa[:, x:x + px].mean() > 0.4 else " " for x in range(0, caixa.shape[1], px)))


candidatos = {"R": r, "G": g, "B": b, "R xor G": r ^ g, "R xor B": r ^ b, "G xor B": g ^ b}
for nome, p in candidatos.items():
    print(f"{nome:8s} {p.mean():6.1%} de uns")

# ruído puro fica perto de 50%; o que foge disso tem mensagem
com_texto = [n for n, p in candidatos.items() if abs(p.mean() - 0.5) > 0.2]
for nome in com_texto:
    print(f"\n--- {nome} ---")
    ascii_art(candidatos[nome])
print(f"\nparte 1: o texto do plano {com_texto[0]}")
print(f"parte 2: o texto do plano {com_texto[1]}")
