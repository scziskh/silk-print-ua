import { pool } from '@/lib/db';

export const GET_PRICING_SQL = `
  WITH
  tiered_options AS (
      SELECT
          product_id,
          operation_id,
          quantity,
          json_object_agg(option_key, value ORDER BY id) AS options_json
      FROM product_prices
      WHERE quantity IS NOT NULL
      GROUP BY product_id, operation_id, quantity
  ),
  tiered_operations AS (
      SELECT
          product_id,
          operation_id,
          json_object_agg(quantity::text, options_json ORDER BY quantity) AS op_json
      FROM tiered_options
      GROUP BY product_id, operation_id
  ),
  flat_operations AS (
      SELECT
          product_id,
          operation_id,
          json_object_agg(option_key, value ORDER BY id) AS op_json
      FROM product_prices
      WHERE quantity IS NULL
      GROUP BY product_id, operation_id
  ),
  all_operations AS (
      SELECT product_id, operation_id, op_json FROM tiered_operations
      UNION ALL
      SELECT product_id, operation_id, op_json FROM flat_operations
  ),
  product_trees AS (
      SELECT
          p.slug AS product_slug,
          json_object_agg(o.slug, ao.op_json ORDER BY o.id) AS product_json
      FROM all_operations ao
      JOIN products p ON p.id = ao.product_id
      JOIN operations o ON o.id = ao.operation_id
      WHERE ($1::text IS NULL OR p.slug = $1)
      GROUP BY p.slug
  )
  SELECT COALESCE(json_object_agg(product_slug, product_json), '{}'::json) AS pricing_config
  FROM product_trees;
`;

export const SERVICE_PRICE_MULTIPLIER = 1.36;

export async function getPricingConfig(productSlug = null) {
  const { rows } = await pool.query(GET_PRICING_SQL, [productSlug]);
  return rows[0]?.pricing_config ?? {};
}

export function formatUahPrice(eurValue, eurRate, multiplier = SERVICE_PRICE_MULTIPLIER) {
  const numeric = Number(eurValue);
  if (!Number.isFinite(numeric) || !Number.isFinite(eurRate) || eurRate <= 0) {
    return null;
  }
  return Math.ceil(numeric * eurRate * multiplier);
}

export function buildTieredPricingRows({
  tierMap,
  eurRate,
  quantities = ['100', '200', '500', '1000'],
  optionKeys = ['1_color', '2_colors', 'next_color'],
  multiplier = SERVICE_PRICE_MULTIPLIER,
  unitLabel = 'шт.',
  currencySuffix = '₴',
}) {
  if (!tierMap || !Number.isFinite(eurRate) || eurRate <= 0) {
    return null;
  }

  const rows = [];
  for (const qty of quantities) {
    const tier = tierMap[String(qty)];
    if (!tier) return null;

    const formattedCells = optionKeys.map((key) => {
      const price = formatUahPrice(tier[key], eurRate, multiplier);
      return price === null ? null : `${price} ${currencySuffix}`;
    });

    if (formattedCells.some((cell) => cell === null)) {
      return null;
    }

    rows.push([`${qty} ${unitLabel}`, ...formattedCells]);
  }

  return rows;
}
