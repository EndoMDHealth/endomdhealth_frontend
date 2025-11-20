import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ForPatients = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">For Patients</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            Content coming soon...
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForPatients;
