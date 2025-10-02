import { Button } from "@/components/ui/button";
import { Phone, Mail, FileText } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "About Us",
      links: [
        { title: "Who We Are", href: "/about" },
        { title: "What We Offer", href: "/what-we-offer" },
        { title: "Who We Serve", href: "/who-we-serve" },
      ],
    },
    {
      title: "Contact Info",
      links: [
        { title: "Contact Us", href: "/contact" },
        { title: "571-480-6053", href: "tel:571-480-6053", icon: Phone },
        { title: "info@endomdhealth.com", href: "mailto:info@endomdhealth.com", icon: Mail },
        { title: "804-660-6321", href: "tel:804-660-6321", icon: FileText },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Blog", href: "/blog" },
        { title: "Resources for Families", href: "/resources" },
        { title: "Frequently Asked Questions", href: "/faq" },
        { title: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Legal",
      links: [
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Terms of Service", href: "/terms" },
        { title: "HIPAA Compliance", href: "/hipaa" },
      ],
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold">ENDOMD Health</h3>
                <p className="text-accent font-medium">Helping kids thrive</p>
              </div>
              <p className="text-sm text-primary-foreground/80 leading-relaxed">
                Specialized pediatric endocrine care serving Maryland and Virginia, 
                helping children ages Birth–25 years achieve optimal health and growth.
              </p>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Request Appointment
              </Button>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h4 className="text-lg font-semibold text-accent">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="flex items-center space-x-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
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
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} EndoMD Health. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/accessibility" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Accessibility
              </a>
              <a href="/sitemap.xml" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
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