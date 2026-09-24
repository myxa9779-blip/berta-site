import { getSiteSettings } from "@/lib/cms";
import { HeaderSurface } from "./HeaderSurface";

export async function Header() {
  const settings = await getSiteSettings();
  return <HeaderSurface settings={settings} />;
}
