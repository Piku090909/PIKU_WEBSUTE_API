import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Social", href: "#social" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled ? "glass-card border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="text-xl sm:text-2xl font-display font-bold text-gradient-primary tracking-wider hover:opacity-90 transition-smooth"
            data-ocid="header.logo"
          >
            ΔLΞX-ΡΙΚU
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="text-muted-foreground hover:text-foreground font-body text-sm tracking-wide transition-smooth hover:text-gradient-primary"
                data-ocid={`header.nav.${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="#admin"
              className="text-muted-foreground/50 hover:text-muted-foreground font-mono text-xs tracking-widest transition-smooth"
              data-ocid="header.nav.admin"
            >
              ADMIN
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-foreground p-2 rounded-md hover:bg-muted transition-smooth"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            data-ocid="header.hamburger_button"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden glass-card border-t border-border px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="text-left text-muted-foreground hover:text-foreground font-body text-sm py-2 tracking-wide transition-smooth"
                data-ocid={`header.mobile_nav.${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                window.location.hash = "admin";
              }}
              className="text-left text-muted-foreground/50 hover:text-muted-foreground font-mono text-xs py-2 tracking-widest transition-smooth"
              data-ocid="header.mobile_nav.admin"
            >
              ADMIN
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
