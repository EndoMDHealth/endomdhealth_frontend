import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Dr. Smith and her team were incredible with my daughter's endometriosis diagnosis. They explained everything clearly and made us feel comfortable throughout the entire process.",
      author: "Nora M",
      rating: 5,
    },
    {
      quote: "EndoMD Health saved my teenage daughter's life. After years of unexplained pain, they finally gave us answers and effective treatment. Cannot recommend them enough!",
      author: "Danielle Johnson Crowley",
      rating: 5,
    },
    {
      quote: "The compassionate care my daughter received here was outstanding. The staff took time to listen and provided comprehensive treatment that actually worked.",
      author: "Grace Mefford Boyles",
      rating: 5,
    },
    {
      quote: "As a mother dealing with my own endometriosis, finding EndoMD for my daughter was a blessing. They understand the condition and provide excellent family-centered care.",
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
      quote: "We had a wonderful experience seeing Dr. Davallow for my child's growth assessment. From the start, the process of scheduling and sending over records was seamless, and communication with the office was smooth and efficient. We were amazed at how quickly we were able to get an appointment—especially given how long the wait usually is to see a pediatric endocrinologist. The staff was warm and welcoming, and our visit was both thorough and informative. Dr. Davallow took the time to truly listen to all my concerns as a mother. She showed genuine empathy and was able to relate to my perspective, which I really appreciated. She offered thoughtful, evidence-based guidance and helped set realistic expectations regarding treatment. Overall, I felt very heard and well-supported. I highly recommend Dr. Davallow for any parent looking for expert, compassionate care in pediatric endocrinology!",
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
                       {testimonial.author}
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