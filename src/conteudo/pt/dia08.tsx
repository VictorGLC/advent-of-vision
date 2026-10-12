import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        Rover reativado! Para comemorar, ele manda um <em>panorama</em> de onde está. Só que o protocolo de rádio
        de 1985 não numerava os pacotes: o panorama chegou picado em <em>64 ladrilhos</em> quadrados de 64 por 64
        pixels, todos fora de ordem. E, como a fita magnética do rover foi lida de qualquer jeito, cada ladrilho
        pode ter vindo <em>girado</em> (90, 180 ou 270 graus) e/ou <em>espelhado</em>.
      </p>
      <p>
        O arquivo mostra os ladrilhos numa grade de 8 por 8, separados por faixas pretas de 6 pixels (inclusive em
        volta da grade toda). Os ladrilhos são numerados de 1 a 64 na ordem em que aparecem no arquivo: da esquerda
        para a direita, de cima para baixo. O de número 1 é o do canto superior esquerdo do arquivo, o 8 é o do
        canto superior direito, o 9 é o primeiro da segunda linha, e assim por diante. Essa numeração não tem nada a
        ver com a posição do ladrilho no panorama.
      </p>
      <p>
        Uma ajuda: o rover cortou o panorama com uma linha de sobra entre vizinhos. Dois ladrilhos que ficam lado
        a lado no panorama têm a borda em comum <em>idêntica</em>, pixel por pixel. Como os ladrilhos podem estar
        girados ou espelhados, essa borda pode estar em qualquer lado de cada um, e pode estar ao contrário (o
        primeiro pixel de uma é o último da outra). As bordas de fora do panorama não batem com ninguém, e uma borda
        nunca bate com mais de um ladrilho.
      </p>
      <p>Por exemplo, este panorama de teste foi picado em 3 por 3 ladrilhos de 24 pixels (ampliado, com os números):</p>
      <Figura imgs={[{ src: "/exemplos/dia08_marcado.png", w: 384, h: 384, alt: "Nove ladrilhos embaralhados numerados de 1 a 9" }]} />
      <p>Comparando as bordas, dá para descobrir quem é vizinho de quem:</p>
      <ul>
        <li>
          o ladrilho 7 tem as 4 bordas batendo com alguém (com o 4, o 5, o 6 e o 9), então ele é o do{" "}
          <em>meio</em> do panorama;
        </li>
        <li>
          os ladrilhos 4, 5, 6 e 9 têm 3 bordas batendo com alguém: são os do meio de cada lado;
        </li>
        <li>
          os ladrilhos 1, 2, 3 e 8 têm só 2 bordas batendo com alguém (o 1, por exemplo, bate com o 9 e com o 6). As
          outras duas ficam para fora: eles são os <em>cantos</em>.
        </li>
      </ul>
      <p>
        Multiplicando os números dos cantos: <em>1 × 2 × 3 × 8 = 48</em>.
      </p>
      <p>
        <em className="star">Qual é o produto dos números dos quatro ladrilhos de canto do seu panorama?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Agora é montar o panorama inteiro. Com tudo no lugar, dá para ver que o rover escreveu alguma coisa no
        chão, passando as rodas pela poeira. O Dr. Bento jura que não foi ele que programou isso.
      </p>
      <p>
        Na montagem, cada ladrilho entra girado ou espelhado de volta, de modo que toda borda encoste na borda
        idêntica do vizinho. Como vizinhos dividem a linha da borda, ela aparece uma vez só no panorama montado. O
        panorama de teste fica assim:
      </p>
      <Figura imgs={[{ src: "/exemplos/dia08_montado.png", w: 70, h: 70, alt: "Panorama de teste montado, com OI escrito no chão" }]} escala={4} />
      <p>
        Ele tem 3 × 23 + 1 = 70 pixels de lado e diz <em>OI</em>. O seu panorama montado terá 8 × 63 + 1 = 505
        pixels de lado. Dependendo de por qual canto você começar, ele pode sair espelhado ou de lado; aí é só virar
        até a palavra ficar legível.
      </p>
      <p>
        <em className="star">O que o rover escreveu no chão?</em>
      </p>
    </>
  );
}
