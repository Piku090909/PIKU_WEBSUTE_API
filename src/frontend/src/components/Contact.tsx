import { useSiteData } from "@/hooks/useQueries";
import { Mail } from "lucide-react";

export default function Contact() {
  const { data: siteData } = useSiteData();
  const email = siteData?.contactEmail || "mralexpiku@gmail.com";

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6"
      style={{ background: "oklch(0.14 0.025 265 / 0.6)" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Section label */}
        <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Δ · Get In Touch
        </span>

        <h2 className="mt-3 font-display font-bold text-3xl sm:text-5xl text-gradient-primary">
          Say Hello
        </h2>

        <p className="mt-5 font-body text-muted-foreground max-w-sm mx-auto">
          Prefer email? Drop me a message and I'll get back to you.
        </p>

        {/* Email card */}
        <div className="mt-12 inline-flex">
          <a
            href={`mailto:${email}`}
            className="group glass-card border-glow-cyan border rounded-2xl px-8 sm:px-12 py-8 flex flex-col sm:flex-row items-center gap-5 transition-smooth hover:scale-105 hover:shadow-neon-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-ocid="contact.email_link"
          >
            <span className="flex-shrink-0 p-3 rounded-xl bg-accent/10 text-accent transition-smooth group-hover:scale-110">
              <Mail size={28} />
            </span>
            <div className="text-left">
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-1">
                Email
              </p>
              <p className="font-display font-semibold text-lg sm:text-xl text-gradient-accent break-all">
                {email}
              </p>
            </div>
          </a>
        </div>

        {/* Decorative separator */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-border" />
          <span className="font-mono text-xs text-muted-foreground tracking-widest">
            ΔLΞX · ΡΙΚU
          </span>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-border" />
        </div>
      </div>
    </section>
  );
}
