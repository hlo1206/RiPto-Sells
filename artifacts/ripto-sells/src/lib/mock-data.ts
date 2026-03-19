import { Product, Category } from "@workspace/api-client-react";

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Perfumes", slug: "perfumes", description: "Signature scents and luxury fragrances.", productCount: 6 },
  { id: 2, name: "Daily Use", slug: "daily-use", description: "Premium essentials for everyday life.", productCount: 6 },
  { id: 3, name: "Skincare", slug: "skincare", description: "Rejuvenating and nourishing routines.", productCount: 6 },
  { id: 4, name: "Electronics", slug: "electronics", description: "State-of-the-art modern devices.", productCount: 6 },
  { id: 5, name: "Clothing", slug: "clothing", description: "Haute couture and ready-to-wear fashion.", productCount: 6 },
  { id: 6, name: "Home Decor", slug: "home-decor", description: "Elegant accents for your living space.", productCount: 6 },
  { id: 7, name: "Accessories", slug: "accessories", description: "The perfect finishing touches.", productCount: 6 },
];

export const MOCK_PRODUCTS: Product[] = [
  // ── PERFUMES (id 101–106) ──────────────────────────────────────────────────
  {
    id: 101,
    name: "Oud Noir Extrait",
    description: "A mysterious and deeply luxurious fragrance blending rare oud wood with dark amber and hints of spice. Long-lasting and exceptionally memorable.",
    price: 285.00,
    categoryId: 1,
    categoryName: "Perfumes",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: true,
    badge: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80"
  },
  {
    id: 102,
    name: "Rose d'Or Eau de Parfum",
    description: "An opulent bouquet of Bulgarian rose, saffron, and white musk. Timeless femininity bottled in liquid gold.",
    price: 195.00,
    originalPrice: 240.00,
    categoryId: 1,
    categoryName: "Perfumes",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    badge: "Sale",
    imageUrl: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80"
  },
  {
    id: 103,
    name: "Amber Soleil",
    description: "Warm amber and vanilla accord layered with bergamot and cedarwood. A scent that wraps you in pure comfort.",
    price: 165.00,
    categoryId: 1,
    categoryName: "Perfumes",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80"
  },
  {
    id: 104,
    name: "Noir Vetiver",
    description: "Deep, smoky vetiver balanced by iris and black pepper. For those who command a room the moment they enter.",
    price: 230.00,
    categoryId: 1,
    categoryName: "Perfumes",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    badge: "New Arrival",
    imageUrl: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80"
  },
  {
    id: 105,
    name: "Neroli Blanche",
    description: "Crisp Italian neroli, jasmine petals, and a hint of white tea. The freshest expression of Mediterranean luxury.",
    price: 145.00,
    categoryId: 1,
    categoryName: "Perfumes",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80"
  },
  {
    id: 106,
    name: "Midnight Oud Royale",
    description: "An ultra-premium oud accord blended with Turkish rose and sandalwood. A masterpiece for the true connoisseur.",
    price: 420.00,
    categoryId: 1,
    categoryName: "Perfumes",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    badge: "Limited Edition",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47714263f?w=800&q=80"
  },

  // ── DAILY USE (id 201–206) ─────────────────────────────────────────────────
  {
    id: 201,
    name: "Charcoal Purifying Wash",
    description: "Daily gentle cleanser infused with activated charcoal to draw out impurities without stripping moisture.",
    price: 45.00,
    categoryId: 2,
    categoryName: "Daily Use",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"
  },
  {
    id: 202,
    name: "Eucalyptus Mint Shampoo",
    description: "A salon-grade shampoo that cleanses deeply and leaves hair glossy, fragrant, and visibly thicker.",
    price: 38.00,
    categoryId: 2,
    categoryName: "Daily Use",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80"
  },
  {
    id: 203,
    name: "Argan Oil Conditioner",
    description: "Pure Moroccan argan oil blended with silk proteins. Transforms dry, frizzy hair into silken perfection.",
    price: 42.00,
    categoryId: 2,
    categoryName: "Daily Use",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80"
  },
  {
    id: 204,
    name: "Luxe Body Lotion",
    description: "24-hour moisturising lotion enriched with shea butter and vitamin E for softer, luminous skin all day.",
    price: 55.00,
    categoryId: 2,
    categoryName: "Daily Use",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: false,
    badge: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&q=80"
  },
  {
    id: 205,
    name: "Charcoal Whitening Toothpaste",
    description: "Activated charcoal and coconut oil formula for a naturally white, sparkling smile every morning.",
    price: 22.00,
    categoryId: 2,
    categoryName: "Daily Use",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1622928286296-39fe5b00c1d6?w=800&q=80"
  },
  {
    id: 206,
    name: "Bamboo Fibre Bath Towel Set",
    description: "Ultra-plush towel set woven from organic bamboo fibre. Hypoallergenic, quick-drying, and irresistibly soft.",
    price: 78.00,
    categoryId: 2,
    categoryName: "Daily Use",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&q=80"
  },

  // ── SKINCARE (id 301–306) ──────────────────────────────────────────────────
  {
    id: 301,
    name: "Radiance Vitamin C Serum",
    description: "An ultra-concentrated serum that brightens, firms, and smooths skin tone while delivering deep hydration.",
    price: 120.00,
    originalPrice: 150.00,
    categoryId: 3,
    categoryName: "Skincare",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
  },
  {
    id: 302,
    name: "Retinol Night Cream",
    description: "Clinical-strength 0.5% retinol combined with hyaluronic acid. Wake up to visibly smoother, younger-looking skin.",
    price: 145.00,
    categoryId: 3,
    categoryName: "Skincare",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    badge: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80"
  },
  {
    id: 303,
    name: "Hyaluronic Acid Moisturiser",
    description: "Lightweight yet intensely hydrating formula with triple-weight hyaluronic acid for all skin types.",
    price: 85.00,
    categoryId: 3,
    categoryName: "Skincare",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80"
  },
  {
    id: 304,
    name: "24K Gold Eye Mask",
    description: "Real 24-karat gold-infused patches that de-puff, hydrate, and illuminate the delicate under-eye area.",
    price: 68.00,
    categoryId: 3,
    categoryName: "Skincare",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80"
  },
  {
    id: 305,
    name: "SPF 50 Tinted Sunscreen",
    description: "Invisible broad-spectrum sun protection with a subtle tint for a natural, healthy glow. PA++++.",
    price: 52.00,
    categoryId: 3,
    categoryName: "Skincare",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=800&q=80"
  },
  {
    id: 306,
    name: "Rose Quartz Facial Roller",
    description: "Authentic rose quartz roller that boosts circulation, reduces puffiness, and enhances product absorption.",
    price: 95.00,
    categoryId: 3,
    categoryName: "Skincare",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    badge: "New Arrival",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
  },

  // ── ELECTRONICS (id 401–406) ───────────────────────────────────────────────
  {
    id: 401,
    name: "Aura Noise-Cancelling Headphones",
    description: "Immersive high-fidelity audio wrapped in premium brushed aluminum and plush leather earcups.",
    price: 499.00,
    categoryId: 4,
    categoryName: "Electronics",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80"
  },
  {
    id: 402,
    name: "Pro Smartwatch Ultra",
    description: "Titanium case with sapphire crystal display. Health tracking, GPS, and 10-day battery life.",
    price: 849.00,
    categoryId: 4,
    categoryName: "Electronics",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    badge: "New Arrival",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
  },
  {
    id: 403,
    name: "Portable Lossless DAC Amp",
    description: "Studio-grade digital-to-analog converter for audiophiles on the go. Supports MQA and Hi-Res audio.",
    price: 320.00,
    categoryId: 4,
    categoryName: "Electronics",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80"
  },
  {
    id: 404,
    name: "4K Ultra-Slim Monitor",
    description: "27-inch 4K IPS panel with 144Hz refresh rate, zero-bezel design, and factory colour calibration.",
    price: 1199.00,
    categoryId: 4,
    categoryName: "Electronics",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80"
  },
  {
    id: 405,
    name: "Wireless Mechanical Keyboard",
    description: "Premium CNC-aluminium body, tactile switches, and Bluetooth 5.2. The pinnacle of desktop luxury.",
    price: 275.00,
    categoryId: 4,
    categoryName: "Electronics",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80"
  },
  {
    id: 406,
    name: "True Wireless Earbuds Pro",
    description: "ANC earbuds with 40dB noise cancellation, LDAC support, and 36-hour total battery life.",
    price: 349.00,
    originalPrice: 399.00,
    categoryId: 4,
    categoryName: "Electronics",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    badge: "Sale",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80"
  },

  // ── CLOTHING (id 501–506) ──────────────────────────────────────────────────
  {
    id: 501,
    name: "Midnight Silk Robe",
    description: "Handcrafted from 100% pure mulberry silk. Drapes flawlessly for unparalleled nighttime luxury.",
    price: 350.00,
    categoryId: 5,
    categoryName: "Clothing",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: true,
    badge: "New Arrival",
    imageUrl: "https://images.unsplash.com/photo-1510173489-a4b2a35e6b01?w=800&q=80"
  },
  {
    id: 502,
    name: "Merino Wool Overcoat",
    description: "Tailored from grade-A merino wool. A classic silhouette that transitions effortlessly from boardroom to evening.",
    price: 720.00,
    categoryId: 5,
    categoryName: "Clothing",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80"
  },
  {
    id: 503,
    name: "Cashmere Turtleneck",
    description: "Superfine Grade-A cashmere in a relaxed-fit turtleneck. Impossibly light, impossibly warm.",
    price: 290.00,
    categoryId: 5,
    categoryName: "Clothing",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: false,
    badge: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80"
  },
  {
    id: 504,
    name: "Silk Dress Shirt",
    description: "100% charmeuse silk dress shirt with mother-of-pearl buttons. Unmatched drape and lustre.",
    price: 185.00,
    categoryId: 5,
    categoryName: "Clothing",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80"
  },
  {
    id: 505,
    name: "Linen Tailored Blazer",
    description: "Relaxed Italian linen blazer with structured shoulders. The summer wardrobe essential for elevated casual.",
    price: 420.00,
    categoryId: 5,
    categoryName: "Clothing",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"
  },
  {
    id: 506,
    name: "High-Rise Leather Trousers",
    description: "Buttery-soft lambskin leather trousers with a sleek high-rise silhouette and side-zip closure.",
    price: 540.00,
    categoryId: 5,
    categoryName: "Clothing",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    badge: "New Arrival",
    imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80"
  },

  // ── HOME DECOR (id 601–606) ────────────────────────────────────────────────
  {
    id: 601,
    name: "Golden Hour Table Lamp",
    description: "Minimalist brass geometry meets warm diffused light. A striking addition to any modern study or bedside.",
    price: 245.00,
    categoryId: 6,
    categoryName: "Home Decor",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80"
  },
  {
    id: 602,
    name: "Cashmere Throw Blanket",
    description: "Woven from the finest sustainably sourced Mongolian cashmere. Incredibly soft and incredibly warm.",
    price: 420.00,
    categoryId: 6,
    categoryName: "Home Decor",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: true,
    badge: "Limited Edition",
    imageUrl: "https://images.unsplash.com/photo-1580893246395-52aead8960dc?w=800&q=80"
  },
  {
    id: 603,
    name: "Marble Side Table",
    description: "Hand-cut Carrara marble top on a matte black powder-coated steel frame. Functional art for your living room.",
    price: 680.00,
    categoryId: 6,
    categoryName: "Home Decor",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
  },
  {
    id: 604,
    name: "Scented Candle Trio",
    description: "Three hand-poured soy candles — Cedarwood, Bergamot & Amber — in hand-blown glass vessels.",
    price: 95.00,
    categoryId: 6,
    categoryName: "Home Decor",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    badge: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&q=80"
  },
  {
    id: 605,
    name: "Geometric Brass Vase",
    description: "Handcrafted solid-brass vase with angular geometric facets. A bold centrepiece for contemporary interiors.",
    price: 175.00,
    categoryId: 6,
    categoryName: "Home Decor",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80"
  },
  {
    id: 606,
    name: "Linen Curtain Set",
    description: "Floor-to-ceiling linen curtains in natural ecru. Light-filtering weave for warmth without darkness.",
    price: 310.00,
    categoryId: 6,
    categoryName: "Home Decor",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
  },

  // ── ACCESSORIES (id 701–706) ───────────────────────────────────────────────
  {
    id: 701,
    name: "Artisan Leather Tote",
    description: "A timeless silhouette crafted from full-grain Italian leather with solid brass hardware.",
    price: 680.00,
    categoryId: 7,
    categoryName: "Accessories",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
  },
  {
    id: 702,
    name: "Silk Square Scarf",
    description: "100% Italian silk scarf with hand-rolled edges and a hand-painted botanical motif. Limited run.",
    price: 220.00,
    categoryId: 7,
    categoryName: "Accessories",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80"
  },
  {
    id: 703,
    name: "Aviator Sunglasses",
    description: "Titanium frame with polarised gold-mirror lenses. UV400 protection wrapped in iconic style.",
    price: 295.00,
    categoryId: 7,
    categoryName: "Accessories",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
  },
  {
    id: 704,
    name: "Crocodile-Print Belt",
    description: "Hand-dyed, embossed calfskin belt with a solid gold-plated double-pin buckle. Unmatched craftsmanship.",
    price: 180.00,
    categoryId: 7,
    categoryName: "Accessories",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
  },
  {
    id: 705,
    name: "Leather Billfold Wallet",
    description: "Slim 8-card wallet in hand-stitched full-grain leather. Ages beautifully, lasts a lifetime.",
    price: 145.00,
    categoryId: 7,
    categoryName: "Accessories",
    rating: 3.7,
    reviewCount: 3,
    inStock: true,
    featured: false,
    badge: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1517254456976-1dd97f7a9117?w=800&q=80"
  },
  {
    id: 706,
    name: "Statement Pearl Necklace",
    description: "Freshwater baroque pearls on a 14K gold chain. Where classic elegance meets contemporary edge.",
    price: 395.00,
    categoryId: 7,
    categoryName: "Accessories",
    rating: 4.0,
    reviewCount: 3,
    inStock: true,
    featured: false,
    badge: "New Arrival",
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
  },
];

