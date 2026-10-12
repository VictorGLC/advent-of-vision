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
        mesmo céu, com algumas horas de diferença: a placa <em>A</em> e a placa <em>B</em>, do mesmo tamanho.
      </p>
      <p>
        Entre uma foto e outra, a câmera <em>girou</em> e também <em>escorregou</em> um pouco para o lado. A placa B
        mostra, então, o mesmo céu girado em torno de algum ponto e deslocado. Não mudou a escala (a distância entre
        duas estrelas é a mesma nas duas placas) e nenhuma estrela nasceu ou morreu, mas cada placa vê um pedaço de
        céu que a outra não vê. Nenhuma das duas está espelhada.
      </p>
      <p>Por exemplo, estas duas placas de teste têm 320 por 240 pixels cada:</p>
      <Figura
        imgs={[
          { src: "/exemplos/dia10_a.png", w: 320, h: 240, alt: "Placa A de teste" },
          { src: "/exemplos/dia10_b.png", w: 320, h: 240, alt: "Placa B de teste, girada" },
        ]}
      />
      <p>
        Olhando com calma, dá para achar as mesmas figuras de estrelas nas duas placas, só que tortas na B. Uns 90
        pares de estrelas aparecem nas duas. Pegando quaisquer duas estrelas que aparecem nas duas placas, a linha
        que liga uma à outra está, na placa B, sempre virada do mesmo jeito em relação à placa A: <em>12,5</em> graus.
        É esse o giro.
      </p>
      <p>
        O giro pode ter sido para qualquer lado; a CIDA só quer o tamanho dele.{" "}
        <em className="star">
          De quantos graus foi o giro entre a sua placa A e a sua placa B? Responda com uma casa decimal.
        </em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Giro corrigido. Enquanto compara as placas, você nota outra coisa: a placa B saiu toda mais clara. O fundo
        do céu passou de uns 19 para uns 35, e as estrelas, no geral, ficaram uns 30% mais brilhantes (a câmera
        aumentou o ganho sozinha, coisa de câmera velha).
      </p>
      <p>
        Mas uma das estrelas que aparecem nas duas placas fez o contrário: em vez de ficar 30% mais brilhante, ela{" "}
        <em>apagou</em>, bem mais do que qualquer erro de medida explicaria. É uma estrela variável, e o Dr. Bento
        quer o nome dela no artigo.
      </p>
      <p>
        O brilho de uma estrela é tudo o que ela soma acima do fundo do céu, juntando todos os pixels dela (não só o
        mais brilhante, que engana quando a estrela é mais espalhada). Estrela cortada pela borda de uma das placas
        perde parte do brilho, então só valem as que estão inteiras nas duas: com o centro a mais de 10 pixels de
        qualquer borda, tanto na placa A quanto na B.
      </p>
      <p>
        Nas placas de teste, 78 estrelas estão inteiras nas duas placas. Todas, menos uma, ficaram entre 1,2 e 1,4
        vez mais brilhantes na placa B. A exceção ficou com 0,4 vez o brilho que tinha: a que está em <code>188,103</code> na placa A (coluna e
        linha do centro da estrela, arredondadas para o pixel mais próximo, separadas por vírgula).
      </p>
      <p>
        <em className="star">Em que posição da placa A está a estrela variável?</em>
      </p>
    </>
  );
}
