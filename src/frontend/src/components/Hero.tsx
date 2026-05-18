import { useSiteData } from "@/hooks/useQueries";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const { data: siteData } = useSiteData();
  const bio = siteData?.bio || "Connect with me across the digital universe.";

  const scrollToSocial = () => {
    document.getElementById("social")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen gradient-hero flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Decorative floating shapes */}
      <div className="absolute top-20 left-8 w-16 h-16 rounded-full border-2 border-glow-purple opacity-40 animate-pulse" />
      <div
        className="absolute top-40 right-12 w-10 h-10 rounded-md border-2 border-glow-magenta opacity-30 rotate-45 animate-pulse"
        style={{ animationDelay: "0.8s" }}
      />
      <div
        className="absolute bottom-40 left-16 w-12 h-12 border-2 border-glow-cyan opacity-35 rotate-12 animate-pulse"
        style={{ animationDelay: "1.4s" }}
      />
      <div
        className="absolute bottom-24 right-20 w-20 h-20 rounded-full border border-glow-purple opacity-20 animate-pulse"
        style={{ animationDelay: "0.4s" }}
      />
      <div
        className="absolute top-1/3 left-1/4 w-6 h-6 rounded-full border-2 border-glow-magenta opacity-25 animate-pulse"
        style={{ animationDelay: "1.1s" }}
      />
      <div
        className="absolute top-1/4 right-1/4 w-8 h-8 border border-glow-cyan opacity-30 rotate-45 animate-pulse"
        style={{ animationDelay: "0.6s" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 gap-6">
        {/* Greek/math decorative label */}
        <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-muted-foreground uppercase border border-border px-4 py-1.5 rounded-full glass-card">
          Δ · Λ · Ξ · Χ
        </span>

        {/* Main title */}
        <h1
          className="text-gradient-primary font-display font-bold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none"
          style={{
            animation: "slideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) both",
          }}
        >
          ΔLΞX-ΡΙΚU
        </h1>

        {/* Tagline */}
        <p
          className="font-body text-muted-foreground text-lg sm:text-xl max-w-md leading-relaxed"
          style={{
            animation: "slideIn 1s cubic-bezier(0.4, 0, 0.2, 1) both",
            animationDelay: "0.15s",
          }}
        >
          {bio}
          <br />
          <span className="text-gradient-accent font-medium">
            Find me on social media.
          </span>
        </p>

        {/* CTA */}
        <button
          type="button"
          onClick={scrollToSocial}
          className="mt-2 gradient-primary text-white font-body font-semibold text-sm px-8 py-3 rounded-full transition-smooth hover:scale-105 hover:shadow-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          data-ocid="hero.social_cta_button"
        >
          Connect With Me
        </button>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollToSocial}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-smooth flex flex-col items-center gap-1"
        aria-label="Scroll to social section"
        data-ocid="hero.scroll_indicator"
      >
        <span className="text-xs font-mono tracking-widest opacity-60">
          SCROLL
        </span>
        <ChevronDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
}
