import { Layout } from "@/components/layout/Layout";
import { ScannerInterface } from "@/components/shared/ScannerInterface";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export default function EmailAnalysis() {
  const handleScan = async (input: string) => {
    // Mock Logic
    const isPhishing = input.toLowerCase().includes("urgent") || input.toLowerCase().includes("bank") || input.toLowerCase().includes("password");
    
    return {
      risk: isPhishing ? "high" : "low",
      score: isPhishing ? 98 : 12,
      icon: isPhishing ? AlertTriangle : ShieldCheck,
      summary: isPhishing 
        ? "High probability of AI-generated phishing content detected. The text exhibits patterns consistent with social engineering attacks, including urgency vectors and request for sensitive credentials."
        : "The email content appears clean. No malicious patterns or AI-generation artifacts were detected in the text body.",
      details: [
        { label: "AI Probability", value: isPhishing ? "99.2%" : "4.5%" },
        { label: "Sentiment", value: isPhishing ? "Urgent/Threatening" : "Neutral" },
        { label: "Language Model", value: isPhishing ? "GPT-4 (Suspected)" : "Human" },
        { label: "Entities", value: isPhishing ? "Bank, Password, Account" : "None" },
      ],
      actions: isPhishing 
        ? ["Quarantine email immediately", "Block sender domain", "Reset user credentials if clicked"]
        : ["No action needed", "Mark as safe"]
    };
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
