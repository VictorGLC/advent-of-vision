import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        The burst caught a nice <em>star cluster</em> and Dr. Bento wants a proper photo of it. The probe obliges,
        but its 1985 gyroscope is tired: the probe shook during the exposure and the photo came out blurry.
        Neighboring stars ran together into blobs, some holding a single star, others several.
      </p>
      <p>The good news: the blur was mild. Inside each blob, every star still has its own brightest point.</p>
      <p>For example, in this test photo (shown twice as large):</p>
      <Figura imgs={[{ src: "/exemplos/dia05.png", w: 240, h: 150, alt: "Bright blobs, some with several stars stuck together" }]} escala={2} />
      <p>
        there are 6 blobs with <em>13</em> stars in total.
      </p>
      <p>
        <em className="star">How many stars are in your photo?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Dr. Bento wants to catalog the <em>multiple systems</em>: the blobs with three or more stars. He says he
        already knows all the pairs (you have your doubts).
      </p>
      <p>
        In the test photo, <em>2</em> blobs have three or more stars.
      </p>
      <p>
        <em className="star">How many blobs in your photo have three or more stars?</em>
      </p>
    </>
  );
}
