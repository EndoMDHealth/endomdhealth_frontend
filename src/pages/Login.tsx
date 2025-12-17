import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { User, Stethoscope, Activity } from "lucide-react";

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
          <div className="max-w-3xl mx-auto text-center">
            {/* Question */}
            <h1 className="text-3xl md:text-4xl lg:text-4.5xl font-bold text-foreground mb-4">
              Select Your Portal
            </h1>
            <p className="text-muted-foreground text-lg mb-12">
              Choose the appropriate portal based on your role.
            </p>

            {/* Choice Buttons */}
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {/* Patient Button */}
              <Button
                onClick={() => navigate("/for-patients")}
                className="h-auto py-8 px-6 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-xl md:text-2xl transition-all flex flex-col items-center justify-center gap-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <User className="h-8 w-8" />
                Patient
              </Button>

              {/* Healthcare Provider Button */}
              <Button
                onClick={() => navigate("/clinician-login")}
                className="h-auto py-8 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl md:text-2xl transition-all flex flex-col items-center justify-center gap-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <Stethoscope className="h-8 w-8" />
                Physician
              </Button>

              {/* Specialist Button */}
              <Button
                onClick={() => navigate("/specialist-login")}
                className="h-auto py-8 px-6 bg-[hsl(187,60%,50%)] hover:bg-[hsl(187,60%,45%)] text-white font-bold text-xl md:text-2xl transition-all flex flex-col items-center justify-center gap-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <Activity className="h-8 w-8" />
                Specialist
              </Button>
            </div>

            {/* Role descriptions */}
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-6 text-sm text-muted-foreground">
              <p>Access your health records, appointments, and messaging</p>
              <p>Submit e-Consults and manage patient referrals</p>
              <p>Pediatric Endocrinologists – Review and respond to e-Consults</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
