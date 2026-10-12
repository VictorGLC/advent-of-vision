# Dia 8 com OpenCV (aqui o OpenCV só abre, gira e espelha; o resto é casar bordas)
# uso: python dia08_opencv.py dia08.png 8      (8 x 8 ladrilhos)
import sys
from collections import Counter

import cv2
import numpy as np

FAIXA = 6  # faixa preta entre os ladrilhos

folha = cv2.imread(sys.argv[1], cv2.IMREAD_GRAYSCALE)
n = int(sys.argv[2])
t = (folha.shape[0] - (n + 1) * FAIXA) // n
tiles = {}
for i in range(n * n):
    r, c = divmod(i, n)
    y, x = FAIXA + r * (t + FAIXA), FAIXA + c * (t + FAIXA)
    tiles[i + 1] = folha[y:y + t, x:x + t]


def bordas(tile):
    return [tile[0], tile[-1], tile[:, 0], tile[:, -1]]


def chave(borda):
    """Mesma chave para a borda lida nos dois sentidos."""
    return min(borda.tobytes(), borda[::-1].tobytes())


contagem = Counter(chave(b) for tile in tiles.values() for b in bordas(tile))
soltas = {i: sum(contagem[chave(b)] == 1 for b in bordas(tile)) for i, tile in tiles.items()}
cantos = [i for i, s in soltas.items() if s == 2]
print("cantos:", cantos)
print("parte 1:", int(np.prod(cantos, dtype=np.int64)))


# parte 2: monta tudo. As 8 orientações de um ladrilho: 4 giros, com e sem espelho.
def orientacoes(tile):
    for k in range(4):
        g = np.rot90(tile, k)
        yield g
        yield cv2.flip(g, 1)


def solta(borda):
    return contagem[chave(borda)] == 1


canto = cantos[0]
inicial = next(o for o in orientacoes(tiles[canto]) if solta(o[0]) and solta(o[:, 0]))
grade = [[None] * n for _ in range(n)]
grade[0][0] = inicial
usados = {canto}
for r in range(n):
    for c in range(n):
        if r == c == 0:
            continue
        for i, tile in tiles.items():
            if i in usados:
                continue
            achou = None
            for o in orientacoes(tile):
                if c > 0 and not np.array_equal(o[:, 0], grade[r][c - 1][:, -1]):
                    continue
                if r > 0 and not np.array_equal(o[0], grade[r - 1][c][-1]):
                    continue
                achou = o
                break
            if achou is not None:
                grade[r][c] = achou
                usados.add(i)
                break

passo = t - 1  # vizinhos dividem uma linha de pixels
montado = np.zeros((n * passo + 1, n * passo + 1), np.uint8)
for r in range(n):
    for c in range(n):
        montado[r * passo:r * passo + t, c * passo:c * passo + t] = grade[r][c]
cv2.imwrite("dia08_montado.png", montado)
print("parte 2: leia a palavra em dia08_montado.png (pode ter saído espelhada ou girada)")
