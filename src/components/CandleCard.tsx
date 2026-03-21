import { Candle } from "@/types/candle";
import { formatCurrency } from "@/utils/format";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CandleCardProps {
  candle: Candle;
  onAdd: (id: string) => void;
}

const CandleCard = ({ candle, onAdd }: CandleCardProps) => {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="scroll-reveal group bg-card rounded-lg overflow-hidden border border-border
                 shadow-md shadow-warm-dark/20 hover:shadow-lg hover:shadow-warm-gold/10
                 transition-shadow duration-300"
    >
      <div className="aspect-square bg-muted overflow-hidden">
        <img
          src={candle.image}
          alt={candle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <span className="font-body text-xs tracking-widest uppercase text-muted-foreground">
          {candle.category}
        </span>
        <h3 className="font-display text-xl font-medium text-foreground mt-1 leading-tight">
          {candle.name}
        </h3>
        <p className="font-body text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
          {candle.description}
        </p>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-body text-xs text-muted-foreground">{candle.fragrance}</span>
          <span className="font-body text-xs text-muted-foreground">· {candle.weight}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-display text-lg font-semibold text-primary">
            {formatCurrency(candle.price)}
          </span>
          <button
            onClick={() => onAdd(candle.id)}
            className="font-body text-xs font-medium tracking-wide uppercase px-4 py-2 
                       rounded-md bg-primary text-primary-foreground 
                       hover:bg-accent hover:text-accent-foreground
                       active:scale-[0.96] transition-all duration-200"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandleCard;
