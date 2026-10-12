# Dia 5 na mão: Pillow + NumPy. Máximos locais comparando cada pixel com os 8 vizinhos,
# e borrões por busca em largura.
# uso: python dia05_manual.py dia05.png
import sys
from collections import deque

import numpy as np
from PIL import Image

img = np.array(Image.open(sys.argv[1]).convert("L")).astype(float)
h, w = img.shape
fundo = np.median(img)

# borrão 3x3 para que o ruído não crie picos falsos
suave = sum(np.roll(np.roll(img, dy, 0), dx, 1) for dy in (-1, 0, 1) for dx in (-1, 0, 1)) / 9

# pico = maior que todos os vizinhos num raio de 2 px e bem acima do fundo.
# Empate entre dois vizinhos: só um deles fica (estrito numa direção, >= na outra).
pico = suave > fundo + 60
for dy in range(-2, 3):
    for dx in range(-2, 3):
        if dy or dx:
            vizinho = np.roll(np.roll(suave, dy, 0), dx, 1)
            pico &= (suave > vizinho) if (dy, dx) > (0, 0) else (suave >= vizinho)
ys, xs = np.nonzero(pico)
print("parte 1:", len(ys))

# parte 2: borrões = regiões conexas acima do fundo; quantos têm 3 picos ou mais
mascara = suave > fundo + 40
rotulo = np.zeros((h, w), int)
atual = 0
for y0, x0 in zip(*np.nonzero(mascara)):
    if rotulo[y0, x0]:
        continue
    atual += 1
    rotulo[y0, x0] = atual
    fila = deque([(y0, x0)])
    while fila:
        y, x = fila.popleft()
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                ny, nx = y + dy, x + dx
                if 0 <= ny < h and 0 <= nx < w and mascara[ny, nx] and not rotulo[ny, nx]:
                    rotulo[ny, nx] = atual
                    fila.append((ny, nx))
contagem = np.bincount(rotulo[ys, xs], minlength=atual + 1)
print("parte 2:", int((contagem[1:] >= 3).sum()))
