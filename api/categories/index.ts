import type { IncomingMessage, ServerResponse } from "http";
import { CATEGORIES } from "../_data";

export default function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") { res.statusCode = 204; res.end(); return; }
  if (req.method !== "GET") { res.statusCode = 405; res.end(JSON.stringify({ error: "Method not allowed" })); return; }

  res.statusCode = 200;
  res.end(JSON.stringify(CATEGORIES));
}
