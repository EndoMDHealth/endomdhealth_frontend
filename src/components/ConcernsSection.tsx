import { Heart, Droplets, TrendingUp, Users, Pill, Activity } from "lucide-react";

const ConcernsSection = () => {
  const concerns = [
    {
      title: "Weight Management",
      description: "Expert guidance to help your child safely achieve a healthy weight.",
      icon: Heart,
    },
    {
      title: "Type 2 Diabetes",
      description: "Specialized care to manage Type 2 diabetes in children.",
      icon: Droplets,
    },
    {
      title: "Growth Concerns",
      description: "Comprehensive support to promote healthy growth with professional evaluation.",
      icon: TrendingUp,
    },
    {
      title: "Puberty Concerns",
      description: "Personalized care to manage early or late puberty effectively.",
      icon: Users,
    },
    {
      title: "Thyroid Issues",
      description: "Targeted treatment for thyroid symptoms like tiredness and sleepiness.",
      icon: Pill,
    },
    {
      title: "Hormone Imbalance",
      description: "Advanced hormone management to improve concentration and overall health.",
      icon: Activity,
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Conditions We Treat
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A Better Life For Your Child Is A Click Away, Start The Journey Today!
            </p>
          </div>

          {/* Flowing Grid Layout - matches "What Teens Can Expect" */}
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {concerns.map((concern, index) => {
              const Icon = concern.icon;
              const isLeft = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className={`flex items-start gap-5 group ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}
                >
                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    {/* Decorative dot */}
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-accent/40" />
                  </div>
                  
                  {/* Content */}
                  <div className="pt-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                      {concern.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {concern.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtle decorative divider */}
          <div className="flex items-center justify-center mt-16 gap-3">
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
