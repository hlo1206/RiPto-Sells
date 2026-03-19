import type { IncomingMessage, ServerResponse } from "http";
import { PRODUCTS } from "../_data";

export default function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") { res.statusCode = 204; res.end(); return; }
  if (req.method !== "GET") { res.statusCode = 405; res.end(JSON.stringify({ error: "Method not allowed" })); return; }

  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  const categoryId = url.searchParams.get("categoryId");
  const featured = url.searchParams.get("featured");
  const search = url.searchParams.get("search");

  let results = [...PRODUCTS];

  if (categoryId) results = results.filter(p => p.categoryId === parseInt(categoryId, 10));
  if (featured === "true") results = results.filter(p => p.featured);
  if (search) results = results.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  res.statusCode = 200;
  res.end(JSON.stringify(results));
}
