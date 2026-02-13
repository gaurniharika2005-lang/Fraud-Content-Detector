import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Shield, AlertTriangle, UserCheck, Activity, Globe, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mockTrendData = [
  { name: "00:00", threats: 4, verified: 20 },
  { name: "04:00", threats: 2, verified: 15 },
  { name: "08:00", threats: 12, verified: 45 },
  { name: "12:00", threats: 8, verified: 60 },
  { name: "16:00", threats: 15, verified: 55 },
  { name: "20:00", threats: 5, verified: 30 },
  { name: "24:00", threats: 3, verified: 10 },
];

const mockSourceData = [
  { name: "Email Phishing", value: 45, color: "hsl(var(--destructive))" },
  { name: "Deepfakes", value: 20, color: "hsl(var(--warning))" },
  { name: "Malicious URLs", value: 25, color: "hsl(var(--primary))" },
  { name: "Data Leaks", value: 10, color: "hsl(var(--muted))" },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-glow">Command Center</h2>
            <p className="text-muted-foreground font-mono mt-1">System Status: <span className="text-success">OPERATIONAL</span> | Monitoring Active</p>
          </div>
          <div className="flex gap-2">
             <Badge variant="outline" className="font-mono text-primary border-primary/50 animate-pulse">
                LIVE FEED
             </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card/50 border-sidebar-border backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-mono text-muted-foreground">THREATS BLOCKED</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1,248</div>
              <p className="text-xs text-muted-foreground">+12% from last 24h</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-sidebar-border backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-mono text-muted-foreground">HIGH RISK ALERTS</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">24</div>
              <p className="text-xs text-muted-foreground">+4 new since login</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-sidebar-border backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-mono text-muted-foreground">ACTIVE SCANS</CardTitle>
              <Activity className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">8</div>
              <p className="text-xs text-muted-foreground">Processing 12GB/s</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-sidebar-border backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-mono text-muted-foreground">VERIFIED USERS</CardTitle>
              <UserCheck className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">98.2%</div>
              <p className="text-xs text-muted-foreground">Identity confidence</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 md:grid-cols-7">
          <Card className="col-span-4 bg-card/50 border-sidebar-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-wider">Threat Detection Timeline</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockTrendData}>
                    <defs>
                      <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Area type="monotone" dataKey="threats" stroke="hsl(var(--destructive))" fillOpacity={1} fill="url(#colorThreats)" strokeWidth={2} />
                    <Area type="monotone" dataKey="verified" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorVerified)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3 bg-card/50 border-sidebar-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-wider">Attack Vectors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockSourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {mockSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {mockSourceData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts Feed */}
        <Card className="bg-card/50 border-sidebar-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase tracking-wider">Recent Live Intercepts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Phishing Attempt Blocked", source: "finance-dept-update.html", type: "email", risk: "high", time: "2m ago" },
                { title: "Deepfake Audio Detected", source: "ceo_voice_msg.mp3", type: "audio", risk: "medium", time: "15m ago" },
                { title: "Suspicious Login", source: "IP: 45.22.11.90 (Moscow)", type: "auth", risk: "high", time: "42m ago" },
                { title: "Malicious URL", source: "secure-bank-login-v2.com", type: "web", risk: "medium", time: "1h ago" },
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/20 hover:bg-background/40 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      alert.risk === "high" ? "bg-destructive animate-pulse" : "bg-warning"
                    )} />
                    <div>
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground font-mono">{alert.source}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {alert.type === "email" && <Mail className="w-4 h-4 text-muted-foreground" />}
                    {alert.type === "web" && <Globe className="w-4 h-4 text-muted-foreground" />}
                    <span className="text-xs font-mono text-muted-foreground">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
