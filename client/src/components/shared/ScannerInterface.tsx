import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Scan, AlertTriangle, CheckCircle, Shield, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ScannerInterfaceProps {
  title: string;
  description: string;
  inputType: "text" | "url" | "file" | "email";
  placeholder: string;
  onScan: (input: string) => Promise<any>;
}

export function ScannerInterface({ 
  title, 
  description, 
  inputType, 
  placeholder,
  onScan 
}: ScannerInterfaceProps) {
  const [input, setInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);

  const handleScan = async () => {
    if (!input && inputType !== 'file') return;
    
    setIsScanning(true);
    setProgress(0);
    setResult(null);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev;
        return prev + 5;
      });
    }, 100);

    try {
      // Artificial delay for effect
      await new Promise(resolve => setTimeout(resolve, 2000));
      const scanResult = await onScan(input);
      setResult(scanResult);
    } catch (error) {
      console.error(error);
    } finally {
      clearInterval(interval);
      setProgress(100);
      setIsScanning(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2 h-full">
      {/* Input Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <Card className="border-sidebar-border bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {inputType === "text" || inputType === "email" ? (
                <Textarea 
                  placeholder={placeholder}
                  className="min-h-[200px] font-mono text-sm bg-background/50 border-input focus:border-primary/50 resize-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              ) : (
                <div className="flex gap-2">
                  <Input 
                    placeholder={placeholder}
                    className="font-mono text-sm bg-background/50 border-input focus:border-primary/50"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
              )}
              
              <Button 
                onClick={handleScan} 
                disabled={isScanning || (!input && inputType !== 'file')}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-wide"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    SCANNING...
                  </>
                ) : (
                  <>
                    <Scan className="mr-2 h-4 w-4" />
                    INITIATE SCAN
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Mockup */}
        <Card className="border-sidebar-border/50 bg-card/20">
          <CardHeader>
            <CardTitle className="text-sm font-mono text-muted-foreground uppercase">Scan History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-muted-foreground">scan_log_00{i}.json</span>
                  </div>
                  <span className="text-xs text-muted-foreground/50">2h ago</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {!result && !isScanning && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center border-2 border-dashed border-sidebar-border rounded-xl bg-card/10 p-12 text-center text-muted-foreground"
            >
              <Shield className="w-16 h-16 mb-4 opacity-20" />
              <p>Ready to analyze. Input data to begin.</p>
            </motion.div>
          )}

          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center rounded-xl bg-card/30 border border-primary/20 p-12"
            >
              <div className="w-full max-w-xs space-y-4 text-center">
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-ping" />
                  <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
                  <Shield className="absolute inset-0 m-auto w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-bold font-mono text-primary animate-pulse">ANALYZING PATTERNS</h3>
                <Progress value={progress} className="h-2 bg-secondary" />
                <div className="text-xs font-mono text-muted-foreground text-left space-y-1">
                  <p className="text-primary">RUNNING: model_bert_finetuned_v4...</p>
                  <p>CHECKING: known_signatures...</p>
                  <p>VERIFYING: header_integrity...</p>
                </div>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full space-y-4"
            >
              <Card className={cn(
                "border-l-4 overflow-hidden",
                result.risk === 'high' ? "border-l-destructive border-destructive/20 bg-destructive/5" :
                result.risk === 'medium' ? "border-l-warning border-warning/20 bg-warning/5" :
                "border-l-success border-success/20 bg-success/5"
              )}>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <result.icon className="w-32 h-32" />
                </div>
                
                <CardContent className="pt-6 relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                        {result.risk === 'high' ? <AlertTriangle className="text-destructive" /> : 
                         result.risk === 'medium' ? <AlertTriangle className="text-warning" /> : 
                         <CheckCircle className="text-success" />}
                        <span className={cn(
                          result.risk === 'high' ? "text-destructive" :
                          result.risk === 'medium' ? "text-warning" :
                          "text-success"
                        )}>
                          {result.risk === 'high' ? "CRITICAL THREAT DETECTED" : 
                           result.risk === 'medium' ? "SUSPICIOUS ACTIVITY" : 
                           "NO THREATS FOUND"}
                        </span>
                      </h3>
                      <p className="text-muted-foreground mt-1 font-mono text-sm">
                        Confidence Score: <span className="text-foreground font-bold">{result.score}%</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-mono text-muted-foreground uppercase mb-2">Analysis Summary</h4>
                      <p className="text-sm leading-relaxed">{result.summary}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {result.details.map((detail: any, i: number) => (
                        <div key={i} className="bg-background/50 p-3 rounded border border-border/50">
                          <span className="text-xs text-muted-foreground font-mono block mb-1">{detail.label}</span>
                          <span className="text-sm font-medium">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-card border border-border p-4 rounded-lg">
                <h4 className="text-sm font-bold mb-2">Recommended Actions</h4>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  {result.actions.map((action: string, i: number) => (
                    <li key={i}>{action}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
