import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        It's morning in Lisbon, and Dr. Bento wakes up excited about the asteroids. He wants more data on that
        region and asks the probe for a <em>burst</em>: 20 photos in a row, with the telescope perfectly still,
        always pointed at the same spot. Since nothing in the sky moves in a few minutes, the 20 photos should be
        identical.
      </p>
      <p>
        They aren&apos;t. To save power, the probe gave each one far less exposure than yesterday&apos;s plates,
        and they came out very grainy: the same pixel of dark sky reads 30 in one photo, 70 in the next, 45 in the
        one after. That&apos;s ordinary camera noise in the dark.
      </p>
      <p>
        The photos all arrive in a single file, side by side: <em>5 per row</em>, 4 rows, in the order they were
        taken, with no gaps between them. Sensor pixel <code>(x, y)</code> shows up once in each photo, always at the
        same position within it.
      </p>
      <p>
        Before anything else, CIDA warns: <em>SENSOR HAS DEFECTIVE PIXELS.</em> A defective pixel is{" "}
        <em>stuck</em> at some value (on at 255, off at 0, or anywhere in between) and never changes, in any photo.
        A good pixel always varies at least a little from one photo to the next, if only because of the grain.
      </p>
      <p>For example, this test burst has 6 photos of 64 by 40 pixels, 3 per row (shown four times larger):</p>
      <Figura imgs={[{ src: "/exemplos/dia04.png", w: 192, h: 80, alt: "Six grainy photos side by side" }]} escala={4} />
      <p>Going sensor pixel by sensor pixel, three of them have the same value in all six photos:</p>
      <ul>
        <li>
          <code>(33, 26)</code>, stuck at 255;
        </li>
        <li>
          <code>(58, 35)</code>, stuck at 0;
        </li>
        <li>
          <code>(58, 12)</code>, stuck at 159.
        </li>
      </ul>
      <p>
        Every other pixel varies. So the test sensor has <em>3</em> stuck pixels. (Notice the last one doesn&apos;t
        stand out in any single photo: 159 is a perfectly normal value.)
      </p>
      <p>
        <em className="star">How many pixels of the sensor are stuck in your burst?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        With the defects mapped, on to the interesting part. Dr. Bento wants to know how many stars are really in
        that piece of sky. The problem is that no single photo in the burst is any good: the faintest stars barely
        rise above the grain, and in one photo it&apos;s impossible to say whether a little blob is a star or just
        bad luck.
      </p>
      <p>
        The difference is that the grain changes from photo to photo and the stars don&apos;t: they&apos;re always in
        the same place, always with the same brightness. Put the 20 photos together and the grain loses its grip,
        and the faint stars show up.
      </p>
      <p>
        A star is a small round blob a few pixels across, brighter than the sky around it. A stuck pixel is not a
        star, however bright it is.
      </p>
      <p>In the test burst, the sky has an average brightness of about 51 and there are 4 stars:</p>
      <ul>
        <li>
          at <code>(23, 19)</code> and <code>(48, 22)</code>, two bright stars that go above 150 in every photo and
          are visible in any of them;
        </li>
        <li>
          at <code>(9, 8)</code> and <code>(38, 11)</code>, two faint ones. The center pixel of each varies between 92
          and 165 from photo to photo, and in a single photo it&apos;s hard to tell whether it&apos;s a star or a
          stronger speck of grain. Combining the six photos, both show up clearly.
        </li>
      </ul>
      <p>
        The pixel stuck at 255, at <code>(33, 26)</code>, looks like a star in every photo, but it&apos;s a single
        pixel and doesn&apos;t count. Total: <em>4</em> stars.
      </p>
      <p>
        <em className="star">How many stars show up when you combine the photos of your burst?</em>
      </p>
    </>
  );
}
