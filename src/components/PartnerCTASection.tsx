import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Stethoscope, 
  Users, 
  GraduationCap, 
  Building2, 
  Heart,
  UserCheck,
  Baby
} from "lucide-react";

const PartnerCTASection = () => {
  const partnerButtons = [
    {
      title: "Partner as a Clinician",
      href: "/who-we-serve/healthcare-professionals",
      icon: Stethoscope,
      description: "Collaborate with us to improve patient outcomes"
    },
    {
      title: "Work With Us, as a Community Partner",
      href: "/who-we-serve/community-partners",
      icon: Users,
      description: "Join our network of community support"
    },
    {
      title: "Resources for Schools",
      href: "/who-we-serve/schools",
      icon: GraduationCap,
      description: "Educational resources and support programs"
    },
    {
      title: "Partner as a Hospital",
      href: "/who-we-serve/hospitals",
      icon: Building2,
      description: "Institutional partnerships for better care"
    },
    {
      title: "Resources for Health Plans",
      href: "/who-we-serve/health-plans",
      icon: Heart,
      description: "Improve specialty care access for members"
    }
  ];

  const quickLinks = [
    {
      title: "Support for Patients",
      href: "/who-we-serve/patients",
      icon: Baby,
      description: "Resources and guidance for young patients"
    },
    {
      title: "Guidance for Parents",
      href: "/who-we-serve/parents",
      icon: UserCheck,
      description: "Support and information for families"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-accent/10 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Join us in improving specialty outcomes for more children with endocrine disorders.
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Together, we can ensure every child receives the specialized care they need to thrive and grow.
            </p>
          </div>

          {/* Partner Buttons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerButtons.map((partner) => (
              <Card key={partner.href} className="p-6 hover:shadow-lg transition-shadow group cursor-pointer">
                <a href={partner.href} className="block space-y-4">
                  <div className="flex justify-center">
                    <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                      <partner.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">
                      {partner.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </a>
              </Card>
            ))}
          </div>

          {/* Quick Links Row */}
          <div className="pt-8 border-t border-border">
            <h3 className="text-xl font-semibold text-primary mb-6">
              Additional Resources
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {quickLinks.map((link) => (
                <Card key={link.href} className="p-4 hover:shadow-md transition-shadow group cursor-pointer">
                  <a href={link.href} className="flex items-center space-x-4">
                    <div className="p-2 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors">
                      <link.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-primary group-hover:text-primary/80 transition-colors">
                        {link.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerCTASection;