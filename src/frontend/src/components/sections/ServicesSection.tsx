import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Droplet,
  Monitor,
  Plane,
  Radio,
  Sprout,
  TrendingUp,
} from "lucide-react";
import { servicesContent } from "../../content/marketingCopy";

const iconMap = {
  droplet: Droplet,
  chart: TrendingUp,
  sensor: Radio,
  drone: Plane,
  software: Monitor,
  consulting: Sprout,
};

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-label="Our services"
      className="py-24 bg-background"
    >
      <div className="container px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            {servicesContent.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {servicesContent.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {servicesContent.services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <Card
                key={service.title}
                className="border-2 hover:border-primary/50 hover:shadow-soft transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-semibold leading-none tracking-tight">
                    {service.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
