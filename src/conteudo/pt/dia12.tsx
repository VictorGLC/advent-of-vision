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
        <code>LEIA-ME</code>, gravado pela equipe original em 1985. É uma imagem em tons de cinza, mas o formato da
        época não guardava largura nem altura: só uma fila de pixels, um atrás do outro, a primeira linha inteira,
        depois a segunda, depois a terceira.
      </p>
      <p>
        Quem converteu para PNG não sabia a largura original. Chutou <em>1000</em>: pegou os primeiros 1000 pixels
        da fila como a primeira linha do PNG, os 1000 seguintes como a segunda, e assim por diante, completando o
        fim da última linha com zeros (preto). O resultado parece ruído.
      </p>
      <p>
        Por exemplo, este arquivo de teste (ampliado oito vezes) foi salvo com 50 pixels de largura e 13 linhas:
      </p>
      <Figura imgs={[{ src: "/exemplos/dia12.png", w: 50, h: 13, alt: "Faixa de pixels que parece ruído" }]} escala={8} />
      <p>
        A imagem original tinha <em>37</em> pixels de largura e 17 linhas, ou seja, 629 pixels. No arquivo, a
        primeira linha tem a linha 1 original inteira (37 pixels) e os 13 primeiros pixels da linha 2; a segunda
        linha do arquivo continua a linha 2 original, e assim por diante. Como 13 × 50 = 650, o arquivo termina com
        21 zeros de enchimento. Arrumando os mesmos 629 pixels em linhas de 37, a imagem volta ao normal.
      </p>
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
        Remontada com a largura certa, a imagem de teste mostra o número <em>42</em>, em branco sobre fundo escuro.
      </p>
      <p>
        A sua mostra o recado que a equipe de 1985 deixou para quem um dia achasse a Andorinha-3, com uma palavra em
        letras grandes. Ninguém na sala fala nada por um tempo. O Seu Jorge vai esquentar um café (no fogão, dessa
        vez).
      </p>
      <p>
        <em className="star">Qual é a palavra da mensagem?</em>
      </p>
    </>
  );
}
