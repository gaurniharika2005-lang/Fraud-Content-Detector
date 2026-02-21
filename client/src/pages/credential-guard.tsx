import { Layout } from "@/components/layout/Layout";
import { ScannerInterface } from "@/components/shared/ScannerInterface";
import { AlertTriangle, KeyRound } from "lucide-react";

export default function CredentialGuard() {
  const handleScan = async (input: string) => {
    try {
      const response = await fetch("https://defraud-api.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input })
      });

      const data = await response.json();
      const isLeaked = data.is_phishing;

      return {
        risk: isLeaked ? "high" : "low",
        score: data.confidence,
        icon: isLeaked ? AlertTriangle : KeyRound,
        summary: isLeaked
          ? "CRITICAL: Suspicious credential patterns detected. This account may be compromised."
          : "No threats found for this identifier.",
        details: [
          { label: "AI Probability", value: `${data.confidence}%` },
          { label: "Sentiment", value: data.sentiment },
          { label: "Risk Level", value: data.risk_level },
          { label: "Status", value: isLeaked ? "Compromised" : "Safe" },
        ],
        actions: data.recommended_actions || []
      };
    } catch (error) {
      return {
        risk: "low",
        score: 0,
        icon: KeyRound,
        summary: "Could not connect to analysis server.",
        details: [],
        actions: ["Restart the Python backend"]
      };
    }
  };

  return (
    <Layout>
      <ScannerInterface
        title="Credential Guard"
        description="Check if user credentials have been exposed in known data breaches or dark web dumps."
        inputType="text"
        placeholder="Enter email or username..."
        onScan={handleScan}
      />
    </Layout>
  );
}
