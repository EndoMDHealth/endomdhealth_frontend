import { Clock, Heart, TrendingUp, MapPin } from "lucide-react";
import { GrowthChartDoodle, ShoeDoodle, StarDoodle } from "./DoodleElements";

const StatsSection = () => {
  const stats = [
    {
      value: "<14",
      unit: "Days",
      label: "Average wait time for a new patient appointment",
      sublabel: "(vs. national average of 6-9 months)",
      icon: Clock,
      accent: "text-primary",
    },
    {
      value: "98%",
      label: "Families who say they would recommend EndoMD Health to others",
      icon: Heart,
      accent: "text-accent",
    },
    {
      value: "87%",
      label: "Patients with diabetes who improved their A1C within 6 months of care",
      icon: TrendingUp,
      accent: "text-primary",
    },
    {
      value: "2,500+",
      label: "Families across Virginia and Maryland receiving expert pediatric endocrine care",
      icon: MapPin,
      accent: "text-accent",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-soft-yellow via-white to-sky-blue relative overflow-hidden">
      {/* Playful background doodles */}
      <div className="absolute inset-0 pointer-events-none">
        <GrowthChartDoodle className="absolute top-10 left-10 w-24 h-24 text-playful-mint opacity-15" />
        <ShoeDoodle className="absolute bottom-16 right-16 w-20 h-20 text-playful-coral opacity-15" />
        <StarDoodle className="absolute top-1/2 right-1/4 w-16 h-16 text-accent opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="relative">
              <div className="text-center space-y-4 px-4 py-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`${stat.accent} mx-auto w-fit bg-gradient-to-br from-white/50 to-transparent p-4 rounded-2xl`}>
                  <stat.icon className="h-10 w-10 md:h-12 md:w-12" strokeWidth={1.5} />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-4xl md:text-5xl font-bold font-playful ${stat.accent}`}>
                      {stat.value}
                    </span>
                    {stat.unit && (
                      <span className={`text-xl md:text-2xl font-semibold font-playful ${stat.accent}`}>
                        {stat.unit}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm md:text-base text-foreground leading-relaxed px-2 font-medium">
                    {stat.label}
                  </p>
                  
                  {stat.sublabel && (
                    <p className="text-xs md:text-sm text-muted-foreground italic">
                      {stat.sublabel}
                    </p>
                  )}
                </div>
              </div>
              
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-32 w-px bg-border/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
