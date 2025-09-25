import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Droplets, 
  TrendingUp, 
  Users, 
  Pill, 
  Activity 
} from "lucide-react";
import toddlerGirl from "@/assets/toddler-girl.jpg";
import preteenBoy from "@/assets/preteen-boy.jpg";

const ConcernsSection = () => {
  const concerns = [
    {
      title: "Healthy Weight Consultation",
      description: "Expert guidance to help your child safely achieve a healthy weight.",
      icon: Heart,
      iconBg: "bg-brand-sunshine-boost",
    },
    {
      title: "Reverse Type 2 Diabetes",
      description: "Specialized care to manage and potentially reverse Type 2 diabetes in children.",
      icon: Droplets,
      iconBg: "bg-brand-healing-leaf",
    },
    {
      title: "Growth Concerns",
      description: "Comprehensive support to promote healthy growth with professional evaluation.",
      icon: TrendingUp,
      iconBg: "bg-brand-steady-sky",
    },
    {
      title: "Address Puberty Concerns",
      description: "Personalized care to manage early or late puberty effectively.",
      icon: Users,
      iconBg: "bg-orange-500",
    },
    {
      title: "Manage Thyroid Issues",
      description: "Targeted treatment for thyroid symptoms like tiredness and sleepiness.",
      icon: Pill,
      iconBg: "bg-pink-500",
    },
    {
      title: "Balance Hormones",
      description: "Advanced hormone management to improve concentration and overall health.",
      icon: Activity,
      iconBg: "bg-brand-starry-hug",
    },
  ];

  return (
    <section className="py-20 bg-warm-peach">
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
            {/* Left Side - Images Side by Side */}
            <div className="relative">
              <div className="relative max-w-lg mx-auto">
                {/* Background decorative shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-sunshine-boost to-yellow-300 rounded-[3rem] transform rotate-2"></div>
                
                {/* Image container with yellow border */}
                <div className="relative bg-white p-6 rounded-[3rem] border-4 border-brand-sunshine-boost shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Toddler girl image */}
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src={toddlerGirl}
                        alt="Happy toddler girl in healthcare setting"
                        className="w-full h-56 object-cover"
                      />
                    </div>
                    {/* Pre-teen boy image */}
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src={preteenBoy}
                        alt="Confident pre-teen boy in medical office"
                        className="w-full h-56 object-cover"
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
              <div className="pt-8 text-center">
                <Button 
                  className="bg-brand-sunshine-boost hover:bg-yellow-500 text-black font-bold text-lg px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
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