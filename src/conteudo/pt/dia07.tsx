import { Figura } from "../Figura";
import { Tabela25 } from "../Tabela25";

export function Parte1() {
  return (
    <>
      <p>
        Para reativar o rover de vez, a central precisa do <em>número de série</em> dele, que está numa etiqueta
        colada no chassi. O rover estica o braço e tira uma foto. Vieram duas etiquetas brancas sobre o metal,
        coladas tortas (foi um estagiário de 1987 que colou, você imagina) e chamuscadas por quase quarenta anos de
        sol. Os números impressos embaixo das barras já desbotaram, então o jeito é ler as barras.
      </p>
      <p>
        As etiquetas usam um código de barras antigo, o <em>2 de 5</em>. Ele só tem barras pretas de dois
        tamanhos: fina (<code>f</code>) e larga (<code>L</code>, três vezes mais larga que a fina). Os espaços
        brancos entre as barras são sempre finos e não querem dizer nada: só as larguras das barras pretas contam.
        Lendo da esquerda para a direita:
      </p>
      <ul>
        <li>
          todo código começa com as barras <code>L L f</code> e termina com <code>L f L</code>;
        </li>
        <li>
          no meio, cada dígito ocupa <em>5 barras</em> seguidas, sempre 2 largas e 3 finas, segundo esta tabela:
        </li>
      </ul>
      <Tabela25 cab={["dígito", "barras"]} fina="f" larga="L" />
      <p>
        Na foto de teste, as etiquetas têm 4 dígitos cada:
      </p>
      <Figura imgs={[{ src: "/exemplos/dia07.png", w: 480, h: 360, alt: "Duas etiquetas com código de barras, tortas, sobre metal" }]} />
      <p>
        A etiqueta de cima está inclinada uns 9 graus. Seguindo uma linha ao longo dela, por baixo da queimadura,
        as 26 barras pretas são:
      </p>
      <pre className="exemplo">
        {`L L f | f f L f L | f L f f L | f f L L f | f f f L L | L f L
início |    4      |    2      |    0      |    7      | fim`}
      </pre>
      <p>
        Então ela diz <em>4207</em>. Repare que, se você tentar ler a linha que passa pela queimadura, as barras do
        meio viram uma mancha só e a leitura não fecha: o começo e o fim são a sua garantia de que leu certo.
      </p>
      <p>
        No seu input, cada etiqueta tem <em>12 dígitos</em>. O número de série é o da etiqueta <em>de cima</em>,
        que também tem uma queimadura, mas só na parte de cima das barras.
      </p>
      <p>
        <em className="star">Qual é o número de série do rover?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        A etiqueta de baixo é a <em>chave de ativação</em>. Só que um micrometeorito passou por ela em algum
        momento dos anos 90 e um dos dígitos queimou de cima a baixo: as cinco barras dele viraram uma mancha preta
        só, larga demais para ser barra. Os outros dígitos estão inteiros.
      </p>
      <p>
        Felizmente, quem projetou a etiqueta pensou nisso. O último dígito é um <em>verificador</em>: multiplique
        os dígitos, da esquerda para a direita, alternadamente por 3 e por 1 (o primeiro por 3, o segundo por 1, o
        terceiro por 3, e assim por diante, incluindo o último), some tudo, e o total sempre dá um múltiplo de 10.
      </p>
      <p>
        Na foto de teste, a etiqueta de baixo começa com <code>L L f</code>, depois tem as barras do 8, a mancha
        queimada, as barras do 5 e as do 0, e termina com <code>L f L</code>. Então ela diz <code>8?50</code>. Como{" "}
        <code>8×3 + ?×1 + 5×3 + 0×1 = 39 + ?</code> tem que ser múltiplo de 10, o dígito queimado é 1, e a chave é{" "}
        <em>8150</em>.
      </p>
      <p>
        <em className="star">Qual é a chave de ativação completa, com os 12 dígitos?</em>
      </p>
    </>
  );
}
