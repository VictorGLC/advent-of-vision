// Imagem de input do puzzle, servida sem nenhuma recompressão (o dia 2 depende do bit menos significativo).
export function Input({
  arquivos,
  largura,
  altura,
  legenda,
}: {
  arquivos: { src: string; alt: string }[];
  largura: number;
  altura: number;
  legenda: React.ReactNode;
}) {
  return (
    <figure>
      <div className="imgs">
        {arquivos.map((a) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={a.src}
            src={a.src}
            width={largura}
            height={altura}
            loading="lazy"
            alt={a.alt}
            style={arquivos.length > 1 ? { width: "calc(50% - 6px)" } : undefined}
          />
        ))}
      </div>
      <figcaption>
        {legenda}{" "}
        {arquivos.map((a, i) => (
          <span key={a.src}>
            {i > 0 && " · "}
            <a href={a.src} download>
              baixar {a.src.split("/").pop()}
            </a>
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
