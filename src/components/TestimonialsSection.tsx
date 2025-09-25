import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "An incredible journey that provided my daughter with clarity and peace. I highly recommend it to anyone seeking growth for their child.",
      author: "James Rodriguez",
      age: "28",
      rating: 5,
    },
    {
      quote: "The treatment was a transformative experience that deepened my child's health and gave me the strength to move forward.",
      author: "Michael Lee",
      age: "51", 
      rating: 5,
    },
    {
      quote: "The personalized care approach helped my son develop confidence and self-esteem in ways we never imagined possible.",
      author: "Sarah Johnson",
      age: "34",
      rating: 3,
    },
    {
      quote: "EndoMD provided me with the tools I needed to help my daughter overcome her challenges and find her inner strength.",
      author: "Maria Santos",
      age: "29",
      rating: 2,
    },
    {
      quote: "A wonderful experience filled with warmth and support. I left feeling rejuvenated and inspired about my child's future.",
      author: "Daniel Kim",
      age: "42",
      rating: 5,
    },
    {
      quote: "I gained valuable insights and met amazing people. These memories and improvements will stay in my child's life forever.",
      author: "Laura Perez", 
      age: "36",
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-stone-100">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              What Parents Are Saying
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We select our team members carefully to ensure your child receives outstanding care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-white hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  {/* Testimonial Quote */}
                  <blockquote className="text-sm text-muted-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {/* Author Info */}
                  <footer className="pt-2">
                    <cite className="text-sm font-semibold text-primary not-italic">
                      {testimonial.author}, {testimonial.age}
                    </cite>
                  </footer>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;