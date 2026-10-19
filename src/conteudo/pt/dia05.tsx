import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        A rajada pegou um <em>aglomerado</em> bonito e o Dr. Bento quer uma foto caprichada dele. A sonda obedece,
        mas o giroscópio de 1985 está cansado: a sonda tremeu durante a exposição e a foto saiu borrada.
      </p>
      <p>
        Cada estrela, que deveria ser um pontinho, virou uma bolinha esfumaçada. Estrelas que estavam perto umas das
        outras se misturaram e viraram um <em>borrão</em> só, uma mancha clara contínua. Alguns borrões têm uma
        estrela, outros têm duas, três, até cinco grudadas.
      </p>
      <p>
        A boa notícia: o borrão foi leve. Dentro de cada borrão, cada estrela ainda tem o seu próprio ponto mais
        brilhante, e entre duas estrelas vizinhas o brilho sempre dá uma caída antes de subir de novo. É só o
        tamanho do borrão que engana.
      </p>
      <p>
        Por exemplo, esta foto de teste tem 240 por 150 pixels (ampliada duas vezes, e com os borrões marcados por
        letras):
      </p>
      <Figura imgs={[{ src: "/exemplos/dia05_marcado.png", w: 480, h: 300, alt: "Seis borrões claros marcados de A a F" }]} />
      <ul>
        <li>
          o borrão <em>A</em>, lá em cima à direita, parece uma mancha só, mas tem 4 estrelas, com os centros mais
          ou menos em <code>(199, 25)</code>, <code>(209, 27)</code>, <code>(203, 33)</code> e{" "}
          <code>(210, 36)</code>;
        </li>
        <li>
          o borrão <em>C</em> tem 3 estrelas, em triângulo;
        </li>
        <li>
          os borrões <em>D</em> e <em>F</em> têm 2 estrelas cada;
        </li>
        <li>
          os borrões <em>B</em> e <em>E</em> são estrelas sozinhas.
        </li>
      </ul>
      <p>
        São 6 borrões, mas <em>4 + 1 + 3 + 2 + 1 + 2 = 13</em> estrelas.
      </p>
      <p>
        <em className="star">Quantas estrelas tem a sua foto?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        O Dr. Bento quer catalogar os <em>sistemas múltiplos</em>: os borrões com três estrelas ou mais, que são
        grupos de estrelas presas umas às outras pela gravidade. Os pares ele diz que já conhece todos (você
        desconfia que não).
      </p>
      <p>
        Na foto de teste, o borrão A tem 4 estrelas e o C tem 3; os outros têm 1 ou 2. Então <em>2</em> borrões
        têm três estrelas ou mais.
      </p>
      <p>
        <em className="star">Quantos borrões da sua foto têm três estrelas ou mais?</em>
      </p>
    </>
  );
}
