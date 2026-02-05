import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroContent } from '../../content/marketingCopy';

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/terra-vedant-tech-hero-bg.dim_1600x900.png"
          alt="Agriculture technology background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/75" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight">
            {heroContent.headline}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {heroContent.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 h-auto"
            >
              {heroContent.ctaPrimary}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('services')}
              className="text-base px-8 py-6 h-auto border-2"
            >
              {heroContent.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}

