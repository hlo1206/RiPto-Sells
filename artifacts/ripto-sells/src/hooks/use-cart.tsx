import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@workspace/replit-auth-web";
import { 
  useGetCart, 
  useAddToCart, 
  useUpdateCartItem, 
  useRemoveFromCart, 
  useClearCart,
  Product
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getGetCartQueryKey } from "@workspace/api-client-react";

export type LocalCartItem = {
  productId: number;
  quantity: number;
  product?: Product;
};

interface CartContextType {
  items: LocalCartItem[];
  totalItems: number;
  subtotal: number;
  isLoading: boolean;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const queryClient = useQueryClient();
  
  // Local state for unauthenticated users
  const [localItems, setLocalItems] = useState<LocalCartItem[]>(() => {
    try {
      const stored = localStorage.getItem("ripto_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist local cart
  useEffect(() => {
    if (!isAuthenticated && !isAuthLoading) {
      localStorage.setItem("ripto_cart", JSON.stringify(localItems));
    }
  }, [localItems, isAuthenticated, isAuthLoading]);

  // API hooks
  const { data: apiCart, isLoading: isApiLoading } = useGetCart({
    query: { enabled: isAuthenticated }
  });

  const { mutate: apiAdd } = useAddToCart({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() }) }
  });
  
  const { mutate: apiUpdate } = useUpdateCartItem({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() }) }
  });
  
  const { mutate: apiRemove } = useRemoveFromCart({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() }) }
  });
  
  const { mutate: apiClear } = useClearCart({
    mutation: { onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() }) }
  });

  const isLoading = isAuthLoading || (isAuthenticated ? isApiLoading : false);
  
  // Normalized items array
  const items: LocalCartItem[] = isAuthenticated 
    ? (apiCart || []).map(item => ({ 
        productId: item.productId, 
        quantity: item.quantity, 
        product: item.product 
      }))
    : localItems;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + ((item.product?.price || 0) * item.quantity), 0);

  const addItem = (product: Product, quantity: number = 1) => {
    if (isAuthenticated) {
      apiAdd({ data: { productId: product.id, quantity } });
    } else {
      setLocalItems(prev => {
        const existing = prev.find(i => i.productId === product.id);
        if (existing) {
          return prev.map(i => i.productId === product.id 
            ? { ...i, quantity: i.quantity + quantity } 
            : i);
        }
        return [...prev, { productId: product.id, quantity, product }];
      });
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    if (isAuthenticated) {
      apiUpdate({ productId, data: { quantity } });
    } else {
      setLocalItems(prev => prev.map(i => i.productId === productId ? { ...i, quantity } : i));
    }
  };

  const removeItem = (productId: number) => {
    if (isAuthenticated) {
      apiRemove({ productId });
    } else {
      setLocalItems(prev => prev.filter(i => i.productId !== productId));
    }
  };

  const clear = () => {
    if (isAuthenticated) {
      apiClear();
    } else {
      setLocalItems([]);
    }
  };

  return (
    <CartContext.Provider value={{ items, totalItems, subtotal, isLoading, addItem, updateQuantity, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
