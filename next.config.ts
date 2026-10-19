import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // arquivos lidos do disco em tempo de execução precisam ir junto no deploy
  outputFileTracingIncludes: {
    "/login": ["./solucoes/**/*"],
  },
  async redirects() {
    return [
      { source: "/", destination: "/pt", permanent: false },
      // endereços da primeira versão, sem idioma
      { source: "/dia/:n", destination: "/pt/dia/:n", permanent: true },
      { source: "/sobre", destination: "/pt/sobre", permanent: true },
      // quem trocar o idioma à mão na URL
      { source: "/en/dia/:n", destination: "/en/day/:n", permanent: false },
      { source: "/en/sobre", destination: "/en/about", permanent: false },
    ];
  },
  async rewrites() {
    // as páginas em inglês usam as mesmas pastas das em português
    return {
      beforeFiles: [
        { source: "/en/day/:n", destination: "/en/dia/:n" },
        { source: "/en/about", destination: "/en/sobre" },
      ],
    };
  },
};

export default nextConfig;
