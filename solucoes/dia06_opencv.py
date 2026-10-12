# Dia 6 com OpenCV
# uso: python dia06_opencv.py dia06.png
import sys

import cv2
import numpy as np

img = cv2.imread(sys.argv[1], cv2.IMREAD_GRAYSCALE)
h, w = img.shape

# o chão tem manchas grandes de claro e escuro: compara cada pixel com a vizinhança
fundo = cv2.GaussianBlur(img.astype(np.float32), (0, 0), 15)
escuro = ((img - fundo) < -28).astype(np.uint8)

# módulo de pouso: a maior mancha bem clara
n, rot, st, cent = cv2.connectedComponentsWithStats((img > 215).astype(np.uint8))
modulo = 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])
mx, my = cent[modulo]
raio_modulo = np.sqrt(st[modulo, cv2.CC_STAT_AREA] / np.pi)

# rovers: quadradinhos quase brancos e pequenos
n, _, st, cent = cv2.connectedComponentsWithStats((img > 240).astype(np.uint8))
rovers = [cent[i] for i in range(1, n) if 9 <= st[i, cv2.CC_STAT_AREA] <= 40 and i]
rovers = [r for r in rovers if np.hypot(r[0] - mx, r[1] - my) > raio_modulo + 5]

# rastros: tira a região colada no módulo (senão os rastros se juntam lá) e fecha as falhas
perto_modulo = np.zeros_like(escuro)
cv2.circle(perto_modulo, (int(mx), int(my)), int(raio_modulo + 20), 1, -1)
fechado = cv2.morphologyEx(escuro * (1 - perto_modulo), cv2.MORPH_CLOSE,
                           cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (13, 13)))
n, rot, st, _ = cv2.connectedComponentsWithStats(fechado)
anel = np.zeros_like(escuro)
cv2.circle(anel, (int(mx), int(my)), int(raio_modulo + 30), 1, -1)
rastros = [i for i in range(1, n) if (anel & (rot == i)).any()]

# tamanho de cada rastro: a área escura dele (largura constante, então área ~ comprimento)
tamanhos = {i: int(escuro[rot == i].sum()) for i in rastros}
maior = max(tamanhos, key=tamanhos.get)
print("rastros (área em pixels):", sorted(tamanhos.values(), reverse=True))

ys, xs = np.nonzero(rot == maior)
def dist_ao_rastro(r):
    return np.min(np.hypot(xs - r[0], ys - r[1]))
rover = min(rovers, key=dist_ao_rastro)
print("parte 1:", f"{int(round(rover[0]))},{int(round(rover[1]))}")

# parte 2: as paradas são discos; uma abertura com um disco maior que a largura do rastro
# apaga o rastro fino e deixa só os discos (e as pedras, que não encostam no rastro)
discos = cv2.morphologyEx(escuro, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)))
n, rot_d = cv2.connectedComponents(discos)
no_rastro = set(np.unique(rot_d[(rot == maior) & (discos > 0)])) - {0}
print("parte 2:", len(no_rastro))
