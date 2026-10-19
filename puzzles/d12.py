"""Dia 12: Mensagem Final.

Uma imagem de largura `W` foi achatada numa sequência de pixels e salva de novo com a largura
errada (`largura_arquivo`); o fim da última linha foi completado com zeros.
Parte 1: a largura original.
Parte 2: a palavra da mensagem.
"""
import cv2
import numpy as np

from comum import finalizar, fonte, rng_de
from PIL import Image, ImageDraw


def desenho(W, H, palavra, tamanho, extras):
    img = Image.new("L", (W, H), 20)
    d = ImageDraw.Draw(img)
    f = fonte(tamanho)
    caixa = d.textbbox((0, 0), palavra, font=f)
    tw, th = caixa[2] - caixa[0], caixa[3] - caixa[1]
    d.text(((W - tw) / 2 - caixa[0], (H - th) / 2 - caixa[1] + (H * 0.08 if extras else 0)),
           palavra, fill=230, font=f)
    if extras:
        d.rectangle([3, 3, W - 4, H - 4], outline=230, width=3)
        # a sonda: corpo, antena e painéis
        cx, cy = 60, 48
        d.ellipse([cx - 14, cy - 14, cx + 14, cy + 14], outline=230, width=3)
        d.line([cx, cy - 14, cx, cy - 30], fill=230, width=3)
        d.rectangle([cx - 46, cy - 5, cx - 18, cy + 5], fill=230)
        d.rectangle([cx + 18, cy - 5, cx + 46, cy + 5], fill=230)
        f2 = fonte(28)
        d.text((W - 110, 26), "1985", fill=230, font=f2)
    return np.asarray(img, float)


def gerar(seed, W, H, palavra, tamanho, largura_arquivo, extras):
    rng = rng_de(seed)
    img = desenho(W, H, palavra, tamanho, extras) + rng.normal(0, 12, (H, W))
    seq = finalizar(img).ravel()
    linhas = int(np.ceil(seq.size / largura_arquivo))
    saida = np.zeros(linhas * largura_arquivo, np.uint8)
    saida[:seq.size] = seq
    return saida.reshape(linhas, largura_arquivo), {"parte1": W, "parte2": palavra}


def produzir(salvar_png):
    img, ex = gerar(seed=1212, W=37, H=17, palavra="42", tamanho=15, largura_arquivo=50, extras=False)
    salvar_png(img, "exemplos/dia12.png")
    img, inp = gerar(seed=12012, W=613, H=233, palavra="SAUDADE", tamanho=118, largura_arquivo=1000,
                     extras=True)
    salvar_png(img, "inputs/dia12.png")
    return {"exemplo": ex, "input": inp}
