import { Figura } from "../Figura";
import { Tabela25 } from "../Tabela25";

export function Parte1() {
  return (
    <>
      <p>
        Para reativar o rover de vez, a central precisa do <em>número de série</em> dele, que está escrito numa
        etiqueta colada no chassi. O rover estica o braço e tira uma foto. Vieram duas etiquetas, coladas tortas
        (foi um estagiário de 1987 que colou, você imagina) e chamuscadas por quase quarenta anos de sol.
      </p>
      <p>
        As etiquetas usam um código de barras antigo, o <em>2 de 5</em>. Ele só tem barras pretas de dois
        tamanhos: fina (<code>f</code>) e larga (<code>L</code>, três vezes a fina). Os espaços brancos entre as
        barras são sempre finos e não querem dizer nada.
      </p>
      <ul>
        <li>
          Todo código começa com <code>L L f</code> e termina com <code>L f L</code>.
        </li>
        <li>
          Entre o começo e o fim, cada dígito ocupa <em>5 barras</em>, sempre 2 largas e 3 finas:
        </li>
      </ul>
      <Tabela25 cab={["dígito", "barras"]} fina="f" larga="L" />
      <p>
        Cada etiqueta tem <em>12 dígitos</em>. O número de série é o da etiqueta <em>de cima</em>. Ela tem uma
        queimadura, mas só na parte de cima das barras.
      </p>
      <p>Na foto de teste, as etiquetas têm 4 dígitos, e a de cima diz <em>4207</em>:</p>
      <Figura imgs={[{ src: "/exemplos/dia07.png", w: 480, h: 360, alt: "Duas etiquetas com código de barras, tortas, sobre metal" }]} />
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
        momento dos anos 90 e um dos dígitos queimou inteiro: as cinco barras dele viraram uma mancha preta só.
      </p>
      <p>
        Felizmente, quem projetou a etiqueta pensou nisso. O último dígito é um <em>verificador</em>: multiplique
        os dígitos, da esquerda para a direita, alternadamente por 3 e por 1 (o primeiro por 3, o segundo por 1, o
        terceiro por 3...), some tudo, e o total sempre dá um múltiplo de 10.
      </p>
      <p>
        Na foto de teste, a etiqueta de baixo diz <code>8?50</code>. Como 8×3 + d×1 + 5×3 + 0×1 tem que ser
        múltiplo de 10, o dígito queimado é 1, e a chave é <em>8150</em>.
      </p>
      <p>
        <em className="star">Qual é a chave de ativação completa?</em>
      </p>
    </>
  );
}
