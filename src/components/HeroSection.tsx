import { Button } from "@/components/ui/button";
import { MapPin, Users } from "lucide-react";
import heroClinicalFamily from "@/assets/hero-clinical-family.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroClinicalFamily})`,
        }}
      >
        {/* Light overlay for clinical feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Specialized{" "}
                <span className="text-primary">Pediatric Endocrine </span>{" "}
                Care Services
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Guiding your child through every stage of growth
              </p>
              
              <p className="text-lg text-muted-foreground max-w-2xl">
                More than a diagnosis. Your trusted partners in nurturing a healthy, confident child
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-md"
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Info Cards */}
          <div className="flex flex-col sm:flex-row gap-6 mt-12 lg:mt-16">
            <div className="flex items-center space-x-3 bg-card border border-border rounded-lg px-6 py-4 shadow-sm">
              <div className="p-2 bg-accent/10 rounded-full">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Serving</p>
                <p className="text-lg font-bold text-foreground">Virginia & Maryland</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-card border border-border rounded-lg px-6 py-4 shadow-sm">
              <div className="p-2 bg-accent/10 rounded-full">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Age range</p>
                <p className="text-lg font-bold text-foreground">Birth - 25 years</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;