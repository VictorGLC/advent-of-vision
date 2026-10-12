# Dia 1 na mão: Pillow só para abrir o PNG, NumPy para o array,
# rotulagem de componentes conexos com busca em largura.
# uso: python dia01_manual.py dia01.png
import sys
from collections import deque

import numpy as np
from PIL import Image

img = np.array(Image.open(sys.argv[1]).convert("L"))
h, w = img.shape
mascara = img >= 100
VIZINHOS = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]


def componentes(mascara):
    """Lista de componentes, cada um como array de (y, x)."""
    visitado = np.zeros_like(mascara, dtype=bool)
    saida = []
    for y0, x0 in zip(*np.nonzero(mascara)):
        if visitado[y0, x0]:
            continue
        visitado[y0, x0] = True
        fila = deque([(y0, x0)])
        pixels = []
        while fila:
            y, x = fila.popleft()
            pixels.append((y, x))
            for dy, dx in VIZINHOS:
                ny, nx = y + dy, x + dx
                if 0 <= ny < h and 0 <= nx < w and mascara[ny, nx] and not visitado[ny, nx]:
                    visitado[ny, nx] = True
                    fila.append((ny, nx))
        saida.append(np.array(pixels, float))
    return saida


objetos = [o for o in componentes(mascara) if len(o) >= 6]
print("parte 1:", len(objetos))


def alongamento(pixels):
    """Razão entre os eixos da elipse equivalente (raiz da razão dos autovalores da covariância)."""
    cov = np.cov(pixels.T, bias=True)
    l1, l2 = np.linalg.eigvalsh(cov)[::-1]
    return np.sqrt(l1 / max(l2, 1e-9))


print("parte 2:", sum(1 for o in objetos if alongamento(o) < 1.8))
