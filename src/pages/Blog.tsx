import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar } from "lucide-react";
import mentalHealthActivity from "@/assets/blog/mental-health-activity.jpg";
import pubertyConcerns from "@/assets/blog/puberty-concerns.jpg";
import weightManagement from "@/assets/blog/weight-management.jpg";
import hypothyroidism from "@/assets/blog/hypothyroidism.jpg";

const blogPosts = [
  {
    id: 1,
    title: "Is there a connection between mental health and physical activity in kids?",
    description: "Discover practical strategies to help your child enjoy movement that promote mental health and help build lasting healthy habits.",
    image: mentalHealthActivity,
    date: "Sep 2, 2024",
    slug: "healthygrowth"
  },
  {
    id: 2,
    title: "Puberty Concerns: When to See a Pediatric Endocrinologist?",
    description: "If puberty has been on your mind as a parent, you're not alone. Here's some information to help you navigate this rollercoaster.",
    image: pubertyConcerns,
    date: "Aug 15, 2024",
    slug: "puberty-concerns"
  },
  {
    id: 3,
    title: "Beyond Restricting Carbs: Weight Management for Your Child",
    description: "Discover practical strategies beyond restricting carbs to help your child maintain a healthy weight and build lasting healthy habits.",
    image: weightManagement,
    date: "Jul 28, 2024",
    slug: "healthyweight"
  },
  {
    id: 4,
    title: "Managing Hypothyroidism in Children: Beyond Medication and Lab Results",
    description: "Explore strategies for managing hypothyroidism in children, focusing on holistic care beyond just medication and lab results. Help kids thrive with a balanced approach.",
    image: hypothyroidism,
    date: "Jul 20, 2024",
    slug: "hypothyroidism"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-in">
              Endo<span className="text-accent">MD</span> Health Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Expert insights and practical guidance for pediatric endocrine health
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="hover-scale hover:shadow-xl transition-all duration-300 border-border/50 hover:border-accent/30 flex flex-col overflow-hidden group"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <CardTitle className="text-2xl leading-tight group-hover:text-accent transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                  {post.description}
                </p>
                <Button
                  variant="outline"
                  className="w-full group/btn"
                  asChild
                >
                  <a
                    href={`#${post.slug}`}
                    className="flex items-center justify-center gap-2"
                  >
                    Read more
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-t from-primary/5 to-background py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stay connected with us
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Subscribe to receive the latest insights on pediatric endocrine health
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join over 2,500 families who trust us with their child's endocrine health
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <a href="/for-patients">Request Appointment</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <a href="/resources">Browse Resources</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
