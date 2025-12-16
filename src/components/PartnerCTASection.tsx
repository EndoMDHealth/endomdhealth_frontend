import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stethoscope, Users, GraduationCap, Heart, UserCheck, Baby } from "lucide-react";

const PartnerCTASection = () => {
  const partnerButtons = [
    {
      title: "For Clinicians or Hospitals",
      href: "/who-we-serve/healthcare-professionals",
      description: "Collaborate with us to improve patient outcomes",
    },
    {
      title: "For Community Partners",
      href: "/for-community-partners",
      description: "Join our network of community support",
    },
    {
      title: "For Schools",
      href: "/for-schools",
      description: "Educational resources and support programs",
    },
    {
      title: "For Health Plans",
      href: "/who-we-serve/health-plans",
      description: "Improve specialty care access for members",
    },
  ];

  const quickLinks = [
    {
      title: "Support for Patients",
      href: "/who-we-serve/patients",
      description: "Resources and guidance for young patients",
    },
    {
      title: "Guidance for Parents",
      href: "/who-we-serve/parents",
      description: "Support and information for families",
    },
  ];

  return (
    <section className="py-16 bg-softTeal">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Join us in improving specialty outcomes for more children with endocrine disorders.
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Together, we can ensure every child receives the specialized care they need to thrive and grow.
            </p>
          </div>

          {/* Partner Buttons Compact Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {partnerButtons.map((partner, index) => {
              return (
                <Card
                  key={partner.href}
                  className="bg-primary p-3 hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer border-0"
                >
                  <a href={partner.href} className="block space-y-2">
                    <div className="flex justify-center">
                      <partner.icon className="h-8 w-8 text-accent" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-base font-bold text-accent group-hover:text-accent/90 transition-colors leading-tight">
                        {partner.title}
                      </h3>
                    </div>
                  </a>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerCTASection;
