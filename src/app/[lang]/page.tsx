import { Calendario } from "@/components/Calendario";
import type { Lang } from "@/lib/i18n";

export default async function Inicio({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return <Calendario lang={lang} />;
}
