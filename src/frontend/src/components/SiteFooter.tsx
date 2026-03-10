import { FACEBOOK_URL, LINKEDIN_URL, TWITTER_URL } from "@/content/socialLinks";
import { scrollToSection } from "@/lib/scrollToSection";
import { Heart } from "lucide-react";
import { SiFacebook, SiLinkedin, SiX } from "react-icons/si";

/**
 * Validates if a URL is a valid external link (not a placeholder)
 */
function isValidExternalUrl(url: string): boolean {
  if (!url || url === "#" || url === "") return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  // Generate UTM-tracked caffeine.ai link
  const appIdentifier =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "terra-vedant-tech";
  const caffeineLink = `https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`;

  // Validate social URLs
  const isLinkedInValid = isValidExternalUrl(LINKEDIN_URL);
  const isTwitterValid = isValidExternalUrl(TWITTER_URL);
  const isFacebookValid = isValidExternalUrl(FACEBOOK_URL);

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <span className="font-display font-semibold text-xl text-foreground">
                Terra Vedant Tech
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Empowering farmers with cutting-edge technology for sustainable,
              data-driven farming solutions.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="font-display font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", id: "hero" },
                { label: "About", id: "about" },
                { label: "Services", id: "services" },
                { label: "Contact", id: "contact" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    aria-label={`Navigate to ${link.label} section`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">
              Connect
            </h3>
            <ul className="flex gap-3" aria-label="Social media links">
              {/* LinkedIn */}
              <li>
                {isLinkedInValid ? (
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="Visit our LinkedIn company page"
                  >
                    <SiLinkedin className="w-5 h-5" aria-hidden="true" />
                  </a>
                ) : (
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted opacity-40 cursor-not-allowed"
                    aria-label="LinkedIn (not configured)"
                    role="img"
                  >
                    <SiLinkedin className="w-5 h-5" aria-hidden="true" />
                  </div>
                )}
              </li>

              {/* X (Twitter) */}
              <li>
                {isTwitterValid ? (
                  <a
                    href={TWITTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="Follow us on X (Twitter)"
                  >
                    <SiX className="w-5 h-5" aria-hidden="true" />
                  </a>
                ) : (
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted opacity-40 cursor-not-allowed"
                    aria-label="X (Twitter) (not configured)"
                    role="img"
                  >
                    <SiX className="w-5 h-5" aria-hidden="true" />
                  </div>
                )}
              </li>

              {/* Facebook */}
              <li>
                {isFacebookValid ? (
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="Visit our Facebook page"
                  >
                    <SiFacebook className="w-5 h-5" aria-hidden="true" />
                  </a>
                ) : (
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted opacity-40 cursor-not-allowed"
                    aria-label="Facebook (not configured)"
                    role="img"
                  >
                    <SiFacebook className="w-5 h-5" aria-hidden="true" />
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Terra Vedant Tech. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with{" "}
              <Heart
                className="w-4 h-4 text-destructive fill-destructive"
                aria-label="love"
              />{" "}
              using{" "}
              <a
                href={caffeineLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
