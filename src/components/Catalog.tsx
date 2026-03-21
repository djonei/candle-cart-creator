import { Candle } from "@/types/candle";
import CandleCard from "./CandleCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CatalogProps {
  candles: Candle[];
  onAdd: (id: string) => void;
}

const Catalog = ({ candles, onAdd }: CatalogProps) => {
  const ref = useScrollReveal<HTMLDivElement>();

  const categories = [...new Set(candles.map((c) => c.category))];

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div ref={ref} className="scroll-reveal mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-light text-foreground text-balance">
            Nossa coleção
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-2">
            Selecione as velas e quantidades para montar seu pedido.
          </p>
        </div>

        {categories.map((cat) => (
          <div key={cat} className="mb-10">
            <h3 className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 border-b border-border pb-2">
              {cat}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {candles
                .filter((c) => c.category === cat && c.available)
                .map((candle) => (
                  <CandleCard key={candle.id} candle={candle} onAdd={onAdd} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Catalog;
