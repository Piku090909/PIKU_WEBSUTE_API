import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useClaimOwnership,
  useIsOwner,
  useSetSiteData,
  useSiteData,
} from "@/hooks/useQueries";
import type { SocialLink } from "@/hooks/useQueries";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Loader2,
  LogIn,
  LogOut,
  Plus,
  Save,
  ShieldCheck,
  ShieldOff,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminPanel() {
  const { loginStatus, login, clear, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;

  const { data: siteData, isLoading: siteLoading } = useSiteData();
  const {
    data: ownerStatus,
    isLoading: ownerLoading,
    refetch: refetchOwner,
  } = useIsOwner();
  const claimOwnership = useClaimOwnership();
  const setSiteData = useSetSiteData();

  const [bio, setBio] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [saving, setSaving] = useState(false);

  // Sync form when siteData loads
  useEffect(() => {
    if (siteData) {
      setBio(siteData.bio);
      setContactEmail(siteData.contactEmail);
      setLinks(siteData.links);
    }
  }, [siteData]);

  const handleClaim = async () => {
    try {
      const claimed = await claimOwnership.mutateAsync();
      if (claimed) {
        toast.success("Ownership claimed! You are now the admin.");
        refetchOwner();
      } else {
        toast.error("Ownership already claimed by another principal.");
      }
    } catch {
      toast.error("Failed to claim ownership. Please try again.");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setSiteData.mutateAsync({ bio, contactEmail, links });
      toast.success("Site data saved successfully!");
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const addLink = () => {
    setLinks((prev) => [
      ...prev,
      {
        id: `link_${Date.now()}`,
        title: "",
        href: "",
        description: "",
        cta: "Connect",
      },
    ]);
  };

  const updateLink = (idx: number, field: keyof SocialLink, value: string) => {
    setLinks((prev) =>
      prev.map((l, i) => (i === idx ? { ...l, [field]: value } : l)),
    );
  };

  const removeLink = (idx: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card border-b border-border sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={22} className="text-accent" />
            <span className="font-display font-bold text-lg text-gradient-primary">
              Admin Panel
            </span>
            <span className="font-mono text-xs text-muted-foreground hidden sm:block">
              ΔLΞX-ΡΙΚU
            </span>
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  clear();
                  window.location.hash = "";
                }}
                className="text-muted-foreground hover:text-foreground gap-2"
                data-ocid="admin.logout_button"
              >
                <LogOut size={16} /> Logout
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                window.location.hash = "";
              }}
              className="text-muted-foreground"
              data-ocid="admin.back_button"
            >
              ← Back to Site
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Not logged in */}
        {!isLoggedIn && (
          <div
            className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
            data-ocid="admin.login_panel"
          >
            <div className="glass-card border border-border rounded-3xl p-10 flex flex-col items-center gap-6 max-w-md w-full text-center border-glow-purple">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                <ShieldCheck size={40} className="text-primary" />
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl text-foreground mb-2">
                  Owner Login
                </h1>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  This site uses{" "}
                  <span className="text-accent font-medium">
                    Internet Identity
                  </span>{" "}
                  — the secure, privacy-first login system on the Internet
                  Computer. No email or password needed.
                </p>
              </div>
              <div className="w-full p-4 rounded-xl bg-muted/40 border border-border">
                <p className="font-mono text-xs text-muted-foreground">
                  💡 Internet Identity is ICP's equivalent of "Sign in with
                  Google" — but decentralized and passwordless.
                </p>
              </div>
              <Button
                type="button"
                onClick={login}
                className="w-full gradient-primary text-white font-body font-semibold gap-2"
                data-ocid="admin.login_button"
              >
                <LogIn size={18} /> Connect with Internet Identity
              </Button>
            </div>
          </div>
        )}

        {/* Logged in but checking owner status */}
        {isLoggedIn && ownerLoading && (
          <div
            className="flex items-center justify-center min-h-[40vh]"
            data-ocid="admin.loading_state"
          >
            <Loader2 size={32} className="text-accent animate-spin" />
          </div>
        )}

        {/* Logged in, not owner */}
        {isLoggedIn && !ownerLoading && !ownerStatus && (
          <div
            className="flex flex-col items-center justify-center min-h-[60vh] gap-6"
            data-ocid="admin.claim_panel"
          >
            <div className="glass-card border border-border rounded-3xl p-10 flex flex-col items-center gap-6 max-w-md w-full text-center border-glow-cyan">
              <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
                <ShieldOff size={40} className="text-accent" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                  Claim Ownership
                </h2>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  You are connected but not yet the registered owner. If you are
                  the site owner, click below to claim ownership with your
                  current Internet Identity.
                </p>
              </div>
              <Button
                type="button"
                onClick={handleClaim}
                disabled={claimOwnership.isPending}
                className="w-full gradient-primary text-white font-body font-semibold gap-2"
                data-ocid="admin.claim_button"
              >
                {claimOwnership.isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ShieldCheck size={16} />
                )}
                Claim Ownership
              </Button>
            </div>
          </div>
        )}

        {/* Owner edit form */}
        {isLoggedIn && !ownerLoading && ownerStatus && (
          <div className="space-y-10" data-ocid="admin.edit_panel">
            <div>
              <h1 className="font-display font-bold text-3xl text-gradient-primary mb-1">
                Edit Site Content
              </h1>
              <p className="font-body text-sm text-muted-foreground">
                Changes are saved to the blockchain and reflected immediately on
                the live site.
              </p>
            </div>

            {siteLoading ? (
              <div
                className="flex items-center gap-3 text-muted-foreground"
                data-ocid="admin.form_loading_state"
              >
                <Loader2 size={20} className="animate-spin" /> Loading current
                data…
              </div>
            ) : (
              <>
                {/* Bio */}
                <section className="glass-card border border-border rounded-2xl p-6 space-y-4">
                  <h2 className="font-display font-semibold text-lg text-foreground">
                    Hero Bio
                  </h2>
                  <div className="space-y-2">
                    <Label
                      htmlFor="bio"
                      className="font-body text-sm text-muted-foreground"
                    >
                      Bio / Tagline
                    </Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      placeholder="Connect with me across the digital universe."
                      className="font-body resize-none bg-muted/40"
                      data-ocid="admin.bio_textarea"
                    />
                  </div>
                </section>

                {/* Contact */}
                <section className="glass-card border border-border rounded-2xl p-6 space-y-4">
                  <h2 className="font-display font-semibold text-lg text-foreground">
                    Contact Email
                  </h2>
                  <div className="space-y-2">
                    <Label
                      htmlFor="contactEmail"
                      className="font-body text-sm text-muted-foreground"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="mralexpiku@gmail.com"
                      className="font-body bg-muted/40"
                      data-ocid="admin.contact_email_input"
                    />
                  </div>
                </section>

                {/* Social Links */}
                <section className="glass-card border border-border rounded-2xl p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display font-semibold text-lg text-foreground">
                      Social Links
                    </h2>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addLink}
                      className="gap-2 border-accent/40 text-accent hover:bg-accent/10"
                      data-ocid="admin.add_link_button"
                    >
                      <Plus size={14} /> Add Link
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {links.map((link, idx) => (
                      <div
                        key={link.id}
                        className="border border-border rounded-xl p-5 space-y-4 bg-muted/20"
                        data-ocid={`admin.link_item.${idx + 1}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-muted-foreground">
                            Link #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeLink(idx)}
                            className="text-destructive hover:text-destructive/80 transition-smooth p-1 rounded"
                            aria-label={`Remove link ${idx + 1}`}
                            data-ocid={`admin.remove_link_button.${idx + 1}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="font-body text-xs text-muted-foreground">
                              Title
                            </Label>
                            <Input
                              value={link.title}
                              onChange={(e) =>
                                updateLink(idx, "title", e.target.value)
                              }
                              placeholder="WhatsApp"
                              className="font-body bg-muted/40"
                              data-ocid={`admin.link_title_input.${idx + 1}`}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="font-body text-xs text-muted-foreground">
                              CTA Text
                            </Label>
                            <Input
                              value={link.cta}
                              onChange={(e) =>
                                updateLink(idx, "cta", e.target.value)
                              }
                              placeholder="Connect"
                              className="font-body bg-muted/40"
                              data-ocid={`admin.link_cta_input.${idx + 1}`}
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label className="font-body text-xs text-muted-foreground">
                              URL
                            </Label>
                            <Input
                              value={link.href}
                              onChange={(e) =>
                                updateLink(idx, "href", e.target.value)
                              }
                              placeholder="https://..."
                              className="font-body bg-muted/40"
                              data-ocid={`admin.link_href_input.${idx + 1}`}
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label className="font-body text-xs text-muted-foreground">
                              Description
                            </Label>
                            <Input
                              value={link.description}
                              onChange={(e) =>
                                updateLink(idx, "description", e.target.value)
                              }
                              placeholder="Short description shown on the card"
                              className="font-body bg-muted/40"
                              data-ocid={`admin.link_desc_input.${idx + 1}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {links.length === 0 && (
                      <p
                        className="text-center py-8 text-muted-foreground font-body text-sm"
                        data-ocid="admin.links_empty_state"
                      >
                        No links yet. Click "Add Link" to get started.
                      </p>
                    )}
                  </div>
                </section>

                {/* Save */}
                <div className="flex justify-end pb-12">
                  <Button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="gradient-primary text-white font-body font-semibold px-10 gap-2"
                    data-ocid="admin.save_button"
                  >
                    {saving ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}
                    Save Changes
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
