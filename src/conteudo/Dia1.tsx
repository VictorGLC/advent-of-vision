/* eslint-disable @next/next/no-img-element */
export function Enunciado() {
  return (
    <>
      <p>
        Faz 41 anos que a sonda <em>Andorinha-3</em> saiu de Alcântara, e ontem à noite, depois de vinte anos
        calada, ela mandou um pacote de dados. O programa que deveria processar tudo travou logo cedo, a equipe
        inteira está num congresso em Lisboa e quem ficou de plantão foi você.
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
      <figure>
        <img
          src="/exemplos/dia01.png"
          width={480}
          height={300}
          alt="Placa de teste: estrelas borradas e alguns pontinhos soltos num fundo escuro"
        />
      </figure>
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
