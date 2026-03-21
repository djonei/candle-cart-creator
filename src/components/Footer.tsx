const Footer = () => {
  return (
    <footer className="border-t border-border py-8 mt-8">
      <div className="container text-center">
        <p className="font-display text-lg text-primary">Lümi Concept</p>
        <p className="font-body text-xs text-muted-foreground mt-1">
          Velas artesanais feitas com amor
        </p>
        <p className="font-body text-xs text-muted-foreground mt-4">
          © {new Date().getFullYear()} Lümi Concept. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
