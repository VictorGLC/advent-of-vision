# Dia 11 na mão: Pillow + NumPy. Para cada deslocamento d, compara a imagem esquerda com a
# direita deslocada de d; em cada pixel, fica o d que deixa a vizinhança mais parecida.
# uso: python dia11_manual.py dia11_esq.png dia11_dir.png
import sys
from collections import deque

import numpy as np
from PIL import Image

F_PX, BASE_M = 800, 0.5
D_MAX, JANELA = 40, 7  # janela de (2*7+1) = 15 px

esq = np.array(Image.open(sys.argv[1]).convert("L")).astype(float)
dir_ = np.array(Image.open(sys.argv[2]).convert("L")).astype(float)
h, w = esq.shape


def soma_janela(a, r):
    """Soma numa janela (2r+1)x(2r+1) usando imagem integral."""
    p = np.pad(a, ((r + 1, r), (r + 1, r)))
    s = p.cumsum(0).cumsum(1)
    k = 2 * r + 1
    return s[k:, k:] - s[:-k, k:] - s[k:, :-k] + s[:-k, :-k]


custo = np.full((D_MAX, h, w), np.inf)
for d in range(D_MAX):
    dif = np.full((h, w), 255.0)
    dif[:, d:] = np.abs(esq[:, d:] - dir_[:, :w - d])  # o ponto x da esquerda está em x - d na direita
    custo[d] = soma_janela(dif, JANELA)
disp = custo.argmin(axis=0)
disp[:, :D_MAX] = 0  # a faixa da esquerda não tem par

chao = np.median(disp[:, D_MAX:])
print(f"disparidade do chão: {chao:.0f} px")

# regiões mais perto que o chão, por busca em largura
m = disp > chao + 1.5
visto = np.zeros_like(m)
pedras = []
for y0, x0 in zip(*np.nonzero(m)):
    if visto[y0, x0]:
        continue
    visto[y0, x0] = True
    fila, valores = deque([(y0, x0)]), []
    while fila:
        y, x = fila.popleft()
        valores.append(disp[y, x])
        for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
            if 0 <= ny < h and 0 <= nx < w and m[ny, nx] and not visto[ny, nx]:
                visto[ny, nx] = True
                fila.append((ny, nx))
    if len(valores) >= 200:
        pedras.append(np.median(valores))
print("parte 1:", len(pedras))
print(f"maior disparidade: {max(pedras):.0f} px")
print("parte 2:", round(F_PX * BASE_M / max(pedras)))
