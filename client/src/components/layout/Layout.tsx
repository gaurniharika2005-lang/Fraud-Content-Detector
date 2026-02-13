import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      <Sidebar />
      <main className="pl-64 min-h-screen relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="p-8 max-w-7xl mx-auto relative z-10">
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
}
