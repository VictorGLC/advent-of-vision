import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // arquivos lidos do disco em tempo de execução precisam ir junto no deploy
  outputFileTracingIncludes: {
    "/login": ["./solucoes/**/*"],
    "/api/admin/img/[nome]": ["./private/**/*"],
  },
};

export default nextConfig;
