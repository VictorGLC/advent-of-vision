# Dia 2 com OpenCV
# uso: python dia02_opencv.py dia02.png
# gera lsb_B.png, lsb_G.png, lsb_R.png (parte 1) e lsb_RxG.png (parte 2); o código é lido a olho
import sys

import cv2

img = cv2.imread(sys.argv[1], cv2.IMREAD_COLOR)  # atenção: OpenCV carrega em BGR
b, g, r = (img[..., i] & 1 for i in range(3))

# parte 1: o plano de bit 0 de cada canal. Ruído tem ~50% de uns; o texto, bem menos.
for nome, plano in zip("BGR", (b, g, r)):
    cv2.imwrite(f"lsb_{nome}.png", plano * 255)
    print(f"canal {nome}: {plano.mean():.1%} de uns")
print("parte 1: leia o código em lsb_B.png")

# parte 2: R e G sozinhos são ruído, mas um "anula" o outro: R xor G mostra o segundo código
rxg = cv2.bitwise_xor(r, g)
cv2.imwrite("lsb_RxG.png", rxg * 255)
print(f"R xor G: {rxg.mean():.1%} de uns")
print("parte 2: leia o código em lsb_RxG.png")
