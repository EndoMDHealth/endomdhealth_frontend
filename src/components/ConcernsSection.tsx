import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Scale, 
  Droplets, 
  TrendingUp, 
  Calendar, 
  Shield, 
  RotateCcw 
} from "lucide-react";
import happyChild1 from "@/assets/happy-child-1.jpg";
import happyChild2 from "@/assets/happy-child-2.jpg";

const ConcernsSection = () => {
  const concerns = [
    {
      title: "Healthy Weight Consultation",
      description: "Expert guidance to help your child safely achieve a healthy weight.",
      icon: Scale,
      iconBg: "bg-yellow-500",
    },
    {
      title: "Reverse Type 2 Diabetes",
      description: "Specialized care to manage and potentially reverse Type 2 diabetes in children.",
      icon: Droplets,
      iconBg: "bg-teal-500",
    },
    {
      title: "Growth Concerns",
      description: "Comprehensive support to promote healthy growth with professional evaluation.",
      icon: TrendingUp,
      iconBg: "bg-blue-500",
    },
    {
      title: "Address Puberty Concerns",
      description: "Personalized care to manage early or late puberty effectively.",
      icon: Calendar,
      iconBg: "bg-orange-500",
    },
    {
      title: "Manage Thyroid Issues",
      description: "Targeted treatment for thyroid symptoms like tiredness and sleepiness.",
      icon: Shield,
      iconBg: "bg-pink-500",
    },
    {
      title: "Balance Hormones",
      description: "Advanced hormone management to improve concentration and overall health.",
      icon: RotateCcw,
      iconBg: "bg-purple-500",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Pediatric Endocrine Concerns We Address
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A Better Life For Your Child Is A Click Away, Start The Journey Today!
            </p>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Images */}
            <div className="relative">
              <div className="relative max-w-md mx-auto">
                {/* Background decorative shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-[3rem] transform rotate-3"></div>
                
                {/* Image container with yellow border */}
                <div className="relative bg-white p-4 rounded-[3rem] border-4 border-yellow-400 shadow-lg">
                  <div className="grid grid-cols-1 gap-4">
                    {/* Top image */}
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src={happyChild1}
                        alt="Happy child receiving healthcare"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    {/* Bottom image */}
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src={happyChild2}
                        alt="Confident child in medical setting"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Conditions List */}
            <div className="space-y-6">
              {concerns.map((concern, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`${concern.iconBg} p-3 rounded-full flex-shrink-0`}>
                    <concern.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-primary">
                      {concern.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {concern.description}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Request Appointment Button */}
              <div className="pt-6">
                <Button 
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full"
                >
                  Request an Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcernsSection;