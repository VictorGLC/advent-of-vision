import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        Com a sonda estabilizada, a central toma uma decisão ousada: a Andorinha-3 vai <em>pousar</em> em
        Jabuticaba, perto dos rovers. O Dr. Bento diz que sempre quis fazer isso. O orçamento diz que não tem como
        voltar atrás.
      </p>
      <p>
        Para escolher o lugar, a sonda usa as duas câmeras de navegação, montadas lado a lado, olhando para baixo.
        Elas fotografaram o ponto de pouso ao mesmo tempo, e você recebe a <em>imagem esquerda</em> e a{" "}
        <em>imagem direita</em>. O chão de Jabuticaba é coberto de pedrisco miúdo, e cada imagem sozinha parece TV
        fora do ar: não dá para ver pedra nenhuma.
      </p>
      <p>
        Mas são duas câmeras. Feche um olho, depois o outro, olhando para o seu dedo na frente do rosto: o dedo
        pula de lado, e pula mais quanto mais perto ele está. As câmeras da sonda funcionam igual. O manual garante:
      </p>
      <ul>
        <li>
          as duas câmeras estão perfeitamente alinhadas: um ponto do chão aparece na <em>mesma linha</em> nas duas
          imagens, só muda a coluna;
        </li>
        <li>
          na imagem esquerda, todo ponto aparece um pouco mais para a <em>direita</em> do que na imagem direita.
          Esse deslocamento, em pixels, se chama <em>disparidade</em>. Quanto mais perto o ponto, maior ela é;
        </li>
        <li>o chão é plano e está todo à mesma distância, então tem a mesma disparidade em todo lugar.</li>
      </ul>
      <p>
        As <em>pedras</em> grandes ficam mais perto da câmera do que o chão em volta. Cada pedra é uma região
        redonda, de algumas dezenas de pixels, com disparidade maior que a do chão (a mesma em toda a pedra).
      </p>
      <p>Por exemplo, nestas imagens de teste, de 300 por 200 pixels cada:</p>
      <Figura
        imgs={[
          { src: "/exemplos/dia11_esq.png", w: 300, h: 200, alt: "Imagem esquerda de teste: só pontinhos" },
          { src: "/exemplos/dia11_dir.png", w: 300, h: 200, alt: "Imagem direita de teste: só pontinhos" },
        ]}
      />
      <p>
        o chão tem disparidade de 8 pixels: o pedrisco que aparece na coluna 108 da linha 100 da imagem esquerda é
        o mesmo que aparece na coluna 100 da linha 100 da imagem direita. Na linha 100, a partir da coluna 150 da
        esquerda, os valores são <code>125, 149, 115, 112, 108, 131</code>; a partir da coluna 142 da direita, são{" "}
        <code>130, 157, 118, 121, 106, 132</code> (parecidos, não iguais: cada câmera tem o seu chuvisco).
      </p>
      <p>Escondidas no pedrisco, há duas regiões com disparidade maior:</p>
      <ul>
        <li>
          uma pedra grande, com uns 34 pixels de raio, em volta de <code>(123, 72)</code> da imagem esquerda, com
          disparidade 13;
        </li>
        <li>
          uma menor, com uns 25 pixels de raio, em volta de <code>(219, 135)</code>, com disparidade 20.
        </li>
      </ul>
      <p>
        O ponto de pouso de teste tem, portanto, <em>2</em> pedras.
      </p>
      <p>
        <em className="star">Quantas pedras há no seu ponto de pouso?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        A sonda precisa saber a que distância está a pedra mais perigosa, que é a mais próxima, para ajustar a
        descida. Para câmeras alinhadas assim, a distância de um ponto até as câmeras, em metros, é
      </p>
      <p className="formula">
        <code>Z = f × B / d</code>
      </p>
      <p>
        onde <code>d</code> é a disparidade do ponto em pixels, <code>f = 800</code> pixels é a distância focal das
        câmeras e <code>B = 0,5</code> metro é a distância entre elas.
      </p>
      <p>
        Nas imagens de teste, o chão (disparidade 8) está a 800 × 0,5 / 8 = 50 metros. A pedra grande (disparidade
        13) está a uns 30,8 metros. A pedra menor tem a maior disparidade, 20, e é a mais próxima: está a{" "}
        <em>800 × 0,5 / 20 = 20</em> metros.
      </p>
      <p>
        <em className="star">A quantos metros está a pedra mais próxima do seu ponto de pouso?</em>
      </p>
    </>
  );
}
