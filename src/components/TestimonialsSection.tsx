import { useState, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const testimonials = [
    {
      quote:
        "Worth the time and money.. very knowledgeable and non judgmental.. my daughter TIR increased during our time with the doctor…highly recommended",
      author: "Nora M.",
      rating: 5,
    },
    {
      quote:
        "I had an incredible experience with Dr. Ladan Davallow at EndoMD! Scheduling was easy, she was highly responsive, and she went above and beyond to work with my family and insurance to get necessary approvals. Throughout the process, she was professional, an incredible communicator, caring, and attentive. Overall, an exceptional healthcare experience—I highly recommend!",
      author: "Danielle C.",
      rating: 5,
    },
    {
      quote:
        "Dr Davallow is incredible. We are so thrilled to be working with EndoMed and having the personalized care. Could not recommend more!",
      author: "Grace B.",
      rating: 5,
    },
    {
      quote:
        "Dr. Davallow was friendly, informative, and patient while explaining what could be happening with my daughter. I definitely appreciated her bedside manner!",
      author: "Cindy D.",
      rating: 5,
    },
    {
      quote:
        "Really wonderful doctor: she takes her time to listen to your concern! Really happy to find her. Will def be recommending to other parents",
      author: "Zala K.",
      rating: 5,
    },
    {
      quote:
        "We had a great experience with Dr. Davallow! From the moment I reached out, communication was super easy as well as scheduling an initial appointment. Her demeanor is so pleasant and calming, you can really tell she's invested in your child and what they need.",
      author: "Lauren H.",
      rating: 5,
    },
    {
      quote:
        "We had a wonderful experience seeing Dr. Davallow. From the start, the process of scheduling and sending over records was seamless. We were amazed at how quickly we were able to get an appointment given how long the wait is to see a ped. endo. Overall, I felt very heard and well-supported. I highly recommend Dr. Davallow for any parent looking for expert, compassionate care in pediatric endocrinology!",
      author: "Han Na K.",
      rating: 5,
    },
    {
      quote:
        "Dr Davallow is an excellent pediatric endocrinologist. She is very thorough in making sure to get all necessary information to properly diagnose, is very knowledgeable, and has excellent bedside manner. We are so happy we found her for our daughter.",
      author: "Tiffany H.",
      rating: 5,
    },
    {
      quote:
        "We were so happy with our visit with Dr. Davallow! She was very understanding and compassionate. She spent extra time making sure all of our questions and concerns were discussed. The added bonus of a tele-visit worked exceptionally well for us and not having to wait months to obtain an appointment. I would definitely recommend her to anyone in need of an endocrinologist!",
      author: "S Roberts",
      rating: 5,
    },
    {
      quote:
        "After struggling for years to get proper diagnosis for my daughter, EndoMD Health provided answers and effective treatment. Highly recommend this practice!",
      author: "Meriem B.",
      rating: 5,
    },
  ];

  // Items per page based on screen size - we'll use 4 for desktop calculation
  const itemsPerPage = 4;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const currentTestimonials = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return testimonials.slice(start, start + itemsPerPage);
  }, [currentPage, testimonials]);

  const goToPrevious = useCallback(() => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  }, [totalPages]);

  const goToNext = useCallback(() => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  }, [totalPages]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-accent fill-accent" : "text-muted"}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-brand-healing-leaf-light-100">
      <div className="container mx-auto px-4">
        <div className="space-y-10">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">What Parents Are Saying</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We select our team members carefully to ensure your child receives outstanding care.
            </p>
            <a
              href="https://www.google.com/search?client=safari&hs=I7e9&sca_esv=72a505b08c54f090&channel=30&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E0KTyoDXkXuvK4efboWrFPcgmBldA_rZUTTVL8JydPV3Mbo9_M87Rs9EXnLShF-fsdvOvak3vOSJzoO1Y2Yr3IKD8NS7&q=EndoMD+Health+Reviews&sa=X&ved=2ahUKEwjl9aDhq8WRAxVdHjQIHbuXMWMQ0bkNegQIORAE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-3 rounded-md shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label="Read more parent reviews on Google"
            >
              Read More Reviews on Google
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>

          {/* Testimonials Grid */}
          <div className="relative">
            {/* Navigation Arrows - Desktop */}
            <div className="hidden md:flex absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg bg-background"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
            <div className="hidden md:flex absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg bg-background"
                aria-label="Next testimonials"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Testimonials Grid - Masonry-style vertical stacking */}
            <div 
              className="columns-1 sm:columns-2 lg:columns-4 gap-4 md:gap-5 space-y-4 md:space-y-5"
              role="region"
              aria-label="Testimonials"
            >
              {currentTestimonials.map((testimonial, index) => (
                <Card
                  key={`${currentPage}-${index}`}
                  className="p-3 bg-card shadow-md hover:shadow-lg transition-all duration-300 border border-border/50 break-inside-avoid"
                  role="article"
                  aria-label={`Testimonial from ${testimonial.author}`}
                >
                  <div className="space-y-2">
                    {/* Star Rating */}
                    <div className="flex space-x-0.5">{renderStars(testimonial.rating)}</div>

                    {/* Testimonial Quote */}
                    <blockquote className="text-sm text-muted-foreground leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author Info */}
                    <footer className="pt-1 border-t border-border/30">
                      <cite className="text-sm font-semibold text-primary not-italic">
                        {testimonial.author}
                      </cite>
                    </footer>
                  </div>
                </Card>
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Next testimonials"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial page navigation">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                    index === currentPage
                      ? "bg-accent w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  role="tab"
                  aria-selected={index === currentPage}
                  aria-label={`Go to page ${index + 1} of ${totalPages}`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {totalPages}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
