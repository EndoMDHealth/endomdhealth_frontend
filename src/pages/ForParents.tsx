import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Stethoscope, ClipboardList, TestTube, Heart, CalendarCheck, Star } from "lucide-react";
import parentChildHome from "@/assets/parent-child-home.jpg";

const ForParents = () => {
  useEffect(() => {
    document.title = "For Parents | EndoMD Health";
  }, []);

  const whatWeTreatItems = [
    "Growth (too slow or too fast)",
    "Puberty (early or delayed)",
    "Thyroid health",
    "Blood sugar and insulin",
    "Adrenal and hormone balance",
    "Metabolism and weight",
  ];

  const visitExpectations = [
    "A review of medical history",
    "Height, weight, and growth measurements",
    "Clear questions about symptoms and concerns",
    "Discussion about next steps",
    "Time to ask all your questions",
  ];

  const commonTests = [
    "Thyroid tests",
    "Blood sugar and insulin levels",
    "Vitamin D and bone health labs",
    "Puberty and hormone levels",
    "Growth hormone stimulation testing (only if needed)",
    "Bone age X-ray",
    "Thyroid ultrasound (if needed)",
  ];

  const prepareItems = [
    "Past medical records, growth charts, recent labs",
    "A list of symptoms",
    "Current medications",
    "Family history of hormonal or thyroid conditions",
    "Questions you want answered",
  ];

  const whyChooseUs = [
    { icon: CalendarCheck, text: "Fast access to specialists—no waiting months" },
    { icon: Star, text: "Convenient virtual and in-person care" },
    { icon: Stethoscope, text: "Experienced pediatric endocrine team" },
    { icon: ClipboardList, text: "Clear explanations and family-centered support" },
    { icon: Heart, text: "A holistic approach that includes nutrition, lifestyle, and emotional well-being" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="w-full h-[400px] md:h-[500px] overflow-hidden">
            <img
              src={parentChildHome}
              alt="Parent and child together at home, smiling and relaxed"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground max-w-4xl leading-tight mb-4">
                Supporting Your Child's Health Every Step of the Way
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl">
                Understand what pediatric endocrine care looks like — and what to expect throughout your child's
                journey.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                When your child has symptoms related to growth, puberty, weight, or hormones, it can feel overwhelming.
                Pediatric endocrinologists are doctors who specialize in these conditions—and we're here to guide you,
                explain every step, and make the process less stressful for you and your child.
              </p>
            </div>
          </div>
        </section>

        {/* What Does a Pediatric Endocrinologist Do */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-accent-foreground" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  What Does a Pediatric Endocrinologist Do?
                </h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                A pediatric endocrinologist helps children with conditions that affect:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {whatWeTreatItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-background/80 rounded-lg p-4">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-lg text-muted-foreground mt-6">
                Their job is to understand <em>why</em> these issues are happening and how to best support your child's
                long-term health.
              </p>
            </div>
          </div>
        </section>

        {/* What to Expect at Your Child's Visit */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">What to Expect at Your Child's Visit</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Your child's first visit is focused on understanding their full health picture. You can expect:
              </p>
              <Card className="border-0 shadow-lg bg-accent/5 p-6 md:p-8">
                <ul className="space-y-4">
                  {visitExpectations.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <span className="text-accent-foreground font-bold text-sm">{index + 1}</span>
                      </div>
                      <span className="text-foreground text-lg pt-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <p className="text-lg text-muted-foreground mt-6">
                If needed, the clinician may order tests to better understand what's going on.
              </p>
            </div>
          </div>
        </section>

        {/* Common Tests */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <TestTube className="w-6 h-6 text-accent-foreground" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Common Tests in Pediatric Endocrinology
                </h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                These tests help doctors understand how your child's hormones and metabolism are working:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {commonTests.map((test, index) => (
                  <div key={index} className="flex items-start gap-3 bg-background/80 rounded-lg p-4">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{test}</span>
                  </div>
                ))}
              </div>
              <p className="text-lg text-muted-foreground mt-6">
                Your clinician will explain why each test is recommended.
              </p>
            </div>
          </div>
        </section>

        {/* Common Conditions We Treat */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Common Conditions We Treat</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">We help children and teens up to age 25 with:</p>
              <div className="grid md:grid-cols-2 gap-4">
                {conditionsTreated.map((condition, index) => (
                  <div key={index} className="flex items-start gap-3 bg-accent/5 rounded-lg p-4">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{condition}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How to Prepare */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <CalendarCheck className="w-6 h-6 text-accent-foreground" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">How to Prepare for Your Appointment</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">To make the visit smoother, make sure to provide:</p>
              <Card className="border-0 shadow-lg bg-background p-6 md:p-8">
                <ul className="space-y-4">
                  {prepareItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-foreground text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <p className="text-lg text-muted-foreground mt-6 italic">
                And if your child is nervous, you can reassure them that most visits are simple and do not involve
                procedures.
              </p>
            </div>
          </div>
        </section>

        {/* Why Families Choose EndoMD Health */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Why Families Choose EndoMD Health
              </h2>
              <div className="grid gap-4">
                {whyChooseUs.map((item, index) => (
                  <Card key={index} className="border-0 shadow-md bg-accent/5 p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <span className="text-foreground text-lg font-medium">{item.text}</span>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* We're Here for You CTA */}
        <section className="py-12 md:py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              We're Here for You
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Have concerns about your child's growth or hormones? We're here to help you get answers quickly.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-4 text-lg"
            >
              <a href="/contact-us">Request an Appointment</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ForParents;
