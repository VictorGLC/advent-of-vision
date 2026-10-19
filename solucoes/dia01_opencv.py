# Dia 1 com OpenCV
# uso: python dia01_opencv.py dia01.png
import sys

import cv2
import numpy as np

img = cv2.imread(sys.argv[1], cv2.IMREAD_GRAYSCALE)

# parte 1: pixel de objeto = brilho >= 100; objeto de verdade = 6 pixels ou mais
mascara = (img >= 100).astype("uint8")
n, rotulos, stats, _ = cv2.connectedComponentsWithStats(mascara, connectivity=8)
grandes = [i for i in range(1, n) if stats[i, cv2.CC_STAT_AREA] >= 6]
print("parte 1:", len(grandes))

# parte 2: galáxia é alongada. Pelos momentos de segunda ordem de cada objeto,
# a razão entre o eixo maior e o menor de uma estrela fica perto de 1.
estrelas = 0
for i in grandes:
    x, y, w, h, _ = stats[i]
    recorte = (rotulos[y:y + h, x:x + w] == i).astype("uint8")
    m = cv2.moments(recorte, binaryImage=True)
    cov = np.array([[m["mu20"], m["mu11"]], [m["mu11"], m["mu02"]]]) / m["m00"]
    l1, l2 = np.linalg.eigvalsh(cov)[::-1]
    razao = np.sqrt(l1 / max(l2, 1e-9))
    estrelas += razao < 1.8
print("parte 2:", estrelas)
