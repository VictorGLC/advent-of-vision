"""Dia 1: Censo Estelar.

Parte 1: objetos com 6+ pixels acima de 100 (estrelas + galáxias).
Parte 2: só as estrelas redondas (as galáxias são elipses alongadas, razão de eixos >= 2,6).
"""
import numpy as np

from comum import (fundo_vinheta, gaussiana, posicoes_separadas, raios_cosmicos, rng_de,
                   ruido, finalizar)

PICO_MIN = 190
SIGMA_ESTRELA = (2.2, 3.0)


def gerar(seed, w, h, n_estrelas, n_galaxias, n_raios):
    rng = rng_de(seed)
    pts = posicoes_separadas(rng, n_estrelas + n_galaxias, w, h, borda=16, dist_min=20)
    idx = rng.permutation(len(pts))
    estrelas = [pts[i] for i in idx[:n_estrelas]]
    galaxias = [pts[i] for i in idx[n_estrelas:]]

    img = fundo_vinheta(w, h, centro=12, borda=50) + ruido(rng, (h, w), 5, 25)
    for x, y in estrelas:
        gaussiana(img, x, y, rng.uniform(PICO_MIN, 255), rng.uniform(*SIGMA_ESTRELA))
    for x, y in galaxias:
        smin = rng.uniform(1.5, 1.9)
        razao = rng.uniform(2.8, 3.8)
        gaussiana(img, x, y, rng.uniform(170, 235), smin * razao, smin, ang=rng.uniform(0, np.pi))
    for raio in raios_cosmicos(rng, n_raios, w, h, pts, dist_evitar=14):
        for x, y in raio:
            img[y, x] = 255
    return finalizar(img), {"parte1": n_estrelas + n_galaxias, "parte2": n_estrelas}


def produzir(salvar_png):
    img, ex = gerar(seed=101, w=160, h=100, n_estrelas=8, n_galaxias=3, n_raios=6)
    salvar_png(img, "exemplos/dia01.png")
    img, inp = gerar(seed=1001, w=2400, h=1600, n_estrelas=1517, n_galaxias=356, n_raios=900)
    salvar_png(img, "inputs/dia01.png")
    return {"exemplo": ex, "input": inp}
