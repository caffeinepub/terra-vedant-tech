import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BRAND_ASSETS } from '@/content/brandAssets';
import { scrollToSection } from '@/lib/scrollToSection';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between min-h-[88px] md:min-h-[104px] py-4 md:py-5">
          {/* Brand Logo and Text */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <img 
              src={BRAND_ASSETS.logo.header} 
              alt="Terra Vedant Tech - Agriculture Technology Solutions" 
              className="h-[56px] md:h-[68px] w-auto object-contain"
            />
            <span className="font-display font-semibold text-xl md:text-2xl lg:text-3xl text-foreground">
              Terra Vedant Tech
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block flex-shrink-0">
            <Button
              onClick={() => handleNavClick('contact')}
              size="default"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-foreground hover:text-primary transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-left px-4 py-2 text-base text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="px-4 pt-2">
                <Button
                  onClick={() => handleNavClick('contact')}
                  size="default"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
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
