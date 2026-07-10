import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ShopProvider } from "@/hooks/use-shop";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Catalog from "@/pages/catalog";
import ProductDetail from "@/pages/product";
import Cart from "@/pages/cart";
import Wishlist from "@/pages/wishlist";
import Events from "@/pages/events";
import EventDetail from "@/pages/event-detail";
import Contacts from "@/pages/contacts";
import PaymentDelivery from "@/pages/payment-delivery";
import GiftCards from "@/pages/gift-cards";
import Login from "@/pages/login";
import About from "@/pages/about";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/catalog/:category" component={Catalog} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/cart" component={Cart} />
      <Route path="/wishlist" component={Wishlist} />
      <Route path="/events" component={Events} />
      <Route path="/events/:id" component={EventDetail} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/payment-delivery" component={PaymentDelivery} />
      <Route path="/gift-cards" component={GiftCards} />
      <Route path="/login" component={Login} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ShopProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ShopProvider>
    </QueryClientProvider>
  );
}

export default App;
