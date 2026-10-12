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
        file in the packet is a <em>calibration plate</em>: a photo of a star field that the manual says to check
        against the catalog.
      </p>
      <p>
        Four decades in space leave their mark, though. The sensor is full of <em>cosmic rays</em>, particles that
        hit the chip and lit up one or two stray pixels. Those aren't stars and don't count. According to the camera
        manual:
      </p>
      <ul>
        <li>
          Every pixel with brightness <code>&gt;= 100</code> belongs to some object.
        </li>
        <li>Object pixels that touch, diagonals included, belong to the same object.</li>
        <li>
          An object with <em>6 pixels or more</em> is a star. Anything smaller is a cosmic ray.
        </li>
      </ul>
      <p>Take this test plate, 160 by 100 pixels (shown three times larger):</p>
      <Figura imgs={[{ src: "/exemplos/dia01.png", w: 160, h: 100, alt: "Test plate with bright blobs and stray dots" }]} escala={3} />
      <p>
        It has 17 objects. Six of them are specks of one or two pixels, so cosmic rays, which leaves{" "}
        <em>11</em> stars.
      </p>
      <p>
        Your plate is a lot bigger. <em className="star">How many stars are on it?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        You send the number to Dr. Bento, the mission lead. He replies with a four-minute voice message that, minus
        the restaurant noise, boils down to: &quot;way too high&quot;.
      </p>
      <p>
        Looking closer at the plate, you can see why. Not everything on it is round: some blobs are long and
        stretched to one side. Those aren't stars, they're <em>galaxies</em>, much, much farther away, and the 1985
        catalog doesn't list galaxies. Stars are round; galaxies are at least <em>twice</em> as long as they are
        wide.
      </p>
      <p>
        On the test plate, 3 of the 11 blobs are galaxies, so it only has <em>8</em> actual stars.
      </p>
      <p>
        <em className="star">How many actual stars are on your plate?</em>
      </p>
    </>
  );
}
