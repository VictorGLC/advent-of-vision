# Dia 5 com OpenCV
# uso: python dia05_opencv.py dia05.png
import sys

import cv2
import numpy as np

img = cv2.imread(sys.argv[1], cv2.IMREAD_GRAYSCALE).astype(np.float32)
fundo = np.median(img)
suave = cv2.GaussianBlur(img, (0, 0), 1.0)

# cada estrela tem o seu ponto mais brilhante: um máximo local bem acima do fundo
maximo_vizinhanca = cv2.dilate(suave, np.ones((5, 5), np.uint8))
picos = (suave == maximo_vizinhanca) & (suave > fundo + 60)
print("parte 1:", int(picos.sum()))

# parte 2: os borrões são os componentes conexos acima do fundo; conta os picos de cada um
mascara = (suave > fundo + 40).astype("uint8")
n, rotulos = cv2.connectedComponents(mascara, connectivity=8)
picos_por_borrao = np.bincount(rotulos[picos], minlength=n)
print("parte 2:", int((picos_por_borrao[1:] >= 3).sum()))
