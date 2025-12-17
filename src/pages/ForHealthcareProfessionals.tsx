import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Send, Building2, Users, FileText, ExternalLink } from "lucide-react";
import { z } from "zod";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming", "District of Columbia"
];

const referralSchema = z.object({
  providerFirstName: z.string().trim().min(1, "Provider first name is required").max(100),
  providerLastName: z.string().trim().min(1, "Provider last name is required").max(100),
  providerEmail: z.string().trim().email("Please enter a valid email address").max(255),
  providerPhone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  organization: z.string().trim().min(1, "Organization is required").max(200),
  patientFirstName: z.string().trim().min(1, "Patient first name is required").max(100),
  patientLastName: z.string().trim().min(1, "Patient last name is required").max(100),
  guardianFirstName: z.string().trim().min(1, "Parent/Guardian first name is required").max(100),
  guardianEmail: z.string().trim().email("Please enter a valid email address").max(255),
  guardianPhone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  state: z.string().min(1, "State is required"),
  referralDetails: z.string().trim().min(10, "Please provide referral details (at least 10 characters)").max(2000),
  consentToEmails: z.boolean().refine(val => val === true, "You must consent to receive communications"),
});

type ReferralFormData = z.infer<typeof referralSchema>;

const ForHealthcareProfessionals = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ReferralFormData, string>>>({});
  
  const [formData, setFormData] = useState<ReferralFormData>({
    providerFirstName: "",
    providerLastName: "",
    providerEmail: "",
    providerPhone: "",
    organization: "",
    patientFirstName: "",
    patientLastName: "",
    guardianFirstName: "",
    guardianEmail: "",
    guardianPhone: "",
    state: "",
    referralDetails: "",
    consentToEmails: false,
  });

  const handleInputChange = (field: keyof ReferralFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      referralSchema.parse(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast({
        title: "Referral Submitted Successfully",
        description: "Our team will reach out to the patient within 24 hours.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ReferralFormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ReferralFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast({
          title: "Validation Error",
          description: "Please check the form fields and try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-accent-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Referral Submitted Successfully
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your referral. Our team will reach out to the patient within 24 hours to schedule a pediatric endocrinology appointment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    providerFirstName: "",
                    providerLastName: "",
                    providerEmail: "",
                    providerPhone: "",
                    organization: "",
                    patientFirstName: "",
                    patientLastName: "",
                    guardianFirstName: "",
                    guardianEmail: "",
                    guardianPhone: "",
                    state: "",
                    referralDetails: "",
                    consentToEmails: false,
                  });
                }}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                Submit Another Referral
              </Button>
              <Button variant="outline" asChild>
                <a href="/provider-login">Access Provider Portal</a>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - White Background */}
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center mb-8">
              Refer a Patient
            </h1>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                Clinicians can fax referrals to <span className="font-semibold text-primary">804-660-6321</span> or complete the secure online form below.
              </p>
              <p>
                Our team will reach out to the patient within 24 hours to schedule a pediatric endocrinology appointment.
              </p>
              <p>
                Providers are encouraged to create a profile through the{" "}
                <a href="/provider-login" className="text-accent font-semibold hover:underline">
                  Healthcare Provider Portal
                </a>{" "}
                to follow up on the status of submitted referrals.
              </p>
              <p>
                Thanks for partnering with us to help families access timely pediatric endocrine care!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
            
            {/* Access Provider Portal CTA */}
            <div className="flex justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg rounded-lg shadow-md transition-all"
              >
                <a href="/provider-login">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Access Provider Portal
                </a>
              </Button>
            </div>

            {/* Provider Information Card */}
            <Card className="shadow-sm border-border/50 bg-background">
              <CardHeader className="bg-accent/10 border-b">
                <CardTitle className="flex items-center gap-3 text-xl text-foreground">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-accent-foreground" />
                  </div>
                  Provider Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="providerFirstName" className="text-foreground font-medium">
                      Provider First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="providerFirstName"
                      value={formData.providerFirstName}
                      onChange={(e) => handleInputChange("providerFirstName", e.target.value)}
                      placeholder="Enter first name"
                      className={errors.providerFirstName ? "border-destructive" : ""}
                    />
                    {errors.providerFirstName && (
                      <p className="text-sm text-destructive">{errors.providerFirstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="providerLastName" className="text-foreground font-medium">
                      Provider Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="providerLastName"
                      value={formData.providerLastName}
                      onChange={(e) => handleInputChange("providerLastName", e.target.value)}
                      placeholder="Enter last name"
                      className={errors.providerLastName ? "border-destructive" : ""}
                    />
                    {errors.providerLastName && (
                      <p className="text-sm text-destructive">{errors.providerLastName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="providerEmail" className="text-foreground font-medium">
                      Provider Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="providerEmail"
                      type="email"
                      value={formData.providerEmail}
                      onChange={(e) => handleInputChange("providerEmail", e.target.value)}
                      placeholder="provider@example.com"
                      className={errors.providerEmail ? "border-destructive" : ""}
                    />
                    {errors.providerEmail && (
                      <p className="text-sm text-destructive">{errors.providerEmail}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization" className="text-foreground font-medium">
                      Organization <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                      placeholder="Hospital or clinic name"
                      className={errors.organization ? "border-destructive" : ""}
                    />
                    {errors.organization && (
                      <p className="text-sm text-destructive">{errors.organization}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="providerPhone" className="text-foreground font-medium">
                      Provider Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="providerPhone"
                      type="tel"
                      value={formData.providerPhone}
                      onChange={(e) => handleInputChange("providerPhone", e.target.value)}
                      placeholder="(555) 123-4567"
                      className={`max-w-md ${errors.providerPhone ? "border-destructive" : ""}`}
                    />
                    {errors.providerPhone && (
                      <p className="text-sm text-destructive">{errors.providerPhone}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Patient Information Card */}
            <Card className="shadow-sm border-border/50 bg-background">
              <CardHeader className="bg-accent/10 border-b">
                <CardTitle className="flex items-center gap-3 text-xl text-foreground">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Users className="h-5 w-5 text-accent-foreground" />
                  </div>
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="patientFirstName" className="text-foreground font-medium">
                      Patient First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="patientFirstName"
                      value={formData.patientFirstName}
                      onChange={(e) => handleInputChange("patientFirstName", e.target.value)}
                      placeholder="Enter patient's first name"
                      className={errors.patientFirstName ? "border-destructive" : ""}
                    />
                    {errors.patientFirstName && (
                      <p className="text-sm text-destructive">{errors.patientFirstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patientLastName" className="text-foreground font-medium">
                      Patient Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="patientLastName"
                      value={formData.patientLastName}
                      onChange={(e) => handleInputChange("patientLastName", e.target.value)}
                      placeholder="Enter patient's last name"
                      className={errors.patientLastName ? "border-destructive" : ""}
                    />
                    {errors.patientLastName && (
                      <p className="text-sm text-destructive">{errors.patientLastName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guardianFirstName" className="text-foreground font-medium">
                      Parent or Guardian First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="guardianFirstName"
                      value={formData.guardianFirstName}
                      onChange={(e) => handleInputChange("guardianFirstName", e.target.value)}
                      placeholder="Enter guardian's first name"
                      className={errors.guardianFirstName ? "border-destructive" : ""}
                    />
                    {errors.guardianFirstName && (
                      <p className="text-sm text-destructive">{errors.guardianFirstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guardianEmail" className="text-foreground font-medium">
                      Parent or Guardian Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="guardianEmail"
                      type="email"
                      value={formData.guardianEmail}
                      onChange={(e) => handleInputChange("guardianEmail", e.target.value)}
                      placeholder="guardian@example.com"
                      className={errors.guardianEmail ? "border-destructive" : ""}
                    />
                    {errors.guardianEmail && (
                      <p className="text-sm text-destructive">{errors.guardianEmail}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guardianPhone" className="text-foreground font-medium">
                      Parent/Patient Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="guardianPhone"
                      type="tel"
                      value={formData.guardianPhone}
                      onChange={(e) => handleInputChange("guardianPhone", e.target.value)}
                      placeholder="(555) 123-4567"
                      className={errors.guardianPhone ? "border-destructive" : ""}
                    />
                    {errors.guardianPhone && (
                      <p className="text-sm text-destructive">{errors.guardianPhone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-foreground font-medium">
                      State <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => handleInputChange("state", value)}
                    >
                      <SelectTrigger className={errors.state ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {US_STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.state && (
                      <p className="text-sm text-destructive">{errors.state}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Referral Details Card */}
            <Card className="shadow-sm border-border/50 bg-background">
              <CardHeader className="bg-accent/10 border-b">
                <CardTitle className="flex items-center gap-3 text-xl text-foreground">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary-foreground" />
                  </div>
                  Referral Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor="referralDetails" className="text-foreground font-medium">
                    Referral Details <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="referralDetails"
                    value={formData.referralDetails}
                    onChange={(e) => handleInputChange("referralDetails", e.target.value)}
                    placeholder="Please provide details about the referral, including reason for referral, relevant medical history, current symptoms, and any specific concerns..."
                    rows={6}
                    className={errors.referralDetails ? "border-destructive" : ""}
                  />
                  {errors.referralDetails && (
                    <p className="text-sm text-destructive">{errors.referralDetails}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {formData.referralDetails.length}/2000 characters
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Consent and Submit */}
            <Card className="shadow-sm border-border/50 bg-background">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consentToEmails"
                      checked={formData.consentToEmails}
                      onCheckedChange={(checked) => handleInputChange("consentToEmails", checked as boolean)}
                      className="mt-1 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="consentToEmails" 
                        className="text-foreground cursor-pointer leading-relaxed"
                      >
                        By checking this box, I consent to receive email communications from EndoMD Health related to referral updates, coordination of care, and relevant practice information.
                      </Label>
                      {errors.consentToEmails && (
                        <p className="text-sm text-destructive">{errors.consentToEmails}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button 
                      type="submit" 
                      size="lg"
                      disabled={isSubmitting}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-6 text-lg transition-all rounded-lg shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Submit Referral
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Questions About Referrals?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our team is here to help. Contact us for any questions about the referral process or patient eligibility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <a href="/contact-us">Contact Us</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/e-consult">Learn About E-Consults</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForHealthcareProfessionals;
