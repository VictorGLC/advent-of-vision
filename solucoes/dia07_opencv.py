# Dia 7 com OpenCV
# uso: python dia07_opencv.py dia07.png 12     (12 = dígitos por etiqueta)
import sys
from collections import Counter

import cv2
import numpy as np

TABELA = {"NNWWN": 0, "WNNNW": 1, "NWNNW": 2, "WWNNN": 3, "NNWNW": 4,
          "WNWNN": 5, "NWWNN": 6, "NNNWW": 7, "WNNWN": 8, "NWNWN": 9}
INICIO, FIM = "WWN", "WNW"

img = cv2.imread(sys.argv[1], cv2.IMREAD_GRAYSCALE)
n_digitos = int(sys.argv[2])


def endireitar(img, rect):
    """Gira a imagem para a etiqueta ficar na horizontal e recorta."""
    (cx, cy), (w, h), ang = rect
    if w < h:
        w, h, ang = h, w, ang - 90
    M = cv2.getRotationMatrix2D((cx, cy), ang, 1.0)
    girada = cv2.warpAffine(img, M, img.shape[::-1], flags=cv2.INTER_LINEAR)
    return cv2.getRectSubPix(girada, (int(w) - 6, int(h) - 6), (cx, cy))


def ler_linha(perfil):
    """Larguras das barras escuras de uma linha, classificadas em N (fina), W (larga) ou X (queimado)."""
    escuro = np.r_[False, perfil < 120, False]
    # começo e fim de cada trecho escuro; o que encosta na borda do recorte não é barra
    bordas = np.flatnonzero(np.diff(escuro.astype(int)))
    inicios, fins = bordas[::2], bordas[1::2]
    larguras = [f - i for i, f in zip(inicios, fins) if i > 0 and f < len(perfil)]
    if len(larguras) < 10:
        return ""
    fina = min(l for l in larguras if l >= 2)  # a barra fina é a mais estreita (ignora respingos)
    # larga = 3x a fina; o corte fica no meio do caminho. Bem mais largo que isso é queimado.
    return "".join("N" if l < 2.5 * fina else "W" if l < 5 * fina else "X" for l in larguras)


def decodificar(simbolos):
    """Devolve a string de dígitos ('?' no dígito queimado) ou None se não fecha."""
    if simbolos[::-1].startswith(INICIO) and simbolos[::-1].endswith(FIM):
        simbolos = simbolos[::-1]  # etiqueta de cabeça para baixo
    if not (simbolos.startswith(INICIO) and simbolos.endswith(FIM)):
        return None
    meio = simbolos[len(INICIO):-len(FIM)]
    if "X" in meio:
        esq, dir_ = meio.split("X", 1)
        if len(esq) % 5 or len(dir_) % 5 or "X" in dir_:
            return None
        partes = [esq[i:i + 5] for i in range(0, len(esq), 5)] + ["?"] + \
                 [dir_[i:i + 5] for i in range(0, len(dir_), 5)]
    else:
        if len(meio) % 5:
            return None
        partes = [meio[i:i + 5] for i in range(0, len(meio), 5)]
    if any(p != "?" and p not in TABELA for p in partes):
        return None
    return "".join("?" if p == "?" else str(TABELA[p]) for p in partes)


def ler_etiqueta(recorte):
    leituras = Counter()
    for y in range(recorte.shape[0] // 4, 3 * recorte.shape[0] // 4):
        for linha in (recorte[y], recorte[y, ::-1]):
            r = decodificar(ler_linha(linha))
            if r and len(r) == n_digitos:
                leituras[r] += 1
    return leituras.most_common(1)[0][0] if leituras else None


def completar(numero):
    """Acha o dígito '?' pelo verificador: pesos 3,1,3,1,... e soma múltipla de 10."""
    i = numero.index("?")
    for d in "0123456789":
        tentativa = numero[:i] + d + numero[i + 1:]
        if sum(int(c) * (3 if k % 2 == 0 else 1) for k, c in enumerate(tentativa)) % 10 == 0:
            return tentativa


# etiquetas: as duas maiores manchas claras; de cima para baixo
n, rot, st, cent = cv2.connectedComponentsWithStats((img > 180).astype(np.uint8))
maiores = sorted(range(1, n), key=lambda i: -st[i, cv2.CC_STAT_AREA])[:2]
maiores.sort(key=lambda i: cent[i][1])
leituras = []
for i in maiores:
    pts = np.column_stack(np.nonzero(rot == i))[:, ::-1].astype(np.float32)
    leituras.append(ler_etiqueta(endireitar(img, cv2.minAreaRect(pts))))
print("lido:", leituras)
print("parte 1:", leituras[0])
print("parte 2:", completar(leituras[1]) if "?" in leituras[1] else leituras[1])
