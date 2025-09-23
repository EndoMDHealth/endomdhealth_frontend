import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const InsuranceSection = () => {
  const insuranceLogos = [
    { name: "Aetna", logo: "🛡️" },
    { name: "Blue Cross Blue Shield", logo: "🔵" },
    { name: "Cigna", logo: "🏥" },
    { name: "United Healthcare", logo: "🌟" },
    { name: "Medicaid", logo: "💚" },
    { name: "Tricare", logo: "🎖️" },
    { name: "Humana", logo: "❤️" },
    { name: "Kaiser Permanente", logo: "⚕️" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-warm-peach to-warm-lavender">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
              In-network with most insurance plans,
              <span className="block text-accent">Medicaid and Tricare</span>
            </h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto leading-relaxed">
              We work with your insurance to make quality pediatric endocrine care accessible to all families.
            </p>
          </div>

          {/* Insurance Logos Belt - More Visual */}
          <div className="relative overflow-hidden rounded-3xl bg-card/80 backdrop-blur-sm shadow-2xl p-8">
            <div className="flex items-center justify-center flex-wrap gap-8 lg:gap-12">
              {insuranceLogos.map((insurance, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center space-y-3 p-4 rounded-2xl bg-card/60 hover:bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer group min-w-[140px]"
                >
                  <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                    {insurance.logo}
                  </div>
                  <span className="text-sm font-semibold text-primary text-center leading-tight">
                    {insurance.name}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-accent/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-warm-coral/40 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 right-8 w-4 h-4 bg-warm-sage/30 rounded-full animate-pulse delay-700"></div>
          </div>

          <div className="space-y-4">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white font-bold px-10 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Check Your Coverage
            </Button>
            <p className="text-primary/60 text-sm">
              Out-of-network patients can select direct pay options
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceSection;