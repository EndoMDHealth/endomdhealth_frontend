import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      subtitle: "Care when you need it, not months later",
      description: "Avoid the typical 3-6 month wait to see a specialist with quick, easy scheduling.",
      icon: Clock,
    },
    {
      title: "Root Cause Treatment", 
      subtitle: "Addressing the \"why,\" not just the \"what\"",
      description: "Address the underlying causes of your child's endocrine issues for effective, long-term solutions.",
      icon: Search,
    },
    {
      title: "Ongoing Expert Care",
      subtitle: "Continuous support for lasting results",
      description: "Receive expert medical care for managing weight, growth, and hormone-related concerns continuously.",
      icon: UserCheck,
    },
    {
      title: "Direct Communication",
      subtitle: "Easy access, clear answers",
      description: "Enjoy easy access to your specialist with prompt responses, without waiting days.",
      icon: MessageCircle,
    },
    {
      title: "Skip the Waiting Room",
      subtitle: "Save time with virtual consultations",
      description: "Save time by eliminating lengthy clinic waiting times with virtual consultations.",
      icon: Home,
    },
    {
      title: "Outstanding Care",
      subtitle: "Your child deserves our best",
      description: "We don't rush to get you out the door. We give your child the time and care needed to make a meaningful difference.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-warm-sage/20 via-card to-warm-lavender/20">
      <div className="container mx-auto px-4">
        <div className="space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-primary leading-tight">
              Why choose 
              <span className="block text-accent">EndoMD Health?</span>
            </h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto leading-relaxed">
              We want to see your child thrive & deliver great convenient care to achieve this result.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {reasons.map((reason, index) => (
              <Card key={index} className="group bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 rounded-3xl overflow-hidden">
                <div className="p-8 h-full flex flex-col relative">
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-warm-coral/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 space-y-6 h-full flex flex-col">
                    <div className="flex items-center space-x-4">
                      <div className="p-4 bg-gradient-to-br from-accent/10 to-warm-coral/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <reason.icon className="h-8 w-8 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary mb-1">
                          {reason.title}
                        </h3>
                        <p className="text-sm font-medium text-accent">
                          {reason.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-primary/70 leading-relaxed flex-grow text-base">
                      {reason.description}
                    </p>
                    
                    {/* Progress bar for visual interest */}
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-accent to-warm-coral h-full rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-16">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white font-bold px-12 py-4 text-xl rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Experience the Difference
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;