export interface Review {
  id: number;
  author: string;
  initials: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export const MOCK_REVIEWS: Record<number, Review[]> = {
  101: [
    { id: 1, author: "Arjun Mehta", initials: "AM", rating: 5, date: "Feb 2025", title: "Absolutely stunning fragrance", body: "I've tried many oud perfumes but Oud Noir Extrait is on another level. The depth, the longevity — I get compliments every single day. Worth every penny.", verified: true },
    { id: 2, author: "Priya Sharma", initials: "PS", rating: 4, date: "Jan 2025", title: "Rich and unique scent", body: "The fragrance is incredibly rich and unique. My only complaint is that the price is steep, but you get what you pay for. I'd recommend it for special occasions.", verified: true },
    { id: 3, author: "Rahul K.", initials: "RK", rating: 2, date: "Dec 2024", title: "Expected longer lasting", body: "For the price I paid, I expected this to last much longer on skin. It fades within 3–4 hours for me. Maybe it's my skin chemistry, but disappointing overall.", verified: false },
  ],
  102: [
    { id: 4, author: "Sana Qureshi", initials: "SQ", rating: 5, date: "Mar 2025", title: "Feminine elegance in a bottle", body: "Rose d'Or smells like a dream — soft Bulgarian rose with a hint of saffron that makes it feel truly luxurious. Compliments on day one! Packaging is beautiful too.", verified: true },
    { id: 5, author: "Deepak Nair", initials: "DN", rating: 4, date: "Feb 2025", title: "Lovely scent, great gift", body: "Bought this for my wife and she absolutely loves it. The floral scent is classy and long lasting. Packaging was elegant and arrived perfectly.", verified: true },
    { id: 6, author: "Neha Joshi", initials: "NJ", rating: 3, date: "Dec 2024", title: "A bit too sweet for me", body: "The scent is beautiful but way too sweet for my taste. I love rose but this leans more towards a gourmand. May suit others but not for me personally.", verified: false },
  ],
  103: [
    { id: 7, author: "Vikram Singh", initials: "VS", rating: 5, date: "Mar 2025", title: "My comfort scent", body: "Amber Soleil feels like a warm hug — the vanilla and bergamot combination is just perfect for evenings. I wear this every winter and get endless compliments.", verified: true },
    { id: 8, author: "Ananya Patel", initials: "AP", rating: 4, date: "Jan 2025", title: "Warm and inviting", body: "This fragrance is gorgeous — warm amber with a hint of citrus. The sillage is great and it lasts about 6 hours on me. A little goes a long way.", verified: true },
    { id: 9, author: "Rohan Das", initials: "RD", rating: 2, date: "Nov 2024", title: "Expected something stronger", body: "The scent itself is nice but not what I expected for the price. The projection is very weak — only I can smell it. I expected much better performance.", verified: false },
  ],
  104: [
    { id: 10, author: "Kabir Malhotra", initials: "KM", rating: 5, date: "Feb 2025", title: "Commands attention", body: "Noir Vetiver is the most sophisticated fragrance I own. The smoky vetiver with black pepper creates this aura of authority. I wore it to a board meeting and everyone noticed.", verified: true },
    { id: 11, author: "Meera Iyer", initials: "MI", rating: 4, date: "Jan 2025", title: "Unique and bold", body: "This is not your everyday scent — it's dark, earthy, and very unique. I love it but it's definitely polarizing. My husband loves it; my colleague said it was 'too much'. 4 stars!", verified: true },
    { id: 12, author: "Siddharth R.", initials: "SR", rating: 3, date: "Oct 2024", title: "Not for everyone", body: "Very polarizing scent. Vetiver is very strong and some people around me didn't like it. Beautiful bottle though. Would recommend testing before buying.", verified: false },
  ],
  105: [
    { id: 13, author: "Aisha Bose", initials: "AB", rating: 5, date: "Mar 2025", title: "Pure Mediterranean luxury", body: "This perfume teleports me to the Italian coast every time I spray it. The neroli and jasmine blend is absolutely beautiful and perfect for spring and summer.", verified: true },
    { id: 14, author: "Tarun Gupta", initials: "TG", rating: 4, date: "Feb 2025", title: "Crisp and fresh", body: "Neroli Blanche is an incredibly fresh fragrance — clean, citrusy, and uplifting. Great for office wear. The white tea note gives it an extra layer of sophistication.", verified: true },
    { id: 15, author: "Pooja Verma", initials: "PV", rating: 3, date: "Dec 2024", title: "Weak projection", body: "Smells lovely in the bottle but the projection on skin is very weak. Nobody could smell it on me and I had to reapply multiple times. Not great for the price.", verified: false },
  ],
  106: [
    { id: 16, author: "Faisal Shaikh", initials: "FS", rating: 5, date: "Mar 2025", title: "An absolute masterpiece", body: "Midnight Oud Royale is the finest fragrance I have ever owned. The Turkish rose blended with oud and sandalwood is just otherworldly. Absolutely worth every rupee.", verified: true },
    { id: 17, author: "Kritika Menon", initials: "KM", rating: 5, date: "Feb 2025", title: "Gift-worthy luxury", body: "Bought this as an anniversary gift and my husband was blown away. The presentation box is stunning, the fragrance is regal. Makes you feel like royalty.", verified: true },
    { id: 18, author: "Gaurav Tiwari", initials: "GT", rating: 2, date: "Jan 2025", title: "Too heavy for daily use", body: "It's undeniably a high quality scent but it's so heavy and loud that I feel overwhelmed wearing it. Way too strong for regular use. Suitable only for very special occasions.", verified: false },
  ],

  201: [
    { id: 19, author: "Shruti Agarwal", initials: "SA", rating: 5, date: "Feb 2025", title: "Best face wash I've used", body: "The charcoal really draws out impurities. My skin feels clean without that tight or dry feeling after washing. My pores look noticeably smaller in just 2 weeks!", verified: true },
    { id: 20, author: "Nikhil Sharma", initials: "NS", rating: 4, date: "Jan 2025", title: "Great daily cleanser", body: "Gentle yet effective. Works perfectly for my oily skin. Leaves face feeling fresh and not stripped. Packaging is premium and the pump dispenses just the right amount.", verified: true },
    { id: 21, author: "Ritu Kapoor", initials: "RK", rating: 3, date: "Nov 2024", title: "Packaging issue", body: "The product itself is good but the pump on my bottle was defective — it leaked in transit. Customer service was responsive but the hassle of dealing with it wasn't great.", verified: false },
  ],
  202: [
    { id: 22, author: "Divya Nambiar", initials: "DN", rating: 5, date: "Mar 2025", title: "Salon-quality results at home", body: "My hair has never looked this good! The eucalyptus mint gives an incredible tingle and my hair is noticeably thicker and shinier after just a month of use.", verified: true },
    { id: 23, author: "Manish Jha", initials: "MJ", rating: 4, date: "Feb 2025", title: "Invigorating lather", body: "The mint gives a refreshing tingle that wakes you up. My scalp feels clean and healthy. Hair is smoother. Would give 5 stars but it's quite expensive for a shampoo.", verified: true },
    { id: 24, author: "Sunita Pillai", initials: "SP", rating: 2, date: "Dec 2024", title: "Didn't see results", body: "Used the whole bottle and saw minimal difference. My hair didn't get thicker as advertised. It smells nice but for this price I expected much better results. Disappointed.", verified: false },
  ],
  203: [
    { id: 25, author: "Kavya Reddy", initials: "KR", rating: 5, date: "Mar 2025", title: "Hair transformation!", body: "I have very dry, frizzy hair and this conditioner has completely transformed it. Silky, smooth, and manageable after just one use. The argan oil smell is divine.", verified: true },
    { id: 26, author: "Prateek Mishra", initials: "PM", rating: 4, date: "Jan 2025", title: "Luxurious feel", body: "Leaves hair incredibly soft and detangled. The silk protein blend is clearly doing something — my hair has a visible shine now. Packaging is premium. Worth it!", verified: true },
    { id: 27, author: "Lakshmi Rao", initials: "LR", rating: 3, date: "Nov 2024", title: "Good but too expensive", body: "The conditioner works well and smells gorgeous. However, for the price compared to drugstore options, I'm not sure the difference justifies the cost. Decent product, not great value.", verified: false },
  ],
  204: [
    { id: 28, author: "Sheetal Chauhan", initials: "SC", rating: 5, date: "Feb 2025", title: "24-hour hydration is real", body: "I have very dry skin and this lotion is the only thing that keeps it hydrated all day. The shea butter is rich without feeling heavy. Skin is glowing and soft!", verified: true },
    { id: 29, author: "Rajat Bhatt", initials: "RB", rating: 4, date: "Jan 2025", title: "Great moisturiser", body: "Absorbs well and leaves skin feeling soft and nourished. The vitamin E is doing its job — my skin looks healthier. Nice subtle scent. Would buy again.", verified: true },
    { id: 30, author: "Seema Jain", initials: "SJ", rating: 2, date: "Dec 2024", title: "Too greasy for me", body: "The formula is too thick and greasy for my combination skin. It doesn't absorb properly and leaves a sticky residue. My clothes were stained. Not suitable for warmer climates.", verified: false },
  ],
  205: [
    { id: 31, author: "Harish Menon", initials: "HM", rating: 5, date: "Mar 2025", title: "Visibly whiter teeth!", body: "I've been using this for 3 months and the difference is incredible. My teeth are noticeably whiter and my confidence has gone up. The charcoal doesn't stain and the taste is great.", verified: true },
    { id: 32, author: "Bhavna Toor", initials: "BT", rating: 4, date: "Feb 2025", title: "Fresh and effective", body: "This toothpaste leaves my mouth feeling incredibly fresh for hours. The whitening is gradual but real. Coconut oil makes it gentle on gums. Packaging is sleek and premium.", verified: true },
    { id: 33, author: "Alok Pandey", initials: "AP", rating: 3, date: "Nov 2024", title: "Too abrasive", body: "The charcoal formula is too harsh for my sensitive teeth and gums. Caused some sensitivity after a few weeks. Had to stop using it. Good concept but formulation needs work.", verified: false },
  ],
  206: [
    { id: 34, author: "Nidhi Kulkarni", initials: "NK", rating: 5, date: "Mar 2025", title: "Cloud-like softness", body: "These bamboo towels are hands down the softest towels I have ever owned. They absorb so well and dry quickly. The quality feels genuinely luxurious. Absolutely love them!", verified: true },
    { id: 35, author: "Sameer Khatri", initials: "SK", rating: 4, date: "Jan 2025", title: "Excellent quality", body: "Very plush and absorbent. The bamboo fibre feels premium and different from regular cotton. Quick drying is a huge plus in humidity. Only minor issue is they attract lint.", verified: true },
    { id: 36, author: "Anjali Suri", initials: "AS", rating: 2, date: "Dec 2024", title: "Color faded after washing", body: "The towels felt amazing initially but after 3-4 washes the color faded significantly. For the premium price I expected much better color fastness. Very disappointed with durability.", verified: false },
  ],

  301: [
    { id: 37, author: "Tanya Mittal", initials: "TM", rating: 5, date: "Feb 2025", title: "My skin is glowing!", body: "This Vitamin C serum has genuinely transformed my skin. Dark spots are fading, my complexion is brighter, and people keep asking what I'm doing differently. Amazing product!", verified: true },
    { id: 38, author: "Vijay Kumar", initials: "VK", rating: 4, date: "Jan 2025", title: "Effective brightening serum", body: "Noticed a difference within 2 weeks. Skin tone is more even and I have a healthy glow. The texture is lightweight and absorbs fast. A bit pricey but worth it.", verified: true },
    { id: 39, author: "Madhuri Batra", initials: "MB", rating: 2, date: "Nov 2024", title: "Caused irritation", body: "The concentration is too high for sensitive skin. Caused redness and burning sensation on my face. I had to stop using it. Please do a patch test before applying it on your face.", verified: false },
  ],
  302: [
    { id: 40, author: "Preeti Walia", initials: "PW", rating: 5, date: "Mar 2025", title: "Anti-aging miracle", body: "Been using Retinol Night Cream for 2 months and the fine lines around my eyes are noticeably reduced. My skin texture is so smooth. This is the real deal and worth every rupee.", verified: true },
    { id: 41, author: "Aditya Saxena", initials: "AS", rating: 4, date: "Feb 2025", title: "Great night cream", body: "Skin is visibly smoother after a month of use. The retinol is potent so I recommend starting slowly — every other night. Good packaging keeps it fresh and away from light.", verified: true },
    { id: 42, author: "Namita Soni", initials: "NS", rating: 3, date: "Dec 2024", title: "Caused dryness initially", body: "The retinol purge is real — my skin got very dry and flaky for the first 3 weeks. I know this is common but the product should warn you better. Currently seeing some improvement though.", verified: false },
  ],
  303: [
    { id: 43, author: "Ishaan Khosla", initials: "IK", rating: 5, date: "Mar 2025", title: "Deep hydration", body: "My skin drinks this serum up immediately. The triple-weight hyaluronic acid formula is noticeably different from cheaper alternatives. Plump, dewy skin all day long. I love it!", verified: true },
    { id: 44, author: "Kamya Verma", initials: "KV", rating: 4, date: "Jan 2025", title: "Lightweight and effective", body: "Works beautifully under makeup. My skin stays hydrated and doesn't feel tight or dry anymore. The texture is gel-like and absorbs instantly. Great for all seasons.", verified: true },
    { id: 45, author: "Rohit Daga", initials: "RD", rating: 2, date: "Nov 2024", title: "Didn't work for my skin", body: "Applied as directed for 6 weeks and saw zero difference in hydration. Maybe it doesn't work for all skin types. The packaging is nice but the results were simply not there for me.", verified: false },
  ],
  304: [
    { id: 46, author: "Swati Aggarwal", initials: "SA", rating: 5, date: "Feb 2025", title: "Instant de-puffing!", body: "Used these after a bad night's sleep and the difference was unreal. Under-eye bags gone, skin looks refreshed and luminous. The gold infusion really does something special!", verified: true },
    { id: 47, author: "Kunal Bansal", initials: "KB", rating: 4, date: "Jan 2025", title: "Great self-care treat", body: "These eye masks feel incredibly luxurious. They stay in place well and the de-puffing effect lasts through the day. A nice addition to my weekend skincare routine.", verified: true },
    { id: 48, author: "Ritika Chopra", initials: "RC", rating: 3, date: "Oct 2024", title: "Overpriced for single-use", body: "The results are OK but for the price per mask I expected more dramatic results. The hydration is nice but the 'gold' effect feels more like marketing. Would buy cheaper alternatives.", verified: false },
  ],
  305: [
    { id: 49, author: "Vaishali Pande", initials: "VP", rating: 5, date: "Mar 2025", title: "No white cast — finally!", body: "As a person with dusky skin tone I've struggled with sunscreens leaving white casts. This one is incredible — blends beautifully, gives a natural glow and offers real protection.", verified: true },
    { id: 50, author: "Dhruv Malhotra", initials: "DM", rating: 4, date: "Feb 2025", title: "Brilliant daily SPF", body: "Lightweight and comfortable to wear daily. The tint is very natural and gives a polished look. Layers well under makeup. Great for outdoor work — highly recommend.", verified: true },
    { id: 51, author: "Anju Khatri", initials: "AK", rating: 2, date: "Dec 2024", title: "Broke me out", body: "This sunscreen caused severe breakouts on my acne-prone skin within one week. I think some ingredients don't suit sensitive or acne-prone skin. Please check ingredients before buying.", verified: false },
  ],
  306: [
    { id: 52, author: "Garima Srivastava", initials: "GS", rating: 5, date: "Mar 2025", title: "Morning ritual perfection", body: "I use this every morning after my serum and it has genuinely reduced my morning puffiness. The rose quartz feels cooling and it's calming to use. Beautiful packaging too!", verified: true },
    { id: 53, author: "Mohit Sharma", initials: "MS", rating: 4, date: "Jan 2025", title: "Great for puffiness", body: "Bought this for my wife and she loves it. Reduces under-eye puffiness noticeably when stored in the fridge overnight. The dual roller heads are a nice touch.", verified: true },
    { id: 54, author: "Renu Thakur", initials: "RT", rating: 3, date: "Nov 2024", title: "Stone cracked on delivery", body: "One of the rollers had a small crack when it arrived, clearly a quality control issue. Contacted customer service and got a replacement but it was a frustrating experience overall.", verified: false },
  ],

  401: [
    { id: 55, author: "Abhishek Rao", initials: "AR", rating: 5, date: "Feb 2025", title: "Best headphones I've owned", body: "The sound quality from these headphones is absolutely phenomenal. The noise cancellation shuts out the world completely and the leather earcups are incredibly comfortable for long sessions.", verified: true },
    { id: 56, author: "Sunidhi Kashyap", initials: "SK", rating: 4, date: "Jan 2025", title: "Premium audio experience", body: "Excellent build quality and the ANC is very effective. Bass is punchy without being overpowering. Comfortable for 4–5 hour sessions. Slightly heavy but overall a great buy.", verified: true },
    { id: 57, author: "Pranav Bose", initials: "PB", rating: 2, date: "Dec 2024", title: "Bluetooth connectivity issues", body: "After 3 months the Bluetooth started randomly disconnecting during use. Very frustrating for the premium price. Build quality is great but the connectivity issues are a dealbreaker.", verified: false },
  ],
  402: [
    { id: 58, author: "Shreya Pillai", initials: "SP", rating: 5, date: "Mar 2025", title: "Worth every rupee", body: "This smartwatch feels genuinely premium — the titanium case and sapphire crystal look stunning. The health tracking is accurate and 10-day battery is a game changer. Absolutely love it!", verified: true },
    { id: 59, author: "Vivek Nair", initials: "VN", rating: 4, date: "Feb 2025", title: "Excellent fitness tracker", body: "Great GPS accuracy and heart rate monitoring. The display is bright and sharp. Battery life lives up to the claim. Docking a star only because the companion app has some UI issues.", verified: true },
    { id: 60, author: "Priya Oberoi", initials: "PO", rating: 3, date: "Nov 2024", title: "App crashes frequently", body: "The watch itself is beautiful and functional, but the companion app on Android crashes constantly. You need the app to unlock all features. Frustrating for a product at this price point.", verified: false },
  ],
  403: [
    { id: 61, author: "Aniket Joshi", initials: "AJ", rating: 5, date: "Feb 2025", title: "Audiophile approved", body: "I've been chasing this kind of audio quality for years. The clarity and detail this DAC amp brings out in music is phenomenal. MQA support is the cherry on top. Simply outstanding.", verified: true },
    { id: 62, author: "Shraddha Mehta", initials: "SM", rating: 4, date: "Jan 2025", title: "Excellent sound quality", body: "Paired it with my IEMs and the improvement is immediately noticeable — cleaner highs, tighter bass, and better soundstage. Small form factor is great for travel. Very happy with the purchase.", verified: true },
    { id: 63, author: "Karan Lal", initials: "KL", rating: 2, date: "Oct 2024", title: "Too complex to set up", body: "The product sounds incredible once set up correctly, but the setup process is needlessly complicated for a non-technical user. Documentation is poor. Expected plug-and-play at this price.", verified: false },
  ],
  404: [
    { id: 64, author: "Tanmay Tripathi", initials: "TT", rating: 5, date: "Mar 2025", title: "Stunning display", body: "The 4K IPS panel is absolutely gorgeous — colors are vibrant and the zero-bezel design makes it look sleek. 144Hz is butter smooth for both work and gaming. A truly premium display.", verified: true },
    { id: 65, author: "Divya Kaur", initials: "DK", rating: 4, date: "Feb 2025", title: "Amazing color accuracy", body: "Factory calibration is impressive — colors are accurate right out of the box for my design work. The brightness is excellent. Slight backlight bleed in corners but not noticeable in normal use.", verified: true },
    { id: 66, author: "Yash Mishra", initials: "YM", rating: 3, date: "Dec 2024", title: "Stand is wobbly", body: "The panel itself is spectacular but the included stand is not sturdy enough for a monitor of this size. It wobbles noticeably when I type. Would have been 5 stars with a better stand.", verified: false },
  ],
  405: [
    { id: 67, author: "Neelam Gupta", initials: "NG", rating: 5, date: "Feb 2025", title: "The pinnacle of keyboards", body: "This keyboard has transformed my daily typing experience. The CNC aluminium body feels incredibly solid, the switches are tactile and satisfying, and the Bluetooth pairing is flawless.", verified: true },
    { id: 68, author: "Rajesh Patel", initials: "RP", rating: 4, date: "Jan 2025", title: "Premium build, great feel", body: "Typing on this keyboard is a joy. The weight and construction quality are top notch. Multi-device Bluetooth pairing is seamless. Battery life is excellent. Only the price is steep.", verified: true },
    { id: 69, author: "Deepika Joshi", initials: "DJ", rating: 2, date: "Nov 2024", title: "Key chatter issues", body: "Within 2 months, several keys started double-registering keystrokes — a known issue called key chatter. For a ₹20,000+ keyboard this is simply unacceptable. Very poor quality control.", verified: false },
  ],
  406: [
    { id: 70, author: "Aryan Verma", initials: "AV", rating: 5, date: "Mar 2025", title: "Best ANC earbuds out there", body: "The 40dB noise cancellation on these earbuds is exceptional — I can work in a cafe and hear nothing. LDAC support means music sounds incredibly detailed. Battery life is insane!", verified: true },
    { id: 71, author: "Roshni Choudhary", initials: "RC", rating: 4, date: "Feb 2025", title: "Great battery and sound", body: "Very impressed with the 36-hour battery life. ANC is effective, sound quality is excellent across all genres. Fit is comfortable for long periods. Case feel premium.", verified: true },
    { id: 72, author: "Mihir Shah", initials: "MS", rating: 3, date: "Jan 2025", title: "Ear tip issue", body: "The earbuds sound great but one of the ear tips fell off inside my bag and was lost. Replacement ear tips should be included. For this price I expect better accessories.", verified: false },
  ],

  501: [
    { id: 73, author: "Aditi Bhattacharya", initials: "AB", rating: 5, date: "Mar 2025", title: "Pure luxury at home", body: "I bought this as a self-care treat and it's completely changed my evening routine. The mulberry silk is impossibly smooth and the drape is flawless. I feel like royalty every night!", verified: true },
    { id: 74, author: "Saurabh Desai", initials: "SD", rating: 4, date: "Feb 2025", title: "Beautiful craftsmanship", body: "Bought this for my wife on our anniversary. She was overwhelmed by the quality — truly exquisite silk that glides on the skin. The packaging was gorgeous too. Highly recommended.", verified: true },
    { id: 75, author: "Poonam Ahuja", initials: "PA", rating: 2, date: "Dec 2024", title: "Runs very small", body: "The sizing is wildly inaccurate — I ordered my usual size and it fit like a medium. No size chart available on the website either. Had to return it which was a hassle.", verified: false },
  ],
  502: [
    { id: 76, author: "Harpreet Gill", initials: "HG", rating: 5, date: "Feb 2025", title: "A masterpiece of tailoring", body: "This overcoat is impeccably constructed. The merino wool is exceptionally fine and the silhouette is timeless. I wore it to a formal event and received compliments all evening.", verified: true },
    { id: 77, author: "Simran Kaur", initials: "SK", rating: 4, date: "Jan 2025", title: "Warm and elegant", body: "The warmth-to-weight ratio of this coat is impressive. It keeps the cold out without bulk. Beautiful drape and classic cut. Only minor gripe is it needs dry cleaning only.", verified: true },
    { id: 78, author: "Ravi Sharma", initials: "RS", rating: 3, date: "Nov 2024", title: "Dry clean only is inconvenient", body: "Gorgeous coat but requiring dry cleaning for every wash is very expensive in the long run. This should be mentioned more prominently before purchase. Quality is undeniable though.", verified: false },
  ],
  503: [
    { id: 79, author: "Naina Arora", initials: "NA", rating: 5, date: "Mar 2025", title: "Impossibly soft", body: "I've worn expensive cashmere before but this is something else entirely. The Grade-A fibre is incredibly fine and the warmth it provides is magical. A true luxury investment piece.", verified: true },
    { id: 80, author: "Ajay Chaudhary", initials: "AC", rating: 4, date: "Feb 2025", title: "Exceptional warmth", body: "This turtleneck is the warmest yet lightest piece of clothing I own. The cashmere quality is evident from the softness. Washed gently on cold and it's maintained its shape well.", verified: true },
    { id: 81, author: "Mina Khanna", initials: "MK", rating: 2, date: "Dec 2024", title: "Pilling after washing", body: "The sweater looked and felt amazing initially, but after just 2 gentle hand washes it started pilling quite badly. For Grade-A cashmere at this price point, this is not acceptable.", verified: false },
  ],
  504: [
    { id: 82, author: "Shilpa Bose", initials: "SB", rating: 5, date: "Feb 2025", title: "Elegance personified", body: "This silk shirt drapes beautifully and the lustre of the charmeuse silk is genuinely stunning. The mother-of-pearl buttons are a beautiful finishing touch. Worth every single rupee.", verified: true },
    { id: 83, author: "Rohit Mehta", initials: "RM", rating: 4, date: "Jan 2025", title: "Drapes beautifully", body: "The quality of the silk is exceptional and the fit is refined. I wore it to a business dinner and felt the most put-together person in the room. Care instructions are a little strict.", verified: true },
    { id: 84, author: "Lata Krishnan", initials: "LK", rating: 3, date: "Nov 2024", title: "Delicate fabric needs care", body: "Beautiful shirt but the fabric is extremely delicate. It snagged on a rough surface within the first week of wearing. If you lead an active lifestyle this may not be practical for you.", verified: false },
  ],
  505: [
    { id: 85, author: "Ishan Mathur", initials: "IM", rating: 5, date: "Mar 2025", title: "Perfect smart casual", body: "This linen blazer is my most reached-for piece. The Italian linen is breathable in summer and structured shoulders make me look sharp without trying. Versatile and absolutely worth it.", verified: true },
    { id: 86, author: "Geeta Nair", initials: "GN", rating: 4, date: "Feb 2025", title: "Great for summer", body: "Finally a blazer that doesn't make me sweat in summer! The linen breathes so well. Style is versatile — I wear it for meetings and dinners. Fits true to size with a relaxed silhouette.", verified: true },
    { id: 87, author: "Amish Patel", initials: "AP", rating: 2, date: "Dec 2024", title: "Wrinkles too easily", body: "The quality of linen is good but it wrinkles at the slightest movement. By midday it looks crumpled despite careful morning pressing. Linen nature I know, but this is extreme.", verified: false },
  ],
  506: [
    { id: 88, author: "Trisha Banerjee", initials: "TB", rating: 5, date: "Feb 2025", title: "Edgy and luxurious", body: "These leather trousers are an investment piece I'll have for years. The lambskin is buttery soft, the high-rise silhouette is incredibly flattering. I feel powerful wearing them!", verified: true },
    { id: 89, author: "Sanjay Mehra", initials: "SM", rating: 4, date: "Jan 2025", title: "Exceptional fit", body: "The cut on these trousers is perfection. They fit precisely as the size guide suggests and the leather quality is outstanding. Easy to style and very comfortable to wear.", verified: true },
    { id: 90, author: "Falak Qureshi", initials: "FQ", rating: 3, date: "Nov 2024", title: "Cold in winter", body: "The leather is very thin and offers no warmth whatsoever. In colder months you'll need thermal leggings underneath. Fine for mild weather or indoor settings but not practical in winter.", verified: false },
  ],

  601: [
    { id: 91, author: "Chandani Sharma", initials: "CS", rating: 5, date: "Mar 2025", title: "Transforms the room", body: "This lamp is a genuine statement piece. The brass geometry catches light beautifully and the warm glow it casts creates the most perfect ambience in my study. Exceptional quality.", verified: true },
    { id: 92, author: "Vinod Tiwari", initials: "VT", rating: 4, date: "Feb 2025", title: "Beautiful warm glow", body: "Looks exactly like the photos — minimal and striking. The brass finish is high quality. The warm light is perfect for reading. Only minus: the bulb wasn't included and took time to source.", verified: true },
    { id: 93, author: "Pallavi Gupta", initials: "PG", rating: 2, date: "Dec 2024", title: "Bulb not included", body: "Nowhere in the listing does it say the bulb is not included. Had to wait another week after delivery to use the lamp. Frustrating. The lamp itself looks nice but this was very misleading.", verified: false },
  ],
  602: [
    { id: 94, author: "Sneha Joshi", initials: "SJ", rating: 5, date: "Mar 2025", title: "Like sleeping under a cloud", body: "This cashmere throw is the most luxurious item in my home. It's unbelievably soft and light yet incredibly warm. I find it impossible to leave my sofa now. Absolutely worth every rupee!", verified: true },
    { id: 95, author: "Ritesh Kumar", initials: "RK", rating: 4, date: "Jan 2025", title: "Incredibly warm and cosy", body: "The cashmere quality is exceptional and the blanket keeps me perfectly warm on cold nights. The size is generous. Washed very gently and it held its shape beautifully. Love it!", verified: true },
    { id: 96, author: "Payal Singh", initials: "PS", rating: 3, date: "Nov 2024", title: "Sheds quite a lot", body: "Beautiful throw but it sheds cashmere fibres excessively — my dark sofa and clothes are constantly covered. This is supposedly normal for new cashmere but it's been 2 months and it continues.", verified: false },
  ],
  603: [
    { id: 97, author: "Arun Kapoor", initials: "AK", rating: 5, date: "Feb 2025", title: "Centrepiece of my living room", body: "This marble table is an absolute showstopper. The Carrara marble top is strikingly beautiful and the matte black frame complements it perfectly. Every guest immediately notices it.", verified: true },
    { id: 98, author: "Megha Bansal", initials: "MB", rating: 4, date: "Jan 2025", title: "Stunning statement piece", body: "Quality is excellent — the marble is genuinely hand-cut and the steel frame is sturdy. Assembly was straightforward. Only reason for 4 stars is it's quite heavy and hard to reposition.", verified: true },
    { id: 99, author: "Dilip Rao", initials: "DR", rating: 2, date: "Oct 2024", title: "Very heavy and hard to move", body: "The table looks spectacular but weighs an enormous amount. We've rearranged the room twice and moving it is a two-person job. Not mentioned in the product specs. Worth knowing before buying.", verified: false },
  ],
  604: [
    { id: 100, author: "Asha Menon", initials: "AM", rating: 5, date: "Mar 2025", title: "My home smells incredible", body: "These three candles are absolutely divine — each scent is distinct, sophisticated, and fills the room beautifully. The glass vessels look stunning. Best candles I've ever bought bar none.", verified: true },
    { id: 101, author: "Deepak Suri", initials: "DS", rating: 4, date: "Feb 2025", title: "Long-lasting and beautiful", body: "The scents are complex and genuinely beautiful — not synthetic smelling at all. Each candle burns for a long time with minimal tunnelling. The hand-blown vessels are a work of art.", verified: true },
    { id: 102, author: "Kavita Sharma", initials: "KS", rating: 3, date: "Dec 2024", title: "Wick issues on one candle", body: "Two of the three candles are perfect, but the third had a short wick that kept drowning in the wax after the first burn. Expected better quality control for such a premium set.", verified: false },
  ],
  605: [
    { id: 103, author: "Lalit Khanna", initials: "LK", rating: 5, date: "Feb 2025", title: "Sculpture for the home", body: "This brass vase is less a vase and more a piece of art. The geometric facets catch light beautifully from different angles. It dominates my dining table in the best possible way.", verified: true },
    { id: 104, author: "Rekha Pillai", initials: "RP", rating: 4, date: "Jan 2025", title: "Solid craftsmanship", body: "The brass is solid and heavy — you can feel the quality immediately. The geometric design is bold and modern and works beautifully in my minimalist interior. Very happy with the purchase.", verified: true },
    { id: 105, author: "Mohan Iyer", initials: "MI", rating: 2, date: "Nov 2024", title: "Sharp edges are dangerous", body: "The geometric design has very sharp edges along the facets. I cut my finger just arranging flowers in it. For something placed in a home with children this is a real safety concern.", verified: false },
  ],
  606: [
    { id: 106, author: "Sunaina Chatterjee", initials: "SC", rating: 5, date: "Mar 2025", title: "Transforms any room", body: "These curtains have completely elevated my living room. The natural ecru linen looks expensive and sophisticated. Light filtering is perfect — bright without harsh direct light. Absolutely stunning.", verified: true },
    { id: 107, author: "Prashant Dutta", initials: "PD", rating: 4, date: "Jan 2025", title: "Elegant and versatile", body: "The linen quality is excellent and the natural colour works with any interior palette. The light filtering effect is exactly right. Shipping was fast and packaging protected the fabric well.", verified: true },
    { id: 108, author: "Malini Sen", initials: "MS", rating: 3, date: "Nov 2024", title: "Very difficult to iron", body: "Beautiful curtains but linen wrinkles extremely badly. Getting them to hang smoothly requires steaming for almost an hour. The product description doesn't warn you about this properly.", verified: false },
  ],

  701: [
    { id: 109, author: "Jasmine Kaul", initials: "JK", rating: 5, date: "Mar 2025", title: "My forever bag", body: "This leather tote is the best investment I've ever made in accessories. The full-grain Italian leather is developing a beautiful patina and the brass hardware gleams. Simply flawless.", verified: true },
    { id: 110, author: "Sunil Bhatt", initials: "SB", rating: 4, date: "Feb 2025", title: "Spacious and luxurious", body: "The craftsmanship is evident from the moment you hold it. Enough space for a laptop and daily essentials. The leather is firm and structured. Worth every rupee for daily professional use.", verified: true },
    { id: 111, author: "Mansi Agarwal", initials: "MA", rating: 2, date: "Dec 2024", title: "Strap not adjustable", body: "Beautiful bag but the shoulder strap is fixed length and sits uncomfortably high under my arm. For ₹50,000+ I would expect adjustable straps as a minimum. Very frustrating design flaw.", verified: false },
  ],
  702: [
    { id: 112, author: "Leena Verma", initials: "LV", rating: 5, date: "Feb 2025", title: "Wearable art", body: "This silk scarf is breathtaking. The hand-painted botanical motif is incredibly detailed and the silk quality is superb. I've received so many compliments wearing it. A true collector's piece.", verified: true },
    { id: 113, author: "Arjun Chahal", initials: "AC", rating: 4, date: "Jan 2025", title: "Vibrant and luxurious", body: "The colours are stunning in person — much more vibrant than photos. Silk quality is very high and the hand-rolled edges are beautifully executed. Versatile — I wear it as a headscarf too!", verified: true },
    { id: 114, author: "Bindu Pillai", initials: "BP", rating: 3, date: "Nov 2024", title: "No care instructions", body: "The scarf itself is beautiful but there were absolutely no care instructions included. Silk is delicate and I had to search online to learn how to wash it. This is an oversight for a luxury product.", verified: false },
  ],
  703: [
    { id: 115, author: "Rohit Singhania", initials: "RS", rating: 5, date: "Mar 2025", title: "Polarised perfection", body: "These aviators are stunning. The titanium frame is incredibly lightweight yet sturdy and the gold-mirror lenses reduce glare beautifully. Best sunglasses I've owned. Classic style never gets old.", verified: true },
    { id: 116, author: "Ankita Ghosh", initials: "AG", rating: 4, date: "Feb 2025", title: "Great UV protection", body: "The polarisation is noticeably effective — much better than cheaper alternatives. Frame quality is excellent. They fit my face shape perfectly. Slightly heavy at first but you get used to it.", verified: true },
    { id: 117, author: "Vikas Mathur", initials: "VM", rating: 2, date: "Dec 2024", title: "Nose pad fell off", body: "The glasses look and feel premium but one of the nose pads fell off after just 6 weeks of regular use. Had to visit an optician to get a replacement. Quality control issue for this price.", verified: false },
  ],
  704: [
    { id: 118, author: "Pooja Malhotra", initials: "PM", rating: 5, date: "Feb 2025", title: "Exceptional quality", body: "This belt is a true statement of quality. The embossed calfskin is beautiful and the gold-plated buckle is stunning. It elevates every outfit instantly. Will last a lifetime with care.", verified: true },
    { id: 119, author: "Nitin Bhatia", initials: "NB", rating: 4, date: "Jan 2025", title: "Premium and adjustable", body: "The belt is clearly handcrafted — the leather detail is superb and the buckle is weighty and solid. Adjusts perfectly to different waist sizes. A true luxury accessory at fair value.", verified: true },
    { id: 120, author: "Prerna Gupta", initials: "PG", rating: 3, date: "Oct 2024", title: "Buckle scratched easily", body: "The leather is lovely but the gold-plated buckle developed fine scratches within the first month of daily use. For a luxury item I expected the plating to be more durable.", verified: false },
  ],
  705: [
    { id: 121, author: "Gaurav Kapila", initials: "GK", rating: 5, date: "Mar 2025", title: "Gets better with age", body: "I've had this wallet for 6 months and the full-grain leather has developed the most beautiful patina. It's slim enough for my pocket but holds everything I need. A lifetime investment.", verified: true },
    { id: 122, author: "Sonali Mehta", initials: "SM", rating: 4, date: "Feb 2025", title: "Slim and elegant", body: "The leather quality is immediately apparent — supple yet structured. The hand-stitching is clean and precise. Card slots break in quickly. A genuinely premium slim wallet.", verified: true },
    { id: 123, author: "Akash Singh", initials: "AS", rating: 2, date: "Nov 2024", title: "Stitching came loose", body: "After about 3 months of daily use the stitching on one of the card slots started coming undone. For a wallet marketed as lifetime quality this is very disappointing. Not living up to its promise.", verified: false },
  ],
  706: [
    { id: 124, author: "Rashmi Bajaj", initials: "RB", rating: 5, date: "Mar 2025", title: "Makes a statement", body: "This necklace is the most complimented piece of jewellery I own. The baroque pearls are uniquely beautiful and the 14K gold chain feels substantial and luxurious. An heirloom piece!", verified: true },
    { id: 125, author: "Surya Reddy", initials: "SR", rating: 4, date: "Feb 2025", title: "Timeless elegance", body: "The pearl quality is excellent and the combination with gold is perfect. Arrived in beautiful packaging — ideal as a gift. The necklace sits beautifully and the length is versatile.", verified: true },
    { id: 126, author: "Riya Chopra", initials: "RC", rating: 3, date: "Dec 2024", title: "Clasp is difficult to open", body: "The necklace is gorgeous but the clasp is almost impossible to open and close without help. As someone who lives alone this is a genuine problem. A simpler clasp mechanism would be much better.", verified: false },
  ],
};

export function getMockCategoryImageUrl(slug: string) {
  const images: Record<string, string> = {
    "perfumes": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80",
    "daily-use": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    "skincare": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    "electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
    "clothing": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    "home-decor": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    "accessories": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
  };
  return images[slug] || "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80";
}
