import { useState, useEffect, useCallback } from "react";
import { Order, CartItem } from "@/types/candle";

const STORAGE_KEY = "lumi-orders";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setOrders(JSON.parse(stored));
  }, []);

  const persist = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const createOrder = useCallback((
    items: CartItem[],
    customerName: string,
    customerPhone: string,
    customerNote: string
  ) => {
    const newOrder: Order = {
      id: crypto.randomUUID(),
      items,
      customerName,
      customerPhone,
      customerNote,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    return newOrder;
  }, []);

  return { orders, createOrder };
}
