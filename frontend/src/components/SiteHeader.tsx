import { useState, useEffect } from 'react';
import { Menu, X, LogIn, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BRAND_ASSETS } from '@/content/brandAssets';
import { scrollToSection } from '@/lib/scrollToSection';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { identity, login, clear, isLoggingIn, isInitializing } = useInternetIdentity();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    // Close mobile menu first to ensure correct header height measurement
    setIsMobileMenuOpen(false);

    // Use requestAnimationFrame to ensure menu close completes before scroll
    requestAnimationFrame(() => {
      scrollToSection(sectionId);
    });
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between min-h-[88px] md:min-h-[104px] py-4 md:py-5">
          {/* Brand Logo and Text */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity flex-shrink-0"
            aria-label="Go to homepage"
          >
            <img
              src={BRAND_ASSETS.logo.header}
              alt="Terra Vedant Tech logo"
              className="h-[56px] md:h-[68px] w-auto object-contain"
              loading="eager"
              width={68}
              height={68}
            />
            <span className="font-display font-semibold text-xl md:text-2xl lg:text-3xl text-foreground">
              Terra Vedant Tech
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors whitespace-nowrap"
                aria-label={`Navigate to ${link.label} section`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {isAuthenticated ? (
              <Button
                onClick={clear}
                variant="outline"
                size="default"
                className="border-primary/40 text-foreground hover:bg-muted"
                aria-label="Log out of your account"
              >
                <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                Log Out
              </Button>
            ) : (
              <Button
                onClick={login}
                variant="ghost"
                size="default"
                disabled={isLoggingIn || isInitializing}
                className="text-foreground/80 hover:text-primary"
                aria-label="Log in with Internet Identity"
              >
                {isLoggingIn ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
                )}
                {isLoggingIn ? 'Logging in…' : 'Log In'}
              </Button>
            )}
            <Button
              onClick={() => handleNavClick('contact')}
              size="default"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              aria-label="Get started - navigate to contact section"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-foreground hover:text-primary transition-colors flex-shrink-0"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className="md:hidden py-4 border-t animate-fade-in"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-left px-4 py-2 text-base text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
                  aria-label={`Navigate to ${link.label} section`}
                >
                  {link.label}
                </button>
              ))}
              <div className="px-4 pt-2 flex flex-col gap-2">
                {isAuthenticated ? (
                  <Button
                    onClick={() => { setIsMobileMenuOpen(false); clear(); }}
                    variant="outline"
                    size="default"
                    className="w-full border-primary/40 text-foreground hover:bg-muted"
                    aria-label="Log out of your account"
                  >
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    Log Out
                  </Button>
                ) : (
                  <Button
                    onClick={() => { setIsMobileMenuOpen(false); login(); }}
                    variant="outline"
                    size="default"
                    disabled={isLoggingIn || isInitializing}
                    className="w-full border-primary/40 text-foreground hover:bg-muted"
                    aria-label="Log in with Internet Identity"
                  >
                    {isLoggingIn ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
                    )}
                    {isLoggingIn ? 'Logging in…' : 'Log In'}
                  </Button>
                )}
                <Button
                  onClick={() => handleNavClick('contact')}
                  size="default"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  aria-label="Get started - navigate to contact section"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
