import { ProductionErrorBoundary } from "./components/ProductionErrorBoundary";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { AboutSection } from "./components/sections/AboutSection";
import { ContactSection } from "./components/sections/ContactSection";
import { DashboardSection } from "./components/sections/DashboardSection";
import { HeroSection } from "./components/sections/HeroSection";
import { ServicesSection } from "./components/sections/ServicesSection";

function App() {
  return (
    <ProductionErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">
          <HeroSection />
          <DashboardSection />
          <AboutSection />
          <ServicesSection />
          <ContactSection />
        </main>
        <SiteFooter />
      </div>
    </ProductionErrorBoundary>
  );
}

export default App;
