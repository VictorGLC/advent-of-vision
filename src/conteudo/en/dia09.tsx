import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        The rover's next transmission is a photo of the module's <em>ID plate</em>, with the number mission control
        needs to send commands straight to it. But the photo arrives covered in stripes, and the number is lost
        among them.
      </p>
      <p>
        Nobody can figure out where the stripes come from until Seu Jorge, the night watchman, mentions that he
        always heats up his lunch around three in the morning in the break room microwave, right on the other
        side of the wall from the radio room. (This really happened: a radio telescope in Australia spent years
        picking up mysterious signals that turned out to be the kitchen microwave.)
      </p>
      <p>
        The damage is regular: perfectly straight stripes, all in the same direction and with the same spacing,
        added on top of the photo. Underneath them, the plate is still there, with the number engraved in it,
        barely any contrast.
      </p>
      <p>In this test photo (enlarged), for example, the number is <em>42</em>:</p>
      <Figura imgs={[{ src: "/exemplos/dia09.png", w: 360, h: 240, alt: "Photo covered in diagonal stripes" }]} escala={2} />
      <p>
        <em className="star">What number is engraved on the plate in your photo?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        The next morning, Seu Jorge confesses one more thing: when he gets bored, he taps the microwave button to
        the rhythm of a telegraph, the way he used to back in his ham radio days. He sent a message during
        yesterday&apos;s transmission and wants to know if anyone got it.
      </p>
      <p>
        Somebody did: near the bottom of the photo there's a second interference, weaker and finer than the first,
        that switches on and off across the image, from left to right. It's <em>Morse code</em>:
      </p>
      <ul>
        <li>dot = on for 1 time unit; dash = on for 3 units;</li>
        <li>between the signals of one letter, off for 1 unit; between letters, off for 3.</li>
      </ul>
      <p>
        In the test photo, the message is <em>SOS</em> (<code>... --- ...</code>).
      </p>
      <p>
        <em className="star">What word did Seu Jorge send?</em>
      </p>
    </>
  );
}
