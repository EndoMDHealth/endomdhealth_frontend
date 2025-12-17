import { CheckCircle } from "lucide-react";
import happyChild1 from "@/assets/happy-child-1.jpg";
import happyChild2 from "@/assets/happy-child-2.jpg";

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
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={happyChild1}
                alt="Happy smiling child representing pediatric care"
                className="w-full sm:w-64 h-72 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg sm:mt-8">
              <img
                src={happyChild2}
                alt="Joyful child representing healthy growth"
                className="w-full sm:w-64 h-72 object-cover"
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
