"""Dia 3: Algo Se Moveu.

Placas A e B: recortes do mesmo céu, B deslocada por `desloc` (dx, dy) inteiros.
Parte 1: (transientes só em A) * (transientes só em B), dentro da região comum.
Parte 2: soma das distâncias percorridas pelos asteroides. Cada asteroide anda um vetor
inteiro de comprimento inteiro (trio pitagórico), entre 30 e 65 px; os outros transientes
ficam a pelo menos `sep` px de qualquer transiente (75 no exemplo, 90 no input).
"""
import numpy as np

from comum import (fundo_vinheta, gaussiana, posicoes_separadas, raios_cosmicos, rng_de,
                   ruido, finalizar)

PICO_MIN = 190
SIGMA = (2.2, 3.0)
DIST_MIN = 14
TRIOS = [(18, 24), (21, 28), (24, 32), (27, 36), (30, 40), (33, 44), (36, 48), (39, 52),
         (20, 21), (12, 35), (9, 40), (28, 45), (16, 30), (24, 45), (15, 36), (20, 48),
         (25, 60), (33, 56), (39, 52)]


def gerar(seed, w, h, desloc, n_estrelas, so_a, so_b, n_asteroides, n_raios, sep=90):
    rng = rng_de(seed)
    dx, dy = desloc
    x_min, x_max = min(0, dx), max(w, dx + w)
    y_min, y_max = min(0, dy), max(h, dy + h)
    ox0, ox1 = max(0, dx), min(w, dx + w)
    oy0, oy1 = max(0, dy), min(h, dy + h)
    margem = 10

    def longe_das_linhas(x, y):
        return all(abs(x - lx) > margem for lx in (0, w, dx, dx + w)) and \
            all(abs(y - ly) > margem for ly in (0, h, dy, dy + h))

    def dentro_sobrep(x, y, folga=25):
        return ox0 + folga < x < ox1 - folga and oy0 + folga < y < oy1 - folga

    cw, ch = x_max - x_min, y_max - y_min
    pts = posicoes_separadas(rng, n_estrelas, cw, ch, borda=4, dist_min=DIST_MIN,
                             filtro=lambda x, y: longe_das_linhas(x + x_min, y + y_min))
    comuns = [(x + x_min, y + y_min) for x, y in pts]

    ocup = list(comuns)
    transientes = []  # todos os transientes, para manter distância entre eles

    def livre(q, dmin_ocup, dmin_trans, ignorar=()):
        if not dentro_sobrep(*q):
            return False
        o = np.asarray(ocup)
        if np.min(np.hypot(o[:, 0] - q[0], o[:, 1] - q[1])) < dmin_ocup:
            return False
        outros = [t for t in transientes if t not in ignorar]
        if outros:
            t = np.asarray(outros)
            if np.min(np.hypot(t[:, 0] - q[0], t[:, 1] - q[1])) < dmin_trans:
                return False
        return True

    def sortear(dmin_trans):
        while True:
            q = (rng.uniform(ox0, ox1), rng.uniform(oy0, oy1))
            if livre(q, DIST_MIN + 4, dmin_trans):
                return q

    ast_a, ast_b, dists = [], [], []
    while len(ast_a) < n_asteroides:
        p = sortear(sep)
        a, b = TRIOS[rng.integers(len(TRIOS))]
        if rng.random() < 0.5:
            a, b = b, a
        v = (a * rng.choice([-1, 1]), b * rng.choice([-1, 1]))
        q = (p[0] + v[0], p[1] + v[1])
        transientes.append(p)
        if not livre(q, DIST_MIN + 4, sep, ignorar=(p,)):
            transientes.pop()
            continue
        ast_a.append(p)
        ast_b.append(q)
        dists.append(int(round(np.hypot(*v))))
        ocup += [p, q]
        transientes.append(q)
    pts_a, pts_b = [], []
    for lista, n in ((pts_a, so_a), (pts_b, so_b)):
        for _ in range(n):
            q = sortear(sep)
            lista.append(q)
            ocup.append(q)
            transientes.append(q)

    props = {p: (rng.uniform(PICO_MIN, 255), rng.uniform(*SIGMA)) for p in comuns}
    props_ast = [(rng.uniform(PICO_MIN, 255), rng.uniform(*SIGMA)) for _ in ast_a]

    def render(origem, extras, ast, fundo_c, fundo_b, seed_ruido):
        ox, oy = origem
        r2 = rng_de(seed_ruido)
        img = fundo_vinheta(w, h, centro=fundo_c, borda=fundo_b) + ruido(r2, (h, w), 5, 25)
        lista = [(p[0] - ox, p[1] - oy, *props[p]) for p in comuns]
        lista += [(p[0] - ox, p[1] - oy, r2.uniform(PICO_MIN, 255), r2.uniform(*SIGMA)) for p in extras]
        lista += [(p[0] - ox, p[1] - oy, *pr) for p, pr in zip(ast, props_ast)]
        lista = [e for e in lista if -15 < e[0] < w + 15 and -15 < e[1] < h + 15]
        for x, y, pico, s in lista:
            gaussiana(img, x, y, pico, s)
        for raio in raios_cosmicos(r2, n_raios, w, h, lista, dist_evitar=10):
            for x, y in raio:
                img[y, x] = 255
        return finalizar(img)

    a = render((0, 0), pts_a, ast_a, 10, 35, seed + 1)
    b = render((dx, dy), pts_b, ast_b, 25, 55, seed + 2)
    n_a, n_b = so_a + n_asteroides, so_b + n_asteroides
    return a, b, {"parte1": n_a * n_b, "parte2": sum(dists),
                  "desloc": [-dx, -dy], "so_a": n_a, "so_b": n_b, "dists": dists}


def produzir(salvar_png):
    a, b, ex = gerar(seed=304, w=260, h=180, desloc=(23, -11), n_estrelas=24,
                     so_a=1, so_b=2, n_asteroides=1, n_raios=10, sep=75)
    salvar_png(a, "exemplos/dia03_a.png")
    salvar_png(b, "exemplos/dia03_b.png")
    a, b, inp = gerar(seed=3003, w=2000, h=1400, desloc=(137, -58), n_estrelas=1500,
                      so_a=17, so_b=23, n_asteroides=9, n_raios=700)
    salvar_png(a, "inputs/dia03_a.png")
    salvar_png(b, "inputs/dia03_b.png")
    return {"exemplo": ex, "input": inp}
