"""Dia 10: Quanto Girou?

Placa B = mesmo céu da placa A, girado de `angulo` graus (em torno do centro) e deslocado.
B também saiu com outro ganho (tudo mais brilhante) e outro fundo.
Parte 1: o ângulo do giro, em graus, com uma casa decimal (sem sinal).
Parte 2: uma estrela comum às duas placas apagou muito mais que as outras; a posição "x,y" dela na placa A.
"""
import numpy as np

from comum import finalizar, gaussiana, posicoes_separadas, rng_de


def gerar(seed, w, h, angulo, desloc, n_estrelas, ganho_b, var_xy):
    rng = rng_de(seed)
    # céu maior que as placas, em coordenadas da placa A
    m = int(0.35 * max(w, h))
    pts = posicoes_separadas(rng, n_estrelas, w + 2 * m, h + 2 * m, borda=2, dist_min=13)
    pts = [(x - m, y - m) for x, y in pts]
    # a estrela variável fica numa posição inteira, longe das outras
    vx, vy = var_xy
    pts = [p for p in pts if np.hypot(p[0] - vx, p[1] - vy) > 20]
    pts.append((float(vx), float(vy)))
    props = [(rng.uniform(90, 170), rng.uniform(2.0, 2.6)) for _ in pts]
    i_var = len(pts) - 1
    props[i_var] = (165.0, 2.3)

    a = np.deg2rad(angulo)
    R = np.array([[np.cos(a), -np.sin(a)], [np.sin(a), np.cos(a)]])
    c = np.array([w / 2, h / 2])
    em_b = [R @ (np.array(p) - c) + c + np.array(desloc) for p in pts]

    img_a = np.full((h, w), 18.0) + rng.normal(0, 4, (h, w))
    img_b = np.full((h, w), 34.0) + rng.normal(0, 4, (h, w))
    comuns = 0
    for i, (p, q, (pico, s)) in enumerate(zip(pts, em_b, props)):
        dentro_a = -10 < p[0] < w + 10 and -10 < p[1] < h + 10
        dentro_b = -10 < q[0] < w + 10 and -10 < q[1] < h + 10
        if dentro_a:
            gaussiana(img_a, p[0], p[1], pico, s)
        if dentro_b:
            fator = ganho_b / 3.2 if i == i_var else ganho_b
            gaussiana(img_b, q[0], q[1], pico * fator, s)
        comuns += dentro_a and dentro_b
    assert 8 < vx < w - 8 and 8 < vy < h - 8
    qv = em_b[i_var]
    assert 8 < qv[0] < w - 8 and 8 < qv[1] < h - 8, "estrela variável fora da placa B"
    return finalizar(img_a), finalizar(img_b), {"parte1": f"{abs(angulo):.1f}", "parte2": f"{vx},{vy}",
                                                "comuns": comuns}


def produzir(salvar_png):
    a, b, ex = gerar(seed=1010, w=320, h=240, angulo=12.5, desloc=(9, -6), n_estrelas=330,
                     ganho_b=1.3, var_xy=(188, 103))
    salvar_png(a, "exemplos/dia10_a.png")
    salvar_png(b, "exemplos/dia10_b.png")
    a, b, inp = gerar(seed=10010, w=1600, h=1200, angulo=-17.3, desloc=(46, -31), n_estrelas=2600,
                      ganho_b=1.3, var_xy=(902, 517))
    salvar_png(a, "inputs/dia10_a.png")
    salvar_png(b, "inputs/dia10_b.png")
    return {"exemplo": ex, "input": inp}
