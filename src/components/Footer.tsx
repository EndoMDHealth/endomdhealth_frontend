import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Who We Are",
      links: [
        { title: "What We Treat", href: "/what-we-treat" },
        { title: "Resources", href: "/resources" },
        { title: "About Us", href: "/about-us" },
        { title: "Blog", href: "/blog" },
      ],
    },
    {
      title: "What We Offer",
      links: [
        { title: "Medical Consult", href: "/medical-consult" },
        { title: "Nutrition & Lifestyle Coaching", href: "/nutrition-coaching" },
        { title: "E-Consult", href: "/e-consult" },
      ],
    },
    {
      title: "Who We Serve",
      links: [
        { title: "For Patients", href: "/for-patients" },
        { title: "For Parents", href: "/for-parents" },
        { title: "For Providers", href: "/for-healthcare-professionals" },
        { title: "For Schools", href: "/for-schools" },
        { title: "For Community Partners", href: "/for-community-partners" },
      ],
    },
    {
      title: "Contact & Legal",
      links: [
        { title: "Contact Us", href: "/contact-us" },
        { title: "Privacy Policy", href: "/privacy-policy" },
        { title: "Terms of Service", href: "/terms-of-service" },
        { title: "571-480-6053", href: "tel:571-480-6053", icon: Phone },
        { title: "info@endomdhealth.com", href: "mailto:info@endomdhealth.com", icon: Mail },
      ],
    },
  ];

  return (
    <footer className="bg-primary text-background">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold">EndoMD Health</h3>
                <p className="text-accent font-medium">Helping kids thrive</p>
              </div>
              <p className="text-sm text-background/80 leading-relaxed">
                Specialized pediatric endocrine care serving Maryland and Virginia, helping children ages Birth–25 years
                achieve optimal health and growth.
              </p>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href="/for-patients">Request Appointment</a>
            </Button>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h4 className="text-lg font-semibold text-accent">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="flex items-center space-x-2 text-sm text-background/80 hover:text-background transition-colors"
                      >
                        {link.icon && <link.icon className="h-4 w-4" />}
                        <span>{link.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} EndoMD Health. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/accessibility" className="text-background/60 hover:text-background transition-colors">
                Accessibility
              </a>
              <a href="/sitemap.xml" className="text-background/60 hover:text-background transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
