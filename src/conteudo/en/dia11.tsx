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
        To pick the spot, the probe uses its two navigation cameras, mounted side by side. They photographed the
        landing site at the same time, and you get the <em>left image</em> and the <em>right image</em>.
        Jabuticaba&apos;s ground is covered in gravel, and each image on its own looks like TV static.
      </p>
      <p>What the camera manual guarantees:</p>
      <ul>
        <li>the two cameras are perfectly aligned: a point shows up on the same row in both images;</li>
        <li>
          in the left image, every point appears a little further to the <em>right</em> than in the right image.
          That shift is called the <em>disparity</em>, and the closer the point, the larger it is;
        </li>
        <li>the ground is flat and all at the same distance.</li>
      </ul>
      <p>Large <em>rocks</em> are closer to the camera than the ground. In the test images:</p>
      <Figura
        imgs={[
          { src: "/exemplos/dia11_esq.png", w: 300, h: 200, alt: "Left test image: just dots" },
          { src: "/exemplos/dia11_dir.png", w: 300, h: 200, alt: "Right test image: just dots" },
        ]}
      />
      <p>
        there are <em>2</em> rocks hidden in the static.
      </p>
      <p>
        <em className="star">How many rocks are at the landing site?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        The probe needs to know how far away the most dangerous rock is: the closest one. The distance from a point
        to the cameras is
      </p>
      <p className="formula">
        <code>Z = f × B / d</code>
      </p>
      <p>
        where <code>d</code> is the disparity in pixels, <code>f = 800</code> pixels is the focal length and{" "}
        <code>B = 0.5</code> meters is the distance between the two cameras.
      </p>
      <p>
        In the test images, the closest rock has a disparity of 20 pixels, so it is{" "}
        <em>800 × 0.5 / 20 = 20</em> meters away.
      </p>
      <p>
        <em className="star">How many meters away is the closest rock?</em>
      </p>
    </>
  );
}
