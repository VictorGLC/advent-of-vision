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
        of the same sky a few hours apart: plate <em>A</em> and plate <em>B</em>. Plate B shows the same sky{" "}
        <em>rotated</em> (around some point) and a little <em>shifted</em>. The scale didn&apos;t change, no star
        was born or died, and each plate sees a piece of sky the other doesn&apos;t.
      </p>
      <p>For example, in these two test plates:</p>
      <Figura
        imgs={[
          { src: "/exemplos/dia10_a.png", w: 320, h: 240, alt: "Test plate A" },
          { src: "/exemplos/dia10_b.png", w: 320, h: 240, alt: "Test plate B, rotated" },
        ]}
      />
      <p>
        plate B is rotated <em>12.5</em> degrees relative to A.
      </p>
      <p>
        <em className="star">
          How many degrees is your plate B rotated relative to A? Answer with one decimal place and no sign.
        </em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        Spin corrected. While comparing the plates, you notice that B came out brighter overall (the camera bumped
        up its own gain, as old cameras do), but one of the stars that appears on both did the opposite: it{" "}
        <em>dimmed</em> far more than any other. It's a variable star, and Dr. Bento wants its name in the paper.
      </p>
      <p>
        On the test plates, it sits at position <code>188,103</code> on plate A (column and row of the star&apos;s
        center, rounded to the nearest pixel).
      </p>
      <p>
        <em className="star">Where on plate A is the variable star? Answer as x,y.</em>
      </p>
    </>
  );
}
