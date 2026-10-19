import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        With the probe stabilized, mission control makes a bold call: the Andorinha-3 is going to <em>land</em> on
        Jabuticaba, next to the rovers. Dr. Bento says he always wanted to do this. The budget says there&apos;s no
        turning back.
      </p>
      <p>
        To pick the spot, the probe uses its two navigation cameras, mounted side by side, looking down. They
        photographed the landing site at the same time, and you get the <em>left image</em> and the{" "}
        <em>right image</em>. Jabuticaba&apos;s ground is covered in fine gravel, and each image on its own looks
        like TV static: you can&apos;t see a single rock.
      </p>
      <p>
        But there are two cameras. Close one eye, then the other, while looking at your finger in front of your
        face: the finger jumps sideways, and it jumps more the closer it is. The probe&apos;s cameras work the same
        way. The manual guarantees:
      </p>
      <ul>
        <li>
          the two cameras are perfectly aligned: a point on the ground shows up on the <em>same row</em> in both
          images, only the column changes;
        </li>
        <li>
          in the left image, every point appears a little further to the <em>right</em> than in the right image.
          That shift, in pixels, is called the <em>disparity</em>. The closer the point, the larger it is;
        </li>
        <li>the ground is flat and all at the same distance, so it has the same disparity everywhere.</li>
      </ul>
      <p>
        Large <em>rocks</em> are closer to the camera than the ground around them. Each rock is a round region a few
        dozen pixels across, with a disparity larger than the ground&apos;s (the same over the whole rock).
      </p>
      <p>For example, in these test images, 300 by 200 pixels each:</p>
      <Figura
        imgs={[
          { src: "/exemplos/dia11_esq.png", w: 300, h: 200, alt: "Left test image: just dots" },
          { src: "/exemplos/dia11_dir.png", w: 300, h: 200, alt: "Right test image: just dots" },
        ]}
      />
      <p>
        the ground has a disparity of 8 pixels: the gravel that shows up at column 108, row 100 of the left image is
        the same gravel that shows up at column 100, row 100 of the right image. On row 100, starting at column 150
        of the left image, the values are <code>125, 149, 115, 112, 108, 131</code>; starting at column 142 of the
        right image, they are <code>130, 157, 118, 121, 106, 132</code> (similar, not equal: each camera has its own
        noise).
      </p>
      <p>Hidden in the gravel, there are two regions with a larger disparity:</p>
      <ul>
        <li>
          a big rock, about 34 pixels in radius, around <code>(123, 72)</code> of the left image, with disparity 13;
        </li>
        <li>
          a smaller one, about 25 pixels in radius, around <code>(219, 135)</code>, with disparity 20.
        </li>
      </ul>
      <p>
        So the test landing site has <em>2</em> rocks.
      </p>
      <p>
        <em className="star">How many rocks are at your landing site?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        The probe needs to know how far away the most dangerous rock is, which is the closest one, to adjust its
        descent. For cameras aligned like this, the distance from a point to the cameras, in meters, is
      </p>
      <p className="formula">
        <code>Z = f × B / d</code>
      </p>
      <p>
        where <code>d</code> is the point&apos;s disparity in pixels, <code>f = 800</code> pixels is the
        cameras&apos; focal length and <code>B = 0.5</code> meters is the distance between them.
      </p>
      <p>
        In the test images, the ground (disparity 8) is 800 × 0.5 / 8 = 50 meters away. The big rock (disparity 13)
        is about 30.8 meters away. The smaller rock has the largest disparity, 20, and is the closest: it is{" "}
        <em>800 × 0.5 / 20 = 20</em> meters away.
      </p>
      <p>
        <em className="star">How many meters away is the closest rock at your landing site?</em>
      </p>
    </>
  );
}
