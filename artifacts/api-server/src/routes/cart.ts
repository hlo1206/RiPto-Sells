import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { cartItemsTable, productsTable, categoriesTable } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";
import {
  AddToCartBody,
  UpdateCartItemBody,
  UpdateCartItemParams,
  RemoveFromCartParams,
  GetCartResponse,
  UpdateCartItemResponse,
  RemoveFromCartResponse,
  ClearCartResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function getSessionId(req: any): string {
  if (req.isAuthenticated && req.isAuthenticated() && req.user) {
    return `user_${req.user.id}`;
  }
  const sessionCookie = req.cookies?.["ripto_session"];
  if (sessionCookie) return sessionCookie;
  return `anon_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

router.get("/cart", async (req, res) => {
  const sessionId = getSessionId(req);

  const items = await db
    .select({
      id: cartItemsTable.id,
      productId: cartItemsTable.productId,
      quantity: cartItemsTable.quantity,
      productName: productsTable.name,
      productDescription: productsTable.description,
      productPrice: productsTable.price,
      productOriginalPrice: productsTable.originalPrice,
      productImageUrl: productsTable.imageUrl,
      productImages: productsTable.images,
      productCategoryId: productsTable.categoryId,
      productCategoryName: categoriesTable.name,
      productRating: productsTable.rating,
      productReviewCount: productsTable.reviewCount,
      productInStock: productsTable.inStock,
      productFeatured: productsTable.featured,
      productBadge: productsTable.badge,
    })
    .from(cartItemsTable)
    .leftJoin(productsTable, eq(cartItemsTable.productId, productsTable.id))
    .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .where(eq(cartItemsTable.sessionId, sessionId));

  const result = items.map((item) => ({
    id: item.id,
    productId: item.productId,
    quantity: item.quantity,
    product: {
      id: item.productId,
      name: item.productName ?? "",
      description: item.productDescription ?? undefined,
      price: Number(item.productPrice ?? 0),
      originalPrice: item.productOriginalPrice ? Number(item.productOriginalPrice) : undefined,
      imageUrl: item.productImageUrl ?? undefined,
      images: item.productImages ?? undefined,
      categoryId: item.productCategoryId ?? 0,
      categoryName: item.productCategoryName ?? undefined,
      rating: item.productRating ? Number(item.productRating) : undefined,
      reviewCount: item.productReviewCount ?? undefined,
      inStock: item.productInStock ?? true,
      featured: item.productFeatured ?? false,
      badge: item.productBadge ?? undefined,
    },
  }));

  res.json(GetCartResponse.parse(result));
});

router.post("/cart", async (req, res) => {
  const sessionId = getSessionId(req);
  const body = AddToCartBody.parse(req.body);

  const existing = await db
    .select()
    .from(cartItemsTable)
    .where(
      and(
        eq(cartItemsTable.sessionId, sessionId),
        eq(cartItemsTable.productId, body.productId)
      )
    );

  if (existing.length > 0) {
    const [updated] = await db
      .update(cartItemsTable)
      .set({ quantity: existing[0].quantity + body.quantity })
      .where(eq(cartItemsTable.id, existing[0].id))
      .returning();

    res.status(201).json({ id: updated.id, productId: updated.productId, quantity: updated.quantity });
    return;
  }

  const [item] = await db
    .insert(cartItemsTable)
    .values({ sessionId, productId: body.productId, quantity: body.quantity })
    .returning();

  res.status(201).json({ id: item.id, productId: item.productId, quantity: item.quantity });
});

router.put("/cart/:productId", async (req, res) => {
  const sessionId = getSessionId(req);
  const { productId } = UpdateCartItemParams.parse(req.params);
  const body = UpdateCartItemBody.parse(req.body);

  const [updated] = await db
    .update(cartItemsTable)
    .set({ quantity: body.quantity })
    .where(
      and(
        eq(cartItemsTable.sessionId, sessionId),
        eq(cartItemsTable.productId, productId)
      )
    )
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Cart item not found" });
    return;
  }

  res.json(UpdateCartItemResponse.parse({ id: updated.id, productId: updated.productId, quantity: updated.quantity }));
});

router.delete("/cart/clear", async (req, res) => {
  const sessionId = getSessionId(req);
  await db.delete(cartItemsTable).where(eq(cartItemsTable.sessionId, sessionId));
  res.json(ClearCartResponse.parse({ success: true }));
});

router.delete("/cart/:productId", async (req, res) => {
  const sessionId = getSessionId(req);
  const { productId } = RemoveFromCartParams.parse(req.params);

  await db
    .delete(cartItemsTable)
    .where(
      and(
        eq(cartItemsTable.sessionId, sessionId),
        eq(cartItemsTable.productId, productId)
      )
    );

  res.json(RemoveFromCartResponse.parse({ success: true }));
});

export default router;
