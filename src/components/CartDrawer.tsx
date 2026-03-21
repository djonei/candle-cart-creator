import { CartItem, Candle } from "@/types/candle";
import { formatCurrency } from "@/utils/format";
import { Minus, Plus, X, Trash2 } from "lucide-react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  candles: Candle[];
  onUpdateQuantity: (candleId: string, quantity: number) => void;
  onRemove: (candleId: string) => void;
  onCheckout: () => void;
}

const CartDrawer = ({
  open,
  onClose,
  cart,
  candles,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: CartDrawerProps) => {
  const getCandle = (id: string) => candles.find((c) => c.id === id);

  const total = cart.reduce((sum, item) => {
    const candle = getCandle(item.candleId);
    return sum + (candle ? candle.price * item.quantity : 0);
  }, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-warm-dark/60 backdrop-blur-sm transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-card border-l border-border
          shadow-2xl shadow-warm-dark/40 transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-display text-2xl font-medium text-foreground">Seu Pedido</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-secondary transition-colors active:scale-[0.95]"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="font-display text-xl text-muted-foreground">Nenhum item ainda</p>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  Explore nossa coleção e adicione velas ao seu pedido.
                </p>
              </div>
            ) : (
              cart.map((item) => {
                const candle = getCandle(item.candleId);
                if (!candle) return null;
                return (
                  <div
                    key={item.candleId}
                    className="flex gap-3 p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="w-16 h-16 rounded-md bg-muted overflow-hidden shrink-0">
                      <img src={candle.image} alt={candle.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-base font-medium text-foreground truncate">
                        {candle.name}
                      </h4>
                      <p className="font-body text-xs text-muted-foreground">{candle.weight}</p>
                      <p className="font-body text-sm text-primary mt-0.5">
                        {formatCurrency(candle.price)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => onRemove(item.candleId)}
                        className="p-1 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.candleId, item.quantity - 1)}
                          className="w-7 h-7 rounded-md bg-muted flex items-center justify-center
                                   hover:bg-border transition-colors active:scale-[0.95]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-body text-sm tabular-nums w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.candleId, item.quantity + 1)}
                          className="w-7 h-7 rounded-md bg-muted flex items-center justify-center
                                   hover:bg-border transition-colors active:scale-[0.95]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-muted-foreground">Total</span>
                <span className="font-display text-2xl font-semibold text-primary">
                  {formatCurrency(total)}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-body 
                         text-sm font-medium tracking-wide uppercase
                         hover:bg-accent hover:text-accent-foreground
                         active:scale-[0.98] transition-all duration-200"
              >
                Finalizar Pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
