/* eslint-disable @next/next/no-img-element */
import { Codigo } from "@/components/Codigo";
import { Input } from "@/components/Input";

export function Enunciado() {
  return (
    <>
      <p>
        Código aceito, pacote aberto. Dentro dele há duas fotos da mesma região do céu, as placas <em>A</em> e{" "}
        <em>B</em>, tiradas com algumas horas de intervalo. Junto, uma nota do computador de bordo:{" "}
        <em>&quot;TRANSIENTES DETECTADOS. CONFIRMAR EM SOLO.&quot;</em>
      </p>
      <p>
        Um <em>transiente</em> é um objeto que aparece numa placa e não aparece na outra: uma estrela variável que
        apagou, uma que acendeu, ou um asteroide que andou. Um asteroide aparece nas duas placas, mas em posições
        diferentes, então conta como um transiente em cada placa.
      </p>
      <p>
        Entre as duas fotos, o telescópio da sonda escorregou. A placa B mostra o mesmo céu, só que{" "}
        <em>transladado por um número inteiro de pixels</em> em cada eixo, no máximo 200. Não há rotação nem
        mudança de escala. Por causa disso, cada placa enxerga uma faixa de céu que a outra não vê. Para conferir
        os transientes:
      </p>
      <ul>
        <li>
          Objetos seguem a mesma definição do Dia 1 (brilho <code>&gt;= 100</code>, vizinhança com diagonal, pelo
          menos 6 pixels). A posição de um objeto é o centroide dos seus pixels.
        </li>
        <li>
          Considere <em>apenas</em> objetos cuja posição esteja na região do céu vista pelas duas placas.
        </li>
        <li>
          Depois de alinhar as placas, um objeto de uma placa tem par na outra se houver um objeto a até{" "}
          <em>3 pixels</em> de distância.
        </li>
      </ul>
      <p>Por exemplo, nestas duas placas de teste (200 × 140 cada):</p>
      <figure>
        <div className="imgs">
          <img className="px" src="/exemplos/dia03_a.png" width={400} height={280} alt="Placa A de exemplo" />
          <img className="px" src="/exemplos/dia03_b.png" width={400} height={280} alt="Placa B de exemplo" />
        </div>
        <figcaption>exemplos/dia03_a.png e dia03_b.png, ampliadas 2×</figcaption>
      </figure>
      <p>
        A placa B está deslocada: um objeto em <code>(x, y)</code> na placa A aparece em{" "}
        <code>(x − 23, y + 11)</code> na placa B. A estrela no canto superior esquerdo da placa A fica fora da
        região comum e é ignorada. Dentro da região comum, <em>2</em> objetos só aparecem na placa A e <em>3</em>{" "}
        só aparecem na placa B.
      </p>
      <p>
        O computador de bordo quer um número de confirmação: multiplique a quantidade de objetos que só aparecem na
        placa A pela quantidade dos que só aparecem na placa B. No exemplo, <em>2 × 3 = 6</em>.
      </p>
      <p>
        <em className="star">Qual é o número de confirmação das suas placas?</em>
      </p>
      <Input
        arquivos={[
          { src: "/inputs/dia03_a.png", alt: "Placa A: campo de estrelas" },
          { src: "/inputs/dia03_b.png", alt: "Placa B: o mesmo campo, deslocado e com fundo mais claro" },
        ]}
        largura={2000}
        altura={1400}
        legenda="Seu input: dia03_a.png e dia03_b.png, 2000 × 1400 cada, escala de cinza."
      />
    </>
  );
}

export function Resolucao() {
  return (
    <>
      <p>
        Três etapas: detectar os objetos em cada placa, descobrir a translação e casar os objetos por distância.
        Para a translação, cada par (objeto de A, objeto de B) vota no deslocamento <code>b − a</code>. O
        deslocamento verdadeiro recebe um voto de cada estrela em comum, e os pares acidentais espalham votos ao
        acaso. <code>cv2.phaseCorrelate</code> nas imagens também encontra o mesmo valor.
      </p>
      <Codigo>{`
# python dia03.py dia03_a.png dia03_b.png
import sys
import cv2
import numpy as np

def centros(caminho):
    img = cv2.imread(caminho, cv2.IMREAD_GRAYSCALE)
    mascara = (img >= 100).astype("uint8")
    _, _, stats, cent = cv2.connectedComponentsWithStats(mascara, connectivity=8)
    return cent[1:][stats[1:, cv2.CC_STAT_AREA] >= 6], img.shape

ca, (h, w) = centros(sys.argv[1])
cb, _ = centros(sys.argv[2])

# 1. Deslocamento por votação
votos = np.rint(cb[None] - ca[:, None]).reshape(-1, 2).astype(int)
votos = votos[(np.abs(votos) <= 200).all(axis=1)]
vals, cont = np.unique(votos, axis=0, return_counts=True)
sx, sy = vals[cont.argmax()]

# 2. Leva B para o referencial de A e recorta a região comum
cb = cb - (sx, sy)
x0, x1 = max(0, -sx), min(w, w - sx)
y0, y1 = max(0, -sy), min(h, h - sy)
dentro = lambda p: p[(p[:, 0] >= x0) & (p[:, 0] < x1) & (p[:, 1] >= y0) & (p[:, 1] < y1)]
ca, cb = dentro(ca), dentro(cb)

# 3. Sem vizinho a até 3 px na outra placa = transiente
dist = np.linalg.norm(ca[:, None] - cb[None], axis=2)
so_a = (dist.min(axis=1) > 3).sum()
so_b = (dist.min(axis=0) > 3).sum()
print(so_a, so_b, so_a * so_b)
`}</Codigo>
      <figure>
        <img
          className="px"
          src="/solucoes/d3_resolvido.png"
          width={606}
          height={210}
          loading="lazy"
          alt="Exemplo resolvido: região comum em azul, transientes em vermelho, estrela ignorada em cinza"
        />
        <figcaption>
          Exemplo resolvido: região comum (azul), transientes (vermelho), estrela fora da região comum (cinza).
        </figcaption>
      </figure>
      <p className="trap">
        <b>As armadilhas:</b> subtrair as placas sem alinhar acende quase tudo (2813 objetos na diferença). Alinhar
        e esquecer de recortar a região comum conta como transiente cada estrela da faixa que só uma placa enxerga,
        e a resposta vira 18078. O fundo da placa B é mais claro, mas continua bem abaixo do limiar.{" "}
        <b>Margem:</b> a resposta não muda com limiar entre 85 e 140, área mínima entre 3 e 8, vizinhança 4 ou 8,
        tolerância de casamento entre 1,5 e 6 pixels, nem trocando a votação por correlação de fase. Nenhuma
        estrela fica a menos de 10 pixels da borda da região comum.
      </p>
    </>
  );
}
