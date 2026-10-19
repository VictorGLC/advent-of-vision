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
        places, so it counts as one transient on each plate. Ordinary stars, which are almost all of them, show up
        on both and aren't transients.
      </p>
      <p>
        To make things worse, the telescope slipped between the two shots. Plate B shows the same sky{" "}
        <em>shifted</em>: everything moved by the same whole number of pixels horizontally and the same whole
        number vertically, up to 200 on each axis. There's no rotation or change of scale. Since both plates are
        the same size, each one ends up seeing a strip of sky the other doesn&apos;t. In that strip there&apos;s no
        way to tell whether an object is a transient, so it&apos;s left out. CIDA set the rules like this:
      </p>
      <ul>
        <li>
          An object is the same as on Day 1: pixels with brightness <code>&gt;= 100</code>, stuck together side by
          side or diagonally, 6 pixels or more. An object&apos;s position is its center (the average position of its
          pixels).
        </li>
        <li>
          Only objects whose position falls in the part of the sky that <em>both plates</em> see count.
        </li>
        <li>
          With the plates aligned (that is, undoing the shift), an object has a match on the other plate if there&apos;s
          an object there within <em>3 pixels</em>. No match means it&apos;s a transient.
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
        Plate A has 25 objects and plate B has 27. The shift is such that whatever is at <code>(x, y)</code> on plate
        A shows up at <code>(x - 23, y + 11)</code> on plate B. For instance, the star at <code>(96, 12)</code> on
        plate A shows up at <code>(73, 23)</code> on plate B.
      </p>
      <p>
        With that shift, the part of the sky both plates see corresponds, on plate A, to columns 23 to 259 and rows
        0 to 168. On plate B, one object falls outside it (on the right edge). Inside the shared region, 23 objects
        appear on both plates. What&apos;s left are the transients, marked in red (the shared region is in blue):
      </p>
      <Figura
        imgs={[
          { src: "/exemplos/dia03_a_marcado.png", w: 520, h: 360, alt: "Plate A with the shared region and 2 transients marked" },
          { src: "/exemplos/dia03_b_marcado.png", w: 520, h: 360, alt: "Plate B with the shared region and 3 transients marked" },
        ]}
      />
      <ul>
        <li>
          only on plate A: the objects at <code>(120, 52)</code> and <code>(207, 60)</code>;
        </li>
        <li>
          only on plate B: the objects at <code>(25, 38)</code>, <code>(160, 116)</code> and <code>(60, 150)</code>{" "}
          (plate B positions).
        </li>
      </ul>
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
        CIDA wants to know how far each asteroid moved between the two photos. An asteroid leaves one transient on
        each plate: on plate A, it's where it was at the time of the first photo; on plate B, where it was at the
        time of the second. Stars that faded or brightened leave a single transient, on a single plate.
      </p>
      <p>To avoid confusion, CIDA guarantees two things:</p>
      <ul>
        <li>asteroids are slow: none moved more than 70 pixels between one photo and the other;</li>
        <li>apart from the two transients of the same asteroid, any other two transients are at least 75 pixels apart.</li>
      </ul>
      <p>
        The distance an asteroid moved is measured with the plates aligned, from the object&apos;s center on plate
        A to its center on plate B, brought over to the matching position on plate A. Round each distance to the
        nearest integer; CIDA wants the sum.
      </p>
      <p>
        In the example, the plate A transient at <code>(207, 60)</code> and the plate B transient at{" "}
        <code>(160, 116)</code> are the same asteroid. Undoing the shift, the plate B one corresponds to position{" "}
        <code>(183, 105)</code> on plate A. From <code>(207, 60)</code> to <code>(183, 105)</code> is 24 pixels
        horizontally and 45 vertically, so <em>51</em> pixels. The other three transients have nobody nearby:
        they&apos;re stars that changed brightness. The sum, in the example, is 51.
      </p>
      <p>
        <em className="star">What is the sum of the distances traveled by the asteroids on your plates?</em>
      </p>
    </>
  );
}
