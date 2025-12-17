import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, LogIn } from "lucide-react";
import childrenImage from "@/assets/children-running-smiling.jpg";

const SignedOut = () => {
  useEffect(() => {
    document.title = "Signed Out | EndoMD Health";
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Success Card */}
            <div className="bg-card border border-border rounded-2xl shadow-lg p-8 md:p-12 text-center">
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-6">
                <CheckCircle2 className="h-10 w-10 text-accent" />
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                You've Successfully Signed Out
              </h1>

              {/* Body Text */}
              <p className="text-lg text-muted-foreground mb-2 max-w-xl mx-auto">
                Thank you for visiting EndoMD Health. You have been safely signed out of your account.
              </p>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                We look forward to supporting your child's health again soon!
              </p>

              {/* Image */}
              <div className="mb-8 max-w-md mx-auto">
                <img
                  src={childrenImage}
                  alt="Happy children running and smiling"
                  className="rounded-xl shadow-md w-full h-auto"
                />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8"
                >
                  <Link to="/login">
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In Again
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8"
                >
                  <Link to="/">
                    <Home className="h-5 w-5 mr-2" />
                    Return to Homepage
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignedOut;