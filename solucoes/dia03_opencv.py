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
#    (devolve quanto B está deslocada em relação a A)
(sx, sy), resposta_pico = cv2.phaseCorrelate(img_a.astype(np.float64), img_b.astype(np.float64))
sx, sy = int(round(sx)), int(round(sy))
print(f"deslocamento: ({sx}, {sy}), pico {resposta_pico:.2f}")

# 2. leva B para o referencial de A e fica só com a região vista pelas duas
cb = cb - (sx, sy)
x0, x1 = max(0, -sx), min(w, w - sx)
y0, y1 = max(0, -sy), min(h, h - sy)


def dentro(p):
    return p[(p[:, 0] >= x0) & (p[:, 0] < x1) & (p[:, 1] >= y0) & (p[:, 1] < y1)]


ca, cb = dentro(ca), dentro(cb)

# 3. casa por distância: sem vizinho a até 3 px na outra placa = transiente
dist = np.linalg.norm(ca[:, None] - cb[None], axis=2)
so_a = int((dist.min(axis=1) > 3).sum())
so_b = int((dist.min(axis=0) > 3).sum())
print(f"só em A: {so_a}, só em B: {so_b}")
print(so_a * so_b)
