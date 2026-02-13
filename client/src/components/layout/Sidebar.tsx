import { Link, useLocation } from "wouter";
import { 
  ShieldAlert, 
  Mail, 
  Globe, 
  FileAudio, 
  KeyRound, 
  LayoutDashboard, 
  Settings,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Command Center", href: "/" },
  { icon: Mail, label: "Email Analysis", href: "/email" },
  { icon: Globe, label: "Web Scanner", href: "/web" },
  { icon: FileAudio, label: "Media Forensics", href: "/media" },
  { icon: KeyRound, label: "Credential Guard", href: "/credentials" },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border/50">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50 text-primary animate-pulse-slow">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-mono font-bold text-lg tracking-wider text-sidebar-foreground">SENTINEL<span className="text-primary">AI</span></h1>
          <p className="text-xs text-muted-foreground font-mono">V.2.0.4 BETA</p>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <a className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group font-medium",
                isActive 
                  ? "bg-sidebar-primary/10 text-primary border border-sidebar-primary/20 shadow-[0_0_15px_-3px_hsl(var(--primary)/0.2)]" 
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}>
                <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
                <span>{item.label}</span>
                {isActive && (
                  <Activity className="w-4 h-4 ml-auto animate-pulse text-primary" />
                )}
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border/50">
        <div className="bg-card/50 rounded-lg p-3 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">SYSTEM ONLINE</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>CPU LOAD</span>
              <span>12%</span>
            </div>
            <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[12%]" />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono pt-1">
              <span>THREAT DB</span>
              <span>UPDATED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
