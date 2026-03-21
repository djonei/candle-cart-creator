import heroBg from "@/assets/hero-bg.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Hero = () => {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative h-[50vh] md:h-[60vh] flex items-end overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div
        ref={ref}
        className="scroll-reveal relative container pb-8 md:pb-12"
      >
        <h1 className="font-display text-4xl md:text-6xl font-light text-warm-cream leading-[1.1] text-balance">
          Ilumine seus <br className="hidden md:block" />momentos
        </h1>
        <p className="mt-3 font-body text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
          Velas artesanais feitas com carinho para transformar cada ambiente em um refúgio.
        </p>
      </div>
    </section>
  );
};

export default Hero;
