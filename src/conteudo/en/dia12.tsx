import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        A perfect landing. The whole team watched over a video call from the Lisbon airport, and Dr. Bento cried
        (he says it was the custard tart).
      </p>
      <p>
        Right after landing, the probe sends one last file, stored since launch: <code>LEIA-ME</code> (Portuguese
        for README), recorded by the original team in 1985. The old format stored the image as a single queue of
        pixels, one after another, row by row. Whoever converted it to PNG didn&apos;t know the original width,
        guessed <em>1000</em>, and filled the end of the last row with zeros. The result looks like noise.
      </p>
      <p>
        For example, this test file (enlarged) was saved 50 pixels wide, but the original image was <em>37</em>{" "}
        pixels wide:
      </p>
      <Figura imgs={[{ src: "/exemplos/dia12.png", w: 50, h: 13, alt: "Strip of pixels that looks like noise" }]} escala={8} />
      <p>
        <em className="star">What was the original width of the LEIA-ME image?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Rebuilt at the right width, the test image shows the number <em>42</em>. Yours shows the note the 1985 team
        left for whoever might one day find the Andorinha-3. Nobody in the room says anything for a while.
      </p>
      <p>
        <em className="star">What is the word in the message?</em>
      </p>
    </>
  );
}
