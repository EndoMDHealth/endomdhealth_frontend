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
import fallToddlerGirl from "@/assets/fall-toddler-girl.jpg";
import fallPreteenBoy from "@/assets/fall-preteen-boy.jpg";

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
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Pediatric Endocrine Concerns We Address
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A Better Life For Your Child Is A Click Away, Start The Journey Today!
            </p>
            
            {/* Request Appointment Button - Centered under title */}
            <div className="pt-4">
              <Button 
                className="bg-brand-sunshine-boost hover:bg-yellow-500 text-black font-bold text-lg px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Request an Appointment
              </Button>
            </div>
          </div>

          {/* Main Content - Adjusted Layout: Images 1/3, Content 2/3 */}
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Left Side - Images Diagonally Placed (2/5 columns) */}
            <div className="lg:col-span-2">
              <div className="relative max-w-md mx-auto">
                <div className="relative h-96">
                  {/* Top image - positioned diagonally, larger and no frame */}
                  <div className="absolute top-0 left-4 w-56 h-40 rounded-2xl overflow-hidden transform rotate-2 z-10 shadow-lg">
                    <img
                      src={fallToddlerGirl}
                      alt="Happy toddler girl enjoying fall season"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Bottom image - positioned diagonally below, larger and no frame */}
                  <div className="absolute bottom-0 right-4 w-56 h-40 rounded-2xl overflow-hidden transform -rotate-2 shadow-lg">
                    <img
                      src={fallPreteenBoy}
                      alt="Confident pre-teen boy in autumn setting"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Conditions List (3/5 columns) */}
            <div className="lg:col-span-3 space-y-6">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcernsSection;