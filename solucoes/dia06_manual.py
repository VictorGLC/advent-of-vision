# Dia 6 na mão: Pillow + NumPy. Morfologia (dilatação/erosão) com deslocamentos de array,
# componentes conexos por busca em largura.
# uso: python dia06_manual.py dia06.png
import sys
from collections import deque

import numpy as np
from PIL import Image

img = np.array(Image.open(sys.argv[1]).convert("L")).astype(float)
h, w = img.shape


def media_local(a, r):
    """Média numa janela (2r+1)x(2r+1) com imagem integral."""
    p = np.pad(a, r + 1, mode="edge")
    s = p.cumsum(0).cumsum(1)
    k = 2 * r + 1
    tot = s[k:, k:] - s[:-k, k:] - s[k:, :-k] + s[:-k, :-k]
    return tot[:h, :w] / (k * k)


def disco(r):
    return [(dy, dx) for dy in range(-r, r + 1) for dx in range(-r, r + 1) if dy * dy + dx * dx <= r * r]


def dilatar(m, r):
    p = np.pad(m, r)
    out = np.zeros_like(m)
    for dy, dx in disco(r):
        out |= p[r + dy:r + dy + h, r + dx:r + dx + w]
    return out


def erodir(m, r):
    p = np.pad(m, r)
    out = np.ones_like(m)
    for dy, dx in disco(r):
        out &= p[r + dy:r + dy + h, r + dx:r + dx + w]
    return out


def componentes(m):
    """Matriz de rótulos (0 = fundo) e número de componentes."""
    rot = np.zeros((h, w), int)
    n = 0
    for y0, x0 in zip(*np.nonzero(m)):
        if rot[y0, x0]:
            continue
        n += 1
        rot[y0, x0] = n
        fila = deque([(y0, x0)])
        while fila:
            y, x = fila.popleft()
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < h and 0 <= nx < w and m[ny, nx] and not rot[ny, nx]:
                        rot[ny, nx] = n
                        fila.append((ny, nx))
    return rot, n


# o que é escuro em relação à vizinhança: rastros, paradas, pedras, bordas de cratera
escuro = img - media_local(img, 25) < -28

# módulo de pouso: a maior mancha clara
rot, n = componentes(img > 215)
areas = np.bincount(rot.ravel())[1:]
ys, xs = np.nonzero(rot == 1 + areas.argmax())
mx, my, raio = xs.mean(), ys.mean(), np.sqrt(len(xs) / np.pi)

# rovers: manchinhas quase brancas de uns 25 pixels
rot, n = componentes(img > 240)
rovers = []
for i in range(1, n + 1):
    ys, xs = np.nonzero(rot == i)
    if 9 <= len(xs) <= 40 and np.hypot(xs.mean() - mx, ys.mean() - my) > raio + 5:
        rovers.append((xs.mean(), ys.mean()))

# rastros: apaga a vizinhança do módulo (lá eles se encostam) e fecha as falhas de poeira
yy, xx = np.mgrid[0:h, 0:w]
dist_modulo = np.hypot(xx - mx, yy - my)
fechado = erodir(dilatar(escuro & (dist_modulo > raio + 20), 7), 7)
rot, n = componentes(fechado)
rastros = set(np.unique(rot[(dist_modulo < raio + 30) & (rot > 0)]))

# comprimento de cada rastro: maior distância andando por dentro dele, a partir do módulo
def comprimento(i):
    m = rot == i
    dist = np.full((h, w), -1)
    fila = deque()
    for y, x in zip(*np.nonzero(m & (dist_modulo < raio + 30))):
        dist[y, x] = 0
        fila.append((y, x))
    while fila:
        y, x = fila.popleft()
        for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and m[ny, nx] and dist[ny, nx] < 0:
                dist[ny, nx] = dist[y, x] + 1
                fila.append((ny, nx))
    return int(dist.max())


comp = {i: comprimento(i) for i in rastros}
maior = max(comp, key=comp.get)
print("rastros (caminho mais longo):", sorted(comp.values(), reverse=True))
ys, xs = np.nonzero(rot == maior)
rx, ry = min(rovers, key=lambda r: np.min(np.hypot(xs - r[0], ys - r[1])))
print("parte 1:", f"{int(round(rx))},{int(round(ry))}")

# parte 2: abertura com disco de raio 4 some com o rastro fino e deixa os discos das paradas
discos = dilatar(erodir(escuro, 4), 4)
rot_d, _ = componentes(discos)
paradas = set(np.unique(rot_d[(rot == maior) & discos])) - {0}
print("parte 2:", len(paradas))
