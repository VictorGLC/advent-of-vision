# Dia 11 com OpenCV
# uso: python dia11_opencv.py dia11_esq.png dia11_dir.png
import sys

import cv2
import numpy as np

F_PX, BASE_M = 800, 0.5

esq = cv2.imread(sys.argv[1], cv2.IMREAD_GRAYSCALE)
dir_ = cv2.imread(sys.argv[2], cv2.IMREAD_GRAYSCALE)

# casamento por blocos: para cada pixel da esquerda, quanto ele andou na direita
bm = cv2.StereoBM_create(numDisparities=48, blockSize=15)
disp = bm.compute(esq, dir_).astype(np.float32) / 16  # o OpenCV devolve em 1/16 de pixel
valido = disp > 0
disp = cv2.medianBlur(np.where(valido, disp, 0).astype(np.float32), 5)

chao = np.median(disp[valido])
print(f"disparidade do chão: {chao:.1f} px")

# pedra = região que andou bem mais que o chão (está mais perto)
pedras = ((disp > chao + 1.5) & valido).astype(np.uint8)
n, rot, st, _ = cv2.connectedComponentsWithStats(pedras)
grandes = [i for i in range(1, n) if st[i, cv2.CC_STAT_AREA] >= 200]
print("parte 1:", len(grandes))

d_max = max(np.median(disp[rot == i]) for i in grandes)
print(f"maior disparidade: {d_max:.2f} px")
print("parte 2:", round(F_PX * BASE_M / d_max))
