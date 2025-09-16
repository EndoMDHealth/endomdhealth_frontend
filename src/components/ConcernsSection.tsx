import { Card } from "@/components/ui/card";
import { 
  Scale, 
  Activity, 
  TrendingUp, 
  Clock, 
  Zap, 
  Target 
} from "lucide-react";

const ConcernsSection = () => {
  const concerns = [
    {
      title: "Healthy weight consultation",
      description: "Expert guidance to help your child safely achieve a healthy weight.",
      icon: Scale,
    },
    {
      title: "Reverse type 2 diabetes",
      description: "Specialized care to manage and potentially reverse type 2 diabetes in children.",
      icon: Activity,
    },
    {
      title: "Growth concerns",
      description: "Comprehensive support to promote healthy growth with professional evaluation.",
      icon: TrendingUp,
    },
    {
      title: "Address puberty concerns",
      description: "Personalized care to manage early or late puberty effectively.",
      icon: Clock,
    },
    {
      title: "Manage thyroid issues",
      description: "Targeted treatment for thyroid symptoms like tiredness, sleepiness and lack of concentration.",
      icon: Zap,
    },
    {
      title: "Balance hormones",
      description: "Advanced hormone management to improve concentration and overall well-being.",
      icon: Target,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Pediatric endocrine concerns we address
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our specialized team provides comprehensive care for a wide range of pediatric endocrine conditions, 
              ensuring your child receives the expert attention they deserve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {concerns.map((concern, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                      <concern.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary">
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