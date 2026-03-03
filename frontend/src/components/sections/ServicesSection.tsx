import { servicesContent } from '../../content/marketingCopy';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplet, TrendingUp, Radio, Plane, Monitor, Sprout } from 'lucide-react';

const iconMap = {
  droplet: Droplet,
  chart: TrendingUp,
  sensor: Radio,
  drone: Plane,
  software: Monitor,
  consulting: Sprout
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background">
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
          {servicesContent.services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <Card
                key={index}
                className="border-2 hover:border-primary/50 hover:shadow-soft transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="font-display text-xl">
                    <h3>{service.title}</h3>
                  </CardTitle>
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
