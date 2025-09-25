import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Worth the time and money.. very knowledgeable and non judgmental.. my daughter TIR increased during our time with the doctor…highly recommended",
      author: "Nora M",
      rating: 5,
    },
    {
      quote: "I had an incredible experience with Dr. Ladan Davallow at EndoMD! Scheduling was easy, she was highly responsive, and she went above and beyond to work with my family and insurance to get necessary approvals. Throughout the process, she was professional, an incredible communicator, caring, and attentive. Overall, an exceptional healthcare experience—I highly recommend!",
      author: "Danielle Johnson Crowley",
      rating: 5,
    },
    {
      quote: "Dr Davallow is incredible. We are so thrilled to be working with EndoMed and having the personalized care. Could not recommend more!",
      author: "Grace Mefford Boyles",
      rating: 5,
    },
    {
      quote: "Dr. Davallow was friendly, informative, and patient while explaining what could be happening with my daughter. I definitely appreciated her bedside manner!",
      author: "Cindy Dodge",
      rating: 5,
    },
    {
      quote: "Really wonderful doctor: she takes her time to listen to your concern! Really happy to find her. Will def be recommending to other parents",
      author: "Zala Kuchai",
      rating: 5,
    },
    {
      quote: "We had a great experience with Dr. Davallow! From the moment I reached out, communication was super easy as well as scheduling an initial appointment. I really appreciate the fact that she holds virtual meetings. Her demeanor is so pleasant and calming, you can really tell she's invested in your child and what they need. Highly recommend if you're searching for an endocrinologist for your child!",
      author: "Lauren Harrison",
      rating: 5,
    },
    {
      quote: "We had a wonderful experience seeing Dr. Davallow for my child's growth assessment. From the start, the process of scheduling and sending over records was seamless, and communication with the office was smooth and efficient. We were amazed at how quickly we were able to get an appointment—especially given how long the wait usually is to see a pediatric endocrinologist. Overall, I felt very heard and well-supported. I highly recommend Dr. Davallow for any parent looking for expert, compassionate care in pediatric endocrinology!",
      author: "Han Na Kim",
      rating: 5,
    },
    {
      quote: "Dr Davallow is an excellent pediatric endocrinologist. She is very thorough in making sure to get all necessary information to properly diagnose, is very knowledgeable, and has excellent bedside manner. We are so happy we found her for our daughter.",
      author: "Tiffany Howell",
      rating: 5,
    },
    {
      quote: "We were so happy with our visit with Dr. Davallow! She was very understanding and compassionate. She spent extra time making sure all of our questions and concerns were discussed. The added bonus of a tele-visit worked exceptionally well for us and not having to wait months to obtain an appointment. I would definitely recommend her to anyone in need of an endocrinologist!",
      author: "S Roberts",
      rating: 5,
    },
    {
      quote: "After struggling for years to get proper diagnosis for my daughter, EndoMD Health provided answers and effective treatment. Highly recommend this practice!",
      author: "Meriem Bouziani",
      rating: 5,
    },
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

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
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .scroll-animation {
            animation: scroll 22.5s linear infinite;
          }
        `
      }} />
      
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

          <div className="relative overflow-hidden">
            <div className="flex space-x-6 scroll-animation">
              {duplicatedTestimonials.map((testimonial, index) => (
                <Card 
                  key={index} 
                  className="p-4 min-w-[320px] max-w-[320px] flex-shrink-0 hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: '#E8EBC4' }}
                >
                  <div className="space-y-3">
                    {/* Star Rating */}
                    <div className="flex space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    {/* Testimonial Quote */}
                    <blockquote className="text-sm text-muted-foreground leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    {/* Author Info */}
                    <footer className="pt-1">
                      <cite className="text-sm font-semibold text-primary not-italic">
                        {testimonial.author}
                      </cite>
                    </footer>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;