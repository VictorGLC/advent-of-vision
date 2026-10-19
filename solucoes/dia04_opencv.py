# Dia 4 com OpenCV
# uso: python dia04_opencv.py dia04.png 20 5     (20 fotos, 5 por linha)
import sys

import cv2
import numpy as np

folha = cv2.imread(sys.argv[1], cv2.IMREAD_GRAYSCALE)
n, colunas = int(sys.argv[2]), int(sys.argv[3])
linhas = n // colunas
sh, sw = folha.shape[0] // linhas, folha.shape[1] // colunas
fotos = np.stack([folha[r * sh:(r + 1) * sh, c * sw:(c + 1) * sw]
                  for r in range(linhas) for c in range(colunas)])

# parte 1: pixel travado = mesmo valor em todas as fotos
travado = fotos.min(axis=0) == fotos.max(axis=0)
print("parte 1:", int(travado.sum()))

# parte 2: a mediana das fotos derruba o ruído e ignora os raios cósmicos. Os pixels travados
# da parte 1 não são estrelas: troca cada um pelo fundo antes de procurar.
# Depois é o Dia 1 de novo: limiar acima do fundo e objetos de vários pixels.
media = np.median(fotos, axis=0).astype(np.float32)
fundo = cv2.medianBlur(media.astype(np.uint8), 31).astype(np.float32)
media[travado] = fundo[travado]
suave = cv2.GaussianBlur(media - fundo, (0, 0), 1.0)
mascara = (suave > 15).astype("uint8")
n_obj, _, stats, _ = cv2.connectedComponentsWithStats(mascara, connectivity=8)
estrelas = int((stats[1:, cv2.CC_STAT_AREA] >= 5).sum())
cv2.imwrite("dia04_combinada.png", np.clip(media, 0, 255).astype(np.uint8))
print("parte 2:", estrelas)
