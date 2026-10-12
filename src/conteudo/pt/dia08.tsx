import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        Rover reativado! Para comemorar, ele manda um <em>panorama</em> de onde está. Só que o protocolo de rádio
        de 1985 não numerava os pacotes: o panorama chegou picado em <em>64 ladrilhos</em> de 64 por 64 pixels,
        todos fora de ordem. E, como a fita magnética do rover foi lida de qualquer jeito, cada ladrilho pode ter
        vindo <em>girado</em> (90, 180 ou 270 graus) e/ou <em>espelhado</em>.
      </p>
      <p>
        O arquivo mostra os ladrilhos numa grade de 8 por 8, separados por faixas pretas de 6 pixels (inclusive em
        volta). Eles são numerados de 1 a 64 na ordem em que aparecem no arquivo: da esquerda para a direita, de
        cima para baixo.
      </p>
      <p>
        Uma ajuda: o rover cortou o panorama com uma linha de sobra entre vizinhos. Dois ladrilhos que ficam lado
        a lado no panorama têm a borda em comum <em>idêntica</em>, pixel por pixel. As bordas de fora do panorama
        não batem com ninguém.
      </p>
      <p>Por exemplo, este panorama de teste foi picado em 3 por 3 ladrilhos de 24 pixels (ampliado):</p>
      <Figura imgs={[{ src: "/exemplos/dia08.png", w: 96, h: 96, alt: "Nove ladrilhos embaralhados separados por faixas pretas" }]} escala={4} />
      <p>
        Os ladrilhos que ficam nos quatro cantos do panorama são os de número 1, 2, 3 e 8, e{" "}
        <em>1 × 2 × 3 × 8 = 48</em>.
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
      <p>Montado, o panorama de teste fica assim:</p>
      <Figura imgs={[{ src: "/exemplos/dia08_montado.png", w: 70, h: 70, alt: "Panorama de teste montado, com OI escrito no chão" }]} escala={4} />
      <p>
        (Os ladrilhos vizinhos dividem a borda, então o panorama de teste tem 3 × 23 + 1 = 70 pixels de lado.) Ele
        diz <em>OI</em>. O seu pode sair espelhado ou de lado depois de montado; aí é só virar.
      </p>
      <p>
        <em className="star">O que o rover escreveu no chão?</em>
      </p>
    </>
  );
}
