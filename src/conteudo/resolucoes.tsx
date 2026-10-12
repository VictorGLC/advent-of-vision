// Notas de resolução de cada dia, mostradas só em /login depois de entrar.
// Os scripts ficam em /solucoes e são lidos do disco pela página.

export type Resolucao = {
  dia: number;
  resposta: string;
  exemplo: string;
  abordagem: React.ReactNode;
  scripts: { arquivo: string; titulo: string; uso: string }[];
  imagem: { nome: string; largura: number; altura: number; legenda: string };
  notas: React.ReactNode;
};

export const RESOLUCOES: Resolucao[] = [
  {
    dia: 1,
    resposta: "1873",
    exemplo: "11",
    abordagem: (
      <p>
        A definição do enunciado já é o algoritmo. Limiariza em 100, rotula componentes conexos com vizinhança 8
        e conta os que têm 6 pixels ou mais. A versão na mão faz a rotulagem com uma busca em largura partindo de
        cada pixel aceso ainda não visitado.
      </p>
    ),
    scripts: [
      { arquivo: "dia01_opencv.py", titulo: "OpenCV", uso: "python dia01_opencv.py dia01.png" },
      { arquivo: "dia01_manual.py", titulo: "Pillow + NumPy, na mão", uso: "python dia01_manual.py dia01.png" },
    ],
    imagem: {
      nome: "d1_resolvido.png",
      largura: 480,
      altura: 300,
      legenda: "Exemplo resolvido: 11 estrelas (verde) e 6 raios cósmicos (vermelho).",
    },
    notas: (
      <>
        <p>
          <em>Armadilha:</em> contar componentes sem filtrar por área dá 2773, porque soma os 900 raios cósmicos.
          Usar Otsu em vez do limiar do enunciado também muda o resultado.
        </p>
        <p>
          <em>Margem:</em> no limiar 100, o maior raio cósmico tem 2 pixels e a menor estrela tem 23. A resposta
          não muda com limiar entre 70 e 170, área mínima entre 3 e 12, nem trocando vizinhança 8 por 4.
        </p>
        <p>
          <em>Tempo:</em> OpenCV ~0,4 s; BFS em Python ~1 s (só percorre os pixels acesos).
        </p>
      </>
    ),
  },
  {
    dia: 2,
    resposta: "KX7VEGA3",
    exemplo: "TESTE42",
    abordagem: (
      <p>
        Extrai o bit 0 de cada canal com <code>&amp; 1</code>. Dois planos são ruído (50% de uns) e o terceiro
        mostra o texto (4% de uns). Ler o código é a única etapa feita a olho, de propósito. A versão na mão
        escolhe o canal sozinha pela fração de uns e desenha o texto em ASCII no terminal.
      </p>
    ),
    scripts: [
      { arquivo: "dia02_opencv.py", titulo: "OpenCV", uso: "python dia02_opencv.py dia02.png" },
      { arquivo: "dia02_manual.py", titulo: "Pillow + NumPy, na mão", uso: "python dia02_manual.py dia02.png" },
    ],
    imagem: {
      nome: "d2_lsb.png",
      largura: 360,
      altura: 360,
      legenda: "Exemplo: planos de bit 0 dos canais R, G e B, de cima para baixo.",
    },
    notas: (
      <>
        <p>
          <em>Armadilha:</em> o OpenCV carrega em BGR, então quem assume RGB procura no canal errado (o azul é o
          índice 0). Salvar uma cópia em JPEG, tirar print ou abrir num editor que converte cor apaga a mensagem.
        </p>
        <p>
          <em>Ponto para discutir:</em> é o único dia em que a resposta não sai 100% automática. Dá para
          automatizar com OCR, mas a ideia era o puzzle ser sobre achar o canal, não sobre ler texto.
        </p>
      </>
    ),
  },
  {
    dia: 3,
    resposta: "832",
    exemplo: "6",
    abordagem: (
      <p>
        Três etapas: detectar os objetos nas duas placas, achar a translação e casar os objetos por distância. A
        versão OpenCV acha a translação com <code>cv2.phaseCorrelate</code> nas imagens inteiras. A versão na mão
        faz votação: cada par (objeto de A, objeto de B) vota em <code>b - a</code>, e o deslocamento verdadeiro
        recebe um voto por estrela em comum (1283 votos contra 6 do segundo colocado). Depois leva B para o
        referencial de A, descarta o que está fora da região comum e conta quem não tem vizinho a até 3 px.
      </p>
    ),
    scripts: [
      {
        arquivo: "dia03_opencv.py",
        titulo: "OpenCV (correlação de fase)",
        uso: "python dia03_opencv.py dia03_a.png dia03_b.png",
      },
      {
        arquivo: "dia03_manual.py",
        titulo: "Pillow + NumPy, na mão (votação)",
        uso: "python dia03_manual.py dia03_a.png dia03_b.png",
      },
    ],
    imagem: {
      nome: "d3_resolvido.png",
      largura: 606,
      altura: 210,
      legenda: "Exemplo resolvido: região comum (azul), transientes (vermelho), estrela fora da região comum (cinza).",
    },
    notas: (
      <>
        <p>
          <em>Armadilhas:</em> subtrair as placas sem alinhar acende quase tudo (2813 objetos na diferença).
          Alinhar e esquecer de recortar a região comum faz cada estrela da faixa que só uma placa vê contar como
          transiente, e a resposta vira 18078. O fundo da placa B é mais claro, mas fica bem abaixo do limiar.
        </p>
        <p>
          <em>Margem:</em> a resposta não muda com limiar entre 85 e 140, área mínima entre 3 e 8, vizinhança 4 ou
          8, tolerância de casamento entre 1,5 e 6 px, nem trocando votação por correlação de fase. Nenhuma estrela
          fica a menos de 10 px da borda da região comum.
        </p>
        <p>
          <em>Detalhe:</em> no exemplo do enunciado, B = A + (-23, +11); no input, B = A + (-137, +58). Os 26 e 32
          transientes incluem 9 asteroides, que contam uma vez em cada placa.
        </p>
      </>
    ),
  },
];
