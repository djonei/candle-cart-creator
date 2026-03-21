import { useState } from "react";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import Footer from "@/components/Footer";
import { useCandles } from "@/hooks/useCandles";
import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { toast } from "sonner";

const Index = () => {
  const { candles } = useCandles();
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, totalItems } = useCart();
  const { createOrder } = useOrders();

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleAdd = (id: string) => {
    addToCart(id);
    toast.success("Adicionado ao pedido", {
      description: candles.find((c) => c.id === id)?.name,
      duration: 2000,
    });
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleSubmitOrder = (name: string, phone: string, note: string) => {
    createOrder(cart, name, phone, note);
    clearCart();
    setCheckoutOpen(false);
    toast.success("Pedido enviado com sucesso!", {
      description: `Obrigado, ${name}! Entraremos em contato pelo WhatsApp.`,
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero cartCount={totalItems} onCartClick={() => setCartOpen(true)} />
      <Catalog candles={candles} onAdd={handleAdd} />
      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        candles={candles}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        candles={candles}
        onSubmit={handleSubmitOrder}
      />
    </div>
  );
};

export default Index;
