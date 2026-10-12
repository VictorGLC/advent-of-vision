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
        Para escolher o lugar, a sonda usa as duas câmeras de navegação, montadas lado a lado. Elas fotografaram o
        ponto de pouso ao mesmo tempo, e você recebe a <em>imagem esquerda</em> e a <em>imagem direita</em>. O
        chão de Jabuticaba é coberto de pedrisco, e cada imagem sozinha parece TV fora do ar.
      </p>
      <p>O que o manual das câmeras garante:</p>
      <ul>
        <li>as duas câmeras estão perfeitamente alinhadas: um ponto aparece na mesma linha nas duas imagens;</li>
        <li>
          na imagem esquerda, todo ponto aparece um pouco mais para a <em>direita</em> do que na imagem direita. Esse
          deslocamento se chama <em>disparidade</em>, e quanto mais perto o ponto, maior ela é;
        </li>
        <li>o chão é plano e está todo à mesma distância.</li>
      </ul>
      <p>
        As <em>pedras</em> grandes ficam mais perto da câmera do que o chão. Nas imagens de teste:
      </p>
      <Figura
        imgs={[
          { src: "/exemplos/dia11_esq.png", w: 300, h: 200, alt: "Imagem esquerda de teste: só pontinhos" },
          { src: "/exemplos/dia11_dir.png", w: 300, h: 200, alt: "Imagem direita de teste: só pontinhos" },
        ]}
      />
      <p>
        escondidas no chuvisco, há <em>2</em> pedras.
      </p>
      <p>
        <em className="star">Quantas pedras há no ponto de pouso?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        A sonda precisa saber a que distância está a pedra mais perigosa, a mais próxima. A distância de um ponto
        até as câmeras é
      </p>
      <p className="formula">
        <code>Z = f × B / d</code>
      </p>
      <p>
        onde <code>d</code> é a disparidade em pixels, <code>f = 800</code> pixels é a distância focal e{" "}
        <code>B = 0,5</code> metro é a distância entre as duas câmeras.
      </p>
      <p>
        Nas imagens de teste, a pedra mais próxima tem disparidade de 20 pixels, então ela está a{" "}
        <em>800 × 0,5 / 20 = 20</em> metros.
      </p>
      <p>
        <em className="star">A quantos metros está a pedra mais próxima?</em>
      </p>
    </>
  );
}
