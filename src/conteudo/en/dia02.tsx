import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        The camera works. You go to open the rest of the packet and the system locks everything, asking for an{" "}
        <em>authentication code</em>. Nobody wrote that code down anywhere, of course.
      </p>
      <p>
        After a lot of digging you find the mission documentation, a scanned PDF from 1985 with a coffee stain right
        in the middle. As far as you can read it, the probe's emergency transmitter doesn't send the code as text.
        It takes a color photo of a nebula and <em>hides the code in the least significant bit</em> of one of the
        color channels. Each pixel changes by at most 1 in 255, which no eye can see. Which channel? The page that
        said so was torn out.
      </p>
      <p>
        In this test image, for example, the hidden code is <em>PIXEL42</em>:
      </p>
      <Figura imgs={[{ src: "/exemplos/dia02.png", w: 360, h: 120, alt: "Colorful nebula with no visible text" }]} escala={2} />
      <p>Yeah, you can't see it. It's there anyway.</p>
      <p>
        Your code is <em>8 characters</em> long, only uppercase letters and digits.{" "}
        <em className="star">What is the authentication code?</em>
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
        The torn page was behind the printer, all crumpled. Only one bit of it is legible:{" "}
        <em>
          &quot;...the backup code lives in the two remaining channels. Neither says anything on its own; they must
          be read one against the other...&quot;
        </em>
      </p>
      <p>
        In the test image, the backup code is <em>OK7</em>.
      </p>
      <p>
        <em className="star">What is the backup code in your image?</em>
      </p>
    </>
  );
}
