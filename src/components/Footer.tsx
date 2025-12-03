import { Button } from "@/components/ui/button";
import { Phone, Mail, FileText } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [termsOpen, setTermsOpen] = useState(false);

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
        { title: "Contact Us", href: "/contact-us" },
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
        { title: "Privacy Policy", href: "/privacy-policy" },
        { title: "Clinical Services and Practice Policies", href: "/clinical-services-policies" },
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
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Request Appointment</Button>
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

        {/* Terms of Service Section */}
        <div className="border-t border-background/20 py-6">
          <Collapsible open={termsOpen} onOpenChange={setTermsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
              <h4 className="text-lg font-semibold text-accent">Terms of Service</h4>
              <ChevronDown 
                className={`h-5 w-5 text-accent transition-transform duration-200 ${termsOpen ? 'rotate-180' : ''}`} 
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="text-sm text-background/80 leading-relaxed space-y-4">
                <p>
                  Effective September 20, 2024. These "Terms of Service" are entered into between you and, to the extent pertinent, your minor child (hereinafter, collectively, "you"), and EndoMD Health LLC ("EndoMD Health") and are structured to facilitate your access to the terms relevant to your specific use of the website, <a href="http://www.endomdhelath.com" className="underline hover:text-background">www.endomdhelath.com</a>, including any content, functionality, and services offered on or through it (collectively, the "Website"), allowing you to easily navigate and understand the provisions applicable to your usage of the Website. By accessing and using the Website, you are agreeing to the following terms.
                </p>
                <p>
                  If you have any questions about these Terms, please contact us via email at <a href="mailto:info@endomdhealth.com" className="underline hover:text-background">info@endomdhealth.com</a>
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
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
