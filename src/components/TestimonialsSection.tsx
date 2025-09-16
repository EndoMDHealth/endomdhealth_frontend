import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Dr. Davallow really listens and explains everything clearly. We finally feel like someone understands our child's needs.",
      author: "Z.M.",
    },
    {
      quote: "The staff is kind and supportive. My daughter looks forward to her visits.",
      author: "L.R.",
    },
    {
      quote: "We trust EndoMD with our son's care completely.",
      author: "A.P.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              What Parents Are Saying
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from families who have experienced the difference of personalized, 
              compassionate pediatric endocrine care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="space-y-4">
                  <Quote className="h-8 w-8 text-accent/60" />
                  <blockquote className="text-lg text-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <footer className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <cite className="text-sm font-medium text-muted-foreground">
                      – {testimonial.author}
                    </cite>
                  </footer>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Read More Parent Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;