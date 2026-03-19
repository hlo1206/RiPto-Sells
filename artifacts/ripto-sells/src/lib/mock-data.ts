import { Product, Category } from "@workspace/api-client-react";

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Perfumes", slug: "perfumes", description: "Signature scents and luxury fragrances.", productCount: 12 },
  { id: 2, name: "Daily Use", slug: "daily-use", description: "Premium essentials for everyday life.", productCount: 24 },
  { id: 3, name: "Skincare", slug: "skincare", description: "Rejuvenating and nourishing routines.", productCount: 18 },
  { id: 4, name: "Electronics", slug: "electronics", description: "State-of-the-art modern devices.", productCount: 8 },
  { id: 5, name: "Clothing", slug: "clothing", description: "Haute couture and ready-to-wear fashion.", productCount: 36 },
  { id: 6, name: "Home Decor", slug: "home-decor", description: "Elegant accents for your living space.", productCount: 15 },
  { id: 7, name: "Accessories", slug: "accessories", description: "The perfect finishing touches.", productCount: 22 },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 101,
    name: "Oud Noir Extrait",
    description: "A mysterious and deeply luxurious fragrance blending rare oud wood with dark amber and hints of spice. Long-lasting and exceptionally memorable.",
    price: 285.00,
    categoryId: 1,
    categoryName: "Perfumes",
    rating: 4.9,
    reviewCount: 124,
    inStock: true,
    featured: true,
    badge: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47714263f?w=800&q=80"
  },
  {
    id: 102,
    name: "Radiance Vitamin C Serum",
    description: "An ultra-concentrated serum that brightens, firms, and smooths skin tone while delivering deep hydration.",
    price: 120.00,
    originalPrice: 150.00,
    categoryId: 3,
    categoryName: "Skincare",
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
  },
  {
    id: 103,
    name: "Midnight Silk Robe",
    description: "Handcrafted from 100% pure mulberry silk. Drapes flawlessly for unparalleled nighttime luxury.",
    price: 350.00,
    categoryId: 5,
    categoryName: "Clothing",
    rating: 5.0,
    reviewCount: 42,
    inStock: true,
    featured: true,
    badge: "New Arrival",
    imageUrl: "https://images.unsplash.com/photo-1515347619152-16781cb5b206?w=800&q=80"
  },
  {
    id: 104,
    name: "Aura Noise-Cancelling Headphones",
    description: "Immersive high-fidelity audio wrapped in premium brushed aluminum and plush leather earcups.",
    price: 499.00,
    categoryId: 4,
    categoryName: "Electronics",
    rating: 4.8,
    reviewCount: 215,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80"
  },
  {
    id: 105,
    name: "Artisan Leather Tote",
    description: "A timeless silhouette crafted from full-grain Italian leather with solid brass hardware.",
    price: 680.00,
    categoryId: 7,
    categoryName: "Accessories",
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"
  },
  {
    id: 106,
    name: "Golden Hour Table Lamp",
    description: "Minimalist brass geometry meets warm diffused light. A striking addition to any modern study or bedside.",
    price: 245.00,
    categoryId: 6,
    categoryName: "Home Decor",
    rating: 4.6,
    reviewCount: 34,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80"
  },
  {
    id: 107,
    name: "Charcoal Purifying Wash",
    description: "Daily gentle cleanser infused with activated charcoal to draw out impurities without stripping moisture.",
    price: 45.00,
    categoryId: 2,
    categoryName: "Daily Use",
    rating: 4.5,
    reviewCount: 312,
    inStock: true,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"
  },
  {
    id: 108,
    name: "Cashmere Throw Blanket",
    description: "Woven from the finest sustainably sourced Mongolian cashmere. Incredibly soft and incredibly warm.",
    price: 420.00,
    categoryId: 6,
    categoryName: "Home Decor",
    rating: 5.0,
    reviewCount: 18,
    inStock: true,
    featured: true,
    badge: "Limited Edition",
    imageUrl: "https://images.unsplash.com/photo-1580828369019-2220455ce712?w=800&q=80"
  }
];

export function getMockCategoryImageUrl(slug: string) {
  const images: Record<string, string> = {
    "perfumes": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80",
    "daily-use": "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&q=80",
    "skincare": "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80",
    "electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
    "clothing": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    "home-decor": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    "accessories": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80"
  };
  return images[slug] || "https://images.unsplash.com/photo-1600164318680-a24b652da24b?w=800&q=80";
}
