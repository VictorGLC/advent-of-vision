"""Utilidades compartilhadas pelos geradores dos dias."""
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

FONTES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "C:/Windows/Fonts/arialbd.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
]


def fonte(tamanho):
    for f in FONTES:
        if Path(f).exists():
            return ImageFont.truetype(f, tamanho)
    raise RuntimeError("nenhuma fonte encontrada; ajuste FONTES em comum.py")


def rng_de(seed):
    return np.random.default_rng(seed)


def posicoes_separadas(rng, n, w, h, borda, dist_min, ocupadas=None, filtro=None):
    """Sorteia n pontos (x, y) com distância mínima entre si e das posições já ocupadas."""
    pts = [] if ocupadas is None else [tuple(p) for p in ocupadas]
    novos = []
    tentativas = 0
    while len(novos) < n:
        tentativas += 1
        if tentativas > n * 600 + 5000:
            raise RuntimeError("não coube: reduza n ou dist_min")
        x = rng.uniform(borda, w - borda)
        y = rng.uniform(borda, h - borda)
        if filtro is not None and not filtro(x, y):
            continue
        if pts:
            p = np.asarray(pts)
            if np.min((p[:, 0] - x) ** 2 + (p[:, 1] - y) ** 2) < dist_min ** 2:
                continue
        pts.append((x, y))
        novos.append((x, y))
    return novos


def gaussiana(img, x, y, pico, sx, sy=None, ang=0.0):
    """Soma uma gaussiana (possivelmente elíptica e girada) na imagem float."""
    sy = sx if sy is None else sy
    h, w = img.shape
    r = int(np.ceil(4 * max(sx, sy)))
    x0, x1 = max(0, int(x) - r), min(w, int(x) + r + 2)
    y0, y1 = max(0, int(y) - r), min(h, int(y) + r + 2)
    if x1 <= x0 or y1 <= y0:
        return img
    yy, xx = np.mgrid[y0:y1, x0:x1]
    dx, dy = xx - x, yy - y
    c, s = np.cos(ang), np.sin(ang)
    u = c * dx + s * dy
    v = -s * dx + c * dy
    img[y0:y1, x0:x1] += pico * np.exp(-(u * u) / (2 * sx * sx) - (v * v) / (2 * sy * sy))
    return img


def fundo_vinheta(w, h, centro, borda):
    yy, xx = np.mgrid[0:h, 0:w]
    r = np.hypot((xx - w / 2) / (w / 2), (yy - h / 2) / (h / 2)) / np.sqrt(2)
    return centro + (borda - centro) * r ** 2


def ruido(rng, shape, sd, clip):
    return rng.normal(0, sd, shape).clip(-clip, clip)


def raios_cosmicos(rng, n, w, h, evitar, dist_evitar):
    """Impactos de 1 ou 2 pixels saturados, longe dos pontos em `evitar`."""
    out = []
    ev = np.asarray([(e[0], e[1]) for e in evitar]) if len(evitar) else np.zeros((0, 2))
    usados = []
    while len(out) < n:
        x, y = int(rng.integers(2, w - 3)), int(rng.integers(2, h - 3))
        if len(ev) and np.min((ev[:, 0] - x) ** 2 + (ev[:, 1] - y) ** 2) < dist_evitar ** 2:
            continue
        if usados and min(abs(x - ux) + abs(y - uy) for ux, uy in usados[-3000:]) < 6:
            continue
        usados.append((x, y))
        px = [(x, y)]
        if rng.random() < 0.5:
            dx, dy = [(1, 0), (0, 1), (1, 1), (1, -1)][rng.integers(4)]
            px.append((x + dx, y + dy))
        out.append(px)
    return out


def finalizar(img):
    return np.clip(np.rint(img), 0, 255).astype(np.uint8)


def mascara_texto(w, h, texto, tamanho, centro=None, espacamento=0):
    """Máscara booleana com o texto centralizado (ou centrado em `centro`)."""
    m = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(m)
    f = fonte(tamanho)
    caixa = d.textbbox((0, 0), texto, font=f)
    tw, th = caixa[2] - caixa[0], caixa[3] - caixa[1]
    cx, cy = centro if centro else (w / 2, h / 2)
    d.text((cx - tw / 2 - caixa[0], cy - th / 2 - caixa[1]), texto, fill=255, font=f)
    return np.asarray(m) > 127


def ruido_suave(rng, w, h, escalas=((64, 1.0), (16, 0.5), (4, 0.25))):
    """Textura de ruído em várias escalas, normalizada para média 0 e desvio 1."""
    from scipy.ndimage import zoom

    total = np.zeros((h, w))
    for passo, peso in escalas:
        gh, gw = h // passo + 2, w // passo + 2
        grade = rng.normal(0, 1, (gh, gw))
        z = zoom(grade, passo, order=3)[:h, :w]
        total += peso * z
    return (total - total.mean()) / total.std()


def salvar(arr, caminho):
    Path(caminho).parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(arr).save(caminho, optimize=True)


def ampliar(arr, fator):
    """Ampliação por vizinho mais próximo, para imagens de exemplo."""
    return np.repeat(np.repeat(arr, fator, axis=0), fator, axis=1)
