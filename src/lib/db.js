import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';

function loadInitialPricing() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'api', 'price.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function createMockPool() {
  const mockPricing = globalThis.__mockPricing ?? loadInitialPricing();
  if (process.env.NODE_ENV !== 'production') {
    globalThis.__mockPricing = mockPricing;
  }

  const OPERATION_NAMES = {
    'silk-screen-printing': 'Шелкография',
    layering: 'Каширование',
    'foil-stamping': 'Тиснение фольгой',
    UV_varnish: 'Выборочный УФ-лак',
    debossing: 'Слепое (блинтовое) тиснение',
    embossing: 'Конгревное тиснение',
    edges_painted: 'Покраска торцов',
    cutting: 'Высечка',
    edges_rounded: 'Скругление углов',
    cliche: 'Клише',
  };

  const PRODUCT_NAMES = {
    'business-cards': 'Визитки',
  };

  const handleQuery = async (sql, params = []) => {
    const normalized = String(sql).trim();

    if (normalized.includes('FROM products')) {
      const products = Object.keys(mockPricing).map((slug, idx) => ({
        id: idx + 1,
        slug,
        name: PRODUCT_NAMES[slug] || slug,
      }));
      return { rows: products };
    }

    if (normalized.includes('FROM operations')) {
      const opSlugs = new Set();
      for (const product of Object.values(mockPricing)) {
        for (const opSlug of Object.keys(product || {})) {
          opSlugs.add(opSlug);
        }
      }
      const operations = Array.from(opSlugs).map((slug, idx) => ({
        id: idx + 1,
        slug,
        name: OPERATION_NAMES[slug] || slug,
      }));
      return { rows: operations };
    }

    if (normalized.includes('AS pricing_config')) {
      const productSlug = params[0] || null;
      if (productSlug) {
        const result = mockPricing[productSlug] ? { [productSlug]: mockPricing[productSlug] } : {};
        return { rows: [{ pricing_config: result }] };
      }
      return { rows: [{ pricing_config: mockPricing }] };
    }

    if (normalized.startsWith('UPDATE product_prices')) {
      const [value, productSlug, operationSlug, optionKey, quantity] = params;
      const op = mockPricing?.[productSlug]?.[operationSlug];
      if (!op) return { rowCount: 0, rows: [] };
      if (quantity === null || quantity === undefined) {
        if (op[optionKey] === undefined) return { rowCount: 0, rows: [] };
        op[optionKey] = value;
        return { rowCount: 1, rows: [{ id: 1 }] };
      }
      const tier = op[String(quantity)];
      if (!tier || tier[optionKey] === undefined) return { rowCount: 0, rows: [] };
      tier[optionKey] = value;
      return { rowCount: 1, rows: [{ id: 1 }] };
    }

    return { rows: [], rowCount: 0 };
  };

  return {
    query: handleQuery,
    connect: async () => ({
      query: handleQuery,
      release: () => {},
    }),
  };
}

let pool;

if (process.env.DATABASE_URL) {
  try {
    pool =
      globalThis.pgPool ??
      new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
      });

    if (process.env.NODE_ENV !== 'production') {
      globalThis.pgPool = pool;
    }
  } catch {
    console.warn('Database not connected — using in-memory mock');
    pool = createMockPool();
  }
} else {
  console.warn('DATABASE_URL not set — using in-memory mock');
  pool = createMockPool();
}

export { pool };
