/* eslint-disable @next/next/no-img-element */
export function Enunciado() {
  return (
    <>
      <p>
        Código aceito. Dentro do pacote tem duas fotos da mesma região do céu, a placa <em>A</em> e a placa{" "}
        <em>B</em>, tiradas com algumas horas de diferença, e um recado do computador de bordo:{" "}
        <em>TRANSIENTES DETECTADOS. CONFIRMAR EM SOLO.</em>
      </p>
      <p>
        Transiente é qualquer objeto que está numa placa e não está na outra. Pode ser uma estrela variável que
        apagou, uma que acendeu, ou um asteroide que andou. O asteroide aparece nas duas placas, só que em lugares
        diferentes, então ele conta como um transiente em cada placa.
      </p>
      <p>
        Para piorar, o telescópio escorregou entre uma foto e outra. A placa B mostra o mesmo céu{" "}
        <em>deslocado por um número inteiro de pixels</em> em cada eixo, até 200 no máximo. Não tem rotação nem
        mudança de escala, mas cada placa acaba vendo uma faixa de céu que a outra não vê. Na hora de conferir:
      </p>
      <ul>
        <li>
          Objeto é o mesmo do Dia 1 (brilho <code>&gt;= 100</code>, diagonal conta como vizinho, 6 pixels ou mais).
          A posição de um objeto é o centroide dos pixels dele.
        </li>
        <li>
          Só valem objetos que estão na parte do céu que <em>as duas placas</em> enxergam.
        </li>
        <li>
          Com as placas alinhadas, um objeto tem par na outra placa se existir algum objeto a até{" "}
          <em>3 pixels</em> dele.
        </li>
      </ul>
      <p>Por exemplo, nestas duas placas de teste, com 200 por 140 pixels cada:</p>
      <figure className="imgs">
        <img src="/exemplos/dia03_a.png" width={400} height={280} alt="Placa A de teste" />
        <img src="/exemplos/dia03_b.png" width={400} height={280} alt="Placa B de teste" />
      </figure>
      <p>
        O que está em <code>(x, y)</code> na placa A aparece em <code>(x - 23, y + 11)</code> na placa B. A
        estrela no canto superior esquerdo da A fica fora da área que as duas veem, então não conta. Dentro dessa
        área, <em>2</em> objetos só existem na placa A e <em>3</em> só existem na placa B.
      </p>
      <p>
        O computador de bordo quer um número de confirmação, que é a quantidade de objetos só da placa A vezes a
        quantidade de objetos só da placa B. No exemplo, <em>2 × 3 = 6</em>.
      </p>
      <p>
        <em className="star">Qual é o número de confirmação das suas placas?</em>
      </p>
    </>
  );
}
