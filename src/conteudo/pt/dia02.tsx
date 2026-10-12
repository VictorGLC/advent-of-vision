import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        A câmera funciona. Você vai abrir o resto do pacote e o sistema trava tudo pedindo um{" "}
        <em>código de autenticação</em>. Ninguém anotou esse código em lugar nenhum, claro.
      </p>
      <p>
        Depois de muito fuçar, você acha a documentação da missão: um PDF escaneado de 1985 com uma mancha de café
        bem no meio. Pelo que dá para ler, o transmissor de emergência da Andorinha-3 não manda o código como texto,
        porque texto seria fácil demais de interceptar. Ele manda uma foto colorida de uma nebulosa, e o código vai
        escondido dentro dela.
      </p>
      <p>
        O truque é o seguinte. Cada pixel da foto tem três valores, vermelho (R), verde (G) e azul (B), cada um de 0
        a 255. Escrito em binário, cada valor tem 8 bits, e o último bit (o que vale 1) quase não muda nada na cor:
        trocar 214 por 215 é invisível. O transmissor desenha o código, letra por letra, <em>só nesse último bit</em>{" "}
        de <em>um</em> dos três canais. Onde o desenho passa, o último bit vale 1; fora dele, vale 0. Os outros 7
        bits continuam sendo a nebulosa.
      </p>
      <p>
        Qual dos três canais? O documento dizia, mas a página seguinte foi arrancada.
      </p>
      <p>
        Nesta imagem de teste, de 360 por 120 pixels (ampliada duas vezes), o código escondido é <em>PIXEL42</em>:
      </p>
      <Figura imgs={[{ src: "/exemplos/dia02.png", w: 360, h: 120, alt: "Nebulosa colorida, sem nenhum texto visível" }]} escala={2} />
      <p>
        Pois é, não aparece. Mas veja dois pixels vizinhos do meio da imagem. O de coluna 120 e linha 60 vale{" "}
        <code>(210, 110, 215)</code> e o do lado vale <code>(212, 140, 221)</code>. Os dois estão em cima do traço
        da letra I: o azul de ambos é ímpar (215 = <code>11010111</code>, 221 = <code>11011101</code>, os dois
        terminam em 1). Já o pixel da coluna 20, linha 10, longe do texto, vale <code>(190, 76, 176)</code>, e o
        último bit do azul é 0. No total, só uns 7% dos pixels da imagem de teste têm esse bit valendo 1, todos
        formando as letras.
      </p>
      <p>
        O seu código tem <em>8 caracteres</em>, só letras maiúsculas e dígitos, e a sua imagem não usa
        necessariamente o mesmo canal da imagem de teste.{" "}
        <em className="star">Qual é o código de autenticação escondido na sua imagem?</em>
      </p>
      <p>
        (Use o PNG original. Um print da tela ou uma conversão para JPEG apaga justamente o bit que você precisa.)
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Código aceito! O sistema pensa um pouco e pede outra coisa: o <em>código reserva</em>. Em 1985, pelo jeito,
        porta de cofre tinha duas chaves.
      </p>
      <p>
        A página arrancada estava atrás da impressora, toda amassada, e explica o resto. Os outros dois canais não
        foram deixados em paz: o último bit de cada um parece sorteado, metade dos pixels com 1 e metade com 0,
        sem desenho nenhum. Mas o sorteio não é independente.{" "}
        <em>
          &quot;...o código reserva fica nos dois canais que sobraram. Nenhum dos dois diz nada sozinho; é preciso
          ler um contra o outro. Onde eles concordam, é fundo. Onde discordam, é letra...&quot;
        </em>
      </p>
      <p>
        Na imagem de teste, olhando só o último bit do vermelho ou só o do verde, você vê chuvisco puro. Mas
        comparando os dois pixel a pixel, os lugares onde eles discordam formam o código reserva, <em>OK7</em>.
      </p>
      <p>
        <em className="star">Qual é o código reserva escondido na sua imagem?</em>
      </p>
    </>
  );
}
