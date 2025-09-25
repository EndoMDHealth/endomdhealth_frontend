import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Search, 
  TrendingUp, 
  HeartHandshake, 
  Calendar,
  MapPin,
  Home,
  Stethoscope 
} from "lucide-react";
import doctorConsultation from "@/assets/doctor-consultation.jpg";

const WhyChooseSection = () => {
  const leftFeatures = [
    {
      title: "Direct Communication",
      description: "Enjoy easy access to your specialist with prompt responses, without waiting days.",
      icon: MessageCircle,
      iconBg: "bg-brand-sunshine-boost",
    },
    {
      title: "Root Cause Treatment",
      description: "Address the underlying causes of your child's endocrine issues for effective, long-term solutions.",
      icon: Search,
      iconBg: "bg-brand-healing-leaf",
    },
    {
      title: "Comprehensive Coaching",
      description: "Benefit from weekly nutrition and exercise coaching to support your child's optimal mental and physical health.",
      icon: TrendingUp,
      iconBg: "bg-brand-steady-sky",
    },
    {
      title: "Outstanding Care",
      description: "We don't rush to get you out the door. We give your child the time and care needed to make a meaningful difference.",
      icon: HeartHandshake,
      iconBg: "bg-orange-500",
    },
  ];

  const rightFeatures = [
    {
      title: "Fast Appointments",
      description: "Avoid the typical 3-6 month wait to see a specialist with quick, easy scheduling.",
      icon: Calendar,
      iconBg: "bg-purple-500",
    },
    {
      title: "Convenient Access",
      description: "No need to take a day off school or work or drive 2-3 hours to see a specialist.",
      icon: MapPin,
      iconBg: "bg-blue-500",
    },
    {
      title: "Skip the Waiting Room",
      description: "Save time by eliminating lengthy clinic waiting times with virtual consultations.",
      icon: Home,
      iconBg: "bg-purple-500",
    },
    {
      title: "Ongoing Expert Care",
      description: "Receive expert medical care for managing weight, growth, and hormone-related concerns continuously.",
      icon: Stethoscope,
      iconBg: "bg-brand-healing-leaf",
    },
  ];

  return (
    <section className="py-20 bg-warm-peach">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Why Choose <span className="text-brand-sunshine-boost">EndoMD</span> Health?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We want to see your child thrive and deliver outstanding convenient care to achieve this result.
            </p>
          </div>

          {/* Main Layout - Features around central image */}
          <div className="relative max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              
              {/* Left Features */}
              <div className="space-y-6">
                {leftFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`${feature.iconBg} p-3 rounded-full flex-shrink-0`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-primary">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Center Image */}
              <div className="flex justify-center">
                <div className="relative">
                  {/* Yellow border circle */}
                  <div className="w-80 h-80 rounded-full border-4 border-brand-sunshine-boost p-4">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={doctorConsultation}
                        alt="Doctor consultation with child patient"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Features */}
              <div className="space-y-6">
                {rightFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`${feature.iconBg} p-3 rounded-full flex-shrink-0`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-primary">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;