"""Dia 6: Rastros em Jabuticaba.

O módulo de pouso (disco claro) soltou rovers (quadradinhos claros 5x5). Cada um deixou um rastro
escuro do módulo até onde parou, com falhas onde a poeira cobriu. Nas paradas para foto o rover
girou no lugar e deixou um disco escuro sobre o rastro. Rastros não se cruzam.
Parte 1: posição "x,y" do rover que percorreu o rastro mais longo.
Parte 2: quantas paradas esse rover fez.
"""
import cv2
import numpy as np

from comum import finalizar, posicoes_separadas, rng_de, ruido_suave

ESCURO_RASTRO = 65


def mapa_folga(proibido, margem):
    """Distância de cada pixel até o obstáculo ou a margem mais próxima."""
    h, w = proibido.shape
    livre = np.ones((h, w), np.uint8)
    livre[proibido > 0] = 0
    livre[:margem, :] = livre[-margem:, :] = 0
    livre[:, :margem] = livre[:, -margem:] = 0
    return cv2.distanceTransform(livre, cv2.DIST_L2, 5)


def caminhar(rng, inicio, rumo, comprimento, proibido, dist, margem, reta=45):
    """Passeio suave de passo 1 px que desvia de obstáculos olhando à frente.

    Os primeiros `reta` passos saem em linha reta do módulo. Devolve os pontos ou None.
    """
    h, w = proibido.shape
    proprio = np.zeros((h, w), np.uint8)  # o próprio rastro, marcado com atraso

    def folga(p, ang, alcance=30):
        q = p + alcance * np.array([np.cos(ang), np.sin(ang)])
        qx, qy = int(round(q[0])), int(round(q[1]))
        if not (0 <= qx < w and 0 <= qy < h):
            return 0.0
        return dist[qy, qx]

    pts = [np.array(inicio, float)]
    giro = 0.0
    for i in range(comprimento):
        p0 = pts[-1]
        if i >= reta:
            giro = np.clip(giro + rng.normal(0, 0.012), -0.04, 0.04)
            if folga(p0, rumo) < 40:  # parede chegando: vira para o lado mais aberto
                esq, dir_ = folga(p0, rumo - 0.6), folga(p0, rumo + 0.6)
                giro = np.clip(giro + (0.02 if dir_ > esq else -0.02), -0.06, 0.06)
            rumo += giro
        p = p0 + (np.cos(rumo), np.sin(rumo))
        x, y = int(round(p[0])), int(round(p[1]))
        if not (margem <= x < w - margem and margem <= y < h - margem):
            return None
        if i >= reta and proibido[y, x]:
            return None
        # não pode voltar perto de si mesmo
        if proprio[y, x]:
            return None
        if len(pts) > 35:
            vx, vy = np.rint(pts[-35]).astype(int)
            cv2.circle(proprio, (int(vx), int(vy)), 22, 1, -1)
        pts.append(p)
    return pts


def gerar(seed, w, h, comprimentos, paradas, n_crateras, n_pedras, raio_modulo=12, margem=40):
    rng = rng_de(seed)
    chao = 135 + 12 * ruido_suave(rng, w, h) + rng.normal(0, 4, (h, w))
    cx, cy = w // 2, h // 2
    proibido = np.zeros((h, w), np.uint8)
    cv2.circle(proibido, (cx, cy), raio_modulo + 6, 1, -1)

    n = len(comprimentos)
    angulos = np.linspace(0, 2 * np.pi, n, endpoint=False) + rng.uniform(0, 2 * np.pi)
    trilhas = [None] * n
    # o mais longo primeiro, enquanto ainda tem espaço
    for k in np.argsort(comprimentos)[::-1]:
        ang, comp = angulos[k], comprimentos[k]
        inicio = (cx + (raio_modulo + 3) * np.cos(ang), cy + (raio_modulo + 3) * np.sin(ang))
        dist = mapa_folga(proibido, margem)
        for _ in range(3000):
            pts = caminhar(rng, inicio, ang, comp, proibido, dist, margem)
            if pts is not None:
                break
        else:
            raise RuntimeError("não achei caminho para um rastro")
        trilhas[k] = pts
        faixa = np.zeros_like(proibido)
        cv2.polylines(faixa, [np.rint(np.asarray(pts)).astype(np.int32)], False, 1, 1)
        proibido |= cv2.dilate(faixa, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (61, 61)))
        # perto do módulo os rastros vizinhos precisam poder sair
        cv2.circle(proibido, (cx, cy), raio_modulo + 6, 1, -1)

    rastro = np.zeros((h, w), np.uint8)
    rovers, discos_por_trilha = [], []
    for pts, n_paradas in zip(trilhas, paradas):
        pts = np.asarray(pts)
        L = len(pts)
        # paradas espaçadas ao longo do rastro, longe das pontas
        base = np.linspace(25, L - 25, n_paradas + 2)[1:-1] if n_paradas else []
        passo = (L - 50) / (n_paradas + 1)
        idx_paradas = [int(b + rng.uniform(-passo / 5, passo / 5)) for b in base]
        assert n_paradas == 0 or passo >= 30, "rastro curto demais para tantas paradas"
        # falhas (poeira), longe das paradas e das pontas
        falhas = []
        for _ in range(int(rng.integers(2, 4))):
            for _ in range(200):
                i = int(rng.integers(30, L - 30))
                if all(abs(i - j) > 25 for j in idx_paradas) and all(abs(i - j) > 30 for j, _ in falhas):
                    falhas.append((i, int(rng.integers(4, 8))))
                    break
        visivel = np.ones(L, bool)
        for i, tam in falhas:
            visivel[i:i + tam] = False
        for i in range(L - 1):
            if visivel[i] and visivel[i + 1]:
                a = tuple(np.rint(pts[i] * 4).astype(int))
                b = tuple(np.rint(pts[i + 1] * 4).astype(int))
                cv2.line(rastro, a, b, 1, 3, cv2.LINE_8, shift=2)
        for i in idx_paradas:
            c = tuple(np.rint(pts[i] * 4).astype(int))
            cv2.circle(rastro, c, 26, 1, -1, shift=2)
        discos_por_trilha.append(len(idx_paradas))
        fim, antes = pts[-1], pts[-6]
        direcao = (fim - antes) / np.linalg.norm(fim - antes)
        rx, ry = np.rint(fim + 7 * direcao).astype(int)
        rovers.append((int(rx), int(ry)))

    img = chao.copy()
    # crateras: anel escuro com borda clara, longe dos rastros
    longe = cv2.dilate(rastro, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (41, 41)))
    cv2.circle(longe, (cx, cy), raio_modulo + 20, 1, -1)
    for x, y in rovers:
        cv2.circle(longe, (x, y), 20, 1, -1)
    def sorteio_livre(raio, k):
        out = []
        for _ in range(k * 200):
            if len(out) == k:
                break
            x, y = int(rng.integers(raio + 5, w - raio - 5)), int(rng.integers(raio + 5, h - raio - 5))
            m = np.zeros_like(longe)
            cv2.circle(m, (x, y), raio + 8, 1, -1)
            if not (m & longe).any():
                out.append((x, y))
                cv2.circle(longe, (x, y), raio + 8, 1, -1)
        return out
    for _ in range(n_crateras):
        r = int(rng.integers(10, 30))
        for x, y in sorteio_livre(r, 1):
            anel = np.zeros((h, w), np.uint8)
            cv2.circle(anel, (x, y), r, 1, 2)
            borda = np.zeros((h, w), np.uint8)
            cv2.circle(borda, (x + 1, y + 1), r + 2, 1, 2)
            img[borda > 0] += 25
            img[anel > 0] -= 40
    for _ in range(n_pedras):
        r = int(rng.integers(3, 8))
        for x, y in sorteio_livre(r, 1):
            m = np.zeros((h, w), np.uint8)
            cv2.circle(m, (x, y), r, 1, -1)
            img[m > 0] -= 50
    # seixos claros redondos, para não confundir com rovers à toa
    for x, y in sorteio_livre(2, n_pedras // 3):
        m = np.zeros((h, w), np.uint8)
        cv2.circle(m, (x, y), 2, 1, -1)
        img[m > 0] += 70

    img[rastro > 0] -= ESCURO_RASTRO
    m = np.zeros((h, w), np.uint8)
    cv2.circle(m, (cx, cy), raio_modulo, 1, -1)
    img[m > 0] = 235
    for x, y in rovers:
        img[y - 2:y + 3, x - 2:x + 3] = 250
    img = cv2.GaussianBlur(img, (0, 0), 0.7)

    maior = int(np.argmax(comprimentos))
    x, y = rovers[maior]
    return finalizar(img), {"parte1": f"{x},{y}", "parte2": discos_por_trilha[maior],
                            "comprimentos": list(comprimentos), "rovers": rovers}


def produzir(salvar_png):
    img, ex = gerar(seed=606, w=320, h=220, comprimentos=[175, 110, 80], paradas=[2, 1, 0],
                    n_crateras=3, n_pedras=8, raio_modulo=8, margem=16)
    salvar_png(img, "exemplos/dia06.png")
    img, inp = gerar(seed=6006, w=1400, h=1000, comprimentos=[640, 420, 950, 520, 360, 480],
                     paradas=[3, 4, 6, 2, 5, 3], n_crateras=45, n_pedras=160)
    salvar_png(img, "inputs/dia06.png")
    return {"exemplo": ex, "input": inp}
