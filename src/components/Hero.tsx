import heroBg from "@/assets/hero-bg.jpg";
import logoLumi from "@/assets/logo-lumi.png";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface HeroProps {
  cartCount: number;
  onCartClick: () => void;
}

const Hero = ({ cartCount, onCartClick }: HeroProps) => {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative h-[35vh] md:h-[45vh] flex flex-col items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

      {/* Floating cart button */}
      <button
        onClick={onCartClick}
        className="absolute top-4 right-4 z-10 font-body text-sm font-medium tracking-wide uppercase
                   px-4 py-2 rounded-lg bg-warm-dark/60 backdrop-blur-sm text-warm-cream
                   hover:bg-warm-dark/80 transition-colors duration-200 active:scale-[0.97]"
      >
        Pedido
        {cartCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground
                         text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {/* Logo with contrast overlay */}
      <div
        ref={ref}
        className="scroll-reveal relative z-[1] flex flex-col items-center gap-4 w-full"
      >
        <div className="bg-warm-dark/20 backdrop-blur-sm w-full py-6 md:py-8 flex justify-center">
          <img
            src={logoLumi}
            alt="Lümi Concept"
            className="h-36 md:h-52 w-auto object-contain"
          />
        </div>
        <p className="font-body text-sm md:text-base text-warm-cream/90 text-center max-w-xs
                      drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
          Velas artesanais feitas com carinho
        </p>
      </div>
    </section>
  );
};

export default Hero;
