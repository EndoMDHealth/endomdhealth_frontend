import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Shield, Star, Users, Calendar, Award } from "lucide-react";
import heroImage from "@/assets/hero-child-bubbles.jpg";
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
    <section className="relative bg-gradient-to-br from-warm-peach via-warm-coral/20 to-warm-sage/30 text-primary overflow-hidden min-h-screen flex items-center">
      {/* Cheerful Background Elements */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Happy child blowing bubbles in a sunny field" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-warm-peach/60 via-transparent to-warm-sage/40" />
        
        {/* Floating Bubble-like Elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-accent/20 rounded-full animate-bounce delay-100 blur-sm" />
        <div className="absolute top-40 right-20 w-12 h-12 bg-warm-coral/20 rounded-full animate-bounce delay-300 blur-sm" />
        <div className="absolute bottom-32 left-32 w-6 h-6 bg-warm-lavender/30 rounded-full animate-bounce delay-500 blur-sm" />
        <div className="absolute top-60 right-40 w-4 h-4 bg-accent/30 rounded-full animate-bounce delay-700 blur-sm" />
        <div className="absolute bottom-60 right-20 w-10 h-10 bg-warm-peach/30 rounded-full animate-bounce delay-900 blur-sm" />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content - Centered Layout */}
          <div className={`text-center space-y-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="space-y-6">
              <div className="flex justify-center items-center space-x-2 mb-6">
                <Star className="h-6 w-6 text-accent fill-accent" />
                <Star className="h-6 w-6 text-accent fill-accent" />
                <Star className="h-6 w-6 text-accent fill-accent" />
                <Star className="h-6 w-6 text-accent fill-accent" />
                <Star className="h-6 w-6 text-accent fill-accent" />
                <span className="text-lg text-primary/80 ml-3 font-medium">Trusted by 2,500+ families</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up text-primary">
                <span className="block mb-2">Simply expert,</span>
                <span className="block text-accent mb-2">compassionate</span>
                <span className="block">and accessible care</span>
                <span className="block text-2xl md:text-3xl lg:text-4xl font-normal text-primary/70 mt-4">
                  on your schedule
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-primary/80 leading-relaxed animate-fade-in-up delay-200 max-w-4xl mx-auto">
                Expert pediatric endocrine care with the convenience of both virtual and in-person visits. 
                No more waiting long months for answers.
              </p>
            </div>

            {/* Fluid Statistics Cards */}
            <div className={`flex justify-center gap-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-center group bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{patientCount.toLocaleString()}+</div>
                <div className="text-sm text-primary/70 font-medium">Families Served</div>
              </div>
              <div className="text-center group bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{experienceYears}+</div>
                <div className="text-sm text-primary/70 font-medium">Years Experience</div>
              </div>
              <div className="text-center group bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{satisfactionRate}%</div>
                <div className="text-sm text-primary/70 font-medium">Satisfaction Rate</div>
              </div>
            </div>

            {/* Fluid Value Props */}
            <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
              <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group flex-1 min-w-[280px]">
                <div className="flex items-center justify-center space-x-3 text-primary">
                  <Clock className="h-6 w-6 text-accent transition-transform group-hover:rotate-12" />
                  <span className="font-semibold text-lg">Fast Appointments</span>
                </div>
                <p className="text-sm text-primary/70 mt-2 text-center">Avoid the typical 3-6 month wait</p>
                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div className="bg-accent h-2 rounded-full w-4/5 transition-all duration-500 group-hover:w-full"></div>
                </div>
              </div>
              
              <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group flex-1 min-w-[280px]">
                <div className="flex items-center justify-center space-x-3 text-primary">
                  <MapPin className="h-6 w-6 text-accent transition-transform group-hover:bounce" />
                  <span className="font-semibold text-lg">Virtual & In-Person</span>
                </div>
                <p className="text-sm text-primary/70 mt-2 text-center">Care on your schedule</p>
                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div className="bg-accent h-2 rounded-full w-5/6 transition-all duration-500 group-hover:w-full"></div>
                </div>
              </div>
              
              <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group flex-1 min-w-[280px]">
                <div className="flex items-center justify-center space-x-3 text-primary">
                  <Shield className="h-6 w-6 text-accent transition-transform group-hover:scale-110" />
                  <span className="font-semibold text-lg">Insurance Accepted</span>
                </div>
                <p className="text-sm text-primary/70 mt-2 text-center">Most major plans covered</p>
                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div className="bg-accent h-2 rounded-full w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>

            {/* Warm CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white font-bold px-10 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative overflow-hidden min-w-[250px]"
              >
                <span className="relative z-10 flex items-center">
                  <Calendar className="mr-3 h-5 w-5" />
                  Request an Appointment Today
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-warm-coral transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 group px-10 py-4 text-lg rounded-2xl font-semibold min-w-[250px]"
              >
                <Users className="mr-3 h-5 w-5 transition-transform group-hover:rotate-12" />
                Learn More About Us
              </Button>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-primary/70 text-lg">
                <span className="font-semibold text-accent">Serving Maryland & Virginia</span> • 
                <span className="ml-2">Ages Birth–23 years</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;