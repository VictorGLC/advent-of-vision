# Dia 9 na mão: Pillow + NumPy (a FFT do NumPy faz todo o trabalho).
# uso: python dia09_manual.py dia09.png
import sys

import numpy as np
from PIL import Image

MORSE = {".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E", "..-.": "F", "--.": "G",
         "....": "H", "..": "I", ".---": "J", "-.-": "K", ".-..": "L", "--": "M", "-.": "N",
         "---": "O", ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T", "..-": "U",
         "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y", "--..": "Z"}

img = np.array(Image.open(sys.argv[1]).convert("L")).astype(float)
h, w = img.shape
F = np.fft.fft2(img - img.mean())
fy = np.fft.fftfreq(h)[:, None]
fx = np.fft.fftfreq(w)[None, :]
freq = np.hypot(fy, fx)  # ciclos por pixel


def borrar(a, sigma):
    """Borrão gaussiano: no domínio da frequência é só multiplicar por outra gaussiana."""
    return np.real(np.fft.ifft2(np.fft.fft2(a) * np.exp(-2 * (np.pi * sigma * freq) ** 2)))


# parte 1: o maior pico fora das frequências baixas é a listra. Zera ele e o simétrico.
mag = np.abs(F) * (freq > 0.05)
iy, ix = np.unravel_index(mag.argmax(), mag.shape)
f1 = freq[iy, ix]
print(f"listra forte: período {1 / f1:.1f} px")
d1 = np.hypot(fy - fy[iy, 0], fx - fx[0, ix])
d2 = np.hypot(fy + fy[iy, 0], fx + fx[0, ix])
notch = (d1 > 0.01) & (d2 > 0.01)
foto = np.real(np.fft.ifft2(F * notch))
foto = borrar(foto, 3)
foto = (foto - foto.min()) / (foto.max() - foto.min()) * 255
Image.fromarray(foto.astype(np.uint8)).save("dia09_limpa.png")
print("parte 1: leia o número em dia09_limpa.png")

# parte 2: acima da listra forte quase não há nada da foto. Um passa-altas acima dela
# deixa a segunda interferência; a energia local mostra onde ela liga e desliga.
mag2 = np.abs(F) * (freq > 1.5 * f1)
iy2, ix2 = np.unravel_index(mag2.argmax(), mag2.shape)
f2 = freq[iy2, ix2]
print(f"segunda interferência: período {1 / f2:.1f} px")
alta = np.real(np.fft.ifft2(F * (freq > (f1 + f2) / 2)))
energia = borrar(alta ** 2, 2)
energia[:10] = energia[-10:] = 0  # a FFT trata a imagem como periódica: as bordas viram "listra"
energia[:, :10] = energia[:, -10:] = 0
por_linha = energia.mean(axis=1)
perfil = energia[por_linha > 0.5 * por_linha.max()].mean(axis=0)
ligado = perfil > 0.5 * perfil.max()

# corta em trechos ligado/desligado e converte em pontos, traços e pausas
trechos = []
for v in ligado:
    if trechos and trechos[-1][0] == v:
        trechos[-1][1] += 1
    else:
        trechos.append([v, 1])
while not trechos[0][0]:
    trechos.pop(0)
while not trechos[-1][0]:
    trechos.pop()
unidade = min(n for _, n in trechos)
palavra, letra = "", ""
for aceso, n in trechos:
    u = round(n / unidade)
    if aceso:
        letra += "." if u == 1 else "-"
    elif u >= 3:
        palavra += MORSE[letra]
        letra = ""
palavra += MORSE[letra]
print("parte 2:", palavra)
