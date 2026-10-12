/* eslint-disable @next/next/no-img-element */
import { Codigo } from "@/components/Codigo";
import { Input } from "@/components/Input";

export function Enunciado() {
  return (
    <>
      <p>
        A câmera funciona. Você já ia abrir o resto do pacote quando o sistema bloqueia tudo: os dados da sonda
        estão protegidos por um <em>código de autenticação</em>, e ninguém anotou o código em lugar nenhum.
        Clássico.
      </p>
      <p>
        Revirando a documentação da missão (um PDF escaneado de 1985 com manchas de café), você encontra a
        explicação. Para economizar banda, o transmissor de emergência da Andorinha-3 não manda o código em texto.
        Ele o <em>esconde dentro de uma imagem</em>: pega uma foto colorida de uma nebulosa e altera{" "}
        <em>apenas o bit menos significativo de um dos três canais de cor</em>, desenhando o código nesse bit. A
        diferença de brilho é de no máximo 1 em 255, invisível a olho nu. O documento não diz qual canal, porque a
        página seguinte foi arrancada.
      </p>
      <p>
        Por exemplo, nesta imagem de teste o código escondido é <em>TESTE42</em>:
      </p>
      <figure>
        <img
          className="px"
          src="/exemplos/dia02.png"
          width={720}
          height={240}
          alt="Imagem de exemplo: nebulosa colorida sem nenhum texto visível"
        />
        <figcaption>exemplos/dia02.png, 360 × 120, ampliada 2×. O código está aí, mesmo que você não veja.</figcaption>
      </figure>
      <p>
        O código do seu input tem <em>8 caracteres</em>, entre letras maiúsculas e dígitos.{" "}
        <em className="star">Qual é o código de autenticação?</em>
      </p>
      <Input
        arquivos={[{ src: "/inputs/dia02.png", alt: "Nebulosa roxa e rosa com estrelas coloridas" }]}
        largura={1600}
        altura={900}
        legenda="Seu input: dia02.png, 1600 × 900, RGB. Uma captura de tela ou um JPEG destrói o bit menos significativo: use o PNG original."
      />
    </>
  );
}

export function Resolucao() {
  return (
    <>
      <p>
        Extrair o plano de bit 0 de cada canal com <code>&amp; 1</code> e multiplicar por 255 para ver. Dois
        planos são ruído puro e o terceiro mostra o texto. Ler o código é a única etapa feita a olho, por design.
      </p>
      <Codigo>{`
# python dia02.py dia02.png  -> gera lsb_B.png, lsb_G.png, lsb_R.png
import sys
import cv2

img = cv2.imread(sys.argv[1])                 # OpenCV carrega em BGR
for i, canal in enumerate("BGR"):
    plano = (img[..., i] & 1) * 255           # bit menos significativo
    cv2.imwrite(f"lsb_{canal}.png", plano)
`}</Codigo>
      <figure>
        <img
          className="px"
          src="/solucoes/d2_lsb.png"
          width={360}
          height={360}
          loading="lazy"
          alt="Três planos de bit empilhados: vermelho e verde são ruído, azul mostra TESTE42"
        />
        <figcaption>Exemplo: planos de bit 0 dos canais R, G e B, de cima para baixo.</figcaption>
      </figure>
      <p className="trap">
        <b>A armadilha:</b> carregar a imagem com OpenCV e assumir ordem RGB; o canal certo é o azul, que é o
        índice 0 em BGR. Quem salvar uma cópia em JPEG ou abrir num editor que converta a cor perde a mensagem.{" "}
        <b>Atalho para automatizar a escolha do canal:</b> um plano de ruído tem cerca de 50% de uns; o plano com
        texto tem cerca de 4%.
      </p>
    </>
  );
}
