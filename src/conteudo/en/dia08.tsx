import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        Rover reactivated! To celebrate, it sends a <em>panorama</em> of where it is. But the 1985 radio protocol
        didn't number its packets: the panorama arrived chopped into <em>64 tiles</em> of 64 by 64 pixels, all out
        of order. And since the rover's magnetic tape was read every which way, each tile may have come out{" "}
        <em>rotated</em> (90, 180 or 270 degrees) and/or <em>flipped</em>.
      </p>
      <p>
        The file shows the tiles on an 8 by 8 grid, separated by 6-pixel black stripes (around the outside too).
        They are numbered 1 to 64 in the order they appear in the file: left to right, top to bottom.
      </p>
      <p>
        One bit of help: the rover cut the panorama with one line of overlap between neighbors. Two tiles that sit
        side by side in the panorama share an <em>identical</em> border, pixel for pixel. The outer borders of the
        panorama don't match anything.
      </p>
      <p>For example, this test panorama was cut into 3 by 3 tiles of 24 pixels (enlarged):</p>
      <Figura imgs={[{ src: "/exemplos/dia08.png", w: 96, h: 96, alt: "Nine scrambled tiles separated by black stripes" }]} escala={4} />
      <p>
        The tiles at the four corners of the panorama are numbers 1, 2, 3 and 8, and <em>1 × 2 × 3 × 8 = 48</em>.
      </p>
      <p>
        <em className="star">What do you get if you multiply together the numbers of the four corner tiles?</em>
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
      <p>Assembled, the test panorama looks like this:</p>
      <Figura imgs={[{ src: "/exemplos/dia08_montado.png", w: 70, h: 70, alt: "Assembled test panorama with OI written on the ground" }]} escala={4} />
      <p>
        (Neighboring tiles share a border, so the test panorama is 3 × 23 + 1 = 70 pixels across.) It says{" "}
        <em>OI</em>, which is Portuguese for &quot;hi&quot;. Yours may come out flipped or sideways once
        assembled; just turn it around.
      </p>
      <p>
        <em className="star">What did the rover write on the ground?</em>
      </p>
    </>
  );
}
