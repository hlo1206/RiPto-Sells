import type { IncomingMessage, ServerResponse } from "http";
import { PRODUCTS } from "../_data";

function extractId(req: IncomingMessage & { query?: Record<string, string | string[]> }): number {
  const q = req.query?.id;
  const fromQuery = Array.isArray(q) ? q[0] : q;
  if (fromQuery) return parseInt(fromQuery, 10);
  const match = (req.url ?? "").match(/\/api\/products\/(\d+)/);
  if (match) return parseInt(match[1], 10);
  const parts = (req.url ?? "").split("?")[0].split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
}

export default function handler(
  req: IncomingMessage & { query?: Record<string, string | string[]> },
  res: ServerResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") { res.statusCode = 204; res.end(); return; }
  if (req.method !== "GET") { res.statusCode = 405; res.end(JSON.stringify({ error: "Method not allowed" })); return; }

  const id = extractId(req);

  if (isNaN(id)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Invalid product ID" }));
    return;
  }

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Product not found" }));
    return;
  }

  res.statusCode = 200;
  res.end(JSON.stringify(product));
}
