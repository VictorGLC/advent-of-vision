# Dia 10 na mão: Pillow + NumPy. Estrelas por busca em largura, ângulo por votação e
# ajuste fino da rotação por mínimos quadrados (SVD, o "algoritmo de Kabsch").
# uso: python dia10_manual.py dia10_a.png dia10_b.png
import sys
from collections import deque

import numpy as np
from PIL import Image


def estrelas(caminho):
    img = np.array(Image.open(caminho).convert("L")).astype(float)
    h, w = img.shape
    fundo = np.median(img)
    m = img > fundo + 25
    visto = np.zeros_like(m)
    pos, fluxo = [], []
    for y0, x0 in zip(*np.nonzero(m)):
        if visto[y0, x0]:
            continue
        visto[y0, x0] = True
        fila, pix = deque([(y0, x0)]), []
        while fila:
            y, x = fila.popleft()
            pix.append((y, x))
            for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= ny < h and 0 <= nx < w and m[ny, nx] and not visto[ny, nx]:
                    visto[ny, nx] = True
                    fila.append((ny, nx))
        if len(pix) < 5:
            continue
        ys, xs = np.array(pix).T
        # janela em volta do objeto, para pegar também a "saia" fraca da estrela
        y0_, y1_ = max(0, ys.min() - 4), min(h, ys.max() + 5)
        x0_, x1_ = max(0, xs.min() - 4), min(w, xs.max() + 5)
        rec = np.clip(img[y0_:y1_, x0_:x1_] - fundo, 0, None)
        yy, xx = np.mgrid[y0_:y1_, x0_:x1_]
        f = rec.sum()
        pos.append(((xx * rec).sum() / f, (yy * rec).sum() / f))
        fluxo.append(f)
    return np.array(pos), np.array(fluxo)


pa, fa = estrelas(sys.argv[1])
pb, fb = estrelas(sys.argv[2])


def girar(p, graus):
    a = np.deg2rad(graus)
    R = np.array([[np.cos(a), -np.sin(a)], [np.sin(a), np.cos(a)]])
    return p @ R.T


def votos(graus, a, b, passo):
    d = (a[:, None] - girar(b, graus)[None]).reshape(-1, 2)
    _, cont = np.unique(np.floor(d / passo).astype(np.int64), axis=0, return_counts=True)
    return cont.max()


ba, bb = pa[np.argsort(-fa)[:300]], pb[np.argsort(-fb)[:300]]
ang = max(np.arange(-45, 45, 0.5), key=lambda g: votos(g, ba, bb, 3))
ang = max(np.arange(ang - 0.5, ang + 0.5, 0.05), key=lambda g: votos(g, ba, bb, 2))

# translação do ângulo aproximado: a diferença mais votada
d = (ba[:, None] - girar(bb, ang)[None]).reshape(-1, 2)
chaves = np.floor(d / 2).astype(np.int64)
q, cont = np.unique(chaves, axis=0, return_counts=True)
t = d[(chaves == q[cont.argmax()]).all(axis=1)].mean(axis=0)

# casa todas as estrelas e ajusta a rotação exata: Kabsch nos pares
dist = np.linalg.norm(pa[:, None] - (girar(pb, ang) + t)[None], axis=2)
ia = np.flatnonzero(dist.min(axis=1) < 3)
ib = dist[ia].argmin(axis=1)
A, B = pa[ia] - pa[ia].mean(0), pb[ib] - pb[ib].mean(0)
U, _, Vt = np.linalg.svd(B.T @ A)
R = (U @ Vt).T
angulo = np.degrees(np.arctan2(R[1, 0], R[0, 0]))
print(f"{len(ia)} estrelas casadas, ângulo {angulo:.3f}")
print("parte 1:", f"{abs(angulo):.1f}")

razao = fb[ib] / fa[ia]
x, y = pa[ia[razao.argmin()]]
print(f"razão típica {np.median(razao):.2f}, menor {razao.min():.2f}")
print("parte 2:", f"{int(round(x))},{int(round(y))}")
