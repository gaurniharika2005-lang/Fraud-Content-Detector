import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import EmailAnalysis from "@/pages/email-analysis";
import WebScanner from "@/pages/web-scanner";
import MediaForensics from "@/pages/media-forensics";
import CredentialGuard from "@/pages/credential-guard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard}/>
      <Route path="/email" component={EmailAnalysis}/>
      <Route path="/web" component={WebScanner}/>
      <Route path="/media" component={MediaForensics}/>
      <Route path="/credentials" component={CredentialGuard}/>
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
