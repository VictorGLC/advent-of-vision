import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        Pacote aberto. Dentro dele tem duas fotos da mesma região do céu, a placa <em>A</em> e a placa <em>B</em>,
        tiradas com algumas horas de diferença, e um recado da CIDA, o computador de bordo, que só escreve em
        maiúsculas: <em>TRANSIENTES DETECTADOS. CONFIRMAR EM SOLO.</em>
      </p>
      <p>
        Transiente é qualquer objeto que está numa placa e não está na outra. Pode ser uma estrela variável que
        apagou, uma que acendeu, ou um asteroide que andou. O asteroide aparece nas duas placas, só que em lugares
        diferentes, então ele conta como um transiente em cada placa. As estrelas comuns, que são quase todas,
        aparecem nas duas e não são transientes.
      </p>
      <p>
        Para piorar, o telescópio escorregou entre uma foto e outra. A placa B mostra o mesmo céu{" "}
        <em>deslocado</em>: tudo andou o mesmo número inteiro de pixels na horizontal e o mesmo número inteiro na
        vertical, até 200 em cada eixo. Não tem rotação nem mudança de escala. Como as duas placas têm o mesmo
        tamanho, cada uma acaba vendo uma faixa de céu que a outra não vê. Nessa faixa não dá para saber se um
        objeto é transiente, então ela fica de fora. A CIDA definiu as regras assim:
      </p>
      <ul>
        <li>
          Objeto é o mesmo do Dia 1: pixels com brilho <code>&gt;= 100</code>, grudados de lado ou pela diagonal,
          com 6 pixels ou mais. A posição de um objeto é o centro dele (a média das posições dos seus pixels).
        </li>
        <li>
          Só valem os objetos cuja posição cai na parte do céu que <em>as duas placas</em> enxergam.
        </li>
        <li>
          Com as placas alinhadas (ou seja, desfazendo o deslocamento), um objeto tem par na outra placa se existir
          algum objeto dela a até <em>3 pixels</em> de distância. Sem par, é transiente.
        </li>
      </ul>
      <p>Por exemplo, estas duas placas de teste têm 260 por 180 pixels cada:</p>
      <Figura
        imgs={[
          { src: "/exemplos/dia03_a.png", w: 260, h: 180, alt: "Placa A de teste" },
          { src: "/exemplos/dia03_b.png", w: 260, h: 180, alt: "Placa B de teste" },
        ]}
      />
      <p>
        A placa A tem 25 objetos e a placa B tem 27. O deslocamento é tal que o que está em <code>(x, y)</code> na
        placa A aparece em <code>(x - 23, y + 11)</code> na placa B. Por exemplo, a estrela que na placa A fica em
        <code>(96, 12)</code> aparece na placa B em <code>(73, 23)</code>.
      </p>
      <p>
        Com esse deslocamento, a parte do céu que as duas enxergam corresponde, na placa A, às colunas de 23 a 259
        e às linhas de 0 a 168. Na placa B, um objeto fica de fora (lá na borda direita). Dentro da região comum, 23
        objetos aparecem nas duas placas. Sobram os transientes, marcados em vermelho (a região comum está em azul):
      </p>
      <Figura
        imgs={[
          { src: "/exemplos/dia03_a_marcado.png", w: 520, h: 360, alt: "Placa A com a região comum e 2 transientes marcados" },
          { src: "/exemplos/dia03_b_marcado.png", w: 520, h: 360, alt: "Placa B com a região comum e 3 transientes marcados" },
        ]}
      />
      <ul>
        <li>
          só na placa A: os objetos em <code>(120, 52)</code> e <code>(207, 60)</code>;
        </li>
        <li>
          só na placa B: os objetos em <code>(25, 38)</code>, <code>(160, 116)</code> e <code>(60, 150)</code>{" "}
          (posições da placa B).
        </li>
      </ul>
      <p>
        A CIDA quer um número de confirmação: a quantidade de objetos só da placa A vezes a quantidade de objetos
        só da placa B. No exemplo, <em>2 × 3 = 6</em>.
      </p>
      <p>
        <em className="star">Qual é o número de confirmação das suas placas?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        <em>CONFIRMADO. ESTIMAR VELOCIDADE DOS ASTEROIDES.</em>
      </p>
      <p>
        A CIDA quer saber quanto cada asteroide andou entre as duas fotos. Um asteroide deixa um transiente em cada
        placa: na placa A, ele está onde estava na hora da primeira foto; na placa B, onde estava na hora da
        segunda. As estrelas que apagaram ou acenderam deixam um transiente só, numa placa só.
      </p>
      <p>Para não ter confusão, a CIDA garante duas coisas:</p>
      <ul>
        <li>os asteroides são lentos: nenhum andou mais de 70 pixels entre uma foto e outra;</li>
        <li>
          tirando os dois transientes de um mesmo asteroide, quaisquer outros dois transientes estão a pelo menos 75
          pixels um do outro.
        </li>
      </ul>
      <p>
        A distância que um asteroide andou é medida com as placas alinhadas, do centro do objeto na placa A até o
        centro dele na placa B, levado para a posição correspondente da placa A. Arredonde cada distância para o
        inteiro mais próximo; a CIDA quer a soma.
      </p>
      <p>
        No exemplo, o transiente da placa A em <code>(207, 60)</code> e o da placa B em <code>(160, 116)</code> são o
        mesmo asteroide. Desfazendo o deslocamento, o da placa B corresponde à posição <code>(183, 105)</code> da
        placa A. De <code>(207, 60)</code> até <code>(183, 105)</code> são 24 pixels na horizontal e 45 na vertical,
        ou seja, <em>51</em> pixels. Os outros três transientes não têm ninguém por perto: são estrelas que mudaram
        de brilho. A soma, no exemplo, é 51.
      </p>
      <p>
        <em className="star">Quanto somam as distâncias percorridas pelos asteroides das suas placas?</em>
      </p>
    </>
  );
}
