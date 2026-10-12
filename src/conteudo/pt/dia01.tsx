import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        Faz 41 anos que a sonda <em>Andorinha-3</em> saiu de Alcântara, e ontem à noite, depois de vinte anos
        calada, ela mandou um pacote de dados. O programa que deveria processar tudo travou logo cedo, a equipe
        inteira está num congresso em Lisboa (comendo pastel de nata, segundo o grupo da firma) e quem ficou de
        plantão foi você.
      </p>
      <p>
        Antes de acreditar em qualquer coisa que veio da sonda, alguém precisa ver se a câmera ainda presta. O
        primeiro arquivo do pacote é uma <em>placa de calibração</em>, uma foto em tons de cinza de um campo de
        estrelas. O manual manda contar as estrelas e conferir com o catálogo.
      </p>
      <p>
        Só que quatro décadas no espaço deixam marcas. O sensor está cheio de <em>raios cósmicos</em>: partículas
        que bateram no chip e acenderam um ou dois pixels soltos. Isso não é estrela e não entra na conta. O manual
        da câmera, escrito numa época em que ninguém confiava em ninguém, define tudo bem direitinho:
      </p>
      <ul>
        <li>
          Cada pixel tem um brilho de 0 (preto) a 255 (branco). Um pixel com brilho <code>&gt;= 100</code> faz
          parte de algum <em>objeto</em>; abaixo disso é céu.
        </li>
        <li>
          Dois pixels de objeto que se encostam, de lado ou pela diagonal, são do <em>mesmo</em> objeto. Um objeto
          é, então, um grupo de pixels claros grudados uns nos outros, separado dos outros grupos por céu.
        </li>
        <li>
          Um objeto com <em>6 pixels ou mais</em> é uma estrela. Menor que isso é raio cósmico.
        </li>
      </ul>
      <p>Por exemplo, esta placa de teste tem 160 por 100 pixels (aqui ampliada três vezes):</p>
      <Figura imgs={[{ src: "/exemplos/dia01.png", w: 160, h: 100, alt: "Placa de teste com manchas claras e pontinhos soltos" }]} escala={3} />
      <p>
        Seguindo o manual, ela tem 17 objetos. Onze são manchas grandes, entre 28 e 70 pixels cada. Os outros seis
        são pontinhos: quatro de 2 pixels e dois de 1 pixel só. Esses seis são raios cósmicos e ficam de fora.
        Marcando as estrelas em verde e os raios em vermelho:
      </p>
      <Figura imgs={[{ src: "/exemplos/dia01_marcado1.png", w: 480, h: 300, alt: "Placa de teste com 11 estrelas circuladas em verde e 6 raios cósmicos em vermelho" }]} />
      <p>
        A placa de teste tem, portanto, <em>11</em> estrelas.
      </p>
      <p>
        A sua placa é bem maior e tem raio cósmico para todo lado.{" "}
        <em className="star">Segundo o manual, quantas estrelas tem nela?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Você manda o número para o Dr. Bento, o chefe da missão. Ele responde com um áudio de quatro minutos que,
        tirando o barulho do restaurante, se resume a: &quot;tá alto demais&quot;. O catálogo tem bem menos estrelas
        naquela região.
      </p>
      <p>
        Olhando a placa de perto, dá para entender o motivo. Nem toda mancha é redonda: algumas são compridas,
        esticadas para um lado, como um charuto. Isso não é estrela, é <em>galáxia</em>, um bilhão de vezes mais
        longe, e o catálogo de 1985 não conta galáxia. O manual da câmera, claro, não fala nada disso: em 1985 a
        lente não enxergava tão longe.
      </p>
      <p>
        A diferença é fácil de ver. Uma estrela é redondinha: medida em qualquer direção, ela tem mais ou menos a
        mesma largura. Uma galáxia é pelo menos <em>duas vezes mais comprida do que larga</em> (na prática, bem
        mais que isso).
      </p>
      <p>
        Na placa de teste, das 11 manchas, as três compridas perto do meio são galáxias. Cada uma tem uns 16 pixels de
        comprimento e só uns 5 de largura. As outras oito têm entre 6 e 8 pixels para qualquer lado. Marcando as
        galáxias em azul:
      </p>
      <Figura imgs={[{ src: "/exemplos/dia01_marcado2.png", w: 480, h: 300, alt: "Placa de teste com 8 estrelas em verde, 3 galáxias em azul e os raios cósmicos em vermelho" }]} />
      <p>
        Sobram <em>8</em> estrelas de verdade.
      </p>
      <p>
        <em className="star">Quantas estrelas de verdade tem a sua placa?</em>
      </p>
    </>
  );
}
