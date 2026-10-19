# Dia 12 na mão: Pillow + NumPy. Autocorrelação da sequência de pixels: o pico (fora do
# deslocamento zero) aparece na largura original. Depois desenha a mensagem em ASCII.
# uso: python dia12_manual.py dia12.png
import sys

import numpy as np
from PIL import Image

seq = np.array(Image.open(sys.argv[1]).convert("L")).ravel().astype(float)
seq = seq - seq.mean()

# autocorrelação pela FFT (o zero-padding evita que a sequência "dê a volta")
n = len(seq)
espectro = np.fft.rfft(seq, 2 * n)
auto = np.fft.irfft(espectro * np.conj(espectro))[:n]
auto /= auto[0]
W = 20 + int(np.argmax(auto[20:min(1001, n // 2)]))  # ignora os deslocamentos minúsculos (vizinho do lado)
print("parte 1:", W)

linhas = n // W
img = (seq[:linhas * W] + 128).reshape(linhas, W)
Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).save("dia12_mensagem.png")

px = max(1, W // 100)
claro = img > img.mean() + 40
for y in range(0, linhas, 2 * px):
    print("".join("#" if claro[y:y + 2 * px, x:x + px].mean() > 0.4 else " " for x in range(0, W, px)))
print("parte 2: a palavra acima (ou em dia12_mensagem.png)")
