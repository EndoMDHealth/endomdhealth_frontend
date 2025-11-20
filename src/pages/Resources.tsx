import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, Heart, TrendingUp, Activity, Sparkles, ExternalLink } from "lucide-react";

const resourceCategories = [
  {
    id: "telehealth",
    icon: Video,
    title: "Telehealth",
    description: "Learn about virtual care and how to prepare for your child's telehealth visits",
    resources: [
      {
        title: "How to Prepare for a Telehealth Visit",
        description: "Advice on what you need, which tools to have handy and what to expect during your child's virtual exam and afterward.",
        link: "https://www.uhhospitals.org/blog/articles/2020/04/tips-for-a-great-telehealth-visit-with-your-child/",
        date: "Dec 22, 2023"
      },
      {
        title: "Who is a Pediatric Endocrinologist?",
        description: "Pediatric endocrinologists are physicians who have special training and expertise in the care of children and adolescents with hormone disorders.",
        link: "https://pedsendo.org/patient-resources/what-is-a-pediatric-endocrinologist/",
        date: "Dec 22, 2023"
      }
    ]
  },
  {
    id: "healthy-weight",
    icon: Heart,
    title: "Healthy Weight",
    description: "Resources to help your child maintain a healthy weight and develop lifelong healthy habits",
    resources: [
      {
        title: "Healthy Active Living for Families",
        description: "Start today: Help your child stay at a healthy weight for life.",
        link: "https://www.healthychildren.org/English/healthy-living/growing-healthy/Pages/default.aspx",
        date: "Dec 22, 2023"
      }
    ]
  },
  {
    id: "diabetes",
    icon: Activity,
    title: "Diabetes",
    description: "Information and guidance for managing Type 2 diabetes in children and adolescents",
    resources: [
      {
        title: "Type 2 Diabetes: Tips for Healthy Living",
        description: "American Academy of Pediatrics (AAP) discusses healthy living tips for children with type 2 diabetes.",
        link: "https://www.healthychildren.org/English/health-issues/conditions/chronic/Pages/Type-2-Diabetes-A-Manageable-Epidemic.aspx",
        date: "Dec 22, 2023"
      }
    ]
  },
  {
    id: "growth",
    icon: TrendingUp,
    title: "Growth",
    description: "Understanding growth patterns and how to monitor your child's development",
    resources: [
      {
        title: "How to Accurately Measure Your Child's Height at Home",
        description: "Be prepared for a virtual care visit by learning how to accurately measure your child's height and weight at home.",
        link: "https://www.aboutkidshealth.ca/healthaz/na/virtual-care-how-to-accurately-measure-your-childs-height-and-weight-at-home/",
        date: "Dec 22, 2023"
      },
      {
        title: "Growth Problems in Children",
        description: "An overview of the symptoms, causes and treatment of growth problems in children.",
        link: "https://www.aboutkidshealth.ca/healthaz/na/growth-problems-in-children/",
        date: "Dec 22, 2023"
      }
    ]
  },
  {
    id: "thyroid",
    icon: Sparkles,
    title: "Thyroid",
    description: "Learn about thyroid conditions and their management in children",
    resources: [
      {
        title: "Hypothyroidism in Children",
        description: "Hypothyroidism is the term we use to describe when the thyroid does not make enough thyroid hormone to keep the body running normally.",
        link: "https://www.thyroid.org/hypothyroidism-children-adolescents/",
        date: "Dec 22, 2023"
      }
    ]
  }
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-in">
              Resources
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Educational materials and expert guidance to support your child's endocrine health journey
            </p>
          </div>
        </div>
      </section>

      {/* Resources by Category */}
      <main className="container mx-auto px-4 py-12">
        <div className="space-y-16">
          {resourceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <section key={category.id} id={category.id} className="scroll-mt-20">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">{category.title}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                {/* Resource Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.resources.map((resource, idx) => (
                    <Card
                      key={idx}
                      className="hover-scale hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 flex flex-col"
                    >
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{resource.date}</span>
                        </div>
                        <CardTitle className="text-xl">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col">
                        <p className="text-muted-foreground mb-6 flex-grow">
                          {resource.description}
                        </p>
                        <Button
                          variant="outline"
                          className="w-full group"
                          asChild
                        >
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            Read More
                            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-t from-primary/5 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            Want More Information?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Visit our blog for the latest articles, news, and expert insights on pediatric endocrine health
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="/blog">Visit Our Blog</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <a href="/for-parents">Get Started</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
