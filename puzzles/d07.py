"""Dia 7: Etiqueta Queimada.

Duas etiquetas com código de barras "2 de 5" coladas tortas numa placa metálica.
Cada dígito = 5 barras, 2 largas (3 unidades) e 3 finas (1 unidade); espaços sempre finos.
Início = larga, larga, fina. Fim = larga, fina, larga.
Parte 1: número da etiqueta de cima (tem uma queimadura parcial, mas dá para ler por baixo).
Parte 2: número da etiqueta de baixo; um dígito está totalmente queimado e sai pelo verificador
(pesos 3,1,3,1,... da esquerda para a direita; a soma ponderada é múltipla de 10).
"""
import cv2
import numpy as np

from comum import finalizar, rng_de, ruido_suave

TABELA = {
    "0": "NNWWN", "1": "WNNNW", "2": "NWNNW", "3": "WWNNN", "4": "NNWNW",
    "5": "WNWNN", "6": "NWWNN", "7": "NNNWW", "8": "WNNWN", "9": "NWNWN",
}
INICIO, FIM = "WWN", "WNW"


def verificador_ok(numero):
    return sum(int(c) * (3 if i % 2 == 0 else 1) for i, c in enumerate(numero)) % 10 == 0


def com_verificador(prefixo):
    s = sum(int(c) * (3 if i % 2 == 0 else 1) for i, c in enumerate(prefixo))
    peso = 3 if len(prefixo) % 2 == 0 else 1
    for d in range(10):
        if (s + d * peso) % 10 == 0:
            return prefixo + str(d)


def barras(numero):
    """Lista de larguras (em unidades) das barras, na ordem; e o intervalo de barras de cada dígito."""
    seq = list(INICIO)
    faixas = []
    for c in numero:
        faixas.append((len(seq), len(seq) + 5))
        seq += list(TABELA[c])
    seq += list(FIM)
    return [3 if s == "W" else 1 for s in seq], faixas


def etiqueta(numero, u, altura_barra, rng):
    """Desenha a etiqueta (branca, barras escuras). Devolve imagem e x inicial/final de cada dígito."""
    larg, faixas = barras(numero)
    quieto = 10 * u
    w = 2 * quieto + sum(larg) * u + (len(larg) - 1) * u
    h = altura_barra + 40
    img = np.full((h, w), 222.0)
    x = quieto
    xs = []
    for k in larg:
        xs.append(x)
        img[20:20 + altura_barra, x:x + k * u] = 38
        x += k * u + u
    xs.append(x)
    dig_x = [(xs[a], xs[b] - u) for a, b in faixas]
    img += rng.normal(0, 3, img.shape)
    return img, dig_x


def queimar(img, x0, x1, y0, y1, rng, fator, cheio=False):
    """Escurece uma região irregular (mancha de queimado) dentro do retângulo dado.

    Com `cheio`, o retângulo inteiro queima e a borda irregular fica só no halo de fora.
    """
    h, w = img.shape
    yy, xx = np.mgrid[0:h, 0:w]
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    rx, ry = (x1 - x0) / 2, (y1 - y0) / 2
    ang = np.arctan2(yy - cy, xx - cx)
    borda = 1 + 0.12 * np.sin(5 * ang + rng.uniform(0, 6)) + 0.08 * np.sin(9 * ang + rng.uniform(0, 6))
    r = np.hypot((xx - cx) / rx, (yy - cy) / ry)
    no_retangulo = (xx >= x0) & (xx < x1) & (yy >= y0) & (yy < y1)
    dentro = no_retangulo if cheio else (r < borda) & no_retangulo
    halo = (r < borda * 1.35) & ~dentro
    # queimado vira carvão: valor fixo, não sobra nada das barras por baixo
    img[dentro] = 255 * fator + rng.normal(0, 4, dentro.sum())
    img[halo] *= 0.85
    return img


def colar(fundo, img, centro, angulo):
    """Cola `img` girada de `angulo` graus com o centro em `centro`."""
    h, w = img.shape
    H, W = fundo.shape
    M = cv2.getRotationMatrix2D((w / 2, h / 2), angulo, 1.0)
    M[:, 2] += (centro[0] - w / 2, centro[1] - h / 2)
    girada = cv2.warpAffine(img.astype(np.float32), M, (W, H), flags=cv2.INTER_LINEAR)
    mascara = cv2.warpAffine(np.ones_like(img, np.float32), M, (W, H), flags=cv2.INTER_LINEAR)
    return fundo * (1 - mascara) + girada * mascara


def gerar(seed, W, H, num_a, num_b, queimado, u, altura, centros, angulos, parcial):
    rng = rng_de(seed)
    assert verificador_ok(num_b)
    fundo = 100 + 8 * ruido_suave(rng, W, H, ((32, 1.0),))
    riscos = cv2.GaussianBlur(rng.normal(0, 1, (H, W)), (0, 0), sigmaX=25, sigmaY=0.6)
    fundo += 6 * riscos / riscos.std()
    fundo += np.linspace(-15, 15, W)[None, :]

    a, dig_a = etiqueta(num_a, u, altura, rng)
    # queimadura parcial na de cima: cobre só a parte de cima das barras de alguns dígitos
    i0, i1 = parcial
    a = queimar(a, dig_a[i0][0], dig_a[i1][1], 0, 20 + int(altura * 0.45), rng, 0.2)

    b, dig_b = etiqueta(num_b, u, altura, rng)
    bx0, bx1 = dig_b[queimado]
    b = queimar(b, bx0 - u // 2, bx1 + u // 2, 12, 28 + altura, rng, 0.12, cheio=True)

    img = colar(fundo, a, centros[0], angulos[0])
    img = colar(img, b, centros[1], angulos[1])
    img = cv2.GaussianBlur(img, (0, 0), 0.8) + rng.normal(0, 3, (H, W))
    return finalizar(img), {"parte1": num_a, "parte2": num_b}


def produzir(salvar_png):
    img, ex = gerar(seed=707, W=480, H=360, num_a="4207", num_b=com_verificador("815"), queimado=1,
                    u=3, altura=60, centros=[(230, 85), (250, 262)], angulos=[9, -14], parcial=(2, 2))
    salvar_png(img, "exemplos/dia07.png")
    rng = rng_de(7070)
    num_a = "".join(str(d) for d in rng.integers(0, 10, 12))
    num_b = com_verificador("".join(str(d) for d in rng.integers(0, 10, 11)))
    img, inp = gerar(seed=7007, W=1400, H=1000, num_a=num_a, num_b=num_b, queimado=7,
                     u=3, altura=150, centros=[(680, 290), (730, 700)], angulos=[13.5, -21.0],
                     parcial=(3, 6))
    salvar_png(img, "inputs/dia07.png")
    return {"exemplo": ex, "input": inp}
