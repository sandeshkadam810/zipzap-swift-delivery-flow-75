
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Category from "./pages/Category";
import SmartInventory from "./pages/SmartInventory";
import LiveTracking from "./pages/LiveTracking";
import StoreDashboard from "./pages/StoreDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import AIChat from "./components/AIChat";
import InventoryManage from "./pages/InventoryManage";
import OrderTracking from "./pages/OrderTracking";
import CustomerHome from "@/pages/CustomerHome";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/smart-inventory" element={<SmartInventory />} />
            <Route path="/inventory-manage" element={<InventoryManage />} />
            <Route path="/live-tracking" element={<LiveTracking />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/store-dashboard" element={<StoreDashboard />} />
            <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/customer-home" element={<CustomerHome />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIChat />
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
