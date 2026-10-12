import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        Em Lisboa já é de manhã, e o Dr. Bento acorda animado com os asteroides. Ele quer mais dados daquela região
        e pede para a sonda tirar uma <em>rajada</em>: 20 fotos seguidas, com o telescópio parado, apontado sempre
        para o mesmo lugar.
      </p>
      <p>
        As fotos chegam todas num arquivo só, lado a lado: <em>5 por linha</em>, em 4 linhas, na ordem em que foram
        tiradas. Para economizar energia, a sonda tirou cada uma com bem menos exposição que as placas de ontem, e
        elas vieram bem granuladas.
      </p>
      <p>
        Antes de qualquer coisa, a CIDA avisa: <em>SENSOR COM PIXELS DEFEITUOSOS.</em> Um pixel defeituoso fica{" "}
        <em>travado</em> num valor qualquer (aceso, apagado ou no meio do caminho) e não muda nunca, em nenhuma
        foto. Pixel bom sempre varia um pouquinho, nem que seja por causa do chuvisco.
      </p>
      <p>Por exemplo, nesta rajada de teste com 6 fotos de 64 por 40 pixels, 3 por linha (ampliada):</p>
      <Figura imgs={[{ src: "/exemplos/dia04.png", w: 192, h: 80, alt: "Seis fotos granuladas lado a lado" }]} escala={4} />
      <p>
        o sensor tem <em>3</em> pixels travados.
      </p>
      <p>
        <em className="star">Quantos pixels do sensor estão travados na sua rajada?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Com os defeitos mapeados, vem a parte que interessa. Nenhuma foto da rajada presta sozinha: tem estrela
        fraca demais, que se perde no chuvisco. Mas são 20 fotos da mesmíssima coisa...
      </p>
      <p>
        O Dr. Bento quer saber quantas estrelas existem de verdade naquele pedaço de céu. Estrela é uma manchinha
        de alguns pixels; um pixel travado, aceso ou não, não é estrela (agora você sabe quais são).
      </p>
      <p>
        Na rajada de teste, juntando as 6 fotos aparecem <em>4</em> estrelas, duas delas impossíveis de ver numa
        foto só.
      </p>
      <p>
        <em className="star">Quantas estrelas aparecem quando você junta as fotos da sua rajada?</em>
      </p>
    </>
  );
}
