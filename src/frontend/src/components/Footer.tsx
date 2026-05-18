export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="glass-card border-t border-border py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-3 text-center">
        {/* Brand */}
        <span className="font-display font-bold text-sm text-gradient-primary tracking-widest">
          ΔLΞX-ΡΙΚU
        </span>

        {/* Copyright */}
        <p className="font-body text-xs text-muted-foreground">
          © {year} ΔLΞX-ΡΙΚU. All rights reserved.
        </p>

        {/* Branding */}
        <p className="font-body text-xs text-muted-foreground/60">
          Built with love using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-smooth underline underline-offset-2"
            data-ocid="footer.caffeine_link"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
