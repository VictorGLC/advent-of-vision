# Dia 2 com OpenCV
# uso: python dia02_opencv.py dia02.png
# gera lsb_<canal>.png (parte 1) e lsb_xor.png (parte 2); o código é lido a olho
import sys

import cv2

img = cv2.imread(sys.argv[1], cv2.IMREAD_COLOR)  # atenção: OpenCV carrega em BGR
planos = {nome: img[..., i] & 1 for i, nome in enumerate("BGR")}

# parte 1: o plano de bit 0 de cada canal. Ruído tem ~50% de uns; o texto, bem menos.
for nome, plano in planos.items():
    print(f"canal {nome}: {plano.mean():.1%} de uns")
canal = max(planos, key=lambda n: abs(planos[n].mean() - 0.5))
cv2.imwrite(f"lsb_{canal}.png", planos[canal] * 255)
print(f"parte 1: leia o código em lsb_{canal}.png")

# parte 2: os outros dois são ruído cada um, mas um "anula" o outro: o xor mostra o segundo código
a, b = (planos[n] for n in "BGR" if n != canal)
xor = cv2.bitwise_xor(a, b)
cv2.imwrite("lsb_xor.png", xor * 255)
print(f"xor dos outros dois: {xor.mean():.1%} de uns")
print("parte 2: leia o código em lsb_xor.png")
