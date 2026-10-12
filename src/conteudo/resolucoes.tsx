// Notas de resolução de cada dia, mostradas só em /login depois de entrar.
// Os scripts ficam em /solucoes; as respostas vêm de puzzles/gabarito.json.

export type Resolucao = {
  dia: number;
  args: string;
  abordagem: React.ReactNode;
  notas: React.ReactNode;
};

export const RESOLUCOES: Resolucao[] = [
  {
    dia: 1,
    args: "dia01.png",
    abordagem: (
      <p>
        Parte 1: limiar em 100, componentes conexos com vizinhança 8, conta os de 6 pixels ou mais. Parte 2: para
        cada objeto, a razão entre os eixos da elipse equivalente (autovalores da covariância dos pixels, ou momentos
        de segunda ordem); estrela fica perto de 1, galáxia passa de 2.
      </p>
    ),
    notas: (
      <>
        <p>
          <em>Armadilha:</em> sem o filtro de área dá 2773 (soma os 900 raios cósmicos).
        </p>
        <p>
          <em>Margem da parte 2:</em> com limiar entre 80 e 140, a razão de eixos das estrelas vai até 1,29 e a das
          galáxias começa em 2,47. Qualquer corte entre 1,3 e 2,4 dá a mesma resposta. É a primeira vez que o
          aluno precisa de um descritor de forma.
        </p>
      </>
    ),
  },
  {
    dia: 2,
    args: "dia02.png",
    abordagem: (
      <p>
        Parte 1: plano de bit 0 de cada canal; dois são ruído (50% de uns) e o azul tem o texto (3,5%). Parte 2: R
        e G são ruído cada um, mas R xor G (ou |R - G| nos bits 0) mostra o segundo código. Ler o texto é a única
        etapa a olho, de propósito.
      </p>
    ),
    notas: (
      <p>
        <em>Armadilha:</em> o OpenCV carrega em BGR, então quem assume RGB procura no canal errado. JPEG ou print
        apagam a mensagem. A dica da parte 2 (&quot;ler um contra o outro&quot;) é o que mais pode precisar de ajuste:
        vale testar com alguém se fica claro sem entregar o xor.
      </p>
    ),
  },
  {
    dia: 3,
    args: "dia03_a.png dia03_b.png",
    abordagem: (
      <p>
        Detectar objetos nas duas placas, achar a translação (correlação de fase ou votação de pares b - a), levar B
        para o referencial de A, ficar só com a região comum e casar por distância (3 px). Parte 2: cada transiente
        de A cujo transiente de B mais próximo está a menos de 70 px é um asteroide; soma as distâncias arredondadas.
      </p>
    ),
    notas: (
      <>
        <p>
          <em>Armadilhas:</em> subtrair as placas sem alinhar; esquecer de recortar a região comum (a resposta
          vira dezenas de milhares).
        </p>
        <p>
          <em>Margem:</em> os asteroides andam vetores inteiros com comprimento inteiro (trios pitagóricos); o erro
          medido no centroide fica abaixo de 0,2 px, longe do 0,5 que mudaria o arredondamento. Na votação, o
          deslocamento certo tem 1285 votos contra 7 do segundo lugar.
        </p>
      </>
    ),
  },
  {
    dia: 4,
    args: "dia04.png 20 5",
    abordagem: (
      <p>
        Cortar a folha em 20 fotos (5 por linha) e empilhar. Parte 1: pixel travado = mínimo igual ao máximo ao longo
        da pilha. Parte 2: média (ou mediana) das 20 fotos derruba o ruído em √20; troca os pixels travados pelo
        fundo e conta manchas acima do fundo.
      </p>
    ),
    notas: (
      <>
        <p>
          <em>Armadilha:</em> esquecer de tirar os pixels travados na parte 2 soma uns 20 a mais (os travados em
          valor alto viram &quot;estrelas&quot;). É a ponte entre as partes.
        </p>
        <p>
          <em>Margem:</em> com borrão leve (σ=1), a contagem fica em 219 para limiares de 8 a 20 acima do fundo e
          área mínima de 3 a 8. Numa foto só não existe platô: a contagem só passa por 219 de raspão.
        </p>
      </>
    ),
  },
  {
    dia: 5,
    args: "dia05.png",
    abordagem: (
      <p>
        Parte 1: máximos locais (dilatação e comparação, ou janela 5x5) acima do fundo, depois de um borrão leve.
        Parte 2: borrões = componentes conexos acima do fundo; conta os que contêm 3 picos ou mais.
      </p>
    ),
    notas: (
      <>
        <p>
          <em>Margem:</em> 969 estrelas com borrão de σ 0,7 a 1,5, janelas de 3 a 7 e limiares de 30 a 100 acima do
          fundo. A separação entre estrelas de um borrão é de 2,7 a 3,3 σ, o que garante um vale entre os picos.
        </p>
        <p>
          <em>Armadilha:</em> só subir o limiar para separar os borrões perde as estrelas mais fracas. Watershed
          também resolve.
        </p>
      </>
    ),
  },
  {
    dia: 6,
    args: "dia06.png",
    abordagem: (
      <p>
        Escuro relativo à vizinhança (imagem menos borrão grande), fechamento para cobrir as falhas de poeira,
        componentes que encostam no módulo = rastros; o maior em área (ou em caminho geodésico a partir do módulo) é
        o mais longo, e o rover é o quadradinho claro mais perto dele. Parte 2: abertura com disco maior que a
        largura do rastro sobra só com os discos das paradas; conta os que tocam o rastro.
      </p>
    ),
    notas: (
      <>
        <p>
          <em>Margem:</em> área do rastro mais longo 5044 px contra 3229 do segundo (limiar −28, fechamento de 9 a
          21). A parte 2 dá 6 com aberturas de 7 a 11 px.
        </p>
        <p>
          <em>Armadilhas:</em> limiar global (o chão tem manchas grandes); juntar os rastros perto do módulo, onde
          eles se encostam.
        </p>
      </>
    ),
  },
  {
    dia: 7,
    args: "dia07.png 12",
    abordagem: (
      <p>
        Achar as etiquetas (regiões claras), medir a inclinação (minAreaRect ou PCA), endireitar, ler o perfil de
        uma linha, medir a largura de cada barra escura e classificar em fina, larga ou queimada. Parte 2: o dígito
        queimado sai pelo verificador (pesos 3, 1, 3, 1...).
      </p>
    ),
    notas: (
      <p>
        <em>Detalhes:</em> depois de endireitar, a barra fina tem 2 ou 3 px e a larga 8 ou 9; o corte entre elas
        fica no meio (2,5 vezes a fina). A barra vizinha da queimadura engorda 1 px, então um corte em 2 vezes a
        fina erra. A etiqueta de cima tem queimadura só na parte de cima das barras: é preciso escolher a linha.
      </p>
    ),
  },
  {
    dia: 8,
    args: "dia08.png 8",
    abordagem: (
      <p>
        Parte 1: cada borda vira uma chave (o menor entre ela e ela ao contrário); ladrilho de canto é o que tem
        duas bordas sem par. Parte 2: começa por um canto virado com as bordas soltas para cima e para a esquerda e
        vai encaixando, testando as 8 orientações de cada candidato.
      </p>
    ),
    notas: (
      <p>
        É o dia mais &quot;algoritmo&quot; e menos &quot;imagem&quot; (inspirado no dia 20 do AoC 2020). Bordas
        conferidas no gerador: só vizinhos de verdade compartilham borda.
      </p>
    ),
  },
  {
    dia: 9,
    args: "dia09.png",
    abordagem: (
      <p>
        Parte 1: FFT, achar o par de picos da listra forte (fora das frequências baixas), zerar (notch), voltar e
        borrar um pouco para ler o número. Um borrão gaussiano forte sozinho também revela o número. Parte 2: um
        passa-altas acima da primeira listra isola a segunda; a energia local ao longo de x vira o Morse.
      </p>
    ),
    notas: (
      <p>
        <em>Detalhes:</em> listra forte com período de 8,6 px, a fraca com 3,7 px. A FFT trata a imagem como
        periódica, então as bordas aparecem como energia alta: é preciso ignorar uns 10 px nas bordas. Conferi a
        olho que o número não aparece na imagem original.
      </p>
    ),
  },
  {
    dia: 10,
    args: "dia10_a.png dia10_b.png",
    abordagem: (
      <p>
        Estrelas (centroide ponderado e fluxo) nas duas placas. Ângulo por busca: para cada ângulo candidato, gira B
        e vota a translação como no Dia 3; o ângulo com mais votos ganha. Depois casa as estrelas e ajusta a rotação
        por mínimos quadrados (estimateAffinePartial2D ou Kabsch). Parte 2: razão de fluxo B/A dos pares casados;
        a variável é a de razão mínima.
      </p>
    ),
    notas: (
      <p>
        <em>Margem:</em> 732 estrelas casadas, ângulo estimado 17,300° (o certo é 17,3). Razão típica 1,29, a da
        variável 0,40. Leva uns 20 s em Python por causa da busca do ângulo.
      </p>
    ),
  },
  {
    dia: 11,
    args: "dia11_esq.png dia11_dir.png",
    abordagem: (
      <p>
        Casamento por blocos (StereoBM, ou na mão: para cada d, |esquerda(x) - direita(x - d)| somado numa janela, e
        fica o d de menor custo). Chão com disparidade 8; pedras são regiões com disparidade maior. Parte 2: Z = 400
        / d da pedra mais próxima.
      </p>
    ),
    notas: (
      <p>
        É um estereograma de pontos aleatórios: sem casamento, nenhuma imagem mostra nada. Chão a 50 m (d = 8), a
        pedra mais próxima tem d = 25.
      </p>
    ),
  },
  {
    dia: 12,
    args: "dia12.png",
    abordagem: (
      <p>
        Achatar a imagem numa sequência e procurar a largura W em que o pixel i e o pixel i + W são mais parecidos
        (diferença média mínima ou pico da autocorrelação), ignorando larguras minúsculas. Parte 2: remontar com a
        largura certa e ler.
      </p>
    ),
    notas: <p>Dia de encerramento, mais leve de propósito (como o dia 25 do AoC).</p>,
  },
];
