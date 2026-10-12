"use client";

import { useActionState } from "react";
import { entrar } from "./actions";

export function FormLogin() {
  const [erro, acao, enviando] = useActionState(entrar, null);
  return (
    <form action={acao}>
      <p>
        <label htmlFor="senha">Senha:</label>{" "}
        <input type="password" id="senha" name="senha" autoComplete="current-password" size={20} autoFocus />{" "}
        <button type="submit" className="submit" disabled={enviando}>
          [Entrar]
        </button>
      </p>
      {erro && <p className="wrong">{erro}</p>}
    </form>
  );
}
