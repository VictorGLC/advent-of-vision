import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        Em Lisboa já é de manhã, e o Dr. Bento acorda animado com os asteroides. Ele quer mais dados daquela região
        e pede para a sonda tirar uma <em>rajada</em>: 20 fotos seguidas, com o telescópio parado, apontado sempre
        para o mesmo lugar. Como nada no céu se mexe em poucos minutos, as 20 fotos deveriam ser iguais.
      </p>
      <p>
        Não são. Para economizar energia, a sonda tirou cada uma com bem menos exposição que as placas de ontem, e
        elas vieram muito granuladas: o mesmo pixel do céu escuro vale 30 numa foto, 70 na outra, 45 na seguinte.
        É o chuvisco normal de qualquer câmera no escuro.
      </p>
      <p>
        As fotos chegam todas num arquivo só, lado a lado: <em>5 por linha</em>, em 4 linhas, na ordem em que foram
        tiradas, sem nenhuma separação entre elas. O pixel <code>(x, y)</code> do sensor aparece uma vez em cada
        foto, sempre na mesma posição dentro dela.
      </p>
      <p>
        Antes de qualquer coisa, a CIDA avisa: <em>SENSOR COM PIXELS DEFEITUOSOS.</em> Um pixel defeituoso fica{" "}
        <em>travado</em> num valor qualquer (aceso em 255, apagado em 0 ou em qualquer ponto do meio) e não muda
        nunca, em nenhuma foto. Um pixel bom sempre varia pelo menos um pouco de uma foto para outra, nem que seja
        por causa do chuvisco.
      </p>
      <p>
        Por exemplo, esta rajada de teste tem 6 fotos de 64 por 40 pixels, 3 por linha (ampliada quatro vezes):
      </p>
      <Figura imgs={[{ src: "/exemplos/dia04.png", w: 192, h: 80, alt: "Seis fotos granuladas lado a lado" }]} escala={4} />
      <p>Olhando pixel por pixel do sensor, três deles têm o mesmo valor nas seis fotos:</p>
      <ul>
        <li>
          <code>(33, 26)</code>, travado em 255;
        </li>
        <li>
          <code>(58, 35)</code>, travado em 0;
        </li>
        <li>
          <code>(58, 12)</code>, travado em 159.
        </li>
      </ul>
      <p>
        Todos os outros variam. O sensor de teste tem, portanto, <em>3</em> pixels travados. (Note que o último
        não chama atenção em nenhuma foto isolada: 159 é um valor perfeitamente normal.)
      </p>
      <p>
        <em className="star">Quantos pixels do sensor estão travados na sua rajada?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Com os defeitos mapeados, vem a parte que interessa. O Dr. Bento quer saber quantas estrelas existem de
        verdade naquele pedaço de céu. O problema é que nenhuma foto da rajada presta sozinha: as estrelas mais
        fracas mal passam do chuvisco, e numa foto isolada é impossível dizer se aquela manchinha é estrela ou
        azar.
      </p>
      <p>
        A diferença é que o chuvisco muda de foto para foto e a estrela não: ela está sempre no mesmo lugar, sempre
        com o mesmo brilho. Juntando as 20 fotos, o chuvisco perde força e as estrelas fracas aparecem.
      </p>
      <p>
        Uma estrela é uma manchinha redonda de alguns pixels, mais clara que o céu em volta. Um pixel travado não é
        estrela, por mais aceso que esteja.
      </p>
      <p>Na rajada de teste, o céu tem brilho médio de uns 51 e há 4 estrelas:</p>
      <ul>
        <li>
          em <code>(23, 19)</code> e <code>(48, 22)</code>, duas estrelas fortes, que passam de 150 em todas as
          fotos e se veem em qualquer uma;
        </li>
        <li>
          em <code>(9, 8)</code> e <code>(38, 11)</code>, duas fracas. O pixel central de cada uma varia entre 92 e
          165 de foto para foto, e numa foto só é difícil dizer se aquilo é estrela ou um grão de chuvisco mais
          forte. Juntando as seis fotos, as duas aparecem com clareza.
        </li>
      </ul>
      <p>
        O pixel travado em 255, em <code>(33, 26)</code>, parece uma estrela em todas as fotos, mas é um pixel só e
        não conta. Total: <em>4</em> estrelas.
      </p>
      <p>
        <em className="star">Quantas estrelas aparecem quando você junta as fotos da sua rajada?</em>
      </p>
    </>
  );
}
