import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        Pouso perfeito. A equipe toda assistiu pela chamada de vídeo, do aeroporto de Lisboa, e o Dr. Bento chorou
        (ele diz que foi o pastel de nata).
      </p>
      <p>
        Logo depois do pouso, a sonda manda um último arquivo, que estava guardado desde o lançamento:{" "}
        <code>LEIA-ME</code>, gravado pela equipe original em 1985. O formato antigo guardava a imagem como uma
        fila única de pixels, um atrás do outro, linha por linha. Quem converteu para PNG não sabia a largura
        original, chutou <em>1000</em>, e completou o fim da última linha com zeros. O resultado parece ruído.
      </p>
      <p>
        Por exemplo, este arquivo de teste (ampliado) foi salvo com 50 pixels de largura, mas a imagem original
        tinha <em>37</em>:
      </p>
      <Figura imgs={[{ src: "/exemplos/dia12.png", w: 50, h: 13, alt: "Faixa de pixels que parece ruído" }]} escala={8} />
      <p>
        <em className="star">Qual era a largura original da imagem do LEIA-ME?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Remontada com a largura certa, a imagem do teste mostra o número <em>42</em>. A sua mostra o recado que a
        equipe de 1985 deixou para quem um dia achasse a Andorinha-3. Ninguém na sala fala nada por um tempo.
      </p>
      <p>
        <em className="star">Qual é a palavra da mensagem?</em>
      </p>
    </>
  );
}
