
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import Recipients from "./pages/Recipients";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import QuickEntry from "./pages/QuickEntry";
import QuickEntryPreview from "./pages/QuickEntryPreview";
import PaymentApproval from "./pages/PaymentApproval";
import PPDTemplate from "./pages/PPDTemplate";
import MasterRecipientList from "./pages/MasterRecipientList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/recipients" element={<Recipients />} />
        <Route path="/recipients/master" element={<MasterRecipientList />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/payments/new" element={<Payments />} />
        <Route path="/payments/quick-entry" element={<QuickEntry />} />
        <Route path="/payments/quick-entry/preview" element={<QuickEntryPreview />} />
        <Route path="/payments/approval" element={<PaymentApproval />} />
        <Route path="/payments/ppd-template" element={<PPDTemplate />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/limits" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
