import { useState, useEffect, useCallback } from "react";
import { CartItem } from "@/types/candle";

const STORAGE_KEY = "lumi-cart";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const persist = (updated: CartItem[]) => {
    setCart(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addToCart = useCallback((candleId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.candleId === candleId);
      const updated = existing
        ? prev.map((i) => i.candleId === candleId ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { candleId, quantity: 1 }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((candleId: string, quantity: number) => {
    setCart((prev) => {
      const updated = quantity <= 0
        ? prev.filter((i) => i.candleId !== candleId)
        : prev.map((i) => i.candleId === candleId ? { ...i, quantity } : i);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((candleId: string) => {
    setCart((prev) => {
      const updated = prev.filter((i) => i.candleId !== candleId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    persist([]);
  }, []);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return { cart, addToCart, updateQuantity, removeFromCart, clearCart, totalItems };
}
