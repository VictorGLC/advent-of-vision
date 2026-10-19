"""Dia 11: Profundidade.

Par estéreo retificado de um chão coberto de pontinhos aleatórios: cada imagem sozinha parece ruído.
Um ponto do chão aparece `d0` px mais à direita na imagem esquerda do que na direita; as pedras,
mais perto, têm disparidade maior. Z = f * B / d, com f = 800 px e B = 0,5 m.
Parte 1: quantas pedras há.
Parte 2: a distância (m) da pedra mais próxima.
"""
import numpy as np
from scipy.ndimage import gaussian_filter

from comum import finalizar, posicoes_separadas, rng_de

F_PX, BASE_M = 800, 0.5


def gerar(seed, w, h, d0, pedras):
    """pedras: lista de disparidades, uma por pedra."""
    rng = rng_de(seed)
    pad = max(pedras) + 10
    textura = gaussian_filter(rng.uniform(0, 1, (h, w + pad)), 0.7)
    textura = 40 + 180 * (textura - textura.min()) / (textura.max() - textura.min())

    raios = rng.uniform(18, 42, len(pedras))
    centros = posicoes_separadas(rng, len(pedras), w, h, borda=60, dist_min=2 * 42 + 25)
    disp = np.full((h, w), d0, int)
    yy, xx = np.mgrid[0:h, 0:w]
    for (cx, cy), r, d in zip(centros, raios, pedras):
        disp[np.hypot(xx - cx, yy - cy) < r] = d

    esquerda = textura[:, :w]
    direita = textura[yy, xx + disp]
    esquerda = esquerda + rng.normal(0, 5, (h, w))
    direita = direita + rng.normal(0, 5, (h, w))
    d_max = max(pedras)
    z = F_PX * BASE_M / d_max
    assert z == int(z), "escolha a disparidade máxima para dar distância inteira"
    return finalizar(esquerda), finalizar(direita), {"parte1": len(pedras), "parte2": int(z)}


def produzir(salvar_png):
    e, d, ex = gerar(seed=1111, w=300, h=200, d0=8, pedras=[13, 20])
    salvar_png(e, "exemplos/dia11_esq.png")
    salvar_png(d, "exemplos/dia11_dir.png")
    rng = rng_de(11110)
    pedras = list(rng.integers(11, 20, 16)) + [25]
    rng.shuffle(pedras)
    e, d, inp = gerar(seed=11011, w=1200, h=800, d0=8, pedras=[int(p) for p in pedras])
    salvar_png(e, "inputs/dia11_esq.png")
    salvar_png(d, "inputs/dia11_dir.png")
    return {"exemplo": ex, "input": inp}
