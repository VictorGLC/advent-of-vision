# Dia 8 na mão: Pillow + NumPy. Casa as bordas com um dicionário e monta o panorama
# por busca: cada posição só aceita o ladrilho cujas bordas batem com os vizinhos já postos.
# uso: python dia08_manual.py dia08.png 8      (8 x 8 ladrilhos)
import sys
from collections import defaultdict

import numpy as np
from PIL import Image

FAIXA = 6

folha = np.array(Image.open(sys.argv[1]).convert("L"))
n = int(sys.argv[2])
t = (folha.shape[0] - (n + 1) * FAIXA) // n
tiles = [folha[FAIXA + r * (t + FAIXA):FAIXA + r * (t + FAIXA) + t,
               FAIXA + c * (t + FAIXA):FAIXA + c * (t + FAIXA) + t] for r in range(n) for c in range(n)]


def chave(borda):
    return min(tuple(borda), tuple(borda[::-1]))


# quem tem cada borda
dono = defaultdict(set)
for i, tile in enumerate(tiles):
    for b in (tile[0], tile[-1], tile[:, 0], tile[:, -1]):
        dono[chave(b)].add(i)

vizinhos = defaultdict(set)
for donos in dono.values():
    if len(donos) == 2:
        a, b = donos
        vizinhos[a].add(b)
        vizinhos[b].add(a)

# canto: só 2 vizinhos
cantos = [i + 1 for i in range(len(tiles)) if len(vizinhos[i]) == 2]
produto = 1
for c in cantos:
    produto *= c
print("cantos:", cantos)
print("parte 1:", produto)


def orientacoes(tile):
    for k in range(4):
        g = np.rot90(tile, k)
        yield g
        yield g[:, ::-1]


def borda_solta(b):
    return len(dono[chave(b)]) == 1


# começa por um canto, virado com as bordas soltas para cima e para a esquerda
primeiro = cantos[0] - 1
grade = {(0, 0): next(o for o in orientacoes(tiles[primeiro]) if borda_solta(o[0]) and borda_solta(o[:, 0]))}
quem = {(0, 0): primeiro}
for r in range(n):
    for c in range(n):
        if (r, c) in grade:
            continue
        # candidatos: vizinhos do ladrilho da esquerda (ou de cima)
        ref = quem[(r, c - 1)] if c else quem[(r - 1, c)]
        for i in vizinhos[ref] - set(quem.values()):
            o = next((o for o in orientacoes(tiles[i])
                      if (not c or np.array_equal(o[:, 0], grade[(r, c - 1)][:, -1]))
                      and (not r or np.array_equal(o[0], grade[(r - 1, c)][-1]))), None)
            if o is not None:
                grade[(r, c)], quem[(r, c)] = o, i
                break

passo = t - 1
montado = np.zeros((n * passo + 1, n * passo + 1), np.uint8)
for (r, c), o in grade.items():
    montado[r * passo:r * passo + t, c * passo:c * passo + t] = o
Image.fromarray(montado).save("dia08_montado.png")


# a palavra é feita de traços escuros: mostra em ASCII (as 8 orientações, para achar a legível)
def ascii_art(m, colunas=80):
    escuro = m < np.percentile(m, 8)
    px = max(1, m.shape[1] // colunas)
    for y in range(0, m.shape[0], 2 * px):
        print("".join("#" if escuro[y:y + 2 * px, x:x + px].mean() > 0.35 else " " for x in range(0, m.shape[1], px)))


ascii_art(montado)
print("parte 2: leia a palavra acima (ou em dia08_montado.png); se saiu espelhada, vire a imagem")
