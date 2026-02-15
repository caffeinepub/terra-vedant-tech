import { SiLinkedin, SiX, SiFacebook } from 'react-icons/si';
import { Heart } from 'lucide-react';
import { scrollToSection } from '@/lib/scrollToSection';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  
  // Generate UTM-tracked caffeine.ai link
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname)
    : 'terra-vedant-tech';
  const caffeineLink = `https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`;

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
              Empowering farmers with cutting-edge technology for sustainable, data-driven farming solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', id: 'hero' },
                { label: 'About', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Contact', id: 'contact' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} Terra Vedant Tech. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-destructive fill-destructive" /> using{' '}
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
