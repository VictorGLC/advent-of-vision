import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        A perfect landing. The whole team watched over a video call from the Lisbon airport, and Dr. Bento cried (he
        says it was the custard tart).
      </p>
      <p>
        Right after landing, the probe sends one last file, stored since launch: <code>LEIA-ME</code> (Portuguese
        for README), recorded by the original team in 1985. It&apos;s a grayscale image, but the format of the time
        didn&apos;t store width or height: just a queue of pixels, one after another, the whole first row, then the
        second, then the third.
      </p>
      <p>
        Whoever converted it to PNG didn&apos;t know the original width. They guessed <em>1000</em>: took the first
        1000 pixels of the queue as the first row of the PNG, the next 1000 as the second, and so on, filling the end
        of the last row with zeros (black). The result looks like noise.
      </p>
      <p>For example, this test file (shown eight times larger) was saved 50 pixels wide, with 13 rows:</p>
      <Figura imgs={[{ src: "/exemplos/dia12.png", w: 50, h: 13, alt: "Strip of pixels that looks like noise" }]} escala={8} />
      <p>
        The original image was <em>37</em> pixels wide and 17 rows tall, so 629 pixels. In the file, the first row
        holds the whole original row 1 (37 pixels) plus the first 13 pixels of row 2; the second row of the file
        continues original row 2, and so on. Since 13 × 50 = 650, the file ends with 21 padding zeros. Arranging the
        same 629 pixels in rows of 37 brings the image back to normal.
      </p>
      <p>
        <em className="star">What was the original width of the LEIA-ME image?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>Rebuilt at the right width, the test image shows the number <em>42</em>, white on a dark background.</p>
      <p>
        Yours shows the note the 1985 team left for whoever might one day find the Andorinha-3, with one word in big
        letters. Nobody in the room says anything for a while. Seu Jorge goes to heat up some coffee (on the stove,
        this time).
      </p>
      <p>
        <em className="star">What is the word in the message?</em>
      </p>
    </>
  );
}
