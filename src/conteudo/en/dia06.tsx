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
      <p>
        The folder has a photo taken from above. The <em>module</em> is the bright disc in the middle; each{" "}
        <em>rover</em> is a small bright square, parked at the end of the track it left behind. Every track starts
        at the module and none crosses another, but in some places dust covered the marks and the track
        disappears for a few pixels.
      </p>
      <p>
        Over the radio, only one rover still answers: the one that traveled the farthest. To talk to it, mission
        control needs to know where it is.
      </p>
      <p>For example, in this test photo (shown twice as large):</p>
      <Figura imgs={[{ src: "/exemplos/dia06.png", w: 320, h: 220, alt: "Gray ground with craters, a bright disc and three dark tracks" }]} escala={2} />
      <p>
        the longest track is the one on the right, and its rover is at <code>184,58</code> (column and row of the
        center pixel of the square, counting from 0).
      </p>
      <p>
        <em className="star">Where is the rover that traveled the farthest? Answer as x,y.</em>
      </p>
    </>
  );
}

export function Parte2() {
  return (
    <>
      <p>
        The rover answers! First of all, mission control wants to download the photos it took along the way, and
        needs to know how many there are.
      </p>
      <p>
        Every time it stopped to take a picture, the rover spun in place to look around, and the wheels left a
        round mark right on top of the track. The dark rocks scattered around don't count: they're not on the
        track.
      </p>
      <p>
        In the test photo, the rover that traveled the farthest stopped <em>2</em> times.
      </p>
      <p>
        <em className="star">How many stops did the farthest-traveling rover make?</em>
      </p>
    </>
  );
}
