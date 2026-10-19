import { Anton, IBM_Plex_Mono } from "next/font/google";

const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono" });
const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display" });

export const fontes = `${mono.variable} ${display.variable}`;
