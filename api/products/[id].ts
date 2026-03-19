import type { IncomingMessage, ServerResponse } from "http";
import { Pool } from "pg";

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set.");
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  }
  return pool;
}

function extractIdFromUrl(url: string | undefined): number {
  if (!url) return NaN;
  const match = url.match(/\/api\/products\/(\d+)/);
  if (match) return parseInt(match[1], 10);
  const parts = url.split("?")[0].split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  return parseInt(last, 10);
}

export default async function handler(
  req: IncomingMessage & { query?: Record<string, string | string[]> },
  res: ServerResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    const queryId = req.query?.id;
    const idStr = Array.isArray(queryId) ? queryId[0] : queryId;
    const id = idStr ? parseInt(idStr, 10) : extractIdFromUrl(req.url);

    if (isNaN(id)) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Invalid product ID" }));
      return;
    }

    const query = `
      SELECT
        p.id, p.name, p.description, p.price, p.original_price,
        p.image_url, p.images, p.category_id, c.name AS category_name,
        p.rating, p.review_count, p.in_stock, p.featured, p.badge
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1
    `;

    const { rows } = await getPool().query(query, [id]);

    if (rows.length === 0) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Product not found" }));
      return;
    }

    const p = rows[0];
    const product = {
      id: p.id,
      name: p.name,
      description: p.description ?? undefined,
      price: parseFloat(p.price),
      originalPrice: p.original_price ? parseFloat(p.original_price) : undefined,
      imageUrl: p.image_url ?? undefined,
      images: p.images ?? undefined,
      categoryId: p.category_id ?? 0,
      categoryName: p.category_name ?? undefined,
      rating: p.rating ? parseFloat(p.rating) : undefined,
      reviewCount: p.review_count ?? undefined,
      inStock: p.in_stock ?? true,
      featured: p.featured ?? false,
      badge: p.badge ?? undefined,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(product));
  } catch (err) {
    console.error("GET /api/products/[id] error:", err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
}
