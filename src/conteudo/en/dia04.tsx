import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        It's morning in Lisbon, and Dr. Bento wakes up excited about the asteroids. He wants more data on that
        region and asks the probe for a <em>burst</em>: 20 photos in a row, with the telescope perfectly still,
        always pointed at the same spot.
      </p>
      <p>
        The photos all arrive in a single file, side by side: <em>5 per row</em>, 4 rows, in the order they were
        taken. To save power, the probe gave each one far less exposure than yesterday's plates, and they came out
        very grainy.
      </p>
      <p>
        Before anything else, CIDA warns: <em>SENSOR HAS DEFECTIVE PIXELS.</em> A defective pixel is{" "}
        <em>stuck</em> at some value (on, off, or anywhere in between) and never changes, in any photo. A good
        pixel always varies a little, if only because of the grain.
      </p>
      <p>For example, this test burst has 6 photos of 64 by 40 pixels, 3 per row (enlarged):</p>
      <Figura imgs={[{ src: "/exemplos/dia04.png", w: 192, h: 80, alt: "Six grainy photos side by side" }]} escala={4} />
      <p>
        and the sensor has <em>3</em> stuck pixels.
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
        With the defects mapped, on to the interesting part. No single photo in the burst is any good on its own:
        some stars are too faint and get lost in the grain. But there are 20 photos of the exact same thing...
      </p>
      <p>
        Dr. Bento wants to know how many stars are really in that piece of sky. A star is a small blob a few
        pixels across; a stuck pixel, lit or not, is not a star (and now you know which ones those are).
      </p>
      <p>
        In the test burst, combining the 6 photos reveals <em>4</em> stars, two of which are impossible to see in a
        single photo.
      </p>
      <p>
        <em className="star">How many stars show up when you combine the photos of your burst?</em>
      </p>
    </>
  );
}
