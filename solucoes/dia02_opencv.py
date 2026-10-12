# Dia 2 com OpenCV
# uso: python dia02_opencv.py dia02.png   -> gera lsb_B.png, lsb_G.png, lsb_R.png
import sys

import cv2

img = cv2.imread(sys.argv[1], cv2.IMREAD_COLOR)  # atenção: OpenCV carrega em BGR

for i, canal in enumerate("BGR"):
    plano = (img[..., i] & 1) * 255  # bit menos significativo, esticado para 0/255
    cv2.imwrite(f"lsb_{canal}.png", plano)
    # plano de ruído tem ~50% de uns; o plano com texto tem bem menos
    print(f"canal {canal}: {plano.mean() / 255:.1%} de uns")

# o código é lido a olho no plano que não é ruído (o azul)
