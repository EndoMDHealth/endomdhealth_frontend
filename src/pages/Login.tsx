import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | EndoMD Health";
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Question */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Are you a Patient or a Healthcare Provider?
            </h1>
            <p className="text-muted-foreground text-lg mb-12">
              Select your role to continue to the appropriate portal.
            </p>

            {/* Choice Buttons */}
            <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
              {/* Patient Button */}
              <Button
                onClick={() => navigate("/for-patients")}
                className="h-auto py-10 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-2xl md:text-3xl transition-all flex items-center justify-center rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Patient
              </Button>

              {/* Healthcare Provider Button */}
              <Button
                onClick={() => navigate("/clinician-login")}
                className="h-auto py-10 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-2xl md:text-3xl transition-all flex items-center justify-center rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Healthcare Provider
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
