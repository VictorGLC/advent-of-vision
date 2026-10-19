# Dia 10 com OpenCV
# uso: python dia10_opencv.py dia10_a.png dia10_b.png
import sys

import cv2
import numpy as np


def estrelas(caminho):
    """Centroide (ponderado pelo brilho) e fluxo (brilho somado acima do fundo) de cada estrela."""
    img = cv2.imread(caminho, cv2.IMREAD_GRAYSCALE).astype(np.float32)
    fundo = np.median(img)
    n, rot, st, _ = cv2.connectedComponentsWithStats((img > fundo + 25).astype(np.uint8))
    pos, fluxo = [], []
    for i in range(1, n):
        if st[i, cv2.CC_STAT_AREA] < 5:
            continue
        x, y, w, h, _ = st[i]
        x0, y0, x1, y1 = max(0, x - 4), max(0, y - 4), min(img.shape[1], x + w + 4), min(img.shape[0], y + h + 4)
        recorte = np.clip(img[y0:y1, x0:x1] - fundo, 0, None)
        yy, xx = np.mgrid[y0:y1, x0:x1]
        f = recorte.sum()
        pos.append(((xx * recorte).sum() / f, (yy * recorte).sum() / f))
        fluxo.append(f)
    return np.array(pos), np.array(fluxo)


pa, fa = estrelas(sys.argv[1])
pb, fb = estrelas(sys.argv[2])


def girar(p, graus):
    a = np.deg2rad(graus)
    return p @ np.array([[np.cos(a), np.sin(a)], [-np.sin(a), np.cos(a)]])


def votos(graus, a, b, passo=3):
    """Gira B e conta quantos pares (a, b) concordam na mesma translação."""
    d = (a[:, None] - girar(b, graus)[None]).reshape(-1, 2)
    d = np.floor(d / passo).astype(np.int64)
    _, cont = np.unique(d, axis=0, return_counts=True)
    return cont.max()


# 1. busca grossa do ângulo com as 300 estrelas mais brilhantes de cada placa
ba, bb = pa[np.argsort(-fa)[:300]], pb[np.argsort(-fb)[:300]]
grossa = max(np.arange(-45, 45, 0.5), key=lambda g: votos(g, ba, bb))
fina = max(np.arange(grossa - 0.5, grossa + 0.5, 0.05), key=lambda g: votos(g, ba, bb, 2))
print(f"busca: {fina:.2f} graus")

# 2. com o ângulo aproximado, casa as estrelas e ajusta rotação + translação por mínimos quadrados
d = (ba[:, None] - girar(bb, fina)[None]).reshape(-1, 2)
q, cont = np.unique(np.floor(d / 2).astype(np.int64), axis=0, return_counts=True)
t = d[(np.floor(d / 2).astype(np.int64) == q[cont.argmax()]).all(axis=1)].mean(axis=0)
pb_em_a = girar(pb, fina) + t
dist = np.linalg.norm(pa[:, None] - pb_em_a[None], axis=2)
ia = np.flatnonzero(dist.min(axis=1) < 3)
ib = dist[ia].argmin(axis=1)
M, _ = cv2.estimateAffinePartial2D(pb[ib].astype(np.float32), pa[ia].astype(np.float32))
angulo = np.degrees(np.arctan2(M[1, 0], M[0, 0]))
print(f"{len(ia)} estrelas casadas, ângulo {angulo:.3f}")
print("parte 1:", f"{abs(angulo):.1f}")

# parte 2: a placa B tem outro ganho, então compara a razão de fluxos com a razão típica.
# Estrela cortada pela borda de qualquer placa perde brilho e não vale.
h, w = cv2.imread(sys.argv[1], cv2.IMREAD_GRAYSCALE).shape
def longe_da_borda(p):
    return (p[:, 0] > 10) & (p[:, 0] < w - 10) & (p[:, 1] > 10) & (p[:, 1] < h - 10)
inteiras = longe_da_borda(pa[ia]) & longe_da_borda(pb[ib])
ia, ib = ia[inteiras], ib[inteiras]
razao = fb[ib] / fa[ia]
print(f"razão típica B/A: {np.median(razao):.2f}; a mais estranha: {razao.min():.2f}")
x, y = pa[ia[razao.argmin()]]
print("parte 2:", f"{int(round(x))},{int(round(y))}")
