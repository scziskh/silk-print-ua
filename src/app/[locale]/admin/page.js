import { pool } from '@/lib/db';
import { getPricingConfig } from '@/lib/pricing';
import { getFirstOfMonthEurRate } from '@/lib/currency';
import PricingAdmin from '@/components/admin-components/pricing';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Управление прайсом — Админ-панель',
};

export default async function AdminPricingPage() {
  const [productsRes, operationsRes, initialPricing, eurRateInfo] = await Promise.all([
    pool.query('SELECT id, slug, name FROM products ORDER BY id ASC'),
    pool.query('SELECT id, slug, name FROM operations ORDER BY id ASC'),
    getPricingConfig(null),
    getFirstOfMonthEurRate(),
  ]);

  return <PricingAdmin products={productsRes.rows} operations={operationsRes.rows} initialPricing={initialPricing} eurRateInfo={eurRateInfo} />;
}
