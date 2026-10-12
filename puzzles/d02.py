"""Dia 2: Sussurro no Azul.

Parte 1: o texto está no bit 0 do canal azul.
Parte 2: os bits 0 de R e G parecem ruído cada um, mas R xor G (ou |R - G|) mostra um segundo texto.
"""
import numpy as np

from comum import gaussiana, mascara_texto, rng_de


def nebulosa(rng, w, h):
    """Nuvem colorida suave: soma de blobs gaussianos grandes por canal, mais estrelas."""
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float64)
    rgb = np.zeros((h, w, 3))
    cores = np.array([[0.9, 0.3, 0.6], [0.3, 0.5, 1.0], [1.0, 0.6, 0.2], [0.5, 0.2, 0.9]])
    for _ in range(14):
        cx, cy = rng.uniform(0, w), rng.uniform(0, h)
        s = rng.uniform(0.08, 0.25) * w
        a = rng.uniform(40, 110)
        blob = a * np.exp(-((xx - cx) ** 2 + (yy - cy) ** 2) / (2 * s * s))
        rgb += blob[..., None] * cores[rng.integers(len(cores))]
    rgb += 8
    for c in range(3):
        canal = np.zeros((h, w))
        for x, y in zip(rng.uniform(0, w, 500), rng.uniform(0, h, 500)):
            gaussiana(canal, x, y, rng.uniform(60, 200), rng.uniform(0.8, 1.6))
        rgb[..., c] += canal * (1.0 if c else 0.9)
    return np.clip(np.rint(rgb), 0, 255).astype(np.uint8)


def gerar(seed, w, h, codigo1, codigo2, tamanho):
    rng = rng_de(seed)
    img = nebulosa(rng, w, h)
    texto1 = mascara_texto(w, h, codigo1, tamanho).astype(np.uint8)
    texto2 = mascara_texto(w, h, codigo2, tamanho).astype(np.uint8)
    r_lsb = rng.integers(0, 2, (h, w), dtype=np.uint8)
    img[..., 0] = (img[..., 0] & 0xFE) | r_lsb
    img[..., 1] = (img[..., 1] & 0xFE) | (r_lsb ^ texto2)
    img[..., 2] = (img[..., 2] & 0xFE) | texto1
    return img, {"parte1": codigo1, "parte2": codigo2}


def produzir(salvar_png):
    img, ex = gerar(seed=202, w=360, h=120, codigo1="PIXEL42", codigo2="OK7", tamanho=48)
    salvar_png(img, "exemplos/dia02.png")
    img, inp = gerar(seed=2002, w=1600, h=900, codigo1="KX7VEGA3", codigo2="NATA1985", tamanho=170)
    salvar_png(img, "inputs/dia02.png")
    return {"exemplo": ex, "input": inp}
