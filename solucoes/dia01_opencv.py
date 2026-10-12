# Dia 1 com OpenCV
# uso: python dia01_opencv.py dia01.png
import sys

import cv2

img = cv2.imread(sys.argv[1], cv2.IMREAD_GRAYSCALE)

# pixel de objeto = brilho >= 100
mascara = (img >= 100).astype("uint8")

# componentes conexos com vizinhança 8 (diagonal conta)
n, rotulos, stats, centroides = cv2.connectedComponentsWithStats(mascara, connectivity=8)

areas = stats[1:, cv2.CC_STAT_AREA]  # rótulo 0 é o fundo
estrelas = (areas >= 6).sum()
raios = (areas < 6).sum()

print(f"objetos: {n - 1}, raios cósmicos: {raios}")
print(estrelas)
