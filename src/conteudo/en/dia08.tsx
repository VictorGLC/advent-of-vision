import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        Rover reactivated! To celebrate, it sends a <em>panorama</em> of where it is. But the 1985 radio protocol
        didn&apos;t number its packets: the panorama arrived chopped into <em>64 square tiles</em> of 64 by 64
        pixels, all out of order. And since the rover&apos;s magnetic tape was read every which way, each tile may
        have come out <em>rotated</em> (90, 180 or 270 degrees) and/or <em>flipped</em>.
      </p>
      <p>
        The file shows the tiles on an 8 by 8 grid, separated by 6-pixel black stripes (around the outside of the
        grid too). The tiles are numbered 1 to 64 in the order they appear in the file: left to right, top to
        bottom. Number 1 is the top-left tile in the file, 8 is the top-right one, 9 is the first one on the second
        row, and so on. This numbering has nothing to do with where a tile belongs in the panorama.
      </p>
      <p>
        One bit of help: the rover cut the panorama with one line of overlap between neighbors. Two tiles that sit
        side by side in the panorama share an <em>identical</em> border, pixel for pixel. Since tiles can be rotated
        or flipped, that border can be on any side of each tile, and it can be reversed (the first pixel of one is
        the last of the other). The outer borders of the panorama don&apos;t match anything, and a border never
        matches more than one tile.
      </p>
      <p>For example, this test panorama was cut into 3 by 3 tiles of 24 pixels (enlarged, with the numbers):</p>
      <Figura imgs={[{ src: "/exemplos/dia08_marcado.png", w: 384, h: 384, alt: "Nine scrambled tiles numbered 1 to 9" }]} />
      <p>Comparing borders, you can work out who sits next to whom:</p>
      <ul>
        <li>
          tile 7 has all 4 borders matching something (tiles 4, 5, 6 and 9), so it&apos;s the <em>center</em> of
          the panorama;
        </li>
        <li>tiles 4, 5, 6 and 9 have 3 matching borders: they&apos;re the middle of each side;</li>
        <li>
          tiles 1, 2, 3 and 8 have only 2 matching borders (tile 1, for instance, matches 9 and 6). Their other two
          borders face outward: they&apos;re the <em>corners</em>.
        </li>
      </ul>
      <p>
        Multiplying the corner numbers: <em>1 × 2 × 3 × 8 = 48</em>.
      </p>
      <p>
        <em className="star">What do you get if you multiply together the numbers of your four corner tiles?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Now put the whole panorama together. With everything in place, you can see the rover wrote something on
        the ground by driving through the dust. Dr. Bento swears he didn&apos;t program that.
      </p>
      <p>
        When assembling, each tile goes in rotated or flipped back so that every border touches the identical border
        of its neighbor. Since neighbors share the border line, it appears only once in the assembled panorama. The
        test panorama looks like this:
      </p>
      <Figura imgs={[{ src: "/exemplos/dia08_montado.png", w: 70, h: 70, alt: "Assembled test panorama with OI written on the ground" }]} escala={4} />
      <p>
        It&apos;s 3 × 23 + 1 = 70 pixels across and says <em>OI</em> (Portuguese for &quot;hi&quot;). Your
        assembled panorama will be 8 × 63 + 1 = 505 pixels across. Depending on which corner you start from, it may
        come out flipped or sideways; just turn it until the word is readable.
      </p>
      <p>
        <em className="star">What did the rover write on the ground?</em>
      </p>
    </>
  );
}
