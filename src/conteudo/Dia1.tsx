/* eslint-disable @next/next/no-img-element */
import { Codigo } from "@/components/Codigo";
import { Input } from "@/components/Input";

export function Enunciado() {
  return (
    <>
      <p>
        Faz 41 anos que a sonda <em>Andorinha-3</em> partiu de Alcântara. Ontem, depois de duas décadas de
        silêncio, o Centro de Rastreamento recebeu um pacote de dados dela. Hoje de manhã o pipeline automático de
        processamento travou, a equipe sênior está num congresso em Lisboa, e sobrou para você, estagiária(o) do
        turno da madrugada.
      </p>
      <p>
        Antes de confiar em qualquer coisa que a sonda mandou, é preciso saber se a câmera ainda funciona. O
        primeiro arquivo do pacote é uma <em>placa de calibração</em>: uma foto de um campo de estrelas que o
        manual diz ter que conferir com o catálogo.
      </p>
      <p>
        O problema é que, depois de 41 anos de radiação, o sensor está cheio de <em>raios cósmicos</em>: impactos
        de partículas que acendem um ou dois pixels isolados. Eles não são estrelas e não podem entrar na contagem.
        O manual da câmera define os objetos assim:
      </p>
      <ul>
        <li>
          Um pixel com brilho <code>&gt;= 100</code> faz parte de algum objeto.
        </li>
        <li>Pixels de objeto vizinhos, inclusive na diagonal, pertencem ao mesmo objeto.</li>
        <li>
          Um objeto com <em>6 pixels ou mais</em> é uma estrela. Objetos menores são raios cósmicos.
        </li>
      </ul>
      <p>Por exemplo, esta placa de teste (160 × 100 pixels, ampliada abaixo):</p>
      <figure>
        <img
          className="px"
          src="/exemplos/dia01.png"
          width={480}
          height={300}
          alt="Placa de exemplo: estrelas difusas e alguns pontos isolados num fundo escuro"
        />
        <figcaption>exemplos/dia01.png, ampliada 3×</figcaption>
      </figure>
      <p>
        Ela tem 17 objetos. Seis deles são pontinhos de 1 ou 2 pixels, ou seja, raios cósmicos. Sobram{" "}
        <em>11</em> estrelas.
      </p>
      <p>
        A sua placa de calibração é bem maior. <em className="star">Quantas estrelas há na sua placa?</em>
      </p>
      <Input
        arquivos={[{ src: "/inputs/dia01.png", alt: "Placa de calibração: campo denso de estrelas" }]}
        largura={2400}
        altura={1600}
        legenda="Seu input: dia01.png, 2400 × 1600, escala de cinza. Resolva sobre o arquivo original, não sobre esta prévia."
      />
    </>
  );
}

export function Resolucao() {
  return (
    <>
      <p>
        A definição do enunciado já é o algoritmo: limiarização seguida de rotulagem de componentes conexos com
        vizinhança 8, e um filtro pela área de cada componente.
      </p>
      <Codigo>{`
# python dia01.py dia01.png
import sys
import cv2

img = cv2.imread(sys.argv[1], cv2.IMREAD_GRAYSCALE)
mascara = (img >= 100).astype("uint8")
n, _, stats, _ = cv2.connectedComponentsWithStats(mascara, connectivity=8)
areas = stats[1:, cv2.CC_STAT_AREA]          # índice 0 é o fundo
print((areas >= 6).sum())
`}</Codigo>
      <figure>
        <img
          className="px"
          src="/solucoes/d1_resolvido.png"
          width={480}
          height={300}
          loading="lazy"
          alt="Exemplo resolvido: estrelas circuladas em verde, raios cósmicos em vermelho"
        />
        <figcaption>Exemplo resolvido: 11 estrelas (verde) e 6 raios cósmicos (vermelho).</figcaption>
      </figure>
      <p className="trap">
        <b>A armadilha:</b> contar componentes sem filtrar a área dá 2773 no input, porque soma os 900 raios
        cósmicos. <b>Margem:</b> no limiar 100, o maior raio cósmico tem 2 pixels e a menor estrela tem 23. A
        resposta não muda com limiar entre 70 e 170, área mínima entre 3 e 12, nem trocando vizinhança 8 por 4.
      </p>
    </>
  );
}
