import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stethoscope, Users, GraduationCap, Building2, Heart, UserCheck, Baby } from "lucide-react";

const PartnerCTASection = () => {
  const partnerButtons = [
    {
      title: "Partner as a Clinician",
      href: "/who-we-serve/healthcare-professionals",
      icon: Stethoscope,
      description: "Collaborate with us to improve patient outcomes",
    },
    {
      title: "Join us as a Community Partner",
      href: "/for-community-partners",
      icon: Users,
      description: "Join our network of community support",
    },
    {
      title: "Resources for Schools",
      href: "/who-we-serve/schools",
      icon: GraduationCap,
      description: "Educational resources and support programs",
    },
    {
      title: "Partner as a Hospital",
      href: "/who-we-serve/hospitals",
      icon: Building2,
      description: "Institutional partnerships for better care",
    },
    {
      title: "Resources for Health Plans",
      href: "/who-we-serve/health-plans",
      icon: Heart,
      description: "Improve specialty care access for members",
    },
  ];

  const quickLinks = [
    {
      title: "Support for Patients",
      href: "/who-we-serve/patients",
      icon: Baby,
      description: "Resources and guidance for young patients",
    },
    {
      title: "Guidance for Parents",
      href: "/who-we-serve/parents",
      icon: UserCheck,
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
