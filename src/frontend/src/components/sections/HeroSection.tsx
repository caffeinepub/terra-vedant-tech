import { Button } from "@/components/ui/button";
import { BRAND_ASSETS } from "@/content/brandAssets";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { scrollToSection } from "@/lib/scrollToSection";
import { ArrowRight } from "lucide-react";
import { heroContent } from "../../content/marketingCopy";

export function HeroSection() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  return (
    <section
      id="hero"
      aria-label="Hero introduction"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image — LCP element: eager + high priority */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={BRAND_ASSETS.hero.background}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1600}
          height={900}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/75" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {isAuthenticated ? (
            <>
              <p className="text-primary font-semibold text-lg md:text-xl mb-3 tracking-wide uppercase">
                Welcome Back
              </p>
              <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight">
                Great to See You Again
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Welcome back to Terra Vedant Tech — your trusted partner in
                precision agriculture and smart farming solutions. Explore our
                latest services or get in touch with our team.
              </p>
            </>
          ) : (
            <>
              <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight">
                {heroContent.headline}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                {heroContent.subheadline}
              </p>
            </>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 h-auto"
            >
              {heroContent.ctaPrimary}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("services")}
              className="text-base px-8 py-6 h-auto border-2"
            >
              {heroContent.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
