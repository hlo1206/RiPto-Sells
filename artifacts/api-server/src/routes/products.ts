import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { categoriesTable, productsTable } from "@workspace/db/schema";
import { eq, ilike, and, count } from "drizzle-orm";
import {
  GetCategoriesResponse,
  GetProductsResponse,
  GetProductResponse,
  GetProductsQueryParams,
  GetProductParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/categories", async (_req, res) => {
  const categories = await db.select().from(categoriesTable);
  const result = await Promise.all(
    categories.map(async (cat) => {
      const [{ value }] = await db
        .select({ value: count() })
        .from(productsTable)
        .where(eq(productsTable.categoryId, cat.id));
      return {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description ?? undefined,
        imageUrl: cat.imageUrl ?? undefined,
        productCount: Number(value),
      };
    })
  );
  res.json(GetCategoriesResponse.parse(result));
});

router.get("/products", async (req, res) => {
  const query = GetProductsQueryParams.parse(req.query);

  const conditions = [];
  if (query.categoryId) {
    conditions.push(eq(productsTable.categoryId, query.categoryId));
  }
  if (query.featured) {
    conditions.push(eq(productsTable.featured, true));
  }
  if (query.search) {
    conditions.push(ilike(productsTable.name, `%${query.search}%`));
  }

  const products = await db
    .select({
      id: productsTable.id,
      name: productsTable.name,
      description: productsTable.description,
      price: productsTable.price,
      originalPrice: productsTable.originalPrice,
      imageUrl: productsTable.imageUrl,
      images: productsTable.images,
      categoryId: productsTable.categoryId,
      categoryName: categoriesTable.name,
      rating: productsTable.rating,
      reviewCount: productsTable.reviewCount,
      inStock: productsTable.inStock,
      featured: productsTable.featured,
      badge: productsTable.badge,
    })
    .from(productsTable)
    .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  const result = products.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description ?? undefined,
    price: Number(p.price),
    originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
    imageUrl: p.imageUrl ?? undefined,
    images: p.images ?? undefined,
    categoryId: p.categoryId ?? 0,
    categoryName: p.categoryName ?? undefined,
    rating: p.rating ? Number(p.rating) : undefined,
    reviewCount: p.reviewCount ?? undefined,
    inStock: p.inStock ?? true,
    featured: p.featured ?? false,
    badge: p.badge ?? undefined,
  }));

  res.json(GetProductsResponse.parse(result));
});

router.get("/products/:id", async (req, res) => {
  const { id } = GetProductParams.parse(req.params);

  const [product] = await db
    .select({
      id: productsTable.id,
      name: productsTable.name,
      description: productsTable.description,
      price: productsTable.price,
      originalPrice: productsTable.originalPrice,
      imageUrl: productsTable.imageUrl,
      images: productsTable.images,
      categoryId: productsTable.categoryId,
      categoryName: categoriesTable.name,
      rating: productsTable.rating,
      reviewCount: productsTable.reviewCount,
      inStock: productsTable.inStock,
      featured: productsTable.featured,
      badge: productsTable.badge,
    })
    .from(productsTable)
    .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .where(eq(productsTable.id, id));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(
    GetProductResponse.parse({
      id: product.id,
      name: product.name,
      description: product.description ?? undefined,
      price: Number(product.price),
      originalPrice: product.originalPrice ? Number(product.originalPrice) : undefined,
      imageUrl: product.imageUrl ?? undefined,
      images: product.images ?? undefined,
      categoryId: product.categoryId ?? 0,
      categoryName: product.categoryName ?? undefined,
      rating: product.rating ? Number(product.rating) : undefined,
      reviewCount: product.reviewCount ?? undefined,
      inStock: product.inStock ?? true,
      featured: product.featured ?? false,
      badge: product.badge ?? undefined,
    })
  );
});

export default router;
