# Dia 4 na mão: Pillow + NumPy.
# uso: python dia04_manual.py dia04.png 20 5     (20 fotos, 5 por linha)
import sys
from collections import deque

import numpy as np
from PIL import Image

folha = np.array(Image.open(sys.argv[1]).convert("L")).astype(int)
n, colunas = int(sys.argv[2]), int(sys.argv[3])
linhas = n // colunas
sh, sw = folha.shape[0] // linhas, folha.shape[1] // colunas

# corta a folha em n fotos: vira um cubo (foto, y, x)
fotos = folha.reshape(linhas, sh, colunas, sw).transpose(0, 2, 1, 3).reshape(n, sh, sw)

# parte 1: um pixel saudável sempre varia um pouco por causa do ruído; travado não muda nunca
travado = fotos.std(axis=0) == 0
print("parte 1:", int(travado.sum()))

# parte 2: a média de n fotos tem ruído sqrt(n) vezes menor; as estrelas fracas aparecem.
# Os pixels travados da parte 1 não são estrelas: viram fundo.
media = fotos.mean(axis=0)
fundo = np.median(media)
media[travado] = fundo
# borrão 3x3 feito com deslocamentos, para tirar o grão que sobrou
suave = sum(np.roll(np.roll(media, dy, 0), dx, 1) for dy in (-1, 0, 1) for dx in (-1, 0, 1)) / 9
mascara = suave - fundo > 14

# componentes conexos por busca em largura; estrela = mancha de 5 pixels ou mais
visto = np.zeros_like(mascara)
estrelas = 0
for y0, x0 in zip(*np.nonzero(mascara)):
    if visto[y0, x0]:
        continue
    visto[y0, x0] = True
    fila, tamanho = deque([(y0, x0)]), 0
    while fila:
        y, x = fila.popleft()
        tamanho += 1
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                ny, nx = y + dy, x + dx
                if 0 <= ny < sh and 0 <= nx < sw and mascara[ny, nx] and not visto[ny, nx]:
                    visto[ny, nx] = True
                    fila.append((ny, nx))
    estrelas += tamanho >= 5
print("parte 2:", estrelas)
