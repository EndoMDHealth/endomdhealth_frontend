import { Button } from "@/components/ui/button";
import { MapPin, Users } from "lucide-react";
import heroDarkerFamily from "@/assets/hero-darker-family.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroDarkerFamily})`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                A Comprehensive Platform For{" "}
                <span className="text-brand-sunshine-boost">Pediatric Endocrinology</span>{" "}
                Services.
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed">
                Specialized Pediatric endocrine care - Guiding your child in every stage of growth
              </p>
              
              <p className="text-lg text-white/80 max-w-2xl">
                More than a diagnosis. Your trusted partners in nurturing a healthy confident child
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-brand-sunshine-boost hover:bg-brand-sunshine-boost/90 text-brand-starry-hug font-bold px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105"
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-brand-starry-hug font-bold px-8 py-4 text-lg rounded-lg transition-all duration-300 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Info Cards */}
          <div className="flex flex-col sm:flex-row gap-6 mt-12 lg:mt-16">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="p-2 bg-white/20 rounded-full">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/70 font-medium">Serving</p>
                <p className="text-lg font-bold text-white">Virginia & Maryland</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="p-2 bg-white/20 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/70 font-medium">Age range</p>
                <p className="text-lg font-bold text-white">5 - 25 years</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;