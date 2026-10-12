import { Figura } from "../Figura";

export function Parte1() {
  return (
    <>
      <p>
        In the middle of the packet there's a folder called <code>JABUTICABA</code>, and nobody on the current team
        knew what it was. The documentation explains: in 1987 the Andorinha-3 landed a module on asteroid 1985 JB,
        nicknamed Jabuticaba (it's small, round and dark, like the Brazilian fruit), and released a few rovers to
        roam around. Nobody remembered. The mission had a small budget and an even smaller memory.
      </p>
      <p>The folder has a grayscale photo taken from above. In it you can see:</p>
      <ul>
        <li>
          the <em>module</em>, a bright disc right in the middle of the photo;
        </li>
        <li>
          the <em>tracks</em>, thin dark lines that start at the edge of the module and wind across the ground. Each
          rover left one. No track crosses another;
        </li>
        <li>
          the <em>rovers</em>, very bright 5 by 5 pixel squares, each one parked just past the end of its track;
        </li>
        <li>
          and plenty of stuff that doesn&apos;t matter: craters (rings), dark rocks, small bright pebbles and large
          patches of lighter or darker dust.
        </li>
      </ul>
      <p>
        In some places dust covered the marks and the track disappears for a few pixels, but it picks up again on
        the other side, on the same path.
      </p>
      <p>
        Over the radio, only one rover still answers: the one that traveled the farthest, that is, the one with the
        longest track (measured along the path, not in a straight line). To talk to it, mission control needs to know
        where it is.
      </p>
      <p>For example, in this test photo of 320 by 220 pixels (enlarged, with the rovers numbered):</p>
      <Figura imgs={[{ src: "/exemplos/dia06_marcado.png", w: 640, h: 440, alt: "Gray ground with craters, the module in the middle and three tracks ending at rovers 1, 2 and 3" }]} />
      <p>There are three rovers:</p>
      <ul>
        <li>
          rover <em>1</em>, at <code>184,58</code>, set off to the right, made a big loop upward and came back to
          the left; its track is about 175 pixels long;
        </li>
        <li>
          rover <em>2</em>, at <code>74,131</code>, went down and to the left, about 110 pixels;
        </li>
        <li>
          rover <em>3</em>, at <code>99,59</code>, went up and turned left, about 80 pixels.
        </li>
      </ul>
      <p>
        Note that rover 1&apos;s track has two gaps and is still a single path. The rover that traveled the farthest
        is number 1, and the answer is its position: <code>184,58</code> (column and row of the square&apos;s center
        pixel, counting from 0, separated by a comma).
      </p>
      <p>
        <em className="star">Where is the rover that traveled the farthest?</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        The rover answers! First of all, mission control wants to download the photos it took along the way, and
        for that it needs to know how many there are.
      </p>
      <p>
        Every time it stopped to take a picture, the rover spun in place to look around, and the wheels left a
        round, filled-in mark right on top of the track, about four times wider than the track itself. Each mark is
        one stop. The dark rocks scattered around are also roundish, but they&apos;re not on any track and
        don&apos;t count.
      </p>
      <p>
        In the test photo, rover 1&apos;s track has <em>2</em> marks, both on the big loop on the right. Rover 2
        stopped once and rover 3 never did, but they don&apos;t matter.
      </p>
      <p>
        <em className="star">How many stops did the farthest-traveling rover make?</em>
      </p>
    </>
  );
}
