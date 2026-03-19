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

export default async function handler(req: IncomingMessage, res: ServerResponse) {
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
    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
    const categoryId = url.searchParams.get("categoryId");
    const featured = url.searchParams.get("featured");
    const search = url.searchParams.get("search");

    const conditions: string[] = [];
    const params: (string | number)[] = [];
    let paramIdx = 1;

    if (categoryId) {
      conditions.push(`p.category_id = $${paramIdx++}`);
      params.push(parseInt(categoryId, 10));
    }
    if (featured === "true") {
      conditions.push(`p.featured = true`);
    }
    if (search) {
      conditions.push(`p.name ILIKE $${paramIdx++}`);
      params.push(`%${search}%`);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT
        p.id, p.name, p.description, p.price, p.original_price,
        p.image_url, p.images, p.category_id, c.name AS category_name,
        p.rating, p.review_count, p.in_stock, p.featured, p.badge
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ${where}
      ORDER BY p.id ASC
    `;

    const { rows } = await getPool().query(query, params);

    const products = rows.map((p) => ({
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
    }));

    res.statusCode = 200;
    res.end(JSON.stringify(products));
  } catch (err) {
    console.error("GET /api/products error:", err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
}
