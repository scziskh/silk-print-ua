import { Link } from "@/i18n/routing";

export const translationsConfig = {
  /* HTML */
  h2: (chunks) => <h2>{chunks}</h2>,
  p: (chunks) => <p>{chunks}</p>,
  ul: (chunks) => <ul>{chunks}</ul>,
  li: (chunks) => <li>{chunks}</li>,
  b: (chunks) => <strong>{chunks}</strong>,

  /* Links */
  toDieCutting: (chunks) => <Link href="services/die-cutting" className="link">{chunks}</Link>,
  toKashi: (chunks) => <Link href="services/kashi" className="link">{chunks}</Link>,
  toStamping: (chunks) => <Link href="services/stamping" className="link">{chunks}</Link>,
  toSilkScreenPrinting: (chunks) => <Link href="services/silk-screen-printing" className="link">{chunks}</Link>,
  toFoilStamping: (chunks) => <Link href="services/foil-stamping" className="link">{chunks}</Link>,
  toUVVarnish: (chunks) => <Link href="services/uv-varnish" className="link">{chunks}</Link>,
  toPlasticCards: (chunks) => <Link href="services/plastic-cards" className="link">{chunks}</Link>,
};
