# Dia 3 com OpenCV
# uso: python dia03_opencv.py dia03_a.png dia03_b.png
import sys

import cv2
import numpy as np


def centros(caminho):
    img = cv2.imread(caminho, cv2.IMREAD_GRAYSCALE)
    mascara = (img >= 100).astype("uint8")
    _, _, stats, cent = cv2.connectedComponentsWithStats(mascara, connectivity=8)
    return cent[1:][stats[1:, cv2.CC_STAT_AREA] >= 6], img


ca, img_a = centros(sys.argv[1])
cb, img_b = centros(sys.argv[2])
h, w = img_a.shape

# 1. deslocamento por correlação de fase nas imagens inteiras
(sx, sy), pico = cv2.phaseCorrelate(img_a.astype(np.float64), img_b.astype(np.float64))
sx, sy = int(round(sx)), int(round(sy))
print(f"deslocamento: ({sx}, {sy}), pico {pico:.2f}")

# 2. leva B para o referencial de A e fica só com a região vista pelas duas
cb = cb - (sx, sy)
x0, x1 = max(0, -sx), min(w, w - sx)
y0, y1 = max(0, -sy), min(h, h - sy)


def dentro(p):
    return p[(p[:, 0] >= x0) & (p[:, 0] < x1) & (p[:, 1] >= y0) & (p[:, 1] < y1)]


ca, cb = dentro(ca), dentro(cb)

# 3. sem vizinho a até 3 px na outra placa = transiente
dist = np.linalg.norm(ca[:, None] - cb[None], axis=2)
so_a = ca[dist.min(axis=1) > 3]
so_b = cb[dist.min(axis=0) > 3]
print(f"só em A: {len(so_a)}, só em B: {len(so_b)}")
print("parte 1:", len(so_a) * len(so_b))

# parte 2: asteroide = transiente de A com um transiente de B por perto (andou pouco)
d = np.linalg.norm(so_a[:, None] - so_b[None], axis=2)
perto = d.min(axis=1) < 70
andou = d.min(axis=1)[perto]
print(f"{perto.sum()} asteroides, distâncias: {np.round(andou, 2).tolist()}")
print("parte 2:", int(np.rint(andou).sum()))
