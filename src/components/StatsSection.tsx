import { Star } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      value: "2500+",
      label: "Families Helped",
    },
    {
      value: "200+",
      label: "Healthcare Partners",
    },
    {
      value: "5.0",
      label: "Star Rating",
      icon: <Star className="h-6 w-6 text-yellow-400 fill-current inline-block ml-1" />,
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 flex items-center justify-center">
                {stat.value}
                {stat.icon}
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
