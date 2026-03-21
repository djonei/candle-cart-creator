import { useState } from "react";
import { CartItem, Candle } from "@/types/candle";
import { formatCurrency } from "@/utils/format";
import { X } from "lucide-react";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  candles: Candle[];
  onSubmit: (name: string, phone: string, note: string) => void;
}

const CheckoutModal = ({ open, onClose, cart, candles, onSubmit }: CheckoutModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const getCandle = (id: string) => candles.find((c) => c.id === id);

  const total = cart.reduce((sum, item) => {
    const candle = getCandle(item.candleId);
    return sum + (candle ? candle.price * item.quantity : 0);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, phone, note);
    setName("");
    setPhone("");
    setNote("");
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-warm-dark/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div
          className="bg-card border border-border rounded-xl shadow-2xl shadow-warm-dark/40 
                      w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-display text-2xl font-medium text-foreground">Finalizar Pedido</h2>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-secondary transition-colors active:scale-[0.95]">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-5">
            {/* Order summary */}
            <div className="space-y-2">
              <h3 className="font-body text-xs tracking-widest uppercase text-muted-foreground">Resumo</h3>
              {cart.map((item) => {
                const candle = getCandle(item.candleId);
                if (!candle) return null;
                return (
                  <div key={item.candleId} className="flex justify-between text-sm font-body">
                    <span className="text-secondary-foreground">
                      {candle.name} <span className="text-muted-foreground">×{item.quantity}</span>
                    </span>
                    <span className="text-foreground tabular-nums">
                      {formatCurrency(candle.price * item.quantity)}
                    </span>
                  </div>
                );
              })}
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="font-body text-sm font-medium text-foreground">Total</span>
                <span className="font-display text-lg font-semibold text-primary">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Customer info */}
            <div className="space-y-3">
              <h3 className="font-body text-xs tracking-widest uppercase text-muted-foreground">Seus Dados</h3>
              <input
                type="text"
                required
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border 
                         text-foreground font-body text-sm placeholder:text-muted-foreground
                         focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
              <input
                type="tel"
                required
                placeholder="WhatsApp / Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border 
                         text-foreground font-body text-sm placeholder:text-muted-foreground
                         focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
              <textarea
                placeholder="Observações (opcional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border 
                         text-foreground font-body text-sm placeholder:text-muted-foreground
                         focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-body 
                       text-sm font-medium tracking-wide uppercase
                       hover:bg-accent hover:text-accent-foreground
                       active:scale-[0.98] transition-all duration-200"
            >
              Enviar Pedido
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
