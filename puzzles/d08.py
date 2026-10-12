"""Dia 8: Panorama Embaralhado.

Um panorama foi cortado em n x n ladrilhos de t x t pixels. Ladrilhos vizinhos compartilham a linha
(ou coluna) da borda, então a borda de um é idêntica à do vizinho. Cada ladrilho foi girado e/ou
espelhado ao acaso e todos foram embaralhados numa folha, separados por faixas pretas.
Os ladrilhos são numerados de 1 a n*n na folha, da esquerda para a direita e de cima para baixo.
Parte 1: produto dos números dos quatro ladrilhos de canto.
Parte 2: a palavra escrita no chão do panorama montado.
"""
import cv2
import numpy as np

from comum import finalizar, mascara_texto, rng_de, ruido_suave

FAIXA = 6


def transformar(tile, k, espelhar):
    t = np.rot90(tile, k)
    return np.fliplr(t) if espelhar else t


def bordas(tile):
    return [tile[0, :], tile[-1, :], tile[:, 0], tile[:, -1]]


def panorama(rng, lado, palavra, tamanho_fonte):
    img = 128 + 22 * ruido_suave(rng, lado, lado, ((48, 1.0), (12, 0.4)))
    # crateras e pedras
    for _ in range(lado // 12):
        x, y, r = rng.integers(0, lado), rng.integers(0, lado), int(rng.integers(4, 18))
        m = np.zeros((lado, lado), np.uint8)
        cv2.circle(m, (int(x), int(y)), r, 1, 2)
        img[m > 0] -= 30
    texto = mascara_texto(lado, lado, palavra, tamanho_fonte)
    texto = cv2.dilate(texto.astype(np.uint8), np.ones((3, 3), np.uint8)) > 0
    img[texto] -= 55
    img += rng.normal(0, 7, img.shape)  # textura fina: deixa as bordas únicas
    return finalizar(img)


def gerar(seed, n, t, palavra, tamanho_fonte):
    rng = rng_de(seed)
    lado = n * (t - 1) + 1
    pano = panorama(rng, lado, palavra, tamanho_fonte)
    tiles = []
    for r in range(n):
        for c in range(n):
            tiles.append(pano[r * (t - 1):r * (t - 1) + t, c * (t - 1):c * (t - 1) + t])
    ordem = rng.permutation(n * n)
    folha = np.zeros((n * t + (n + 1) * FAIXA, n * t + (n + 1) * FAIXA), np.uint8)
    pos_original = {}
    finais = []
    for i, k in enumerate(ordem):
        tile = transformar(tiles[k], int(rng.integers(4)), bool(rng.integers(2)))
        finais.append(tile)
        r, c = divmod(i, n)
        y, x = FAIXA + r * (t + FAIXA), FAIXA + c * (t + FAIXA)
        folha[y:y + t, x:x + t] = tile
        pos_original[i + 1] = divmod(int(k), n)

    # confere que só vizinhos de verdade têm bordas iguais (contando a borda invertida)
    chaves = {}
    for i, tile in enumerate(finais):
        for b in bordas(tile):
            for v in (b.tobytes(), b[::-1].tobytes()):
                chaves.setdefault(v, set()).add(i)
    pares = {frozenset(s) for s in chaves.values() if len(s) == 2}
    assert all(len(s) <= 2 for s in chaves.values()), "borda repetida em 3+ ladrilhos"
    esperado = 2 * n * (n - 1)
    assert len(pares) == esperado, f"{len(pares)} pares de bordas, esperado {esperado}"

    cantos = [i for i, (r, c) in pos_original.items() if r in (0, n - 1) and c in (0, n - 1)]
    produto = int(np.prod(cantos, dtype=np.int64))
    return folha, pano, {"parte1": produto, "parte2": palavra, "cantos": sorted(cantos)}


def produzir(salvar_png):
    folha, pano, ex = gerar(seed=808, n=3, t=24, palavra="OI", tamanho_fonte=40)
    salvar_png(folha, "exemplos/dia08.png")
    salvar_png(pano, "exemplos/dia08_montado.png")
    folha, _, inp = gerar(seed=8008, n=8, t=64, palavra="CAFE", tamanho_fonte=150)
    salvar_png(folha, "inputs/dia08.png")
    return {"exemplo": ex, "input": inp}
