import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import WhatWeTreat from "./pages/WhatWeTreat";
import Resources from "./pages/Resources";
import Blog from "./pages/Blog";
import MedicalConsult from "./pages/MedicalConsult";
import NutritionCoaching from "./pages/NutritionCoaching";
import EConsult from "./pages/EConsult";
import ForPatients from "./pages/ForPatients";
import ForParents from "./pages/ForParents";
import ForHealthcareProfessionals from "./pages/ForHealthcareProfessionals";
import ForSchools from "./pages/ForSchools";
import ForCommunityPartners from "./pages/ForCommunityPartners";
import Login from "./pages/Login";
import ClinicianLogin from "./pages/ClinicianLogin";
import PhysicianDashboard from "./pages/PhysicianDashboard";
import SubmitEConsult from "./pages/SubmitEConsult";
import PatientLogin from "./pages/PatientLogin";
import PatientDashboard from "./pages/PatientDashboard";
import ClinicalPortal from "./pages/patient-portal/ClinicalPortal";
import BookAppointment from "./pages/patient-portal/BookAppointment";
import UploadLabs from "./pages/patient-portal/UploadLabs";
import FindLabs from "./pages/patient-portal/FindLabs";
import ManageInvoices from "./pages/patient-portal/ManageInvoices";
import CoachingSessions from "./pages/patient-portal/CoachingSessions";
import NutritionSchedule from "./pages/patient-portal/NutritionSchedule";
import BillingAccount from "./pages/patient-portal/BillingAccount";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ClinicalServicesPolicies from "./pages/ClinicalServicesPolicies";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import AppointmentRequest from "./pages/AppointmentRequest";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import PhysicianProtectedRoute from "./components/PhysicianProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/what-we-treat" element={<WhatWeTreat />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/medical-consult" element={<MedicalConsult />} />
            <Route path="/nutrition-coaching" element={<NutritionCoaching />} />
            <Route path="/e-consult" element={<EConsult />} />
            <Route path="/for-patients" element={<ForPatients />} />
            <Route path="/for-parents" element={<ForParents />} />
            <Route path="/for-healthcare-professionals" element={<ForHealthcareProfessionals />} />
            <Route path="/for-schools" element={<ForSchools />} />
            <Route path="/for-community-partners" element={<ForCommunityPartners />} />
            <Route path="/login" element={<Login />} />
            {/* Provider Portal Routes */}
            <Route path="/provider-login" element={<ClinicianLogin />} />
            <Route path="/clinician-login" element={<ClinicianLogin />} />
            <Route path="/provider-dashboard" element={<PhysicianProtectedRoute><PhysicianDashboard /></PhysicianProtectedRoute>} />
            <Route path="/provider-dashboard/*" element={<PhysicianProtectedRoute><PhysicianDashboard /></PhysicianProtectedRoute>} />
            <Route path="/submit-econsult" element={<PhysicianProtectedRoute><SubmitEConsult /></PhysicianProtectedRoute>} />
            {/* Legacy routes - redirect to new paths */}
            <Route path="/physician-dashboard" element={<PhysicianProtectedRoute><PhysicianDashboard /></PhysicianProtectedRoute>} />
            <Route path="/physician-dashboard/*" element={<PhysicianProtectedRoute><PhysicianDashboard /></PhysicianProtectedRoute>} />
            {/* Patient Portal Routes */}
            <Route path="/patient-login" element={<PatientLogin />} />
            <Route path="/patient-dashboard" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
            <Route path="/patient-portal/clinical" element={<ProtectedRoute><ClinicalPortal /></ProtectedRoute>} />
            <Route path="/patient-portal/book-appointment" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
            <Route path="/patient-portal/upload-labs" element={<ProtectedRoute><UploadLabs /></ProtectedRoute>} />
            <Route path="/patient-portal/find-labs" element={<ProtectedRoute><FindLabs /></ProtectedRoute>} />
            <Route path="/patient-portal/invoices" element={<ProtectedRoute><ManageInvoices /></ProtectedRoute>} />
            <Route path="/patient-portal/coaching-sessions" element={<ProtectedRoute><CoachingSessions /></ProtectedRoute>} />
            <Route path="/patient-portal/nutrition-schedule" element={<ProtectedRoute><NutritionSchedule /></ProtectedRoute>} />
            <Route path="/patient-portal/billing" element={<ProtectedRoute><BillingAccount /></ProtectedRoute>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/clinical-services-policies" element={<ClinicalServicesPolicies />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/appointment-request" element={<ProtectedRoute><AppointmentRequest /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
