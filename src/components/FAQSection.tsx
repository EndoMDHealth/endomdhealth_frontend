import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What types of conditions does ENDOMD Health treat?",
      answer:
        "We care for a wide range of pediatric endocrine conditions, including weight management, GLP-1 medications, growth disorders, thyroid disease, diabetes (Type 1 & Type 2), puberty concerns, adrenal disorders, pituitary disorders, and metabolic issues.",
    },
    {
      question: "What types of appointments do you offer?",
      answer:
        "We offer in-person and virtual appointments. Our secure telemedicine platform allows your child to meet with a board-certified pediatric endocrinologist from home. Families receive the same expert guidance and personalized care as an in-person visit—without the travel or waiting room time.",
    },
    {
      question: "How soon can I meet with a pediatric endocrinologist?",
      answer:
        "Unlike most practices with wait times of 6–12 months, ENDOMD Health offers appointments within weeks. We prioritize timely access so your child gets the care they need as quickly as possible.",
    },
    {
      question: "I am on Medicaid. Can I book a visit for my child?",
      answer:
        "Yes. We accept many Medicaid plans and work to provide access to all families. Please check our coverage page or call us for details.",
    },
  ];

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Get answers to common questions about our pediatric endocrinology services.
            </p>
          </div>

          <Card className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-foreground/80">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">Still curious? We have more answers for you.</p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Visit the full FAQ here
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
