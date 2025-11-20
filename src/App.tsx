import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
