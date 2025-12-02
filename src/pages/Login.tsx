import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { User, Stethoscope } from "lucide-react";

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
                className="h-auto py-8 px-6 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg transition-all flex flex-col items-center gap-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <User className="h-12 w-12" />
                <span>Patient</span>
              </Button>

              {/* Healthcare Provider Button */}
              <Button
                onClick={() => navigate("/e-consult")}
                className="h-auto py-8 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg transition-all flex flex-col items-center gap-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <Stethoscope className="h-12 w-12" />
                <span>Healthcare Provider</span>
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
