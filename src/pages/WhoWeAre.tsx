import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Target, Users, Award, Clock, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import familyDoctorConsultation from "@/assets/family-doctor-consultation.jpg";
import realDoctorConsultation from "@/assets/real-doctor-consultation.jpg";

const WhoWeAre = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-starry-hug via-brand-steady-sky to-brand-starry-hug py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Who We Are
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  A dedicated team of pediatric endocrinology specialists committed to providing exceptional, 
                  personalized care for children and families across Virginia and Maryland.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-brand-sunshine-boost hover:bg-brand-sunshine-boost/90 text-brand-starry-hug font-bold"
                  >
                    Request Appointment
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-brand-starry-hug bg-transparent"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={familyDoctorConsultation} 
                  alt="Family consultation with pediatric endocrinologist" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Our Mission
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                To transform pediatric endocrine care by making specialized, compassionate treatment accessible 
                to every child who needs it. We believe every family deserves timely access to expert care 
                without the barriers of long wait times or geographical limitations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 text-center space-y-4 border-2 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-brand-sunshine-boost/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-brand-sunshine-boost" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Compassionate Care</h3>
                <p className="text-muted-foreground">
                  We treat every child with the kindness, respect, and attention they deserve, 
                  creating a supportive environment for healing and growth.
                </p>
              </Card>

              <Card className="p-8 text-center space-y-4 border-2 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-brand-healing-leaf/10 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-brand-healing-leaf" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Excellence</h3>
                <p className="text-muted-foreground">
                  Our commitment to staying at the forefront of pediatric endocrinology ensures 
                  your child receives the most advanced, evidence-based treatment available.
                </p>
              </Card>

              <Card className="p-8 text-center space-y-4 border-2 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-brand-steady-sky/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-brand-steady-sky" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Family Partnership</h3>
                <p className="text-muted-foreground">
                  We work closely with families as partners in care, ensuring you're informed, 
                  empowered, and supported every step of the way.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img 
                  src={realDoctorConsultation} 
                  alt="Doctor consultation with patient" 
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  What Makes Us Different
                </h2>
                <p className="text-lg text-muted-foreground">
                  We've reimagined pediatric endocrine care to eliminate the frustrations families 
                  face with traditional healthcare systems.
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-brand-sunshine-boost/10 rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-brand-sunshine-boost" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">No More Waiting</h3>
                      <p className="text-muted-foreground">
                        Average 14-day wait for new appointments vs. the 6-9 month national average. 
                        Your child's health can't wait, and neither should you.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-brand-healing-leaf/10 rounded-lg flex items-center justify-center">
                        <Shield className="h-6 w-6 text-brand-healing-leaf" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Comprehensive Approach</h3>
                      <p className="text-muted-foreground">
                        Beyond just medication - we address medical, nutritional, lifestyle, and 
                        emotional aspects of your child's health for lasting results.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-brand-steady-sky/10 rounded-lg flex items-center justify-center">
                        <Award className="h-6 w-6 text-brand-steady-sky" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Accessible Expertise</h3>
                      <p className="text-muted-foreground">
                        Board-certified specialists available through convenient telehealth visits 
                        and in-person care - no more long drives or taking days off work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every decision we make and every interaction we have
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-brand-sunshine-boost/10 to-brand-sunshine-boost/5 p-6 rounded-xl border border-brand-sunshine-boost/20">
                <h3 className="text-xl font-bold text-foreground mb-3">Integrity</h3>
                <p className="text-muted-foreground">
                  We operate with honesty, transparency, and ethical standards in all we do.
                </p>
              </div>

              <div className="bg-gradient-to-br from-brand-healing-leaf/10 to-brand-healing-leaf/5 p-6 rounded-xl border border-brand-healing-leaf/20">
                <h3 className="text-xl font-bold text-foreground mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We embrace new technologies and approaches to deliver better care experiences.
                </p>
              </div>

              <div className="bg-gradient-to-br from-brand-steady-sky/10 to-brand-steady-sky/5 p-6 rounded-xl border border-brand-steady-sky/20">
                <h3 className="text-xl font-bold text-foreground mb-3">Inclusivity</h3>
                <p className="text-muted-foreground">
                  We welcome and serve families of all backgrounds with respect and cultural sensitivity.
                </p>
              </div>

              <div className="bg-gradient-to-br from-brand-starry-hug/10 to-brand-starry-hug/5 p-6 rounded-xl border border-brand-starry-hug/20">
                <h3 className="text-xl font-bold text-foreground mb-3">Empowerment</h3>
                <p className="text-muted-foreground">
                  We educate and equip families to be active participants in their child's health journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-brand-starry-hug to-brand-steady-sky">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Ready to Experience the EndoMD Difference?
              </h2>
              <p className="text-xl text-white/90">
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
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-starry-hug bg-transparent"
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
