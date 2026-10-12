import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        <em>ATITUDE PERDIDA. GIRO DETECTADO.</em> A CIDA manda isso às quatro da manhã e, pela primeira vez, você
        entende o que ela quer dizer: a sonda perdeu a orientação e está girando devagar em torno de si mesma.
      </p>
      <p>
        Para os propulsores corrigirem o giro, alguém precisa medir quanto ela girou. A sonda tirou duas fotos do
        mesmo céu, com algumas horas de diferença: a placa <em>A</em> e a placa <em>B</em>. A placa B mostra o
        mesmo céu <em>girado</em> (em torno de algum ponto) e um pouco <em>deslocado</em>. Não mudou a escala,
        nenhuma estrela nasceu ou morreu, e cada placa vê um pedaço de céu que a outra não vê.
      </p>
      <p>Por exemplo, nestas duas placas de teste:</p>
      <Figura
        imgs={[
          { src: "/exemplos/dia10_a.png", w: 320, h: 240, alt: "Placa A de teste" },
          { src: "/exemplos/dia10_b.png", w: 320, h: 240, alt: "Placa B de teste, girada" },
        ]}
      />
      <p>
        a placa B está girada <em>12,5</em> graus em relação à A.
      </p>
      <p>
        <em className="star">
          Quantos graus girou a sua placa B em relação à A? Responda com uma casa decimal e sem sinal.
        </em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Giro corrigido. Enquanto compara as placas, você nota que a B saiu toda mais clara (a câmera aumentou o
        ganho sozinha, coisa de câmera velha), mas uma das estrelas que aparecem nas duas fez o contrário:{" "}
        <em>apagou</em> muito mais do que qualquer outra. É uma estrela variável, e o Dr. Bento quer o nome dela
        no artigo.
      </p>
      <p>
        Na placa de teste, ela está na posição <code>188,103</code> da placa A (coluna e linha do centro da
        estrela, arredondadas para o pixel mais próximo).
      </p>
      <p>
        <em className="star">Em que posição da placa A está a estrela variável? Responda no formato x,y.</em>
      </p>
    </>
  );
}
