import { CheckCircle } from "lucide-react";

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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Conditions We Treat
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A Better Life For Your Child Is A Click Away, Start The Journey Today!
            </p>
          </div>

          {/* Free-flowing list with check marks */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {concerns.map((concern, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-3"
              >
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {concern.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {concern.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Subtle decorative divider */}
          <div className="flex items-center justify-center mt-12 gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/30" />
            <div className="w-2 h-2 rounded-full bg-accent/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcernsSection;
