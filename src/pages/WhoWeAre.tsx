import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Target, Users, Award, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import childDoctorConsultation from "@/assets/child-doctor-consultation.jpg";
import drDavallow from "@/assets/dr-davallow-green.png";

const WhoWeAre = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-starry-hug leading-tight">
                  Who We Are
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  EndoMD Health is a technology-enabled platform delivering personalized pediatric endocrinology 
                  care through a hybrid virtual and in-person model. We address the critical shortage of pediatric 
                  endocrinologists  the US. We currently serve patients in Virginia and Maryland, but plan to 
                  expand nation-wide!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-brand-sunshine-boost hover:bg-brand-sunshine-boost/70 text-brand-starry-hug font-bold text-xl px-10 py-6"
                  >
                    Request Appointment
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-brand-starry-hug text-brand-starry-hug hover:bg-brand-starry-hug hover:text-white"
                  >
                    Contact Us
                  </Button>
                   <Button
                     size="lg" 
                    variant="outline"
                    className="border-2 border-brand-starry-hug text-brand-starry-hug hover:bg-brand-starry-hug hover:text-white"
                  >
                </div>
              </div>
              <div className="relative">
                <img 
                  src={childDoctorConsultation} 
                  alt="Child smiling with pediatric endocrinologist during consultation" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-brand-healing-leaf-light">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
              <div className="space-y-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our mission is simple: Helping kids with endocrine conditions thrive. We do that by 
                  delivering timely, specialized, and holistic care that supports the whole child—medically, 
                  emotionally, and socially.
                </p>
              </div>

              <div className="space-y-6">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-healing-leaf to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Transforming lives by making specialized endocrinology care accessible for everyone, 
                  starting with children.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Expert */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Meet Our Expert Pediatric Endocrinologist
              </h2>
            </div>

            <div className="max-w-5xl mx-auto">
              <Card className="p-8 lg:p-12 border-2 shadow-xl bg-card">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <div className="aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg">
                      <img 
                        src={drDavallow} 
                        alt="Dr. Ladan Davallow, Pediatric Endocrinologist" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Dr. Ladan Davallow</h3>
                    <p className="text-brand-healing-leaf font-semibold">Pediatric Endocrinologist</p>
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                        <Award className="h-6 w-6 text-brand-healing-leaf" />
                        Education and Training
                      </h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li><strong>Medical School:</strong> Cornell University</li>
                        <li><strong>Pediatric Residency:</strong> Dartmouth & University of Virginia</li>
                        <li><strong>Pediatric Endocrinology Fellowship:</strong> University of Virginia</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                        <Shield className="h-6 w-6 text-emerald-600" />
                        Board Certifications
                      </h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>American Board of Pediatrics</li>
                        <li>Pediatric Endocrinology (American Board of Pediatrics)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                        <Users className="h-6 w-6 text-teal-600" />
                        Professional Memberships
                      </h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>Pediatric Endocrine Society</li>
                        <li>The American Academy of Pediatrics</li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Dr. Davallow is an experienced and highly rated Ivy-league trained pediatric endocrinologist 
                        with over 10 years of experience treating kids. She is best known for her passionate and 
                        expert care for children with a variety of hormone/endocrine disorders such as weight, 
                        diabetes, growth, thyroid and puberty disorders.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Prior to her current role at EndoMD Health, Dr. Davallow has had several years experience 
                        at large pediatric academic centers where she has not only seen children with endocrine 
                        conditions, but served as faculty for the medical school. She has also published multiple 
                        research articles, particularly on growth in children. She has also been honored with 
                        numerous awards for her research, including placing first place for the annual UVA Pediatrics 
                        Research Competition for her research on ADHD and growth/short stature.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-healing-leaf-light">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Ready to Experience the ENDOMD Difference?
              </h2>
              <p className="text-xl text-muted-foreground">
                Join over 2,500 families who trust us with their child's endocrine health
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-brand-sunshine-boost hover:bg-brand-sunshine-boost/90 text-brand-starry-hug font-bold px-8"
                >
                  Request Appointment
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-brand-starry-hug text-brand-starry-hug hover:bg-brand-starry-hug hover:text-white"
                >
                  Learn More About Our Services
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhoWeAre;
