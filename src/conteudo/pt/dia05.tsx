import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        A rajada pegou um <em>aglomerado</em> bonito e o Dr. Bento quer uma foto caprichada dele. A sonda obedece,
        mas o giroscópio de 1985 está cansado: a sonda tremeu durante a exposição e a foto saiu borrada. Estrelas
        vizinhas se misturaram e viraram borrões, alguns com uma estrela só, outros com várias.
      </p>
      <p>
        A boa notícia: o borrão foi leve. Dentro de cada borrão, cada estrela ainda tem o seu próprio ponto mais
        brilhante.
      </p>
      <p>Por exemplo, nesta foto de teste (ampliada duas vezes):</p>
      <Figura imgs={[{ src: "/exemplos/dia05.png", w: 240, h: 150, alt: "Borrões claros, alguns com várias estrelas grudadas" }]} escala={2} />
      <p>
        há 6 borrões, com <em>13</em> estrelas no total.
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
        O Dr. Bento quer catalogar os <em>sistemas múltiplos</em>: os borrões com três estrelas ou mais. Os pares
        ele diz que já conhece todos (você desconfia que não).
      </p>
      <p>
        Na foto de teste, <em>2</em> borrões têm três estrelas ou mais.
      </p>
      <p>
        <em className="star">Quantos borrões da sua foto têm três estrelas ou mais?</em>
      </p>
    </>
  );
}
