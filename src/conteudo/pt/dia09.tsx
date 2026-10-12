import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        A próxima transmissão do rover é uma foto da <em>plaqueta de identificação</em> do módulo, com o número
        que a central precisa para mandar comandos direto para ele. Só que a foto chega coberta de listras, e o
        número sumiu no meio delas.
      </p>
      <p>
        Ninguém entende de onde vêm as listras até o Seu Jorge, o vigia da noite, comentar que sempre esquenta a
        marmita lá pelas três da manhã no micro-ondas da copa, que fica parede com parede com a sala do rádio.
        (Isso já aconteceu de verdade: um radiotelescópio na Austrália passou anos captando sinais misteriosos que
        eram o micro-ondas da cozinha.)
      </p>
      <p>
        O estrago é regular: listras retinhas, todas na mesma direção e no mesmo espaçamento, somadas por cima da
        foto. Por baixo delas, a plaqueta continua lá, com o número gravado em baixo relevo, quase sem contraste.
      </p>
      <p>Nesta foto de teste (ampliada), por exemplo, o número é <em>42</em>:</p>
      <Figura imgs={[{ src: "/exemplos/dia09.png", w: 360, h: 240, alt: "Foto coberta de listras diagonais" }]} escala={2} />
      <p>
        <em className="star">Qual é o número gravado na plaqueta da sua foto?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Na manhã seguinte, o Seu Jorge confessa mais uma: quando bate o tédio, ele fica apertando o botão do
        micro-ondas no ritmo do telégrafo, igual fazia no tempo de radioamador. Ele mandou uma mensagem na
        transmissão de ontem e quer saber se alguém pegou.
      </p>
      <p>
        Pegou: perto da parte de baixo da foto tem uma segunda interferência, mais fraca e mais fina que a
        primeira, que liga e desliga ao longo da imagem, da esquerda para a direita. É <em>código Morse</em>:
      </p>
      <ul>
        <li>ponto = ligada por 1 unidade de tempo; traço = ligada por 3 unidades;</li>
        <li>entre os sinais de uma letra, desligada por 1 unidade; entre letras, por 3.</li>
      </ul>
      <p>
        Na foto de teste, a mensagem é <em>SOS</em> (<code>... --- ...</code>).
      </p>
      <p>
        <em className="star">Que palavra o Seu Jorge mandou?</em>
      </p>
    </>
  );
}
