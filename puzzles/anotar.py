"""Gera versões anotadas das imagens de exemplo, usadas nos exemplos trabalhados dos enunciados.

Uso: python anotar.py      (depois de gerar.py)
Escreve public/exemplos/*_marcado.png.
"""
import json
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw

from comum import fonte

AQUI = Path(__file__).resolve().parent
EX = AQUI.parent / "public" / "exemplos"
GAB = json.loads((AQUI / "gabarito.json").read_text(encoding="utf-8"))

VERDE, VERMELHO, AZUL, AMARELO, CINZA = (80, 220, 120), (255, 90, 80), (110, 160, 255), (255, 230, 90), (150, 150, 150)


def ampliada(img, fator):
    rgb = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB) if img.ndim == 2 else img
    big = cv2.resize(rgb, None, fx=fator, fy=fator, interpolation=cv2.INTER_NEAREST)
    return Image.fromarray(big)


def objetos(img, limiar=100):
    n, rot, st, cent = cv2.connectedComponentsWithStats((img >= limiar).astype("uint8"), connectivity=8)
    out = []
    for i in range(1, n):
        x, y, w, h, a = st[i]
        m = cv2.moments((rot[y:y + h, x:x + w] == i).astype("uint8"), True)
        cov = np.array([[m["mu20"], m["mu11"]], [m["mu11"], m["mu02"]]]) / m["m00"]
        l = np.linalg.eigvalsh(cov)
        out.append((cent[i], a, np.sqrt(l[1] / max(l[0], 1e-9)) if a > 2 else 0))
    return out


def circulo(d, c, r, cor, f, largura=2):
    x, y = (c[0] + 0.5) * f, (c[1] + 0.5) * f
    d.ellipse([x - r, y - r, x + r, y + r], outline=cor, width=largura)


def dia01():
    img = cv2.imread(str(EX / "dia01.png"), 0)
    f = 3
    for parte in (1, 2):
        im = ampliada(img, f)
        d = ImageDraw.Draw(im)
        for c, a, razao in objetos(img):
            if a < 6:
                circulo(d, c, 9, VERMELHO, f)
            elif parte == 2 and razao > 2:
                circulo(d, c, 30, AZUL, f)
            else:
                circulo(d, c, 16, VERDE, f)
        im.save(EX / f"dia01_marcado{parte}.png")


def dia03():
    a = cv2.imread(str(EX / "dia03_a.png"), 0)
    b = cv2.imread(str(EX / "dia03_b.png"), 0)
    sx, sy = -23, 11  # B = A + (sx, sy)
    h, w = a.shape
    oa = np.array([c for c, ar, _ in objetos(a) if ar >= 6])
    ob = np.array([c for c, ar, _ in objetos(b) if ar >= 6])
    ob_em_a = ob - (sx, sy)
    x0, x1 = max(0, -sx), min(w, w - sx)
    y0, y1 = max(0, -sy), min(h, h - sy)
    f = 2

    def marcar(img, proprios, outros_em_proprio, desloc):
        im = ampliada(img, f)
        d = ImageDraw.Draw(im)
        rx0, ry0 = x0 + desloc[0], y0 + desloc[1]
        d.rectangle([rx0 * f, ry0 * f, (rx0 + x1 - x0) * f - 1, (ry0 + y1 - y0) * f - 1], outline=AZUL, width=2)
        for p in proprios:
            pa = p - desloc
            dentro = x0 <= pa[0] < x1 and y0 <= pa[1] < y1
            if not dentro:
                circulo(d, p, 12, CINZA, f)
            elif np.min(np.linalg.norm(outros_em_proprio - p, axis=1)) > 3:
                circulo(d, p, 14, VERMELHO, f, 3)
        return im

    marcar(a, oa, ob_em_a, (0, 0)).save(EX / "dia03_a_marcado.png")
    marcar(b, ob, oa + (sx, sy), (sx, sy)).save(EX / "dia03_b_marcado.png")


def dia05():
    img = cv2.imread(str(EX / "dia05.png"), 0).astype(np.float32)
    s = cv2.GaussianBlur(img, (0, 0), 1)
    n, rot, st, cent = cv2.connectedComponentsWithStats((s > np.median(img) + 40).astype("uint8"))
    f = 2
    im = ampliada(img.astype(np.uint8), f)
    d = ImageDraw.Draw(im)
    fo = fonte(22)
    ordem = sorted(range(1, n), key=lambda i: (cent[i][1] // 40, cent[i][0]))
    for letra, i in zip("ABCDEF", ordem):
        x, y = cent[i]
        d.text(((x + 14) * f, (y - 16) * f), letra, fill=AMARELO, font=fo)
    im.save(EX / "dia05_marcado.png")
    return {letra: tuple(int(v) for v in cent[i]) for letra, i in zip("ABCDEF", ordem)}


def dia06():
    img = cv2.imread(str(EX / "dia06.png"), 0)
    rovers = GAB["dia06"]["exemplo"]["rovers"]
    f = 2
    im = ampliada(img, f)
    d = ImageDraw.Draw(im)
    fo = fonte(20)
    for k, (x, y) in enumerate(rovers, 1):
        d.text(((x + 5) * f, (y - 14) * f), str(k), fill=AMARELO, font=fo)
    im.save(EX / "dia06_marcado.png")


def dia08():
    folha = cv2.imread(str(EX / "dia08.png"), 0)
    f = 4
    im = ampliada(folha, f)
    d = ImageDraw.Draw(im)
    fo = fonte(18)
    for i in range(9):
        r, c = divmod(i, 3)
        x, y = 6 + c * 30, 6 + r * 30
        d.rectangle([x * f + 2, y * f + 2, x * f + 26, y * f + 24], fill=(15, 15, 35))
        d.text((x * f + 6, y * f + 2), str(i + 1), fill=AMARELO, font=fo)
    im.save(EX / "dia08_marcado.png")


if __name__ == "__main__":
    dia01()
    dia03()
    print("borrões do dia 5:", dia05())
    dia06()
    dia08()
