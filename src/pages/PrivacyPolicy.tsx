import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText } from "lucide-react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "overview", title: "Overview" },
    { id: "information-collection", title: "Information Collection, Use, and Disclosure" },
    { id: "how-we-collect", title: "How We Collect Information" },
    { id: "de-identified", title: "De-identified Information" },
    { id: "childrens-privacy", title: "Children's Privacy" },
    { id: "disclosure-third-parties", title: "Disclosure to Third Parties" },
    { id: "links-other-websites", title: "Links to Other Websites" },
    { id: "data-security", title: "Data Security" },
    { id: "data-retention", title: "Data Retention" },
    { id: "your-rights", title: "Your Rights and Choices" },
    { id: "state-specific", title: "State-Specific Privacy Rights" },
    { id: "changes", title: "Changes to Our Privacy Policy" },
    { id: "contact", title: "Contact Information" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Effective: [DATE]
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Your child's privacy is extremely important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Table of Contents - Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Contents</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center w-full text-left text-sm py-2 px-3 rounded-md transition-colors ${
                      activeSection === section.id
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="line-clamp-2">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="prose prose-slate max-w-none">
              {/* Overview Section */}
              <section id="overview" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">Overview</h2>
                <p className="text-muted-foreground mb-4">
                  [Insert introductory text about EndoMD Health's commitment to privacy and compliance]
                </p>
                <p className="text-muted-foreground mb-4">
                  [Add text about what this policy covers and references to Terms of Service and Notice of Privacy Practices]
                </p>
                <div className="bg-muted/30 border-l-4 border-accent p-4 rounded-r-lg my-6">
                  <p className="text-sm text-foreground font-medium">
                    This Privacy Policy applies to information we collect:
                  </p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• On our Website</li>
                    <li>• In email, text, and other electronic messages</li>
                    <li>• Through mobile and desktop applications</li>
                    <li>• Telephonically</li>
                  </ul>
                </div>
              </section>

              {/* Information Collection Section */}
              <section id="information-collection" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Information Collection, Use, and Disclosure
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about types of information collected]
                </p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                  Types of Personal Data We Collect
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• [Personally identifiable information examples]</li>
                  <li>• [Non-identifying information]</li>
                  <li>• [Internet connection and usage data]</li>
                </ul>
              </section>

              {/* How We Collect Information */}
              <section id="how-we-collect" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  How We Collect Information About Your Child
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about collection methods]
                </p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                  Information You Provide
                </h3>
                <p className="text-muted-foreground mb-4">
                  [Details about forms, registrations, correspondence]
                </p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                  Automatic Information Collection
                </h3>
                <p className="text-muted-foreground mb-4">
                  [Details about cookies, Google Analytics, tracking technologies]
                </p>
              </section>

              {/* De-identified Information */}
              <section id="de-identified" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  De-identified Information
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about de-identified data usage]
                </p>
              </section>

              {/* Children's Privacy */}
              <section id="childrens-privacy" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Children's Privacy
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about pediatric practice, parental consent requirements]
                </p>
                <div className="bg-accent/10 border border-accent/20 p-6 rounded-lg my-6">
                  <h4 className="font-semibold text-foreground mb-3">
                    How We Use Your Personal Information
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• [Purpose 1]</li>
                    <li>• [Purpose 2]</li>
                    <li>• [Purpose 3]</li>
                    <li>• [Additional purposes]</li>
                  </ul>
                </div>
              </section>

              {/* Disclosure to Third Parties */}
              <section id="disclosure-third-parties" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Disclosure to Third Parties
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about not selling data and circumstances of disclosure]
                </p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                  We May Disclose Personal Data:
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• [To contractors and service providers]</li>
                  <li>• [To subsidiaries and affiliates]</li>
                  <li>• [In business transfers]</li>
                  <li>• [For legal compliance]</li>
                  <li>• [With your consent]</li>
                </ul>
              </section>

              {/* Links to Other Websites */}
              <section id="links-other-websites" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Links to Other Websites
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about third-party links and disclaimer]
                </p>
              </section>

              {/* Data Security */}
              <section id="data-security" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Data Security
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about security measures and limitations]
                </p>
              </section>

              {/* Data Retention */}
              <section id="data-retention" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Data Retention
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about how long data is retained]
                </p>
              </section>

              {/* Your Rights and Choices */}
              <section id="your-rights" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Your Rights and Choices
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about user rights regarding their data]
                </p>
              </section>

              {/* State-Specific Privacy Rights */}
              <section id="state-specific" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  State-Specific Privacy Rights
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about California, Virginia, and other state-specific rights]
                </p>
              </section>

              {/* Changes to Privacy Policy */}
              <section id="changes" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Changes to Our Privacy Policy
                </h2>
                <p className="text-muted-foreground mb-4">
                  [Insert text about how policy updates are communicated]
                </p>
              </section>

              {/* Contact Information */}
              <section id="contact" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-card border border-border rounded-lg p-6 mt-6">
                  <h3 className="font-semibold text-foreground mb-4">EndoMD Health LLC</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Phone: <a href="tel:571-480-6053" className="text-primary hover:underline">(571) 480-6053</a></p>
                    <p>Email: <a href="mailto:info@endomdhealth.com" className="text-primary hover:underline">info@endomdhealth.com</a></p>
                    <p>Website: <a href="https://www.endomdhealth.com" className="text-primary hover:underline">www.endomdhealth.com</a></p>
                  </div>
                </div>
              </section>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-lg p-8 text-center mt-12">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Questions About Our Privacy Practices?
                </h3>
                <p className="text-muted-foreground mb-6">
                  We're here to help. Contact us anytime with questions or concerns.
                </p>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" size="lg" asChild>
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
