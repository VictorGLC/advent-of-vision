import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        <em>ATTITUDE LOST. ROTATION DETECTED.</em> CIDA sends this at four in the morning and, for the first time,
        you understand what it means: the probe lost its orientation and is slowly spinning around itself.
      </p>
      <p>
        For the thrusters to correct the spin, someone has to measure how far it turned. The probe took two photos
        of the same sky a few hours apart: plate <em>A</em> and plate <em>B</em>, both the same size.
      </p>
      <p>
        Between the two shots, the camera <em>rotated</em> and also <em>slid</em> a little to the side. So plate B
        shows the same sky rotated around some point and shifted. The scale didn&apos;t change (the distance between
        two stars is the same on both plates) and no star was born or died, but each plate sees a piece of sky the
        other doesn&apos;t. Neither plate is mirrored.
      </p>
      <p>For example, these two test plates are 320 by 240 pixels each:</p>
      <Figura
        imgs={[
          { src: "/exemplos/dia10_a.png", w: 320, h: 240, alt: "Test plate A" },
          { src: "/exemplos/dia10_b.png", w: 320, h: 240, alt: "Test plate B, rotated" },
        ]}
      />
      <p>
        Looking carefully, you can find the same star patterns on both plates, just tilted on B. About 90 pairs of
        stars appear on both. Take any two stars that appear on both plates: the line joining them is, on plate B,
        always turned by the same amount relative to plate A: <em>12.5</em> degrees. That&apos;s the rotation.
      </p>
      <p>
        The rotation could have gone either way; CIDA only wants its size.{" "}
        <em className="star">
          How many degrees did your plate B rotate relative to your plate A? Answer with one decimal place.
        </em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Spin corrected. While comparing the plates, you notice something else: plate B came out brighter overall.
        The sky background went from about 19 to about 35, and the stars, in general, got about 30% brighter (the
        camera bumped up its own gain, as old cameras do).
      </p>
      <p>
        But one of the stars that appears on both plates did the opposite: instead of getting 30% brighter, it{" "}
        <em>dimmed</em>, far more than any measurement error could explain. It&apos;s a variable star, and Dr. Bento
        wants its name in the paper.
      </p>
      <p>
        A star&apos;s brightness is everything it adds above the sky background, summed over all its pixels (not just
        the brightest one, which is misleading when a star is more spread out). A star cut off by the edge of either
        plate loses part of its brightness, so only stars that are whole on both count: with their center more than
        10 pixels from any edge, on both plate A and plate B.
      </p>
      <p>
        On the test plates, 78 stars are whole on both plates. All but one got between 1.2 and 1.4 times brighter on
        plate B. The exception ended up with 0.4 times the brightness it had: the one at <code>188,103</code> on plate
        A (column and row of the star&apos;s center, rounded to the nearest pixel, separated by a comma).
      </p>
      <p>
        <em className="star">Where on plate A is the variable star?</em>
      </p>
    </>
  );
}
