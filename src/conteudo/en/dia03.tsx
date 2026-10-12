import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        Packet unlocked. Inside are two photos of the same patch of sky, plate <em>A</em> and plate <em>B</em>,
        taken a few hours apart, plus a note from CIDA, the onboard computer, which only writes in capitals:{" "}
        <em>TRANSIENTS DETECTED. CONFIRM ON GROUND.</em>
      </p>
      <p>
        A transient is any object that's on one plate and not on the other. It could be a variable star that faded,
        one that brightened, or an asteroid that moved. An asteroid shows up on both plates, just in different
        places, so it counts as one transient on each plate.
      </p>
      <p>
        To make things worse, the telescope slipped between the two shots. Plate B shows the same sky{" "}
        <em>shifted by a whole number of pixels</em> on each axis, 200 at most. There's no rotation or change of
        scale, but each plate ends up seeing a strip of sky the other doesn't. When checking:
      </p>
      <ul>
        <li>
          An object is the same as on Day 1 (brightness <code>&gt;= 100</code>, diagonals count as neighbors, 6
          pixels or more). An object's position is its center.
        </li>
        <li>
          Only objects in the part of the sky that <em>both plates</em> see count.
        </li>
        <li>
          With the plates aligned, an object has a match on the other plate if there's an object within{" "}
          <em>3 pixels</em> of it.
        </li>
      </ul>
      <p>For example, these two test plates are 260 by 180 pixels each:</p>
      <Figura
        imgs={[
          { src: "/exemplos/dia03_a.png", w: 260, h: 180, alt: "Test plate A" },
          { src: "/exemplos/dia03_b.png", w: 260, h: 180, alt: "Test plate B" },
        ]}
      />
      <p>
        Whatever is at <code>(x, y)</code> on plate A shows up at <code>(x - 23, y + 11)</code> on plate B. Inside
        the area both of them see, <em>2</em> objects exist only on plate A and <em>3</em> exist only on plate B.
      </p>
      <p>
        CIDA wants a confirmation number: the number of objects only on plate A times the number of objects only on
        plate B. In the example, <em>2 × 3 = 6</em>.
      </p>
      <p>
        <em className="star">What is the confirmation number for your plates?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        <em>CONFIRMED. ESTIMATE ASTEROID SPEEDS.</em>
      </p>
      <p>
        Asteroids are slow: none of them moved more than 70 pixels between the two photos. And luckily, any other
        two transients are at least 75 pixels apart, so there's no way to mix them up.
      </p>
      <p>
        For each asteroid, measure how many pixels it moved (with the plates aligned) and round to the nearest
        integer. CIDA wants the sum. In the example, only one of the transients is an asteroid, and it moved{" "}
        <em>51</em> pixels.
      </p>
      <p>
        <em className="star">What is the sum of the distances traveled by the asteroids on your plates?</em>
      </p>
    </>
  );
}
