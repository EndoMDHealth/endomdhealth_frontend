import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Effective September 20, 2024. These "Terms of Service" are entered into between you and, to the extent
                pertinent, your minor child (hereinafter, collectively, "you"), and EndoMD Health LLC ("EndoMD Health")
                and are structured to facilitate your access to the terms relevant to your specific use of the website,{" "}
                <a href="http://www.endomdhelath.com" className="text-primary hover:underline">
                  www.endomdhelath.com
                </a>
                , including any content, functionality, and services offered on or through it (collectively, the
                "Website"), allowing you to easily navigate and understand the provisions applicable to your usage of
                the Website. By accessing and using the Website, you are agreeing to the following terms.
              </p>

              <p>
                If you have any questions about these Terms, please contact us via email at{" "}
                <a href="mailto:info@endomdhealth.com" className="text-primary hover:underline">
                  info@endomdhealth.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
