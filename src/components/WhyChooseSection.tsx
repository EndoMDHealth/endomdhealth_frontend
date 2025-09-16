import { Card } from "@/components/ui/card";
import { 
  Clock, 
  Home, 
  MessageCircle, 
  Search, 
  HeartHandshake, 
  UserCheck 
} from "lucide-react";

const WhyChooseSection = () => {
  const reasons = [
    {
      title: "Fast Appointments",
      subtitle: "Care when you need it, not months later.",
      description: "Skip the typical 6+ month wait time. Our streamlined scheduling gets your child seen quickly so care begins without delay.",
      icon: Clock,
    },
    {
      title: "Skip the Waiting Room",
      subtitle: "Specialist care from the comfort of home.",
      description: "Save time and avoid unnecessary stress. With telemedicine, your child receives expert care without long commutes or waiting rooms.",
      icon: Home,
    },
    {
      title: "Direct Communication",
      subtitle: "Easy access, clear answers.",
      description: "No more waiting days for responses. Our team is available for timely communication so you get answers when you need them most.",
      icon: MessageCircle,
    },
    {
      title: "Root Cause Treatment",
      subtitle: "Addressing the \"why,\" not just the \"what.\"",
      description: "We focus on identifying and treating the underlying causes of your child's condition, not just the symptoms. This creates long-term health solutions.",
      icon: Search,
    },
    {
      title: "Comprehensive Coaching",
      subtitle: "Medical care plus real-life support.",
      description: "Weekly nutrition and wellness coaching gives families tools to build healthy habits, supporting both physical and emotional health.",
      icon: HeartHandshake,
    },
    {
      title: "Meaningful Care",
      subtitle: "Your child is more than a chart.",
      description: "We take the time to listen, explain, and partner with your pediatrician. Our goal is for every family to feel heard, supported, and cared for.",
      icon: UserCheck,
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Why choose EndoMD Health
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're reimagining pediatric endocrine care with a focus on accessibility, 
              personalized treatment, and comprehensive family support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <Card key={index} className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors">
                      <reason.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary">
                        {reason.title}
                      </h3>
                      <p className="text-sm font-medium text-accent">
                        {reason.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {reason.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;