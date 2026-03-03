import { aboutContent } from '../../content/marketingCopy';
import { Leaf, Target, Users } from 'lucide-react';

export function AboutSection() {
  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Committed to eco-friendly farming practices'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Cutting-edge technology for modern agriculture'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'Working together with farmers for success'
    }
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
              {aboutContent.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {aboutContent.paragraph}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg bg-card hover:shadow-soft transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
