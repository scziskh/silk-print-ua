import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getPricingConfig } from '@/lib/pricing';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const productSlug = request.nextUrl.searchParams.get('product');
    const config = await getPricingConfig(productSlug);

    if (productSlug && !config[productSlug]) {
      return NextResponse.json({ error: `Продукт "${productSlug}" не найден` }, { status: 404 });
    }

    return NextResponse.json(config, { status: 200 });
  } catch (error) {
    console.error('Ошибка при получении прайса:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера при чтении прайса' }, { status: 500 });
  }
}

export async function PATCH(request) {
  const client = await pool.connect();

  try {
    const body = await request.json();
    const updates = Array.isArray(body.updates) ? body.updates : [body];

    if (updates.length === 0) {
      return NextResponse.json({ error: 'Список изменений пуст' }, { status: 400 });
    }

    for (const item of updates) {
      const numericValue = Number(item.value);
      if (
        !item.productSlug ||
        !item.operationSlug ||
        !item.optionKey ||
        item.value === '' ||
        item.value === null ||
        item.value === undefined ||
        !Number.isFinite(numericValue) ||
        numericValue < 0
      ) {
        return NextResponse.json({ error: `Некорректное значение для ${item.operationSlug} -> ${item.optionKey}` }, { status: 400 });
      }
    }

    const updateSql = `
      UPDATE product_prices pp
      SET value = $1
      FROM products p, operations o
      WHERE pp.product_id = p.id
        AND pp.operation_id = o.id
        AND p.slug = $2
        AND o.slug = $3
        AND pp.option_key = $4
        AND pp.quantity IS NOT DISTINCT FROM $5
      RETURNING pp.id;
    `;

    await client.query('BEGIN');

    let updatedCount = 0;
    for (const item of updates) {
      const quantity = item.quantity === null || item.quantity === undefined ? null : Number(item.quantity);

      const res = await client.query(updateSql, [Number(item.value), item.productSlug, item.operationSlug, item.optionKey, quantity]);

      updatedCount += res.rowCount;
    }

    await client.query('COMMIT');

    return NextResponse.json({ success: true, updatedCount }, { status: 200 });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Ошибка при обновлении цен:', error);
    return NextResponse.json({ error: 'Не удалось сохранить изменения в базе данных' }, { status: 500 });
  } finally {
    client.release();
  }
}
