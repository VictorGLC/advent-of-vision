# Dia 3 na mão: Pillow + NumPy, rotulagem com busca em largura
# e deslocamento achado por votação.
# uso: python dia03_manual.py dia03_a.png dia03_b.png
import sys
from collections import Counter, deque

import numpy as np
from PIL import Image

VIZINHOS = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]


def centros(caminho):
    """Centroide (x, y) de cada objeto com 6 pixels ou mais."""
    img = np.array(Image.open(caminho).convert("L"))
    h, w = img.shape
    mascara = img >= 100
    visitado = np.zeros_like(mascara)
    saida = []
    for y0, x0 in zip(*np.nonzero(mascara)):
        if visitado[y0, x0]:
            continue
        visitado[y0, x0] = True
        fila = deque([(y0, x0)])
        soma_x = soma_y = n = 0
        while fila:
            y, x = fila.popleft()
            soma_x += x
            soma_y += y
            n += 1
            for dy, dx in VIZINHOS:
                ny, nx = y + dy, x + dx
                if 0 <= ny < h and 0 <= nx < w and mascara[ny, nx] and not visitado[ny, nx]:
                    visitado[ny, nx] = True
                    fila.append((ny, nx))
        if n >= 6:
            saida.append((soma_x / n, soma_y / n))
    return np.array(saida), (h, w)


ca, (h, w) = centros(sys.argv[1])
cb, _ = centros(sys.argv[2])

# 1. cada par (a, b) vota no deslocamento b - a. O verdadeiro ganha um voto
#    por estrela em comum; os pares por acaso se espalham.
votos = Counter()
for a in ca:
    d = np.rint(cb - a).astype(int)
    d = d[(np.abs(d) <= 200).all(axis=1)]
    votos.update(map(tuple, d))
(sx, sy), n_votos = votos.most_common(1)[0]
print(f"deslocamento: ({sx}, {sy}) com {n_votos} votos (segundo lugar: {votos.most_common(2)[1][1]})")

# 2. leva B para o referencial de A e fica só com a região vista pelas duas
cb = cb - (sx, sy)
x0, x1 = max(0, -sx), min(w, w - sx)
y0, y1 = max(0, -sy), min(h, h - sy)


def dentro(p):
    return p[(p[:, 0] >= x0) & (p[:, 0] < x1) & (p[:, 1] >= y0) & (p[:, 1] < y1)]


ca, cb = dentro(ca), dentro(cb)

# 3. para cada objeto, procura o mais próximo na outra placa
so_a = sum(1 for a in ca if np.hypot(*(cb - a).T).min() > 3)
so_b = sum(1 for b in cb if np.hypot(*(ca - b).T).min() > 3)
print(f"só em A: {so_a}, só em B: {so_b}")
print(so_a * so_b)
