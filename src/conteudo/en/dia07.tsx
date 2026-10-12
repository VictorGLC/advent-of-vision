import { Figura } from "../Figura";
import { Tabela25 } from "../Tabela25";

export function Parte1() {
  return (
    <>
      <p>
        To fully reactivate the rover, mission control needs its <em>serial number</em>, which is on a label stuck
        to the chassis. The rover stretches its arm and takes a picture. There are two white labels on the metal,
        stuck on crooked (an intern from 1987 did it, you suspect) and scorched by almost forty years of sunlight.
        The digits printed under the bars have faded away, so the bars are all there is to read.
      </p>
      <p>
        The labels use an old barcode, <em>2 of 5</em>. It only has black bars of two widths: narrow (
        <code>n</code>) and wide (<code>W</code>, three times wider than the narrow one). The white spaces between
        bars are always narrow and mean nothing: only the widths of the black bars count. Reading from left to right:
      </p>
      <ul>
        <li>
          every code starts with the bars <code>W W n</code> and ends with <code>W n W</code>;
        </li>
        <li>
          in between, each digit takes <em>5 bars</em> in a row, always 2 wide and 3 narrow, according to this
          table:
        </li>
      </ul>
      <Tabela25 cab={["digit", "bars"]} fina="n" larga="W" />
      <p>In the test photo, the labels have 4 digits each:</p>
      <Figura imgs={[{ src: "/exemplos/dia07.png", w: 480, h: 360, alt: "Two crooked barcode labels on metal" }]} />
      <p>
        The top label is tilted about 9 degrees. Following a line along it, below the burn mark, its 26 black bars
        are:
      </p>
      <pre className="exemplo">
        {`W W n | n n W n W | n W n n W | n n W W n | n n n W W | W n W
start |    4      |    2      |    0      |    7      | end`}
      </pre>
      <p>
        So it reads <em>4207</em>. Notice that if you try to read the line that goes through the burn mark, the
        middle bars turn into a single smudge and the reading doesn&apos;t work out: the start and end patterns are
        how you know you read it right.
      </p>
      <p>
        In your input, each label has <em>12 digits</em>. The serial number is the one on the <em>top</em> label,
        which also has a burn mark, but only across the top part of the bars.
      </p>
      <p>
        <em className="star">What is the rover&apos;s serial number?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        The bottom label is the <em>activation key</em>. Unfortunately a micrometeorite went through it at some
        point in the 90s, and one of the digits burned from top to bottom: its five bars turned into a single black
        smudge, far too wide to be a bar. The other digits are intact.
      </p>
      <p>
        Luckily, whoever designed the label saw this coming. The last digit is a <em>check digit</em>: multiply the
        digits, from left to right, alternately by 3 and by 1 (the first by 3, the second by 1, the third by 3, and
        so on, including the last one), add everything up, and the total is always a multiple of 10.
      </p>
      <p>
        In the test photo, the bottom label starts with <code>W W n</code>, then has the bars for 8, the burned
        smudge, the bars for 5 and for 0, and ends with <code>W n W</code>. So it reads <code>8?50</code>. Since{" "}
        <code>8×3 + ?×1 + 5×3 + 0×1 = 39 + ?</code> must be a multiple of 10, the burned digit is 1, and the key is{" "}
        <em>8150</em>.
      </p>
      <p>
        <em className="star">What is the full 12-digit activation key?</em>
      </p>
    </>
  );
}
