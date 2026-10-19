# Dia 9 com OpenCV + FFT do NumPy
# uso: python dia09_opencv.py dia09.png
import sys

import cv2
import numpy as np

MORSE = {".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E", "..-.": "F", "--.": "G",
         "....": "H", "..": "I", ".---": "J", "-.-": "K", ".-..": "L", "--": "M", "-.": "N",
         "---": "O", ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T", "..-": "U",
         "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y", "--..": "Z"}

img = cv2.imread(sys.argv[1], cv2.IMREAD_GRAYSCALE).astype(np.float32)
h, w = img.shape
F = np.fft.fftshift(np.fft.fft2(img - img.mean()))
yy, xx = np.mgrid[0:h, 0:w]
cy, cx = h // 2, w // 2
raio_freq = np.hypot((yy - cy) / h, (xx - cx) / w)  # em ciclos por pixel


def pico(espectro):
    """Posição do maior pico fora das frequências baixas (o conteúdo normal da foto)."""
    m = np.abs(espectro) * (raio_freq > 0.05)
    return np.unravel_index(np.argmax(m), m.shape)


def mascara_em(p, r=6):
    """Disco em volta do pico e do seu simétrico (toda senoide real tem os dois)."""
    py, px = p
    return (np.hypot(yy - py, xx - px) < r) | (np.hypot(yy - (2 * cy - py), xx - (2 * cx - px)) < r)


# parte 1: a listra forte é um par de picos no espectro; zera os dois (filtro notch)
p1 = pico(F)
print(f"interferência 1: período {1 / raio_freq[p1]:.1f} px")
limpo = F * ~mascara_em(p1)
foto = np.real(np.fft.ifft2(np.fft.ifftshift(limpo))) + img.mean()
# o número tem pouco contraste: um borrão e um esticão de contraste ajudam a ler
lido = cv2.GaussianBlur(foto, (0, 0), 3)
lido = cv2.normalize(lido, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)
cv2.imwrite("dia09_limpa.png", cv2.equalizeHist(lido))
print("parte 1: leia o número em dia09_limpa.png")

# parte 2: tirando a primeira, sobra outro pico, de frequência bem mais alta
p2 = pico(limpo * ~mascara_em(p1, 30))  # longe da primeira (o pico dela "vaza" para os lados)
print(f"interferência 2: período {1 / raio_freq[p2]:.1f} px")
# um passa-altas acima da primeira listra deixa só a segunda (e um pouco de ruído);
# a energia local dela mostra onde está ligada
corte = (raio_freq[p1] + raio_freq[p2]) / 2
so_ela = np.real(np.fft.ifft2(np.fft.ifftshift(F * (raio_freq > corte))))
energia = cv2.GaussianBlur(so_ela ** 2, (0, 0), 2)
energia[:10] = energia[-10:] = 0  # a FFT trata a imagem como periódica: as bordas viram "listra"
energia[:, :10] = energia[:, -10:] = 0
linhas = energia.mean(axis=1) > 0.5 * energia.mean(axis=1).max()  # a faixa onde ela aparece
perfil = energia[linhas].mean(axis=0)
ligado = perfil > 0.5 * perfil.max()

# comprimento de cada trecho ligado/desligado, em unidades (o ponto é o trecho mais curto)
trocas = np.flatnonzero(np.diff(ligado.astype(int))) + 1
trechos = [(ligado[a], b - a) for a, b in zip(np.r_[0, trocas], np.r_[trocas, len(ligado)])]
while not trechos[0][0]:  # tira as margens desligadas
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
        palavra, letra = palavra + MORSE[letra], ""
palavra += MORSE[letra]
print("parte 2:", palavra)
