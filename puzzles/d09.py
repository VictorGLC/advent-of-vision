"""Dia 9: Interferência.

Foto de uma placa com um número gravado (contraste baixo), coberta por listras fortes de uma
interferência senoidal. Numa faixa de baixo, uma segunda interferência mais fraca, de outra
frequência, liga e desliga ao longo de x, em código Morse.
Parte 1: o número da placa.
Parte 2: a palavra em Morse.
"""
import numpy as np

from comum import finalizar, mascara_texto, rng_de, ruido_suave

MORSE = {
    "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.", "G": "--.", "H": "....",
    "I": "..", "J": ".---", "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---", "P": ".--.",
    "Q": "--.-", "R": ".-.", "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--", "X": "-..-",
    "Y": "-.--", "Z": "--..",
}


def envelope_morse(palavra):
    """Sequência de 0/1 em unidades: ponto 1, traço 3, entre sinais 1, entre letras 3."""
    seq = []
    for i, letra in enumerate(palavra):
        if i:
            seq += [0, 0, 0]
        for j, s in enumerate(MORSE[letra]):
            if j:
                seq.append(0)
            seq += [1] * (1 if s == "." else 3)
    return seq


def onda(w, h, periodo, angulo_graus, fase=0.0):
    yy, xx = np.mgrid[0:h, 0:w]
    a = np.deg2rad(angulo_graus)
    return np.sin(2 * np.pi * (xx * np.cos(a) + yy * np.sin(a)) / periodo + fase)


def gerar(seed, w, h, numero, tamanho, contraste, amp1, per1, ang1, palavra, amp2, per2, ang2,
          unidade, faixa):
    rng = rng_de(seed)
    img = 125 + 9 * ruido_suave(rng, w, h, ((80, 1.0), (20, 0.3)))
    texto = mascara_texto(w, faixa[0], numero, tamanho)
    img[:faixa[0]][texto] -= contraste

    img += amp1 * onda(w, h, per1, ang1, rng.uniform(0, 6))

    env = np.repeat(envelope_morse(palavra), unidade).astype(float)
    margem = (w - len(env)) // 2
    assert margem > 20, "palavra comprida demais para a largura"
    linha = np.zeros(w)
    linha[margem:margem + len(env)] = env
    banda = np.zeros((h, w))
    banda[faixa[0]:faixa[1], :] = linha[None, :]
    img += amp2 * banda * onda(w, h, per2, ang2, rng.uniform(0, 6))

    img += rng.normal(0, 3, (h, w))
    return finalizar(img), {"parte1": numero, "parte2": palavra}


def produzir(salvar_png):
    img, ex = gerar(seed=909, w=360, h=240, numero="42", tamanho=110, contraste=10, amp1=55,
                    per1=7.0, ang1=35, palavra="SOS", amp2=22, per2=3.4, ang2=-62, unidade=7,
                    faixa=(175, 225))
    salvar_png(img, "exemplos/dia09.png")
    img, inp = gerar(seed=9009, w=1400, h=900, numero="730514", tamanho=230, contraste=9, amp1=60,
                     per1=8.6, ang1=33, palavra="PIPOCA", amp2=20, per2=3.7, ang2=-58, unidade=13,
                     faixa=(640, 800))
    salvar_png(img, "inputs/dia09.png")
    return {"exemplo": ex, "input": inp}
