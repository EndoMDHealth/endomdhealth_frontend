import { CheckCircle } from "lucide-react";
import activeBoy from "@/assets/active-fall-preteen-boy.jpg";
import activeGirl from "@/assets/active-fall-toddler-girl.jpg";

const ConcernsSection = () => {
  const concerns = [
    {
      title: "Weight Management",
      description: "Expert guidance to help your child safely achieve a healthy weight.",
    },
    {
      title: "Type 2 Diabetes",
      description: "Specialized care to manage Type 2 diabetes in children.",
    },
    {
      title: "Growth Concerns",
      description: "Comprehensive support to promote healthy growth with professional evaluation.",
    },
    {
      title: "Puberty Concerns",
      description: "Personalized care to manage early or late puberty effectively.",
    },
    {
      title: "Thyroid Issues",
      description: "Targeted treatment for thyroid symptoms like tiredness and sleepiness.",
    },
    {
      title: "Hormone Imbalance",
      description: "Advanced hormone management to improve concentration and overall health.",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Conditions We Treat
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A Better Life For Your Child Is A Click Away, Start The Journey Today!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Images */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                src={activeBoy}
                alt="Young boy running outdoors in fall with autumn leaves"
                className="w-full sm:w-48 h-56 object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-md sm:mt-6">
              <img
                src={activeGirl}
                alt="Young girl playing outside in autumn with warm fall colors"
                className="w-full sm:w-48 h-56 object-cover"
              />
            </div>
          </div>

          {/* Right Side - Conditions List */}
          <div className="space-y-4">
            {concerns.map((concern, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-3 bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {concern.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {concern.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcernsSection;
