import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import PostJob from "@/pages/post-job";
import Jobs from "@/pages/jobs";
import Dashboard from "@/pages/dashboard";
import JobDetails from "@/pages/job-details";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/jobs" component={Jobs} />
          <Route path="/jobs/:id" component={JobDetails} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/jobs" component={Jobs} />
          <Route path="/jobs/:id" component={JobDetails} />
          <Route path="/post-job" component={PostJob} />
          <Route path="/dashboard" component={Dashboard} />
        </>
      )}
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
