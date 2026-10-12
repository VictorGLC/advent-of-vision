/* eslint-disable @next/next/no-img-element */
export function Enunciado() {
  return (
    <>
      <p>
        A câmera funciona. Você vai abrir o resto do pacote e o sistema trava tudo pedindo um{" "}
        <em>código de autenticação</em>. Ninguém anotou esse código em lugar nenhum, claro.
      </p>
      <p>
        Depois de muito fuçar, você acha a documentação da missão, um PDF escaneado de 1985 com uma mancha de café
        bem no meio. Pelo que dá para ler, o transmissor de emergência da Andorinha-3 não manda o código como
        texto. Ele pega uma foto colorida de uma nebulosa e{" "}
        <em>esconde o código no bit menos significativo de um dos canais de cor</em>. Cada pixel muda no máximo 1
        em 255, o que olho nenhum percebe. Qual canal? A página que dizia isso foi arrancada.
      </p>
      <p>
        Nesta imagem de teste, por exemplo, o código escondido é <em>TESTE42</em>:
      </p>
      <figure>
        <img
          src="/exemplos/dia02.png"
          width={720}
          height={240}
          alt="Imagem de teste: uma nebulosa colorida, sem nenhum texto visível"
        />
      </figure>
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
