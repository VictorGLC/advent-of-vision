import { Figura } from "../Figura";
import { Tabela25 } from "../Tabela25";

export function Parte1() {
  return (
    <>
      <p>
        To fully reactivate the rover, mission control needs its <em>serial number</em>, which is printed on a
        label stuck to the chassis. The rover stretches its arm and takes a picture. There are two labels, stuck on
        crooked (an intern from 1987 did it, you suspect) and scorched by almost forty years of sunlight.
      </p>
      <p>
        The labels use an old barcode, <em>2 of 5</em>. It only has black bars of two widths: narrow (
        <code>n</code>) and wide (<code>W</code>, three times the narrow one). The white spaces between bars are
        always narrow and mean nothing.
      </p>
      <ul>
        <li>
          Every code starts with <code>W W n</code> and ends with <code>W n W</code>.
        </li>
        <li>
          Between the start and the end, each digit takes <em>5 bars</em>, always 2 wide and 3 narrow:
        </li>
      </ul>
      <Tabela25 cab={["digit", "bars"]} fina="n" larga="W" />
      <p>
        Each label has <em>12 digits</em>. The serial number is the one on the <em>top</em> label. It has a burn
        mark, but only across the top part of the bars.
      </p>
      <p>In the test photo the labels have 4 digits, and the top one reads <em>4207</em>:</p>
      <Figura imgs={[{ src: "/exemplos/dia07.png", w: 480, h: 360, alt: "Two crooked barcode labels on metal" }]} />
      <p>
        <em className="star">What is the rover's serial number?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        The bottom label is the <em>activation key</em>. Unfortunately a micrometeorite went through it at some
        point in the 90s, and one of the digits burned away completely: its five bars turned into a single black
        smudge.
      </p>
      <p>
        Luckily, whoever designed the label saw this coming. The last digit is a <em>check digit</em>: multiply the
        digits, from left to right, alternately by 3 and by 1 (the first by 3, the second by 1, the third by 3...),
        add everything up, and the total is always a multiple of 10.
      </p>
      <p>
        In the test photo, the bottom label reads <code>8?50</code>. Since 8×3 + d×1 + 5×3 + 0×1 must be a multiple
        of 10, the burned digit is 1, and the key is <em>8150</em>.
      </p>
      <p>
        <em className="star">What is the full activation key?</em>
      </p>
    </>
  );
}
