import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        A câmera funciona. Você vai abrir o resto do pacote e o sistema trava tudo pedindo um{" "}
        <em>código de autenticação</em>. Ninguém anotou esse código em lugar nenhum, claro.
      </p>
      <p>
        Depois de muito fuçar, você acha a documentação da missão, um PDF escaneado de 1985 com uma mancha de café
        bem no meio. Pelo que dá para ler, o transmissor de emergência da Andorinha-3 não manda o código como
        texto. Ele pega uma foto colorida de uma nebulosa e <em>esconde o código no bit menos significativo</em> de
        um dos canais de cor. Cada pixel muda no máximo 1 em 255, o que olho nenhum percebe. Qual canal? A página
        que dizia isso foi arrancada.
      </p>
      <p>
        Nesta imagem de teste, por exemplo, o código escondido é <em>PIXEL42</em>:
      </p>
      <Figura imgs={[{ src: "/exemplos/dia02.png", w: 360, h: 120, alt: "Nebulosa colorida, sem nenhum texto visível" }]} escala={2} />
      <p>Pois é, não aparece. Mas está lá.</p>
      <p>
        O seu código tem <em>8 caracteres</em>, só letras maiúsculas e dígitos.{" "}
        <em className="star">Qual é o código de autenticação?</em>
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
        A página arrancada estava atrás da impressora, toda amassada. Só um pedaço dá para ler:{" "}
        <em>
          &quot;...o código reserva fica nos dois canais que sobraram. Nenhum dos dois diz nada sozinho; é preciso
          ler um contra o outro...&quot;
        </em>
      </p>
      <p>
        Na imagem de teste, o código reserva é <em>OK7</em>.
      </p>
      <p>
        <em className="star">Qual é o código reserva da sua imagem?</em>
      </p>
    </>
  );
}
