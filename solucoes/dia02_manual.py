# Dia 2 na mão: Pillow + NumPy. Acha sozinho o canal com mensagem
# e desenha o texto em ASCII no terminal, sem precisar abrir imagem.
# uso: python dia02_manual.py dia02.png
import sys

import numpy as np
from PIL import Image

img = np.array(Image.open(sys.argv[1]).convert("RGB"))  # Pillow carrega em RGB

planos = {c: img[..., i] & 1 for i, c in enumerate("RGB")}
fracao = {c: p.mean() for c, p in planos.items()}
for c, f in fracao.items():
    print(f"canal {c}: {f:.1%} de uns")

# ruído puro fica perto de 50%; o canal com texto foge disso
canal = max(fracao, key=lambda c: abs(fracao[c] - 0.5))
plano = planos[canal]
print(f"mensagem no canal {canal}\n")

Image.fromarray((plano * 255).astype(np.uint8)).save(f"lsb_{canal}.png")

# recorta a caixa do texto e reduz para caber no terminal
ys, xs = np.nonzero(plano)
caixa = plano[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
passo_x = max(1, caixa.shape[1] // 120)
passo_y = passo_x * 2  # caractere do terminal é mais alto que largo
for y in range(0, caixa.shape[0], passo_y):
    linha = caixa[y:y + passo_y]
    print("".join("#" if linha[:, x:x + passo_x].mean() > 0.4 else " "
                  for x in range(0, caixa.shape[1], passo_x)))
