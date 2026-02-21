import { Layout } from "@/components/layout/Layout";
import { ScannerInterface } from "@/components/shared/ScannerInterface";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export default function EmailAnalysis() {
  const handleScan = async (input: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input })
      });

      const data = await response.json();
      const isPhishing = data.is_phishing;

      return {
        risk: isPhishing ? "high" : "low",
        score: data.confidence,
        icon: isPhishing ? AlertTriangle : ShieldCheck,
        summary: data.explanation,
        details: [
          { label: "AI Probability", value: `${data.confidence}%` },
          { label: "Sentiment", value: data.sentiment },
          { label: "Risk Level", value: data.risk_level },
          { label: "Status", value: isPhishing ? "Threat Detected" : "Clean" },
        ],
        actions: data.recommended_actions
      };
    } catch (error) {
      return {
        risk: "low",
        score: 0,
        icon: ShieldCheck,
        summary: "Could not connect to analysis server. Make sure the Python backend is running.",
        details: [],
        actions: ["Restart the Python backend: uvicorn main:app --reload --port 8000"]
      };
    }
  };

  return (
    <Layout>
      <ScannerInterface
        title="Email Analysis"
        description="Paste email headers and body content to detect AI-generated phishing attempts and malicious intent."
        inputType="email"
        placeholder="Paste full email content here..."
        onScan={handleScan}
      />
    </Layout>
  );
}