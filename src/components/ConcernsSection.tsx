import { Card } from "@/components/ui/card";
import { 
  Scale, 
  Droplets, 
  TrendingUp, 
  Calendar, 
  Shield, 
  RotateCcw 
} from "lucide-react";

const ConcernsSection = () => {
  const concerns = [
    {
      title: "Healthy Weight Consultation",
      description: "Expert guidance to help your child safely achieve a healthy weight.",
      icon: Scale,
      color: "bg-brand-sunshine-boost",
    },
    {
      title: "Reverse Type 2 Diabetes",
      description: "Specialized care to manage and potentially reverse Type 2 diabetes in children.",
      icon: Droplets,
      color: "bg-brand-healing-leaf",
    },
    {
      title: "Growth Concerns",
      description: "Comprehensive support to promote healthy growth with professional evaluation.",
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      title: "Address Puberty Concerns",
      description: "Personalized care to manage early or late puberty effectively.",
      icon: Calendar,
      color: "bg-orange-500",
    },
    {
      title: "Manage Thyroid Issues",
      description: "Targeted treatment for thyroid symptoms like tiredness and sleepiness.",
      icon: Shield,
      color: "bg-pink-500",
    },
    {
      title: "Balance Hormones",
      description: "Advanced hormone management to improve concentration and overall health.",
      icon: RotateCcw,
      color: "bg-purple-500",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Pediatric Endocrine Concerns We Address
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A Better Life For Your Child Is A Click Away, Start The Journey Today!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {concerns.map((concern, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 ${concern.color} rounded-full group-hover:scale-110 transition-transform`}>
                      <concern.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-primary">
                      {concern.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {concern.description}
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

export default ConcernsSection;