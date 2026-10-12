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
      <p>
        A pasta tem uma foto do alto. O <em>módulo</em> é o disco claro no meio; cada <em>rover</em> é um
        quadradinho claro, parado no fim do rastro que ele mesmo deixou. Todos os rastros saem do módulo e nenhum
        cruza outro, mas em alguns trechos a poeira cobriu as marcas e o rastro some por alguns pixels.
      </p>
      <p>
        Pelo rádio, só um rover ainda responde: o que mais andou. Para falar com ele, a central precisa saber onde
        ele está.
      </p>
      <p>Por exemplo, nesta foto de teste (ampliada duas vezes):</p>
      <Figura imgs={[{ src: "/exemplos/dia06.png", w: 320, h: 220, alt: "Chão cinza com crateras, um disco claro e três rastros escuros" }]} escala={2} />
      <p>
        o rastro mais longo é o da direita, e o rover dele está em <code>184,58</code> (coluna e linha do pixel do
        centro do quadradinho, contando a partir de 0).
      </p>
      <p>
        <em className="star">Qual é a posição do rover que mais andou? Responda no formato x,y.</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        O rover responde! Antes de qualquer coisa, a central quer baixar as fotos que ele tirou ao longo do
        caminho, e precisa saber quantas são.
      </p>
      <p>
        Toda vez que parava para fotografar, o rover girava no lugar para olhar em volta, e as rodas deixavam uma
        marca redonda bem em cima do rastro. As pedras escuras espalhadas pelo chão não contam: elas não estão no
        rastro.
      </p>
      <p>
        Na foto de teste, o rover que mais andou parou <em>2</em> vezes.
      </p>
      <p>
        <em className="star">Quantas paradas fez o rover que mais andou?</em>
      </p>
    </>
  );
}
