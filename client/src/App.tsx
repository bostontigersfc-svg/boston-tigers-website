import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Register from "@/pages/register";
import EliteDevelopment from "@/pages/elite-development";
import Admin from "@/pages/admin";
import RegisterSuccess from "@/pages/register-success";
import Apply from "@/pages/apply";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/register/success" component={RegisterSuccess} />
      <Route path="/elite-development" component={EliteDevelopment} />
      <Route path="/apply" component={Apply} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
