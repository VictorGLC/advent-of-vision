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
        primeiro arquivo do pacote é uma <em>placa de calibração</em>, uma foto de um campo de estrelas que o
        manual manda conferir com o catálogo.
      </p>
      <p>
        Só que quatro décadas no espaço deixam marcas. O sensor está cheio de <em>raios cósmicos</em>, partículas
        que bateram no chip e acenderam um ou dois pixels soltos. Isso não é estrela e não entra na conta. Segundo
        o manual da câmera:
      </p>
      <ul>
        <li>
          Todo pixel com brilho <code>&gt;= 100</code> faz parte de algum objeto.
        </li>
        <li>Pixels de objeto que se encostam, inclusive pela diagonal, são do mesmo objeto.</li>
        <li>
          Objeto com <em>6 pixels ou mais</em> é estrela. Menor que isso é raio cósmico.
        </li>
      </ul>
      <p>Veja esta placa de teste, com 160 por 100 pixels (aqui ampliada três vezes):</p>
      <Figura imgs={[{ src: "/exemplos/dia01.png", w: 160, h: 100, alt: "Placa de teste com manchas claras e pontinhos soltos" }]} escala={3} />
      <p>
        Dá para achar 17 objetos nela. Seis são pontinhos de um ou dois pixels, ou seja, raios cósmicos, e sobram{" "}
        <em>11</em> estrelas.
      </p>
      <p>
        A sua placa é bem maior. <em className="star">Quantas estrelas tem nela?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Você manda o número para o Dr. Bento, o chefe da missão. Ele responde com um áudio de quatro minutos que,
        tirando o barulho do restaurante, se resume a: &quot;tá alto demais&quot;.
      </p>
      <p>
        Olhando a placa de perto, dá para entender. Nem tudo ali é redondo: algumas manchas são compridas,
        esticadas para um lado. Isso não é estrela, é <em>galáxia</em>, muito, muito mais longe, e o catálogo de
        1985 não conta galáxia. As estrelas são redondinhas; as galáxias são pelo menos <em>duas vezes</em> mais
        compridas do que largas.
      </p>
      <p>
        Na placa de teste, 3 das 11 manchas são galáxias, então ela tem só <em>8</em> estrelas de verdade.
      </p>
      <p>
        <em className="star">Quantas estrelas de verdade tem a sua placa?</em>
      </p>
    </>
  );
}
