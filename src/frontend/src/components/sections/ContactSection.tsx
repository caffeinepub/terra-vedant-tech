import { Mail, MapPin, Phone } from "lucide-react";
import { contactContent } from "../../content/marketingCopy";
import { ContactForm } from "../ContactForm";

export function ContactSection() {
  // Sanitize phone number for tel: link (remove non-dialable characters except +)
  const sanitizePhoneForTel = (phone: string) => {
    return phone.replace(/[^\d+]/g, "");
  };

  return (
    <section id="contact" aria-label="Contact us" className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              {contactContent.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {contactContent.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="font-display font-semibold text-2xl mb-6">
                  Contact Information
                </h3>
                <address className="not-italic space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0">
                      <Mail
                        className="w-6 h-6 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Email</p>
                      <a
                        href={`mailto:${contactContent.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`Send email to ${contactContent.email}`}
                      >
                        {contactContent.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0">
                      <MapPin
                        className="w-6 h-6 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">
                        Location
                      </p>
                      <span className="text-muted-foreground">
                        {contactContent.address}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0">
                      <Phone
                        className="w-6 h-6 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Phone</p>
                      <a
                        href={`tel:${sanitizePhoneForTel(contactContent.phone)}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`Call us at ${contactContent.phone}`}
                      >
                        {contactContent.phone}
                      </a>
                    </div>
                  </div>
                </address>
              </div>

              <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="font-display font-semibold text-lg mb-2">
                  Ready to get started?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Fill out the form and our team will get back to you within 24
                  hours to discuss how we can help transform your farming
                  operations.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
