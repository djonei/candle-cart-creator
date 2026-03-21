import { useState, useEffect } from "react";
import { Candle } from "@/types/candle";
import { mockCandles } from "@/mocks/candles";

const STORAGE_KEY = "lumi-candles";

export function useCandles() {
  const [candles, setCandles] = useState<Candle[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCandles(JSON.parse(stored));
    } else {
      setCandles(mockCandles);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCandles));
    }
  }, []);

  const persist = (updated: Candle[]) => {
    setCandles(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { candles, setCandles: persist };
}
