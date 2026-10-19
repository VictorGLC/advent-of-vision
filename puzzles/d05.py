"""Dia 5: Estrelas Grudadas.

Grupos de 1 a 5 estrelas tão próximas que viram um borrão só. Cada estrela continua com
o próprio pico de brilho (separação entre 2,7 e 3,3 sigmas).
Parte 1: total de estrelas.
Parte 2: quantos borrões têm 3 estrelas ou mais.
"""
import numpy as np

from comum import finalizar, gaussiana, posicoes_separadas, rng_de

TAMANHOS = [1, 2, 3, 4, 5]
PESOS = [0.34, 0.30, 0.20, 0.11, 0.05]


def montar_grupo(rng, k):
    """Posições relativas de k estrelas, cada uma a 8,5-9,5 px de alguma e >= 8,5 px de todas."""
    pts = [(0.0, 0.0)]
    while len(pts) < k:
        base = pts[rng.integers(len(pts))]
        ang = rng.uniform(0, 2 * np.pi)
        d = rng.uniform(8.5, 9.5)
        q = (base[0] + d * np.cos(ang), base[1] + d * np.sin(ang))
        if all(np.hypot(q[0] - p[0], q[1] - p[1]) >= 8.5 for p in pts) and np.hypot(*q) < 16:
            pts.append(q)
    return pts


def gerar(seed, w, h, tamanhos):
    rng = rng_de(seed)
    centros = posicoes_separadas(rng, len(tamanhos), w, h, borda=24, dist_min=52)
    img = np.full((h, w), 20.0) + rng.normal(0, 3, (h, w))
    for (cx, cy), k in zip(centros, tamanhos):
        brilho = rng.uniform(190, 240)
        for px, py in montar_grupo(rng, k):
            gaussiana(img, cx + px, cy + py, brilho * rng.uniform(0.82, 1.0), rng.uniform(2.9, 3.1))
    return finalizar(img), {"parte1": int(sum(tamanhos)), "parte2": int(sum(1 for k in tamanhos if k >= 3))}


def produzir(salvar_png):
    img, ex = gerar(seed=505, w=240, h=150, tamanhos=[1, 2, 1, 3, 2, 4])
    salvar_png(img, "exemplos/dia05.png")
    rng = rng_de(5050)
    tamanhos = list(rng.choice(TAMANHOS, size=430, p=PESOS))
    img, inp = gerar(seed=5005, w=1800, h=1200, tamanhos=tamanhos)
    salvar_png(img, "inputs/dia05.png")
    return {"exemplo": ex, "input": inp}
