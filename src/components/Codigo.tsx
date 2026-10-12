// Bloco de código Python com comentários (# ...) esmaecidos.
export function Codigo({ children }: { children: string }) {
  const linhas = children.replace(/^\n/, "").replace(/\s+$/, "").split("\n");
  return (
    <pre>
      {linhas.map((linha, i) => {
        const m = /(^|\s)#.*$/.exec(linha);
        const codigo = m ? linha.slice(0, m.index + m[1].length) : linha;
        return (
          <span key={i}>
            {codigo}
            {m && <span className="c">{m[0].slice(m[1].length)}</span>}
            {i < linhas.length - 1 && "\n"}
          </span>
        );
      })}
    </pre>
  );
}
