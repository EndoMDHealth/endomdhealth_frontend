import { Button } from "@/components/ui/button";
import { MapPin, Users } from "lucide-react";
import heroDarkerFamily from "@/assets/hero-darker-family.jpg";
import { StarDoodle, HeartDoodle, RocketDoodle, SwirlDoodle, ArrowDoodle } from "./DoodleElements";

const HeroSection = () => {
  return (
    <section className="relative min-h-[650px] lg:min-h-[750px] flex items-center overflow-hidden bg-gradient-to-br from-sky-blue via-warm-white to-soft-yellow">
      {/* Playful doodle decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-20 animate-bounce">
          <StarDoodle className="w-12 h-12 text-accent opacity-40" />
        </div>
        <HeartDoodle className="absolute top-32 left-16 w-16 h-16 text-playful-coral opacity-30" />
        <RocketDoodle className="absolute bottom-32 right-32 w-20 h-20 text-primary opacity-25" />
        <SwirlDoodle className="absolute top-1/2 right-12 w-24 h-24 text-playful-mint opacity-20" />
        <ArrowDoodle className="absolute bottom-20 left-24 w-32 h-32 text-accent opacity-25" />
        <StarDoodle className="absolute top-1/3 left-1/4 w-8 h-8 text-playful-lavender opacity-35" />
        <HeartDoodle className="absolute bottom-1/4 right-1/3 w-10 h-10 text-accent opacity-30" />
      </div>

      {/* Split screen layout */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary">
                Helping Kids{" "}
                <span className="text-accent font-playful">Grow & Thrive</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-foreground font-playful max-w-2xl leading-relaxed">
                Specialized pediatric endocrine care for every stage
              </p>
              
              <p className="text-lg text-muted-foreground max-w-2xl">
                More than a diagnosis—your trusted partners in nurturing a healthy, confident child
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-primary font-bold px-8 py-6 text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started Today
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-6 text-lg rounded-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
              >
                Learn More
              </Button>
            </div>

            {/* Info Cards */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-md">
                <div className="p-2 bg-accent/20 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Serving</p>
                  <p className="text-lg font-bold text-primary">Virginia & Maryland</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-md">
                <div className="p-2 bg-playful-coral/20 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Age range</p>
                  <p className="text-lg font-bold text-primary">Birth - 25 years</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image with doodles */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={heroDarkerFamily} 
                  alt="Happy family with children" 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Doodles around image */}
              <StarDoodle className="absolute -top-8 -right-8 w-16 h-16 text-accent opacity-60 animate-pulse" />
              <HeartDoodle className="absolute -bottom-6 -left-6 w-14 h-14 text-playful-coral opacity-70" />
              <RocketDoodle className="absolute top-1/3 -right-12 w-20 h-20 text-playful-mint opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;