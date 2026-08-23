
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import ProviderOnboarding from "./pages/ProviderOnboarding";
import Admin from "./pages/Admin";
import AdminBookings from "./pages/AdminBookings";
import UserProfile from "./pages/UserProfile";
import ProviderProfile from "./pages/ProviderProfile";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
  // Move the QueryClient initialization inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/become-provider" element={<ProviderOnboarding />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/bookings" element={<AdminBookings />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/provider/profile" element={<ProviderProfile />} />
              <Route path="/provider/bookings" element={<ProviderProfile />} />
              <Route path="/provider-confirmation" element={<ProviderProfile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
