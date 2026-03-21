import logoLumi from "@/assets/logo-lumi.png";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const Header = ({ cartCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-warm-dark/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between py-3">
        <img
          src={logoLumi}
          alt="Lümi Concept"
          className="h-16 md:h-20 w-auto object-contain"
        />
        <button
          onClick={onCartClick}
          className="relative font-body text-sm font-medium tracking-wide uppercase text-foreground 
                     px-4 py-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground 
                     transition-colors duration-200 active:scale-[0.97]"
        >
          Pedido
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground 
                           text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
