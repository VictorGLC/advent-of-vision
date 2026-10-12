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
        O estrago, pelo menos, é bem comportado. A interferência <em>somou</em> à foto um padrão de listras retas e
        paralelas: o brilho sobe e desce suavemente, sempre no mesmo ritmo, como uma onda, e a crista de cada listra
        fica sempre à mesma distância da próxima. Todas as listras têm a mesma direção, a mesma largura e a mesma
        força, de uma ponta à outra da imagem. O resto da foto ficou intacto por baixo delas.
      </p>
      <p>
        O problema é que a plaqueta é discreta: o número está gravado em baixo relevo e só é um pouquinho mais
        escuro que o metal em volta, enquanto as listras são fortíssimas.
      </p>
      <p>Por exemplo, nesta foto de teste de 360 por 240 pixels (ampliada duas vezes):</p>
      <Figura imgs={[{ src: "/exemplos/dia09.png", w: 360, h: 240, alt: "Foto coberta de listras diagonais" }]} escala={2} />
      <p>
        As listras descem na diagonal e se repetem a cada 7 pixels, mais ou menos. Ao longo de uma linha da imagem,
        o brilho vai e volta entre uns 70 e uns 180 a cada poucos pixels (na linha 20, os primeiros valores são{" "}
        <code>118, 159, 173, 160, 128, 93, 70, 67, 104, 141, 171, 180...</code>). Já o número gravado escurece o
        metal em só 10 tons. Sem as listras, ele aparece sem dificuldade: é <em>42</em>.
      </p>
      <p>
        O número da sua plaqueta tem <em>6 dígitos</em>.{" "}
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
        Pegou. Quando as listras fortes somem, aparece uma segunda interferência, bem mais fraca e bem mais fina,
        com listras numa outra direção. Ela fica só numa faixa horizontal perto da parte de baixo da foto e{" "}
        <em>liga e desliga</em> ao longo dela: da esquerda para a direita, tem trechos com essas listras finas e
        trechos sem nada. É <em>código Morse</em>, escrito no tempo do botão do micro-ondas:
      </p>
      <ul>
        <li>um ponto é um trecho ligado de 1 unidade de comprimento; um traço é um trecho ligado de 3 unidades;</li>
        <li>entre os sinais de uma mesma letra, a interferência fica desligada por 1 unidade;</li>
        <li>entre uma letra e outra, fica desligada por 3 unidades.</li>
      </ul>
      <p>
        A unidade é a mesma do começo ao fim da mensagem, e antes da primeira letra e depois da última a faixa fica
        desligada.
      </p>
      <p>
        Na foto de teste, a faixa vai mais ou menos da linha 175 à 225, e a unidade tem 7 pixels. Da esquerda para a
        direita, ligado (1) e desligado (0), unidade por unidade:
      </p>
      <pre className="exemplo">{`1 0 1 0 1 0 0 0 1 1 1 0 1 1 1 0 1 1 1 0 0 0 1 0 1 0 1
.   .   .       -----   -----   -----       .   .   .
    S                     O                     S`}</pre>
      <p>
        A mensagem é <em>SOS</em>. Para traduzir, use a tabela do Morse internacional (só letras de A a Z, sem
        números nem acentos).
      </p>
      <p>
        <em className="star">Que palavra o Seu Jorge mandou?</em>
      </p>
    </>
  );
}
