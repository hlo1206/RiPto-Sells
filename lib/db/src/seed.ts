import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { categoriesTable, productsTable } from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set.");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const categories = [
  { name: "Perfumes", slug: "perfumes", description: "Signature scents and luxury fragrances." },
  { name: "Daily Use", slug: "daily-use", description: "Premium essentials for everyday life." },
  { name: "Skincare", slug: "skincare", description: "Rejuvenating and nourishing routines." },
  { name: "Electronics", slug: "electronics", description: "State-of-the-art modern devices." },
  { name: "Clothing", slug: "clothing", description: "Haute couture and ready-to-wear fashion." },
  { name: "Home Decor", slug: "home-decor", description: "Elegant accents for your living space." },
  { name: "Accessories", slug: "accessories", description: "The perfect finishing touches." },
];

const productData = [
  // PERFUMES (categoryId 1)
  { name: "Oud Noir Extrait", description: "A mysterious and deeply luxurious fragrance blending rare oud wood with dark amber and hints of spice. Long-lasting and exceptionally memorable.", price: "285.00", categorySlug: "perfumes", rating: "4.8", reviewCount: 124, inStock: true, featured: true, badge: "Bestseller", imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80" },
  { name: "Rose d'Or Eau de Parfum", description: "An opulent bouquet of Bulgarian rose, saffron, and white musk. Timeless femininity bottled in liquid gold.", price: "195.00", originalPrice: "240.00", categorySlug: "perfumes", rating: "4.6", reviewCount: 89, inStock: true, featured: false, badge: "Sale", imageUrl: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80" },
  { name: "Amber Soleil", description: "Warm amber and vanilla accord layered with bergamot and cedarwood. A scent that wraps you in pure comfort.", price: "165.00", categorySlug: "perfumes", rating: "4.5", reviewCount: 67, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80" },
  { name: "Noir Vetiver", description: "Deep, smoky vetiver balanced by iris and black pepper. For those who command a room the moment they enter.", price: "230.00", categorySlug: "perfumes", rating: "4.7", reviewCount: 103, inStock: true, featured: false, badge: "New Arrival", imageUrl: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80" },
  { name: "Neroli Blanche", description: "Crisp Italian neroli, jasmine petals, and a hint of white tea. The freshest expression of Mediterranean luxury.", price: "145.00", categorySlug: "perfumes", rating: "4.4", reviewCount: 55, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=800&q=80" },
  { name: "Santal Mystique", description: "Rare East Indian sandalwood blended with creamy milk, soft leather, and a whisper of incense. Deeply meditative.", price: "310.00", categorySlug: "perfumes", rating: "4.9", reviewCount: 178, inStock: false, featured: false, badge: "Limited", imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80" },

  // DAILY USE (categoryId 2)
  { name: "Charcoal Purifying Wash", description: "A gentle yet powerful daily face cleanser enriched with activated charcoal, aloe vera, and hyaluronic acid.", price: "45.00", categorySlug: "daily-use", rating: "4.5", reviewCount: 213, inStock: true, featured: true, badge: "Bestseller", imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80" },
  { name: "Silk Infusion Shampoo", description: "A luxurious blend of silk proteins and argan oil that transforms even the most damaged hair into silky perfection.", price: "68.00", categorySlug: "daily-use", rating: "4.6", reviewCount: 145, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1631390168967-5e2c63a3e01e?w=800&q=80" },
  { name: "Ultra Whitening Toothpaste", description: "Professional-grade whitening with enamel protection. Leaves teeth visibly brighter after just one use.", price: "28.00", categorySlug: "daily-use", rating: "4.3", reviewCount: 321, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1571160119891-a9c4b9c94acb?w=800&q=80" },
  { name: "24H Deodorant Stick", description: "Alcohol-free, long-lasting odour protection powered by natural minerals and soothing botanical extracts.", price: "35.00", categorySlug: "daily-use", rating: "4.4", reviewCount: 98, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80" },
  { name: "Hand & Nail Repair Cream", description: "Intensive overnight formula with shea butter, vitamin E, and collagen for visibly softer hands in 7 days.", price: "42.00", originalPrice: "55.00", categorySlug: "daily-use", rating: "4.7", reviewCount: 167, inStock: true, featured: false, badge: "Sale", imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80" },
  { name: "Hydrating Body Lotion", description: "A lightweight, fast-absorbing lotion enriched with ceramides and niacinamide that leaves skin supple for 48 hours.", price: "58.00", categorySlug: "daily-use", rating: "4.5", reviewCount: 204, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&q=80" },

  // SKINCARE (categoryId 3)
  { name: "Vitamin C Brightening Serum", description: "20% stabilised Vitamin C with ferulic acid and niacinamide. Visibly fades dark spots and evens skin tone in 4 weeks.", price: "120.00", categorySlug: "skincare", rating: "4.8", reviewCount: 289, inStock: true, featured: true, badge: "Editor's Pick", imageUrl: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80" },
  { name: "Retinol Night Renewal Cream", description: "0.5% encapsulated retinol combined with peptides and ceramides for visible anti-ageing results with minimal irritation.", price: "145.00", categorySlug: "skincare", rating: "4.7", reviewCount: 156, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80" },
  { name: "Hyaluronic Acid Gel Moisturiser", description: "Three molecular weights of hyaluronic acid deliver deep hydration to every layer of the skin. Weightless, oil-free formula.", price: "89.00", categorySlug: "skincare", rating: "4.6", reviewCount: 412, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80" },
  { name: "SPF 50 Daily Sunscreen", description: "Lightweight, invisible broad-spectrum SPF 50 with blue-light protection and a silky, non-greasy finish.", price: "75.00", categorySlug: "skincare", rating: "4.5", reviewCount: 334, inStock: true, featured: false, badge: "New Arrival", imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=800&q=80" },
  { name: "Rose Water Toner", description: "Pure Bulgarian rose water with glycerin and panthenol. Balances pH, minimises pores, and preps skin for serums.", price: "55.00", categorySlug: "skincare", rating: "4.4", reviewCount: 178, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=800&q=80" },
  { name: "Exfoliating AHA Mask", description: "10% glycolic acid weekly treatment mask that resurfaces, brightens, and refines texture for a radiant complexion.", price: "98.00", originalPrice: "125.00", categorySlug: "skincare", rating: "4.7", reviewCount: 92, inStock: true, featured: false, badge: "Sale", imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80" },

  // ELECTRONICS (categoryId 4)
  { name: "ANC Pro Wireless Headphones", description: "40dB active noise cancellation, 35-hour playtime, and studio-grade drivers that reproduce every nuance of your music.", price: "349.00", categorySlug: "electronics", rating: "4.9", reviewCount: 567, inStock: true, featured: true, badge: "Top Rated", imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" },
  { name: "Smart Watch Ultra", description: "Health monitoring, GPS, AMOLED display, and 7-day battery life in a premium stainless-steel case.", price: "289.00", categorySlug: "electronics", rating: "4.7", reviewCount: 389, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80" },
  { name: "True Wireless Earbuds Pro", description: "6mm dynamic drivers, 28-hour total battery with case, IPX5 water resistance, and seamless device switching.", price: "185.00", originalPrice: "229.00", categorySlug: "electronics", rating: "4.6", reviewCount: 445, inStock: true, featured: false, badge: "Sale", imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80" },
  { name: "Portable Bluetooth Speaker", description: "360° immersive sound, waterproof design, 20-hour playtime, and a built-in power bank for your adventures.", price: "159.00", categorySlug: "electronics", rating: "4.5", reviewCount: 267, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80" },
  { name: "Wireless Charging Pad", description: "15W fast wireless charger compatible with all Qi devices. Slim aluminium design with intelligent overcharge protection.", price: "79.00", categorySlug: "electronics", rating: "4.4", reviewCount: 198, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1619407826042-02f0f05c7ab5?w=800&q=80" },
  { name: "4K Action Camera", description: "4K/60fps video, 20MP photos, 6-axis stabilisation, and 90-minute battery life in a rugged, waterproof body.", price: "249.00", categorySlug: "electronics", rating: "4.8", reviewCount: 134, inStock: false, featured: false, badge: "Coming Soon", imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80" },

  // CLOTHING (categoryId 5)
  { name: "Merino Wool Turtleneck", description: "Extra-fine 18.5 micron merino wool. Naturally temperature-regulating, odour-resistant, and machine washable.", price: "185.00", categorySlug: "clothing", rating: "4.8", reviewCount: 203, inStock: true, featured: true, badge: "New Arrival", imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80" },
  { name: "Slim Fit Linen Trousers", description: "Italian linen blend trousers with a modern slim fit. Breathable, wrinkle-resistant, and impeccably tailored.", price: "145.00", categorySlug: "clothing", rating: "4.6", reviewCount: 118, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80" },
  { name: "Cashmere Blend Overcoat", description: "70% cashmere, 30% wool overcoat with a notched lapel and satin lining. The ultimate investment piece.", price: "495.00", originalPrice: "650.00", categorySlug: "clothing", rating: "4.9", reviewCount: 67, inStock: true, featured: false, badge: "Sale", imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80" },
  { name: "Silk Dress Shirt", description: "100% mulberry silk dress shirt with a spread collar and French cuffs. Effortlessly luxurious for any occasion.", price: "225.00", categorySlug: "clothing", rating: "4.7", reviewCount: 89, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80" },
  { name: "Performance Polo Shirt", description: "Moisture-wicking, quick-dry piqué fabric with UV50 protection. From boardroom to fairway without missing a beat.", price: "95.00", categorySlug: "clothing", rating: "4.5", reviewCount: 156, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1625910513936-a22e3736c22a?w=800&q=80" },
  { name: "Pleated Wide-Leg Trousers", description: "High-rise, wide-leg trousers in Japanese crepe fabric with a flowing drape and invisible side-zip closure.", price: "178.00", categorySlug: "clothing", rating: "4.6", reviewCount: 74, inStock: true, featured: false, badge: "Trending", imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4b5c6a?w=800&q=80" },

  // HOME DECOR (categoryId 6)
  { name: "Handblown Glass Vase", description: "Each piece is unique, hand-blown by master glassmakers in Venice. A timeless statement for any interior.", price: "245.00", categorySlug: "home-decor", rating: "4.9", reviewCount: 56, inStock: true, featured: true, badge: "Artisan", imageUrl: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80" },
  { name: "Linen Throw Blanket", description: "Stone-washed French linen with a double-sided design. Lightweight, breathable, and gets softer with every wash.", price: "135.00", categorySlug: "home-decor", rating: "4.7", reviewCount: 143, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" },
  { name: "Marble Serving Board", description: "Sustainably sourced Carrara marble with a natural edge and brass handles. A statement piece for any kitchen.", price: "189.00", categorySlug: "home-decor", rating: "4.8", reviewCount: 78, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80" },
  { name: "Scented Soy Candle Set", description: "Three artisanal soy wax candles in signature scents: Sandalwood & Cedar, White Tea, and Sea Salt & Driftwood.", price: "89.00", categorySlug: "home-decor", rating: "4.6", reviewCount: 221, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=800&q=80" },
  { name: "Woven Wool Area Rug", description: "Hand-knotted New Zealand wool with a flat-weave construction. Natural dyes, geometric pattern, and anti-slip backing.", price: "385.00", originalPrice: "490.00", categorySlug: "home-decor", rating: "4.8", reviewCount: 34, inStock: true, featured: false, badge: "Sale", imageUrl: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80" },
  { name: "Brass Desk Lamp", description: "Adjustable solid brass desk lamp with a frosted glass shade and dimmer switch. Inspired by mid-century design.", price: "275.00", categorySlug: "home-decor", rating: "4.7", reviewCount: 67, inStock: true, featured: false, badge: "New Arrival", imageUrl: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80" },

  // ACCESSORIES (categoryId 7)
  { name: "Full-Grain Leather Wallet", description: "Vegetable-tanned full-grain leather bi-fold wallet with 6 card slots, a bill compartment, and RFID blocking.", price: "125.00", categorySlug: "accessories", rating: "4.8", reviewCount: 312, inStock: true, featured: true, badge: "Bestseller", imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80" },
  { name: "Silk Pocket Square", description: "Hand-rolled edges, 100% silk twill in a versatile geometric print. The perfect finishing touch to any suit.", price: "65.00", categorySlug: "accessories", rating: "4.6", reviewCount: 87, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4b5c6a?w=800&q=80" },
  { name: "Polarised Aviator Sunglasses", description: "Titanium frames, polarised mineral glass lenses, and a UV400 coating. Lightweight at just 28g.", price: "295.00", categorySlug: "accessories", rating: "4.7", reviewCount: 156, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80" },
  { name: "Leather Card Holder", description: "Minimalist 4-card holder in full-grain Italian leather. Slim enough for your front pocket, crafted to last decades.", price: "85.00", categorySlug: "accessories", rating: "4.5", reviewCount: 198, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=800&q=80" },
  { name: "Woven Leather Belt", description: "Hand-woven Italian leather belt with a solid brass buckle. Reversible brown/tan for twice the versatility.", price: "115.00", categorySlug: "accessories", rating: "4.6", reviewCount: 134, inStock: true, featured: false, imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80" },
  { name: "Sterling Silver Cufflinks", description: "925 sterling silver cufflinks with a brushed finish and a polished edge. Presented in a luxury gift box.", price: "175.00", originalPrice: "220.00", categorySlug: "accessories", rating: "4.7", reviewCount: 45, inStock: true, featured: false, badge: "Sale", imageUrl: "https://images.unsplash.com/photo-1620507814149-0b6bccdbb24e?w=800&q=80" },
];

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(productsTable);
  await db.delete(categoriesTable);
  console.log("Cleared existing data.");

  // Insert categories
  const insertedCategories = await db.insert(categoriesTable).values(categories).returning();
  console.log(`Inserted ${insertedCategories.length} categories.`);

  // Build a slug → id map
  const categoryMap = new Map(insertedCategories.map(c => [c.slug, c.id]));

  // Insert products
  const productsToInsert = productData.map(p => {
    const { categorySlug, ...rest } = p;
    const categoryId = categoryMap.get(categorySlug);
    if (!categoryId) throw new Error(`No category found for slug: ${categorySlug}`);
    return { ...rest, categoryId };
  });

  const insertedProducts = await db.insert(productsTable).values(productsToInsert).returning();
  console.log(`Inserted ${insertedProducts.length} products.`);

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
