import { Layout } from "@/components/layout/Layout";
import { ScannerInterface } from "@/components/shared/ScannerInterface";
import { AlertTriangle, Globe } from "lucide-react";

export default function WebScanner() {
  const handleScan = async (input: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input }),
      });

      const data = await response.json();
      const isMalicious = data.is_phishing;

      return {
        risk: isMalicious ? "high" : "low",
        score: data.confidence,
        icon: isMalicious ? AlertTriangle : Globe,
        summary: data.explanation,
        details: [
          { label: "AI Probability", value: `${data.confidence}%` },
          { label: "Sentiment", value: data.sentiment },
          { label: "Risk Level", value: data.risk_level },
          { label: "Status", value: isMalicious ? "Threat Detected" : "Clean" },
        ],
        actions: data.recommended_actions || [],
      };
    } catch (error) {
      return {
        risk: "low",
        score: 0,
        icon: Globe,
        summary: "Could not connect to analysis server.",
        details: [],
        actions: [],
      };
    }
  };

  return (
    <Layout>
      <ScannerInterface
        title="Web Scanner"
        description="Analyze URLs for spoofing, phishing kits, and malicious cookies."
        inputType="url"
        placeholder="https://example.com"
        onScan={handleScan}
      />
    </Layout>
  );
}