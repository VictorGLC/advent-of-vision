/* eslint-disable @next/next/no-img-element */

type Img = { src: string; w: number; h: number; alt: string };

/** Imagem(ns) de exemplo, ampliadas por vizinho mais próximo para os pixels aparecerem. */
export function Figura({ imgs, escala = 1, legenda }: { imgs: Img[]; escala?: number; legenda?: string }) {
  return (
    <figure className={imgs.length > 1 ? "imgs" : undefined}>
      {imgs.map((i) => (
        <img key={i.src} src={i.src} width={i.w * escala} height={i.h * escala} alt={i.alt} />
      ))}
      {legenda && <figcaption>{legenda}</figcaption>}
    </figure>
  );
}
