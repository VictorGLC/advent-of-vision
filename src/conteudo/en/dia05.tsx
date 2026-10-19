import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        The burst caught a nice <em>star cluster</em> and Dr. Bento wants a proper photo of it. The probe obliges,
        but its 1985 gyroscope is tired: the probe shook during the exposure and the photo came out blurry.
      </p>
      <p>
        Each star, which should be a tiny dot, turned into a hazy little ball. Stars that were close together ran
        into each other and became a single <em>blob</em>, one continuous bright patch. Some blobs hold one star,
        others two, three, even five stuck together.
      </p>
      <p>
        The good news: the blur was mild. Inside each blob, every star still has its own brightest point, and
        between two neighboring stars the brightness always dips before rising again. It&apos;s only the size of
        the blob that&apos;s misleading.
      </p>
      <p>For example, this test photo is 240 by 150 pixels (shown twice as large, with the blobs labeled):</p>
      <Figura imgs={[{ src: "/exemplos/dia05_marcado.png", w: 480, h: 300, alt: "Six bright blobs labeled A to F" }]} />
      <ul>
        <li>
          blob <em>A</em>, top right, looks like a single patch but holds 4 stars, centered roughly at{" "}
          <code>(199, 25)</code>, <code>(209, 27)</code>, <code>(203, 33)</code> and <code>(210, 36)</code>;
        </li>
        <li>
          blob <em>C</em> has 3 stars, in a triangle;
        </li>
        <li>
          blobs <em>D</em> and <em>F</em> have 2 stars each;
        </li>
        <li>
          blobs <em>B</em> and <em>E</em> are single stars.
        </li>
      </ul>
      <p>
        That&apos;s 6 blobs, but <em>4 + 1 + 3 + 2 + 1 + 2 = 13</em> stars.
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
        Dr. Bento wants to catalog the <em>multiple systems</em>: blobs with three or more stars, which are groups
        of stars held together by gravity. He says he already knows all the pairs (you have your doubts).
      </p>
      <p>
        In the test photo, blob A has 4 stars and C has 3; the others have 1 or 2. So <em>2</em> blobs have three or
        more stars.
      </p>
      <p>
        <em className="star">How many blobs in your photo have three or more stars?</em>
      </p>
    </>
  );
}
