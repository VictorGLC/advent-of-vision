"""Dia 4: Modo Rajada.

O sensor (sw x sh) tirou n fotos seguidas do mesmo campo; elas vêm lado a lado num PNG,
`colunas` por linha, da esquerda para a direita e de cima para baixo.
Parte 1: quantos pixels do sensor têm o mesmo valor em todas as fotos (travados em qualquer valor).
Parte 2: quantas estrelas aparecem quando se combinam as fotos (as fracas somem no ruído de uma foto só).
"""
import numpy as np

from comum import finalizar, gaussiana, posicoes_separadas, raios_cosmicos, rng_de


def gerar(seed, sw, sh, n_fotos, colunas, n_fortes, n_fracas, n_travados, n_raios, pico_fraca, ruido=35):
    rng = rng_de(seed)
    pts = posicoes_separadas(rng, n_fortes + n_fracas, sw, sh, borda=8, dist_min=14)
    ceu = np.zeros((sh, sw))
    for i, (x, y) in enumerate(pts):
        if i < n_fortes:
            gaussiana(ceu, x, y, rng.uniform(120, 160), rng.uniform(1.6, 2.2))
        else:
            gaussiana(ceu, x, y, rng.uniform(*pico_fraca), rng.uniform(1.6, 2.0))
    yy, xx = np.mgrid[0:sh, 0:sw]
    fundo = 45 + 10 * xx / sw

    travados = posicoes_separadas(rng, n_travados, sw, sh, borda=1, dist_min=8, ocupadas=pts)
    travados = [(int(x), int(y)) for x, y in travados]
    valores = []
    for i in range(n_travados):
        valores.append(255 if i % 3 == 0 else 0 if i % 3 == 1 else int(rng.integers(30, 221)))

    fotos = []
    for _ in range(n_fotos):
        f = fundo + ceu + rng.normal(0, ruido, (sh, sw))
        for raio in raios_cosmicos(rng, n_raios, sw, sh, [], 0):
            for x, y in raio:
                f[y, x] = 255
        f = finalizar(f)
        for (x, y), v in zip(travados, valores):
            f[y, x] = v
        fotos.append(f)
    pilha = np.stack(fotos)
    constantes = (pilha.min(axis=0) == pilha.max(axis=0)).sum()
    assert constantes == n_travados, f"{constantes} pixels constantes, esperado {n_travados}"

    linhas = int(np.ceil(n_fotos / colunas))
    folha = np.zeros((linhas * sh, colunas * sw), np.uint8)
    for i, f in enumerate(fotos):
        r, c = divmod(i, colunas)
        folha[r * sh:(r + 1) * sh, c * sw:(c + 1) * sw] = f
    return folha, {"parte1": n_travados, "parte2": n_fortes + n_fracas}


def produzir(salvar_png):
    img, ex = gerar(seed=404, sw=64, sh=40, n_fotos=6, colunas=3, n_fortes=2, n_fracas=2,
                    n_travados=3, n_raios=2, pico_fraca=(70, 80), ruido=18)
    salvar_png(img, "exemplos/dia04.png")
    img, inp = gerar(seed=4004, sw=400, sh=300, n_fotos=20, colunas=5, n_fortes=88, n_fracas=131,
                     n_travados=61, n_raios=15, pico_fraca=(44, 56))
    salvar_png(img, "inputs/dia04.png")
    return {"exemplo": ex, "input": inp}
