# Dia 7 na mão: Pillow + NumPy. Acha cada etiqueta, mede a inclinação pela direção principal
# dos pixels claros (PCA), endireita com o Pillow e lê as barras numa linha horizontal.
# uso: python dia07_manual.py dia07.png 12     (12 = dígitos por etiqueta)
import sys
from collections import Counter, deque

import numpy as np
from PIL import Image

TABELA = {"NNWWN": 0, "WNNNW": 1, "NWNNW": 2, "WWNNN": 3, "NNWNW": 4,
          "WNWNN": 5, "NWWNN": 6, "NNNWW": 7, "WNNWN": 8, "NWNWN": 9}
INICIO, FIM = "WWN", "WNW"

foto = Image.open(sys.argv[1]).convert("L")
img = np.array(foto)
n_digitos = int(sys.argv[2])


def etiquetas(img):
    """As duas maiores regiões claras (etiquetas), de cima para baixo, como listas de (x, y)."""
    claro = img > 180
    h, w = claro.shape
    visto = np.zeros_like(claro)
    regioes = []
    for y0, x0 in zip(*np.nonzero(claro[::4, ::4])):  # semente a cada 4 px basta
        y0, x0 = y0 * 4, x0 * 4
        if visto[y0, x0]:
            continue
        visto[y0, x0] = True
        fila, pts = deque([(y0, x0)]), []
        while fila:
            y, x = fila.popleft()
            pts.append((x, y))
            for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= ny < h and 0 <= nx < w and claro[ny, nx] and not visto[ny, nx]:
                    visto[ny, nx] = True
                    fila.append((ny, nx))
        regioes.append(np.array(pts, float))
    regioes = sorted(regioes, key=len)[-2:]
    return sorted(regioes, key=lambda p: p[:, 1].mean())


def endireitar(pts):
    """Recorte da etiqueta girada para a horizontal."""
    centro = pts.mean(axis=0)
    cov = np.cov((pts - centro).T)
    autoval, autovet = np.linalg.eigh(cov)
    vx, vy = autovet[:, 1]  # direção do eixo maior
    angulo = np.degrees(np.arctan2(vy, vx))
    eixo_maior = np.array([vx, vy])
    eixo_menor = np.array([-vy, vx])
    comp = np.ptp((pts - centro) @ eixo_maior)
    larg = np.ptp((pts - centro) @ eixo_menor)
    girada = foto.rotate(angulo, resample=Image.BILINEAR, center=tuple(centro))
    cx, cy = centro
    caixa = (int(cx - comp / 2 + 3), int(cy - larg / 2 + 3), int(cx + comp / 2 - 3), int(cy + larg / 2 - 3))
    return np.array(girada.crop(caixa))


def simbolos(perfil):
    """Barras escuras de uma linha: N (fina), W (larga) ou X (queimado)."""
    escuro = np.r_[False, perfil < 120, False]
    # começo e fim de cada trecho escuro; o que encosta na borda do recorte não é barra
    bordas = np.flatnonzero(np.diff(escuro.astype(int)))
    inicios, fins = bordas[::2], bordas[1::2]
    larguras = [f - i for i, f in zip(inicios, fins) if i > 0 and f < len(perfil)]
    if len(larguras) < 10:
        return ""
    fina = min(l for l in larguras if l >= 2)
    return "".join("N" if l < 2.5 * fina else "W" if l < 5 * fina else "X" for l in larguras)


def decodificar(s):
    if s[::-1].startswith(INICIO) and s[::-1].endswith(FIM):
        s = s[::-1]
    if not (s.startswith(INICIO) and s.endswith(FIM)):
        return None
    meio = s[len(INICIO):-len(FIM)]
    blocos = meio.split("X")
    if len(blocos) > 2 or any(len(b) % 5 for b in blocos):
        return None
    digitos = []
    for k, bloco in enumerate(blocos):
        if k:
            digitos.append("?")
        for i in range(0, len(bloco), 5):
            if bloco[i:i + 5] not in TABELA:
                return None
            digitos.append(str(TABELA[bloco[i:i + 5]]))
    return "".join(digitos)


def ler(recorte):
    votos = Counter()
    for y in range(recorte.shape[0] // 4, 3 * recorte.shape[0] // 4):
        r = decodificar(simbolos(recorte[y]))
        if r and len(r) == n_digitos:
            votos[r] += 1
    return votos.most_common(1)[0][0] if votos else None


def completar(numero):
    """Dígito '?' pelo verificador: pesos 3,1,3,1,... e soma múltipla de 10."""
    for d in "0123456789":
        t = numero.replace("?", d)
        if sum(int(c) * (3 if k % 2 == 0 else 1) for k, c in enumerate(t)) % 10 == 0:
            return t


lidas = [ler(endireitar(p)) for p in etiquetas(img)]
print("lido:", lidas)
print("parte 1:", lidas[0])
print("parte 2:", completar(lidas[1]))
