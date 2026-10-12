import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        No meio do pacote tem uma pasta chamada <code>JABUTICABA</code>, e ninguém da equipe atual sabia o que
        era. A documentação explica: em 1987 a Andorinha-3 pousou um módulo no asteroide 1985 JB, apelidado de
        Jabuticaba (é pequeno, redondo e escuro), e soltou uns rovers para passear. Ninguém lembrava. A missão
        tinha um orçamento pequeno e uma memória menor ainda.
      </p>
      <p>A pasta tem uma foto do alto, em tons de cinza. Nela dá para ver:</p>
      <ul>
        <li>
          o <em>módulo</em>, um disco claro bem no meio da foto;
        </li>
        <li>
          os <em>rastros</em>, linhas escuras e finas que saem da beira do módulo e vão serpenteando pelo chão. Cada
          rover deixou um. Nenhum rastro cruza outro;
        </li>
        <li>
          os <em>rovers</em>, quadradinhos bem claros de 5 por 5 pixels, cada um parado logo depois do fim do seu
          rastro;
        </li>
        <li>
          e muita coisa que não interessa: crateras (anéis), pedras escuras, pedrinhas claras e manchas grandes
          de poeira mais clara ou mais escura.
        </li>
      </ul>
      <p>
        Em alguns trechos a poeira cobriu as marcas e o rastro some por alguns pixels, mas continua do outro lado
        no mesmo caminho.
      </p>
      <p>
        Pelo rádio, só um rover ainda responde: o que mais andou, ou seja, o do rastro mais comprido (medido ao
        longo do caminho, não em linha reta). Para falar com ele, a central precisa saber onde ele está.
      </p>
      <p>Por exemplo, nesta foto de teste de 320 por 220 pixels (ampliada, com os rovers numerados):</p>
      <Figura imgs={[{ src: "/exemplos/dia06_marcado.png", w: 640, h: 440, alt: "Chão cinza com crateras, o módulo no meio e três rastros terminando nos rovers 1, 2 e 3" }]} />
      <p>Há três rovers:</p>
      <ul>
        <li>
          o rover <em>1</em>, em <code>184,58</code>, saiu para a direita, fez uma curva grande para cima e voltou
          para a esquerda; o rastro dele tem uns 175 pixels de comprimento;
        </li>
        <li>
          o rover <em>2</em>, em <code>74,131</code>, desceu e foi para a esquerda, uns 110 pixels;
        </li>
        <li>
          o rover <em>3</em>, em <code>99,59</code>, subiu e virou para a esquerda, uns 80 pixels.
        </li>
      </ul>
      <p>
        Repare que o rastro do rover 1 tem duas falhas e mesmo assim é um caminho só. O rover que mais andou é o 1,
        e a resposta é a posição dele: <code>184,58</code> (a coluna e a linha do pixel do centro do quadradinho,
        contando a partir de 0, separadas por vírgula).
      </p>
      <p>
        <em className="star">Qual é a posição do rover que mais andou?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        O rover responde! Antes de qualquer coisa, a central quer baixar as fotos que ele tirou ao longo do
        caminho, e para isso precisa saber quantas são.
      </p>
      <p>
        Toda vez que parava para fotografar, o rover girava no lugar para olhar em volta, e as rodas deixavam uma
        marca redonda e cheia, bem em cima do rastro, umas quatro vezes mais larga que ele. Cada marca é uma parada.
        As pedras escuras espalhadas pelo chão também são redondinhas, mas não estão em cima de rastro nenhum e não
        contam.
      </p>
      <p>
        Na foto de teste, o rastro do rover 1 tem <em>2</em> marcas, as duas na curva grande da direita. O rover 2 parou uma vez e o rover 3 nenhuma, mas eles não importam.
      </p>
      <p>
        <em className="star">Quantas paradas fez o rover que mais andou?</em>
      </p>
    </>
  );
}
