import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        It's been 41 years since the <em>Andorinha-3</em> probe lifted off from Alcântara, Brazil, and last night,
        after twenty years of silence, it sent home a data packet. The software that was supposed to process it
        crashed first thing in the morning, the whole team is at a conference in Lisbon (eating custard tarts,
        according to the group chat), and the person on the night shift is you.
      </p>
      <p>
        Before trusting anything the probe sent, someone has to check whether the camera still works. The first
        file in the packet is a <em>calibration plate</em>, a grayscale photo of a star field. The manual says to
        count the stars and check the number against the catalog.
      </p>
      <p>
        Four decades in space leave their mark, though. The sensor is full of <em>cosmic rays</em>: particles that
        hit the chip and lit up one or two stray pixels. Those aren't stars and don't count. The camera manual,
        written at a time when nobody trusted anybody, spells everything out:
      </p>
      <ul>
        <li>
          Each pixel has a brightness from 0 (black) to 255 (white). A pixel with brightness <code>&gt;= 100</code>{" "}
          belongs to some <em>object</em>; anything below that is sky.
        </li>
        <li>
          Two object pixels that touch, side by side or diagonally, belong to the <em>same</em> object. So an
          object is a group of bright pixels stuck together, separated from other groups by sky.
        </li>
        <li>
          An object with <em>6 pixels or more</em> is a star. Anything smaller is a cosmic ray.
        </li>
      </ul>
      <p>For example, this test plate is 160 by 100 pixels (shown three times larger):</p>
      <Figura imgs={[{ src: "/exemplos/dia01.png", w: 160, h: 100, alt: "Test plate with bright blobs and stray dots" }]} escala={3} />
      <p>
        Following the manual, it has 17 objects. Eleven of them are big blobs, between 28 and 70 pixels each. The
        other six are specks: four of 2 pixels and two of just 1 pixel. Those six are cosmic rays and are left out.
        Marking the stars in green and the rays in red:
      </p>
      <Figura imgs={[{ src: "/exemplos/dia01_marcado1.png", w: 480, h: 300, alt: "Test plate with 11 stars circled in green and 6 cosmic rays in red" }]} />
      <p>
        So the test plate has <em>11</em> stars.
      </p>
      <p>
        Your plate is a lot bigger, with cosmic rays everywhere.{" "}
        <em className="star">According to the manual, how many stars are on it?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        You send the number to Dr. Bento, the mission lead. He replies with a four-minute voice message that, minus
        the restaurant noise, boils down to: &quot;way too high&quot;. The catalog has far fewer stars in that
        region.
      </p>
      <p>
        Looking closer at the plate, you can see why. Not every blob is round: some are long and stretched to one
        side, like a cigar. Those aren't stars, they're <em>galaxies</em>, a billion times farther away, and the
        1985 catalog doesn't list galaxies. The camera manual, of course, says nothing about this: in 1985 the lens
        couldn't see that far.
      </p>
      <p>
        The difference is easy to spot. A star is round: measured in any direction, it's about the same width. A
        galaxy is at least <em>twice as long as it is wide</em> (in practice, a lot more than that).
      </p>
      <p>
        On the test plate, the three blobs near the middle are galaxies. Each is about 16 pixels long and only about
        5 pixels wide. The other eight measure between 6 and 8 pixels in any direction. Marking the galaxies in blue:
      </p>
      <Figura imgs={[{ src: "/exemplos/dia01_marcado2.png", w: 480, h: 300, alt: "Test plate with 8 stars in green, 3 galaxies in blue and the cosmic rays in red" }]} />
      <p>
        That leaves <em>8</em> actual stars.
      </p>
      <p>
        <em className="star">How many actual stars are on your plate?</em>
      </p>
    </>
  );
}
