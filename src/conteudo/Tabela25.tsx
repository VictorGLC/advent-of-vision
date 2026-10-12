// Tabela do código "2 de 5": barras de cada dígito, da esquerda para a direita (0 = fina, 1 = larga).
const PADROES = ["00110", "10001", "01001", "11000", "00101", "10100", "01100", "00011", "10010", "01010"];

export function Tabela25({ cab, fina, larga }: { cab: [string, string]; fina: string; larga: string }) {
  return (
    <table className="tabela">
      <thead>
        <tr>
          <th>{cab[0]}</th>
          <th>{cab[1]}</th>
        </tr>
      </thead>
      <tbody>
        {PADROES.map((p, d) => (
          <tr key={d}>
            <td>{d}</td>
            <td>
              <code>{[...p].map((b) => (b === "1" ? larga : fina)).join(" ")}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
