import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Shield, Star, Users, Calendar, Award } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import serviceAreaMap from "@/assets/service-area-map.jpg";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [patientCount, setPatientCount] = useState(0);
  const [experienceYears, setExperienceYears] = useState(0);
  const [satisfactionRate, setSatisfactionRate] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Animated counters
    const animateCounter = (setter: (value: number) => void, target: number, duration: number) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    const timeouts = [
      setTimeout(() => animateCounter(setPatientCount, 2500, 2000), 500),
      setTimeout(() => animateCounter(setExperienceYears, 15, 1500), 800),
      setTimeout(() => animateCounter(setSatisfactionRate, 98, 1800), 1100),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-primary to-medical-trust text-primary-foreground overflow-hidden min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Child with parent in pediatric consultation" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-medical-trust/80" />
        
        {/* Floating Animation Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-accent/30 rounded-full animate-bounce delay-100" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-accent/20 rounded-full animate-bounce delay-300" />
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-accent/40 rounded-full animate-bounce delay-500" />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <Star className="h-5 w-5 text-accent fill-accent" />
                <Star className="h-5 w-5 text-accent fill-accent" />
                <Star className="h-5 w-5 text-accent fill-accent" />
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="text-sm text-primary-foreground/80 ml-2">Trusted by 2,500+ families</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up">
                <span className="block">Specialized pediatric</span>
                <span className="block text-accent">endocrine care</span>
                <span className="block">– guiding your child through every stage of growth.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed animate-fade-in-up delay-200">
                Serving patients ages Birth–23 years in Maryland and Virginia.
              </p>
            </div>

            {/* Gamified Statistics */}
            <div className={`grid grid-cols-3 gap-4 p-6 bg-primary-foreground/10 rounded-2xl border border-primary-foreground/20 backdrop-blur-sm transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-accent">{patientCount.toLocaleString()}+</div>
                <div className="text-xs text-primary-foreground/80">Patients Helped</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-accent">{experienceYears}+</div>
                <div className="text-xs text-primary-foreground/80">Years Experience</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-accent">{satisfactionRate}%</div>
                <div className="text-xs text-primary-foreground/80">Satisfaction Rate</div>
              </div>
            </div>

            {/* Enhanced Value Props with Hover Effects */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-4 transition-all duration-300 hover:bg-primary-foreground/20 hover:scale-105 hover:shadow-lg cursor-pointer group">
                <div className="flex items-center space-x-2 text-primary-foreground">
                  <Clock className="h-5 w-5 text-accent transition-transform group-hover:rotate-12" />
                  <span className="font-semibold">Seen in ~1 week</span>
                </div>
                <div className="w-full bg-primary-foreground/20 rounded-full h-1 mt-2">
                  <div className="bg-accent h-1 rounded-full w-4/5 transition-all duration-500 group-hover:w-full"></div>
                </div>
              </Card>
              
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-4 transition-all duration-300 hover:bg-primary-foreground/20 hover:scale-105 hover:shadow-lg cursor-pointer group">
                <div className="flex items-center space-x-2 text-primary-foreground">
                  <MapPin className="h-5 w-5 text-accent transition-transform group-hover:bounce" />
                  <span className="font-semibold">Virtual & in-person</span>
                </div>
                <div className="w-full bg-primary-foreground/20 rounded-full h-1 mt-2">
                  <div className="bg-accent h-1 rounded-full w-5/6 transition-all duration-500 group-hover:w-full"></div>
                </div>
              </Card>
              
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-4 transition-all duration-300 hover:bg-primary-foreground/20 hover:scale-105 hover:shadow-lg cursor-pointer group">
                <div className="flex items-center space-x-2 text-primary-foreground">
                  <Shield className="h-5 w-5 text-accent transition-transform group-hover:scale-110" />
                  <span className="font-semibold">Insurance accepted</span>
                </div>
                <div className="w-full bg-primary-foreground/20 rounded-full h-1 mt-2">
                  <div className="bg-accent h-1 rounded-full w-full transition-all duration-500"></div>
                </div>
              </Card>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Request an Appointment
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/80 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 hover:scale-105 group"
              >
                <Users className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                Learn More About Us
              </Button>
            </div>
          </div>

          {/* Enhanced Service Area Map */}
          <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <Card className="bg-primary-foreground/95 p-8 text-primary transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold">Our Service Area</h3>
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <p className="text-muted-foreground">
                    Providing specialized pediatric endocrinology care across Maryland and Virginia
                  </p>
                </div>
                
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={serviceAreaMap} 
                    alt="Service area map showing Maryland and Virginia" 
                    className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-secondary/50 transition-all duration-300 hover:bg-secondary">
                    <h4 className="font-semibold text-primary flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-accent" />
                      Maryland
                    </h4>
                    <p className="text-muted-foreground">Comprehensive coverage</p>
                    <div className="w-full bg-muted rounded-full h-1 mt-2">
                      <div className="bg-accent h-1 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 transition-all duration-300 hover:bg-secondary">
                    <h4 className="font-semibold text-primary flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-accent" />
                      Virginia
                    </h4>
                    <p className="text-muted-foreground">Statewide service</p>
                    <div className="w-full bg-muted rounded-full h-1 mt-2">
                      <div className="bg-accent h-1 rounded-full w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Trust Indicators */}
            <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground p-4 rounded-full shadow-lg animate-bounce">
              <Shield className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;