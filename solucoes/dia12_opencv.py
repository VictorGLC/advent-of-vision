# Dia 12 com OpenCV (o OpenCV só abre e salva; a ideia é comparar pixels a w de distância)
# uso: python dia12_opencv.py dia12.png
import sys

import cv2
import numpy as np

seq = cv2.imread(sys.argv[1], cv2.IMREAD_GRAYSCALE).ravel().astype(np.float32)

# Na largura certa, o pixel i e o pixel i + W ficam um em cima do outro na imagem original,
# então são parecidos. Em qualquer outra largura, são pixels sem relação nenhuma.
diferenca = {w: np.abs(seq[:-w] - seq[w:]).mean() for w in range(20, min(1001, len(seq) // 2))}
W = min(diferenca, key=diferenca.get)
print("parte 1:", W)

linhas = len(seq) // W
cv2.imwrite("dia12_mensagem.png", seq[:linhas * W].reshape(linhas, W).astype(np.uint8))
print("parte 2: leia a mensagem em dia12_mensagem.png")
