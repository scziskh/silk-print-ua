import { Link } from '@/i18n/routing';

export const richTags = {
  strong: (chunks) => <strong>{chunks}</strong>,
  linkPaper: (chunks) => (
    <Link href="/paper/">
      <strong>{chunks}</strong>
    </Link>
  ),
  linkFoil: (chunks) => (
    <Link href="/services/foil-stamping/">
      <strong>{chunks}</strong>
    </Link>
  ),
  linkUV: (chunks) => (
    <Link href="/services/thermography/">
      <strong>{chunks}</strong>
    </Link>
  ),
};
