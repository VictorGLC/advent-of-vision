import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        The camera works. You go to open the rest of the packet and the system locks everything, asking for an{" "}
        <em>authentication code</em>. Nobody wrote that code down anywhere, of course.
      </p>
      <p>
        After a lot of digging you find the mission documentation: a scanned PDF from 1985 with a coffee stain right
        in the middle. As far as you can read it, the probe's emergency transmitter doesn't send the code as text,
        because text would be too easy to intercept. It sends a color photo of a nebula, and the code is hidden
        inside it.
      </p>
      <p>
        Here's the trick. Every pixel in the photo has three values, red (R), green (G) and blue (B), each from 0 to
        255. Written in binary, each value has 8 bits, and the last bit (the one worth 1) barely changes the color:
        swapping 214 for 215 is invisible. The transmitter draws the code, letter by letter,{" "}
        <em>only in that last bit</em> of <em>one</em> of the three channels. Where the drawing passes, the last bit
        is 1; everywhere else, it's 0. The other 7 bits are still the nebula.
      </p>
      <p>Which of the three channels? The document said so, but the next page was torn out.</p>
      <p>
        In this test image, 360 by 120 pixels (shown twice as large), the hidden code is <em>PIXEL42</em>:
      </p>
      <Figura imgs={[{ src: "/exemplos/dia02.png", w: 360, h: 120, alt: "Colorful nebula with no visible text" }]} escala={2} />
      <p>
        Yeah, you can't see it. But look at two neighboring pixels in the middle of the image. The one at column 120,
        row 60 is <code>(210, 110, 215)</code> and the one next to it is <code>(212, 140, 221)</code>. Both sit on
        the stroke of the letter I: the blue value of both is odd (215 = <code>11010111</code>, 221 ={" "}
        <code>11011101</code>, both end in 1). Meanwhile the pixel at column 20, row 10, far from the text, is{" "}
        <code>(190, 76, 176)</code>, and the last bit of its blue value is 0. In total, only about 7% of the test
        image's pixels have that bit set to 1, all of them forming the letters.
      </p>
      <p>
        Your code is <em>8 characters</em> long, only uppercase letters and digits, and your image doesn&apos;t
        necessarily use the same channel as the test one.{" "}
        <em className="star">What is the authentication code hidden in your image?</em>
      </p>
      <p>(Use the original PNG. A screenshot or a JPEG conversion wipes out exactly the bit you need.)</p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Code accepted! The system thinks for a moment and asks for something else: the <em>backup code</em>.
        Apparently in 1985 vault doors had two keys.
      </p>
      <p>
        The torn page was behind the printer, all crumpled, and it explains the rest. The other two channels
        weren&apos;t left alone: the last bit of each looks random, half the pixels with 1 and half with 0, no
        drawing at all. But the randomness isn&apos;t independent.{" "}
        <em>
          &quot;...the backup code lives in the two remaining channels. Neither says anything on its own; they must
          be read one against the other. Where they agree, it&apos;s background. Where they disagree, it&apos;s a
          letter...&quot;
        </em>
      </p>
      <p>
        In the test image, looking only at the last bit of red, or only at the last bit of green, you see pure
        static. But comparing the two pixel by pixel, the places where they disagree spell out the backup code,{" "}
        <em>OK7</em>.
      </p>
      <p>
        <em className="star">What is the backup code hidden in your image?</em>
      </p>
    </>
  );
}
