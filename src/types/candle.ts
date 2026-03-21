export interface Candle {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  fragrance: string;
  weight: string;
  available: boolean;
}

export interface CartItem {
  candleId: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  customerNote: string;
  createdAt: string;
  status: "pending" | "confirmed" | "delivered";
}
