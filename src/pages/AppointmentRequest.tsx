import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import teenagerDoctorImage from "@/assets/teenager-doctor-happy.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";

const insuranceProviders = [
  "Aetna",
  "Anthem",
  "Blue Cross Blue Shield",
  "Carefirst",
  "Cigna",
  "Humana",
  "Kaiser Permanente",
  "Medicaid",
  "Medicare",
  "Sentara",
  "Tricare",
  "UnitedHealthcare",
  "Other",
];

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming", "District of Columbia",
];

const AppointmentRequest = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientFirstName: "",
    patientLastName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    state: "",
    postalCode: "",
    insuranceProvider: "",
    memberId: "",
    groupNumber: "",
    healthConcerns: "",
    consent: false,
  });
  const [insuranceCardFront, setInsuranceCardFront] = useState<File | null>(null);
  const [insuranceCardBack, setInsuranceCardBack] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientFirstName.trim()) {
      newErrors.patientFirstName = "Patient First Name is required";
    }
    if (!formData.patientLastName.trim()) {
      newErrors.patientLastName = "Patient Last Name is required";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.state) {
      newErrors.state = "State is required";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal Code is required";
    }
    if (!formData.insuranceProvider) {
      newErrors.insuranceProvider = "Insurance Provider is required";
    }
    if (!insuranceCardFront) {
      newErrors.insuranceCardFront = "Insurance Card (Front) is required";
    }
    if (!insuranceCardBack) {
      newErrors.insuranceCardBack = "Insurance Card (Back) is required";
    }
    if (!formData.healthConcerns.trim()) {
      newErrors.healthConcerns = "Health concerns are required";
    }
    if (!formData.consent) {
      newErrors.consent = "You must consent to receive text messages";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form Incomplete",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Request Submitted",
      description: "Thank you! We will contact you shortly to confirm your appointment.",
    });

    // Reset form
    setFormData({
      patientFirstName: "",
      patientLastName: "",
      dateOfBirth: "",
      phone: "",
      email: "",
      state: "",
      postalCode: "",
      insuranceProvider: "",
      memberId: "",
      groupNumber: "",
      healthConcerns: "",
      consent: false,
    });
    setInsuranceCardFront(null);
    setInsuranceCardBack(null);
    setErrors({});
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void,
    fieldName: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a JPG, PNG, or PDF file.",
          variant: "destructive",
        });
        return;
      }
      setFile(file);
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  useEffect(() => {
    document.title = "Request Appointment | EndoMD Health";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Form */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                  Request Appointment
                </h1>
                
                {/* Appointment Form */}
                <div className="max-w-xl">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Patient First Name */}
                    <div>
                      <Label htmlFor="patientFirstName" className="text-foreground font-medium">
                        Patient First Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="patientFirstName"
                        type="text"
                        value={formData.patientFirstName}
                        onChange={(e) => {
                          setFormData({ ...formData, patientFirstName: e.target.value });
                          if (errors.patientFirstName) setErrors((prev) => ({ ...prev, patientFirstName: "" }));
                        }}
                        className={`mt-2 bg-muted/30 border-border ${errors.patientFirstName ? "border-destructive" : ""}`}
                      />
                      {errors.patientFirstName && (
                        <p className="text-destructive text-sm mt-1">{errors.patientFirstName}</p>
                      )}
                    </div>

                    {/* Patient Last Name */}
                    <div>
                      <Label htmlFor="patientLastName" className="text-foreground font-medium">
                        Patient Last Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="patientLastName"
                        type="text"
                        value={formData.patientLastName}
                        onChange={(e) => {
                          setFormData({ ...formData, patientLastName: e.target.value });
                          if (errors.patientLastName) setErrors((prev) => ({ ...prev, patientLastName: "" }));
                        }}
                        className={`mt-2 bg-muted/30 border-border ${errors.patientLastName ? "border-destructive" : ""}`}
                      />
                      {errors.patientLastName && (
                        <p className="text-destructive text-sm mt-1">{errors.patientLastName}</p>
                      )}
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <Label htmlFor="dateOfBirth" className="text-foreground font-medium">
                        Date of Birth <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => {
                          setFormData({ ...formData, dateOfBirth: e.target.value });
                          if (errors.dateOfBirth) setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
                        }}
                        className={`mt-2 bg-muted/30 border-border ${errors.dateOfBirth ? "border-destructive" : ""}`}
                      />
                      {errors.dateOfBirth && (
                        <p className="text-destructive text-sm mt-1">{errors.dateOfBirth}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone" className="text-foreground font-medium">
                        Phone <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                        }}
                        className={`mt-2 bg-muted/30 border-border ${errors.phone ? "border-destructive" : ""}`}
                      />
                      {errors.phone && (
                        <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email" className="text-foreground font-medium">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                        className={`mt-2 bg-muted/30 border-border ${errors.email ? "border-destructive" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* State */}
                    <div>
                      <Label htmlFor="state" className="text-foreground font-medium">
                        State <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => {
                          setFormData({ ...formData, state: value });
                          if (errors.state) setErrors((prev) => ({ ...prev, state: "" }));
                        }}
                      >
                        <SelectTrigger className={`mt-2 bg-muted/30 border-border ${errors.state ? "border-destructive" : ""}`}>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {usStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.state && (
                        <p className="text-destructive text-sm mt-1">{errors.state}</p>
                      )}
                    </div>

                    {/* Postal Code */}
                    <div>
                      <Label htmlFor="postalCode" className="text-foreground font-medium">
                        Postal Code <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="postalCode"
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => {
                          setFormData({ ...formData, postalCode: e.target.value });
                          if (errors.postalCode) setErrors((prev) => ({ ...prev, postalCode: "" }));
                        }}
                        className={`mt-2 bg-muted/30 border-border ${errors.postalCode ? "border-destructive" : ""}`}
                      />
                      {errors.postalCode && (
                        <p className="text-destructive text-sm mt-1">{errors.postalCode}</p>
                      )}
                    </div>

                    {/* Insurance Provider */}
                    <div>
                      <Label htmlFor="insuranceProvider" className="text-foreground font-medium">
                        Insurance Provider <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.insuranceProvider}
                        onValueChange={(value) => {
                          setFormData({ ...formData, insuranceProvider: value });
                          if (errors.insuranceProvider) setErrors((prev) => ({ ...prev, insuranceProvider: "" }));
                        }}
                      >
                        <SelectTrigger className={`mt-2 bg-muted/30 border-border ${errors.insuranceProvider ? "border-destructive" : ""}`}>
                          <SelectValue placeholder="Select Insurance Provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {insuranceProviders.map((provider) => (
                            <SelectItem key={provider} value={provider}>
                              {provider}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.insuranceProvider && (
                        <p className="text-destructive text-sm mt-1">{errors.insuranceProvider}</p>
                      )}
                    </div>

                    {/* Member ID */}
                    <div>
                      <Label htmlFor="memberId" className="text-foreground font-medium">
                        Member ID
                      </Label>
                      <Input
                        id="memberId"
                        type="text"
                        value={formData.memberId}
                        onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                        className="mt-2 bg-muted/30 border-border"
                      />
                    </div>

                    {/* Group Number */}
                    <div>
                      <Label htmlFor="groupNumber" className="text-foreground font-medium">
                        Group Number
                      </Label>
                      <Input
                        id="groupNumber"
                        type="text"
                        value={formData.groupNumber}
                        onChange={(e) => setFormData({ ...formData, groupNumber: e.target.value })}
                        className="mt-2 bg-muted/30 border-border"
                      />
                    </div>

                    {/* Upload Insurance Card Front */}
                    <div>
                      <Label htmlFor="insuranceCardFront" className="text-foreground font-medium">
                        Upload Insurance Card (FRONT) <span className="text-destructive">*</span>
                      </Label>
                      <div className="mt-2">
                        <label
                          htmlFor="insuranceCardFront"
                          className={`flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                            errors.insuranceCardFront ? "border-destructive" : "border-border"
                          }`}
                        >
                          <Upload className="h-5 w-5 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {insuranceCardFront ? insuranceCardFront.name : "Click to upload (JPG, PNG, PDF)"}
                          </span>
                        </label>
                        <input
                          id="insuranceCardFront"
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => handleFileChange(e, setInsuranceCardFront, "insuranceCardFront")}
                          className="hidden"
                        />
                      </div>
                      {errors.insuranceCardFront && (
                        <p className="text-destructive text-sm mt-1">{errors.insuranceCardFront}</p>
                      )}
                    </div>

                    {/* Upload Insurance Card Back */}
                    <div>
                      <Label htmlFor="insuranceCardBack" className="text-foreground font-medium">
                        Upload Insurance Card (BACK) <span className="text-destructive">*</span>
                      </Label>
                      <div className="mt-2">
                        <label
                          htmlFor="insuranceCardBack"
                          className={`flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                            errors.insuranceCardBack ? "border-destructive" : "border-border"
                          }`}
                        >
                          <Upload className="h-5 w-5 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {insuranceCardBack ? insuranceCardBack.name : "Click to upload (JPG, PNG, PDF)"}
                          </span>
                        </label>
                        <input
                          id="insuranceCardBack"
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => handleFileChange(e, setInsuranceCardBack, "insuranceCardBack")}
                          className="hidden"
                        />
                      </div>
                      {errors.insuranceCardBack && (
                        <p className="text-destructive text-sm mt-1">{errors.insuranceCardBack}</p>
                      )}
                    </div>

                    {/* Health Concerns */}
                    <div>
                      <Label htmlFor="healthConcerns" className="text-foreground font-medium">
                        What health concern(s) does the patient (child/teen) have? <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="healthConcerns"
                        rows={4}
                        value={formData.healthConcerns}
                        onChange={(e) => {
                          setFormData({ ...formData, healthConcerns: e.target.value });
                          if (errors.healthConcerns) setErrors((prev) => ({ ...prev, healthConcerns: "" }));
                        }}
                        className={`mt-2 bg-muted/30 border-border ${errors.healthConcerns ? "border-destructive" : ""}`}
                      />
                      {errors.healthConcerns && (
                        <p className="text-destructive text-sm mt-1">{errors.healthConcerns}</p>
                      )}
                    </div>

                    {/* Consent Checkbox */}
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => {
                          setFormData({ ...formData, consent: checked as boolean });
                          if (errors.consent) setErrors((prev) => ({ ...prev, consent: "" }));
                        }}
                        className="mt-1"
                      />
                      <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                        By checking this box, I consent to receive text messages about my account and requested services (e.g., reminders, confirmations, notices). Message frequency varies; message & data rates may apply. Text HELP for help, STOP to opt out.
                      </Label>
                    </div>
                    {errors.consent && (
                      <p className="text-destructive text-sm">{errors.consent}</p>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
                    >
                      Submit
                    </Button>

                    {/* Links */}
                    <div className="text-center text-sm text-muted-foreground pt-2">
                      <Link to="/privacy-policy" className="text-primary hover:text-accent underline">
                        Privacy Policy
                      </Link>
                      {" | "}
                      <Link to="/terms-of-service" className="text-primary hover:text-accent underline">
                        Terms of Service
                      </Link>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <img
                    src={teenagerDoctorImage}
                    alt="Happy teenager with doctor at EndoMD Health"
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AppointmentRequest;
