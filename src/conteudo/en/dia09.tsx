import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        The rover&apos;s next transmission is a photo of the module&apos;s <em>ID plate</em>, with the number mission
        control needs to send commands straight to it. But the photo arrives covered in stripes, and the number is
        lost among them.
      </p>
      <p>
        Nobody can figure out where the stripes come from until Seu Jorge, the night watchman, mentions that he
        always heats up his lunch around three in the morning in the break room microwave, right on the other side
        of the wall from the radio room. (This really happened: a radio telescope in Australia spent years picking up
        mysterious signals that turned out to be the kitchen microwave.)
      </p>
      <p>
        At least the damage is well behaved. The interference <em>added</em> a pattern of straight, parallel stripes
        on top of the photo: the brightness rises and falls smoothly, always at the same pace, like a wave, and the
        crest of each stripe is always the same distance from the next. All stripes have the same direction, the
        same width and the same strength, from one end of the image to the other. The rest of the photo is intact
        underneath.
      </p>
      <p>
        The trouble is that the plate is subtle: the number is engraved into it and is only a tiny bit darker than
        the metal around it, while the stripes are very strong.
      </p>
      <p>For example, in this test photo of 360 by 240 pixels (shown twice as large):</p>
      <Figura imgs={[{ src: "/exemplos/dia09.png", w: 360, h: 240, alt: "Photo covered in diagonal stripes" }]} escala={2} />
      <p>
        The stripes run diagonally and repeat roughly every 7 pixels. Along a row of the image, the brightness swings
        between about 70 and about 180 every few pixels (on row 20, the first values are{" "}
        <code>118, 159, 173, 160, 128, 93, 70, 67, 104, 141, 171, 180...</code>). The engraved number, on the other
        hand, darkens the metal by only 10 levels. Without the stripes, it shows up easily: it&apos;s <em>42</em>.
      </p>
      <p>
        The number on your plate has <em>6 digits</em>.{" "}
        <em className="star">What number is engraved on the plate in your photo?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        The next morning, Seu Jorge confesses one more thing: when he gets bored, he taps the microwave button to the
        rhythm of a telegraph, the way he used to back in his ham radio days. He sent a message during
        yesterday&apos;s transmission and wants to know if anyone got it.
      </p>
      <p>
        Somebody did. Once the strong stripes are gone, a second interference appears, much weaker and much finer,
        with stripes in another direction. It sits only in a horizontal band near the bottom of the photo and{" "}
        <em>switches on and off</em> along it: from left to right, there are stretches with those fine stripes and
        stretches with nothing. It&apos;s <em>Morse code</em>, written in microwave-button time:
      </p>
      <ul>
        <li>a dot is a stretch that&apos;s on for 1 unit of length; a dash is on for 3 units;</li>
        <li>between the signals of the same letter, the interference is off for 1 unit;</li>
        <li>between one letter and the next, it&apos;s off for 3 units.</li>
      </ul>
      <p>The unit is the same from start to finish, and the band is off before the first letter and after the last.</p>
      <p>
        In the test photo, the band runs roughly from row 175 to row 225, and the unit is 7 pixels. From left to
        right, on (1) and off (0), unit by unit:
      </p>
      <pre className="exemplo">{`1 0 1 0 1 0 0 0 1 1 1 0 1 1 1 0 1 1 1 0 0 0 1 0 1 0 1
.   .   .       -----   -----   -----       .   .   .
    S                     O                     S`}</pre>
      <p>
        The message is <em>SOS</em>. To translate, use the international Morse code table (letters A to Z only, no
        digits or accents).
      </p>
      <p>
        <em className="star">What word did Seu Jorge send?</em>
      </p>
    </>
  );
}
